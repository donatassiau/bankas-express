const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const uuid = require("uuid");

app.use(bodyParser.json());

const accounts = {};

function formatMoney(amount) {
  return (amount / 100).toFixed(2).replace(".", ",") + " Eur";
}

function isAdult(dob) {
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  return age >= 18;
}

app.post("/api/account", (req, res) => {
  const { vardas, pavarde, gimimoData } = req.body;
  const fullName = `${vardas}-${pavarde}`.toLowerCase();

  if (!isAdult(gimimoData)) {
    return res.status(400).json({
      error:
        "Turite būti vyresnis nei 18 metų, kad galėtumėte susikurti paskyrą.",
    });
  }

  if (accounts[fullName]) {
    return res
      .status(400)
      .json({ error: "Paskyra su tokiu vardu jau egzistuoja." });
  }

  accounts[fullName] = {
    id: uuid.v4(),
    vardas,
    pavarde,
    gimimoData,
    balance: 0,
  };

  res.status(201).json({ message: "Paskyra sėkmingai sukurta." });
});

app.get("/api/account/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: "Paskyra nerasta." });
  }

  const account = accounts[name];
  res.json({
    vardas: account.vardas,
    pavarde: account.pavarde,
    gimimoData: account.gimimoData,
  });
});

app.delete("/api/account/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: "Paskyra nerasta." });
  }

  if (accounts[name].balance > 0) {
    return res
      .status(400)
      .json({ error: "Sąskaitoje neturi būti pinigų norint ją pašalinti." });
  }

  delete accounts[name];
  res.json({ message: "Paskyra sėkmingai pašalinta." });
});

app.put("/api/account/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const { vardas, pavarde, gimimoData } = req.body;
  const newFullName = `${vardas}-${pavarde}`.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: "Tokios paskyros." });
  }

  if (name !== newFullName && accounts[newFullName]) {
    return res
      .status(400)
      .json({ error: "Paskyra su tokiu vardu jau yra sukurta." });
  }

  accounts[newFullName] = {
    ...accounts[name],
    vardas,
    pavarde,
    gimimoData,
  };

  if (name !== newFullName) {
    delete accounts[name];
  }

  res.json({ message: "Paskyra sėkmingai atnaujinta." });
});

app.get("/api/account/:name/name", (req, res) => {
  const name = req.params.name.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: "Tokios paskyros nerandame." });
  }

  res.json({ vardas: accounts[name].vardas });
});

app.put('/api/account/:name/name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const { vardas } = req.body;

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Tokios paskyros nerandame.' });
  }

  const newFullName = `${vardas}-${accounts[name].pavarde}`.toLowerCase();

  if (name !== newFullName && accounts[newFullName]) {
    return res.status(400).json({ error: 'Paskyra su tokiu vardu jau yra sukurta.' });
  }

  accounts[newFullName] = {
    ...accounts[name],
    vardas,
  };

  if (name !== newFullName) {
    delete accounts[name];
  }

  res.json({ message: 'Paskyros vartotojo vardas sėkmingai pakeistas.' });
});

app.get('/api/account/:name/surname', (req, res) => {
  const name = req.params.name.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Tokios paskyros nerandame.' });
  }

  res.json({ pavarde: accounts[name].pavarde });
});

app.put('/api/account/:name/surname', (req, res) => {
  const name = req.params.name.toLowerCase();
  const { pavarde } = req.body;

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Tokios paskyros nerandame.' });
  }

  const newFullName = `${accounts[name].vardas}-${pavarde}`.toLowerCase();

  if (name !== newFullName && accounts[newFullName]) {
    return res.status(400).json({ error: 'Paskyra su tokiu vardu jau yra sukurta.' });
  }

  accounts[newFullName] = {
    ...accounts[name],
    pavarde,
  };

  if (name !== newFullName) {
    delete accounts[name];
  }

  res.json({ message: 'Vartotoje pavardė paskyroje sėkmingai pakeista.' });
});

app.get('/api/account/:name/dob', (req, res) => {
  const name = req.params.name.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Paskyra nerasta.' });
  }

  res.json({ gimimoData: accounts[name].gimimoData });
});

app.put('/api/account/:name/dob', (req, res) => {
  const name = req.params.name.toLowerCase();
  const { gimimoData } = req.body;

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Paskyra nerasta, nepavyko pakeisti gimimo datos.' });
  }

  if (!isAdult(gimimoData)) {
    return res.status(400).json({ error: 'Paskyros vartotojas turi būtų vyresnis nei 18 metų amžiaus.' });
  }

  accounts[name].gimimoData = gimimoData;
  res.json({ message: 'Paskyros naudotojo gimimimo data buvo atnaujinta sėkmingai.' });
});

app.post('/api/deposit', (req, res) => {
  const { piniguKiekis, vardas, pavarde } = req.body;
  const name = `${vardas}-${pavarde}`.toLowerCase();
  const amount = parseFloat(piniguKiekis);

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Netinkamas pinigų kiekis.' });
  }

  if (!vardas || !pavarde) {
    return res.status(400).json({ error: 'Nurodykite vardą ir pavardę.' });
  }

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Tokios paskyros nėra.' });
  }

  accounts[name].balance = parseFloat(accounts[name].balance) || 0;

  // Ensure both values are numbers before adding
  accounts[name].balance += amount;

  res.json({
    message: 'Sėkmingai įsidėjote pinigus.',
    balance: formatMoney(accounts[name].balance),
  });
});

app.post('/api/withdrawal', (req, res) => {
  const { piniguKiekis, vardas, pavarde } = req.body;
  const name = `${vardas}-${pavarde}`.toLowerCase();

  if (!accounts[name]) {
    return res.status(404).json({ error: 'Paskyra nerasta.' });
  }

  if (accounts[name].balance < piniguKiekis) {
    return res.status(400).json({ error: 'Nepakankamas pinigų kiekis.' });
  }

  accounts[name].balance -= piniguKiekis;
  res.json({
    message: 'Pinigai sėkmingai nusiimti.',
    balance: formatMoney(accounts[name].balance),
  });
});

app.post('/api/transfer', (req, res) => {
  const { isVardas, isPavarde, iVardas, iPavarde, piniguKiekis } = req.body;
  const fromName = `${isVardas}-${isPavarde}`.toLowerCase();
  const toName = `${iVardas}-${iPavarde}`.toLowerCase();

  if (!accounts[fromName]) {
    return res.status(404).json({ error: 'Tokios paskyros neradome.' });
  }

  if (!accounts[toName]) {
    return res.status(404).json({ error: 'Paskyra į kurią bandete atlikti pavedimą nerasta.' });
  }

  if (accounts[fromName].balance < piniguKiekis) {
    return res.status(400).json({ error: 'Nepakanka pinigų atlikti pervedimą.' });
  }

  accounts[fromName].balance -= piniguKiekis;
  accounts[toName].balance += piniguKiekis;

  res.json({
    message: 'Pervedimas sėkmingas.',
    fromBalance: formatMoney(accounts[fromName].balance),
    toBalance: formatMoney(accounts[toName].balance),
  });
});

const PORT = process.env.PORT || 5019;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

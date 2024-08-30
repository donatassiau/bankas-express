const uuid = require("uuid");
const accounts = {};

// Utility functions
function formatMoney(amount) {
    return (amount / 100).toFixed(2).replace(".", ",") + " Eur";
}

function isAdult(dob) {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18;
}

// Account functions
exports.createAccount = (req, res) => {
    const { vardas, pavarde, gimimoData } = req.body;
    const fullName = `${vardas}-${pavarde}`.toLowerCase();

    if (!isAdult(gimimoData)) {
        return res.status(400).json({ error: "Turite būti vyresnis nei 18 metų, kad galėtumėte susikurti paskyrą." });
    }

    if (accounts[fullName]) {
        return res.status(400).json({ error: "Paskyra su tokiu vardu jau egzistuoja." });
    }

    accounts[fullName] = {
        id: uuid.v4(),
        vardas,
        pavarde,
        gimimoData,
        balance: 0,
    };

    res.status(201).json({ message: "Paskyra sėkmingai sukurta." });
};

exports.getAccount = (req, res) => {
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
};

exports.deleteAccount = (req, res) => {
    const name = req.params.name.toLowerCase();

    if (!accounts[name]) {
        return res.status(404).json({ error: "Paskyra nerasta." });
    }

    if (accounts[name].balance > 0) {
        return res.status(400).json({ error: "Sąskaitoje neturi būti pinigų norint ją pašalinti." });
    }

    delete accounts[name];
    res.json({ message: "Paskyra sėkmingai pašalinta." });
};

// Add other account-related functions here, following similar structure
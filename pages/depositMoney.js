const accounts = require('./accountController').accounts;

exports.deposit = (req, res) => {
    const { piniguKiekis, vardas, pavarde } = req.body;
    const name = `${vardas}-${pavarde}`.toLowerCase();
    const amount = parseFloat(piniguKiekis);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Netinkamas pinigų kiekis.' });
    }
    if (!accounts[name]) {
        return res.status(404).json({ error: 'Tokios paskyros nėra.' });
    }

    accounts[name].balance = parseFloat(accounts[name].balance) || 0;
    accounts[name].balance += amount;

    res.json({
        message: 'Sėkmingai įsidėjote pinigus.',
        balance: formatMoney(accounts[name].balance),
    });
};

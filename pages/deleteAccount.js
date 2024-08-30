export function deleteAccount() {

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
}
const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();

router.post("/api/account", accountController.createAccount);
router.get("/api/account/:name", accountController.getAccount);
router.delete("/api/account/:name", accountController.deleteAccount);

// Add other account-related routes here

module.exports = router;
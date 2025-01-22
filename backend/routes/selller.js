const express = require("express");
const { signup, login, store ,decode_token} = require("../controllers/seller-auth");
const router = express.Router();

router.get("/store-info/:id",store)
router.post("/register",signup);
router.post("/token",decode_token)
router.post("/login",login);

module.exports = router
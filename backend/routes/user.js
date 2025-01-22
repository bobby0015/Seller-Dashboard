const express = require("express");
const { signup, login, profile, decode_token } = require("../controllers/user-auth");
const { userValidation } = require("../middlewares/user_auth_validation");
const router = express.Router();

//6769f5555b6cf34868c54aca
router.get("/profile/:id",profile);
router.post("/token",decode_token)
router.post("/register",userValidation,signup);
router.post("/login",userValidation,login);

module.exports = router;    
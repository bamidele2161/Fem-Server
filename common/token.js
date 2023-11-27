const jwt = require("jsonwebtoken");
// import { Unauthorized } from "../utils/requestErrors";

const generateToken = (payload, secret, expired) => {
  return jwt.sign(payload, secret, {
    expiresIn: expired,
  });
};

const verifyUserToken = async (token, secret) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    console.log("Authentification error, please check your token.");
  }
};

module.exports = { generateToken, verifyUserToken };

const { matchChecker, hasher } = require("../common/hash");
const { generateToken } = require("../common/token");
const {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
} = require("../service/custormer");
const collectRequestData = require("../util/collectRequestData");

const CreateUser = async (req, res) => {
  try {
    collectRequestData(req, async (data) => {
      const cryptedPassword = await hasher(data.password, 12);

      const values = {
        name: data.name,
        email: data.email,
        address: data.address,
        password: cryptedPassword,
      };

      let user = await getUserByEmail(data.email);

      if (user) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end("Customer with this email already exists.");
      }

      let create = await createUser(values);

      if (!create) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Error occured!");
      }

      const userSecret = process.env.TOKEN_USER_SECRET;
      const token = generateToken({ id: create.c_no }, userSecret, "14d");

      const response = {
        message: "Customer registered successfully",
        data: {
          c_no: create.c_no,
          c_name: create.c_name,
          c_email: create.c_email,
          c_address: create.c_address,
          c_cardtype: create.c_cardtype,
          c_cardno: create.c_cardno,
          token: token,
        },
        statusCode: 200,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const Login = async (req, res) => {
  try {
    collectRequestData(req, async (data) => {
      let user = await getUserByEmail(data.email);

      if (!user) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end("Customer with this email not found");
      }

      let checkPassword = await matchChecker(data.password, user.c_password);

      if (!checkPassword) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end("Invalid password!");
      }

      const userSecret = process.env.TOKEN_USER_SECRET;
      const token = generateToken({ id: user.c_no }, userSecret, "14d");

      const response = {
        message: "Login successfully",
        data: {
          c_no: user.c_no,
          c_name: user.c_name,
          c_email: user.c_email,
          c_address: user.c_address,
          c_cardtype: user.c_cardtype,
          c_cardno: user.c_cardno,
          token: token,
        },
        statusCode: 200,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const GetUser = async (req, res) => {
  try {
    let users = await getUsers();

    if (!users) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end("Error occured!");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

module.exports = {
  CreateUser,
  Login,
  GetUser,
};

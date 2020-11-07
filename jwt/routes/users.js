var express = require("express");
var router = express.Router();
var [createUser, login, getUsers] = require("../controllers/client");
const auth = require("../lib/utils/auth");

/* GET users listing. */
router.get("/", auth.requireMod, async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});

/**
 * Register user
 */
router.post("/register", async function (req, res, next) {
  const user = await createUser(req.body);
  if (user) {
    res.send(user);
  } else {
    // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
    res.send(403).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

/**
 * Login user
 */
router.post("/login", async function (req, res, next) {
  try {
    const user = await login(req.body);
    res.send(user);
  } catch (error) {
    // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
    res.send(403).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

module.exports = router;

// const userDB = {
//   user: require("../model/users.json"),
//   setUser: function (data) {
//     this.user = data;
//   },
// };

const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fsPromises = require("fs").promises;
// const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username nad password are required." });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // evalute password
  const match = bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // const otherUsers = userDB.user.filter((person) => person.username !== user);
    // const currentUser = { ...foundUser, refreshToken };
    // userDB.setUser([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(userDB.user)
    // );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
  // Delete Refresh Token
  // const otherUsers = userDB.user.filter(
  //   (person) => person.refreshToken !== foundUser.refreshToken
  // );
  // const currentUser = { ...foundUser, refreshToken: "" };
  // userDB.setUser([...otherUsers, foundUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "users.json"),
  //   JSON.stringify(userDB.user)
  // );
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };

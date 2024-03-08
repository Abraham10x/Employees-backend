const User = require("../model/User");
const bcrypt = require("bcrypt");

// const userDB = {
//   user: require("../model/users.json"),
//   setUser: function (data) {
//     this.user = data;
//   },
// };

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(404)
      .json({ message: "Username and password are required" });
  // check for duplicate usernmaes in the DB
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);
    // userDB.setUsers([...userDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(userDB.users)
    // );
    // console.log(userDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

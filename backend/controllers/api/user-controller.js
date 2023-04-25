const User = require("../../db/models/user");
const fs = require("fs");
class UserController {
  async register(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    try {
      await user.save();
      return res.status(200).json({ user });
    } catch (e) {
      let type = "";
      if (e.code === 11000) {
        e.message = "This email exist";
        type = "email";
      }
      return res
        .status(401)
        .json({ message: { message: e.message, type: type } });
    }
  }

  async login(req, res) {
    console.log(req);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
      const token = user.generateAuthToken(user._id);

      return res.status(200).json({ user: user, token });
    } catch (e) {
      return res.status(401).json({ message: [e.message] });
    }
  }

  async edit(req, res) {
    const user = await User.findById(req.body._id);
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    try {
      await user.save();
      return res.status(200).json({ user: user });
    } catch (e) {
      return res.status(402).json({ message: [e.message] });
    }
  }

  async editPassword(req, res) {
    const user = await User.findById(req.body._id);
    if (user.comparePassword(req.body.currentPassword)) {
      if (req.body.newPassword === req.body.confirmPassword) {
        user.password = req.body.newPassword;
      } else {
        return res.status(404).json({ message: "Passwords are not the same!" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Entered 'current password' is not correct!" });
    }
    try {
      await user.save();
      return res.status(200).json({ message: "Done", user });
    } catch (e) {
      return res.status(404).json({ message: [e.message] });
    }
  }
  async uploadImage(req, res) {
    const user = await User.findById(req.body._id);
    try {
      return res.status(200).json({ file: req.file, user });
    } catch (e) {
      res.status(402).json({ message: e.message });
    }
  }
  async saveImage(req, res) {
    const user = await User.findById(req.body._id);
    if (req.body?.userImage) {
      if (req.body.userImage !== "avatar.png") {
        fs.unlinkSync("../frontend/public/uploads/" + req.body.userImage);
      }
    }
    user.image = req.body.image.split("/")[2];
    await user.save();
    return res.status(200).json({ user });
  }
  async cancelUpload(req, res) {
    const user = await User.findById(req.body._id);
    if (user.image === req.body.pathImage.split("/")[2]) {
      return;
    }
    fs.unlinkSync("../frontend/public" + req.body.pathImage);
    try {
      return res.status(204).json({ status: "No Content" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async deleteImage(req, res) {
    const user = await User.findById(req.body._id);
    if (req.body.image === "avatar.png") return;
    user.image = "";
    try {
      fs.unlinkSync("../frontend/public/uploads/" + req.body.image);
      user.image = "avatar.png";
      await user.save();
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new UserController();

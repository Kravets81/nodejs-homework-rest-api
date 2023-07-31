const { User } = require("../../models");
const Jimp = require("jimp");
const HttpError = require("../../helpers");

const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  const user = await User.findByIdAndUpdate(_id, { avatarURL });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;

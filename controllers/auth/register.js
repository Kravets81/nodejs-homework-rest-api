const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hasnPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hasnPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    from: "a.kravets@meta.ua",
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;

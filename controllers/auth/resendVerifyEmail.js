const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email not found" });
  }

  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification email sent" });
  };

  await sendEmail(verifyEmail);

  res.status(200).json({});
};

module.export = resendVerifyEmail;

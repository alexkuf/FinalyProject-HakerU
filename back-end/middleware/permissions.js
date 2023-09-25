const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ msg: "You dont have permissions!!!" });
  next();
};
const currentUser = async (req, res, next) => {
  let query = {
    _id: req.params.id,
  };
  if (req.user._id !== query._id)
    if (!req.user.isAdmin)
      return res.status(401).send({ msg: "You dont have permissions!!!" });

  next();
};

module.exports = { isAdmin, currentUser };

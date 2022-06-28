module.exports = function (req, res, next) {
  // req.user
  // 403 Forbidden
  // 401 Unauthorized
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
};

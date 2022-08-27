const { roles } = require("../../constants");
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");

const opts = {
  [roles.admin]: adminPolicy,
  [roles.user]: userPolicy
};

module.exports = opts;
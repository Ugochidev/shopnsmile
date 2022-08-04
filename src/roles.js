const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("basic").readOwn("profile").updateOwn("profile");

  ac.grant("supervisor").extend("basic").readAny("profile");

  ac.grant("admin")
    .extend("basic")
    .extend("supervisor")
    .updateAny("profile")
    .deleteAny("profile");

    ac.grant("superAdmin")
      .extend("basic")
      .extend("supervisor")
      .extend("admin")


  return ac;
})();

module.exports =roles

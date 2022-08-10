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

module.exports = {
  Admin: 'ROL-ADMIN',
  SuperAdmin: 'ROL-SUPERADMIN',
};
const authorize = (roleIds = []) => {
  if (typeof roleIds === "string") {
    // eslint-disable-next-line no-param-reassign
    roleIds = [roleIds];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwtExpress({ secret, algorithms: ["HS256"] }),

    // authorize based on user role
    (req, res, next) => {
      if (roleIds.length && !roleIds.includes(req.user.adminRole)) {
        // user's role is not authorized
        return errorResMsg(
          res,
          401,
          `Admin Role: ${req.user.adminRole} does not have permission to perform this action or access this route`
        );
      }

      // authentication and authorization successful
      next();
      return false;
    },
  ];
};


// router.get(
//   "/profile",
//   adminAuthController.protect,
//   getId,
//   authorize([Role.Admin, Role.SuperAdmin]),
//   adminAuthController.getAdminProfile
// );



module.exports =roles

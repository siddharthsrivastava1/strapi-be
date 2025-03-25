module.exports = async (ctx, next) => {
  const user = ctx.state.user; // Get authenticated user

  if (!user) {
    return ctx.unauthorized("You must be logged in to access this resource");
  }

  if (!user.role) {
    const populatedUser = await strapi.entityService.findOne("plugin::users-permissions.user", user.id, {
      populate: { role: true },
    });

    if (!populatedUser || !populatedUser.role) {
      return ctx.forbidden("User role is missing. Contact support.");
    }

    user.role = populatedUser.role; // Assign the populated role
  }

  const requiredRole = ctx.request.header["x-required-role"];

  if (!requiredRole) {
    return next(); // No restriction, allow access
  }

  if (user.role.name === requiredRole || user.role.name === "admin") {
    return next();
  }

  return ctx.forbidden("You do not have permission to access this resource");
};

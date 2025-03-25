module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;
    debugger
    if (!identifier || !password) {
      return ctx.badRequest("Email and password are required");
    }

    const users = await strapi.entityService.findMany("plugin::users-permissions.user", {
      filters: { email: identifier },
      populate: { role: true },
    });

    const user = users.length > 0 ? users[0] : null;
    if (!user) return ctx.unauthorized("Invalid email or password");

    const validPassword = await strapi.plugins["users-permissions"].services.user.validatePassword(password, user.password);
    if (!validPassword) return ctx.unauthorized("Invalid email or password");

    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({ id: user.id });

    return ctx.send({
      jwt,
      user: { id: user.id, username: user.username, email: user.email, role: user.role?.name },
    });
  },
};

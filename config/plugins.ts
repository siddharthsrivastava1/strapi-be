module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      register: { role: "authenticated" },
      jwtSecret: env("ADMIN_JWT_SECRET"),
    },
  },
});

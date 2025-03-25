module.exports = {
  routes: [
    { method: "POST", path: "/auth/local", handler: "auth.login", config: { policies: [] } },
  ],
};

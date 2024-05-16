const bases = {
  user: "/user",
};

const user = {
  base: bases.user,
  login: `${bases.user}/login`,
  signUp: `${bases.user}/signUp`,
};

const apiRoutes = { user };
export default apiRoutes;


export const AppInfo = {
  AppName: "Elastic-Generator",
  AppDeveloper: "Daniel",
  GithubLink: "https://github.com/nikawang/es-generator"
};

const api = "/api"
const apiAuthBase = api + "/auth"
export const ApiES = api + "/es"
// export const ApiBook = api + "/books"
export const ApiCategory = api + "/categories"
export const ApiFormat = api + "/formats"

export const apiAuth = {
  LoginStatus: apiAuthBase + "/loginStatus",
  LoginAccount: apiAuthBase + "/loginAccount",
  Login: apiAuthBase + "/login",
  Logout: apiAuthBase + "/logout"
}
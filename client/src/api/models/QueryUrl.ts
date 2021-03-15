// enum QueryUrlEnum {
//   assignments = "/api/Assignments",
//   assignmentsUsers = "/api/Assignments/Users",
//   login = "/api/Auth/login",
//   logout = "/api/Auth/logout",
//   chores = "/api/Chores",
//   choresAssignments = "/api/Chores/Assignments",
//   grants = "/api/Grants",
//   grantsUsers = "/api/Grants/Users",
//   rewards = "/api/Rewards",
// }

// export type QueryUrl = {
//   [QueryUrlEnum.assignments]: string;
//   [QueryUrlEnum.assignmentsUsers]: string;
//   [QueryUrlEnum.login]: string;
//   [QueryUrlEnum.logout]: string;
//   [QueryUrlEnum.chores]: string;
//   [QueryUrlEnum.choresAssignments]: string;
//   [QueryUrlEnum.grants]: string;
//   [QueryUrlEnum.grantsUsers]: string;
//   [QueryUrlEnum.rewards]: string;
// };

// export type QueryUrl =
//   | "/api/Assignments"
//   | "/api/Assignments/Users"
//   | "/api/Auth/login"
//   | "/api/Auth/logout"
//   | "/api/Chores"
//   | "/api/Chores/Assignments"
//   | "/api/Grants"
//   | "/api/Grants/Users"
//   | "/api/Rewards";

export const queryUrl = {
  assignments: "/api/Assignments",
  assignmentsUsers: "/api/Assignments/Users",
  login: "/api/Auth/login",
  logout: "/api/Auth/logout",
  chores: "/api/Chores",
  choresAssignments: "/api/Chores/Assignments",
  grants: "/api/Grants",
  grantsUsers: "/api/Grants/Users",
  rewards: "/api/Rewards",
};

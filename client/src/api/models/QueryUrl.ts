// export const queryUrl = {
//   assignments: "/api/Assignments",
//   assignmentsUsers: "/api/Assignments/Users",
//   login: "/api/Auth/login",
//   logout: "/api/Auth/logout",
//   chores: "/api/Chores",
//   choresAssignments: "/api/Chores/Assignments",
//   grants: "/api/Grants",
//   grantsUsers: "/api/Grants/Users",
//   rewards: "/api/Rewards",
// };

export type QueryUrl =
  | "/api/Assignments"
  | "/api/Assignments/Users"
  | "/api/Auth/login"
  | "/api/Auth/logout"
  | "/api/Chores"
  | "/api/Chores/Assignments"
  | "/api/Grants"
  | "/api/Grants/Users"
  | "/api/Rewards";

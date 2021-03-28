export type QueryObjectUrl =
  | any // TODO js (28.03.2021): The any type declaration has to be removed!
  | "/api/Assignments/"
  | "/api/Assignments/Users/"
  | "/api/Auth/login/"
  | "/api/Auth/logout/"
  | "/api/Chores/"
  | "/api/Chores/Assignments/"
  | "/api/Chores/Assignments/Users/"
  | "/api/Grants/"
  | "/api/Grants/Users/"
  | "/api/Rewards/"
  | "/api/Rewards/Users/"
  | "/api/Rewards/Grants/"
  | "/api/Users/"
  | "/api/Users/families/";

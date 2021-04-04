export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: string;
  family: string;
}

export function getRoleName(user: User | undefined): string {
  if (!user) return "nicht definiert";

  switch (user.role) {
    case "Parent":
      return "Elternteil";
    case "Child":
      return "Kind";
    default:
      return "nicht definiert";
  }
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
}

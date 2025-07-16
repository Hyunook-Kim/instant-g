import { AuthUser } from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}

import { User } from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

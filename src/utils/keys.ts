import { UserQuery } from "@/api/user";
import type { InjectionKey } from "vue";

export const LOAD_USER_KEY = Symbol("getUserList") as InjectionKey<
  (userQuery: UserQuery) => void
>;

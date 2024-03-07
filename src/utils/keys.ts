import { UserQuery } from "@/api/user";
import type { InjectionKey, Ref } from "vue";

export const LOAD_USER_KEY = Symbol("getUserList") as InjectionKey<
  Ref<((userQuery: UserQuery) => void) | null>
>;

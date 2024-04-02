import { ref, watch, computed } from "vue"
import type { Ref } from "vue"
import userApi, { User } from "@/api/user"

export default function useUserTable(orgId: Ref<string | undefined>) {
  const list = ref<User[]>([]);
  const keyword = ref("");
  const userList = computed(() => keyword.value ? list.value.filter(item => item.name.includes(keyword.value)) : list.value);
  const getUserData = async () => {
    keyword.value = "";
    if(orgId.value === undefined) {
      list.value = [];
      return;
    }
    const data = await userApi.query({
      name: keyword.value,
      orgId: orgId.value
    });
    list.value = data;
  }
  watch(orgId, getUserData);
  return {
    userList,
    keyword,
    getUserData
  }
}
import { ref } from "vue"
import orgApi, { Org } from "@/api/org"

export default function useOrgTree() {
  const orgParent = ref<Org[]>([]);
  const orgSub = ref<Org[]>([]);
  const parentId = ref<string>();
  const orgId = ref<string>();

  const getOrgSub = async (pid: string) => {
    parentId.value = pid;
    orgId.value = void 0;
    const data = await orgApi.query(pid);
    data.forEach(item => item.id += "");
    orgSub.value = data;
    data.length && (orgId.value = data[0].id);
  }

  (async () => {
    const data = await orgApi.query();
    if(!data.length) return;
    data.forEach(item => item.id += "");
    orgParent.value = data;
    parentId.value = data[0].id;
    getOrgSub(parentId.value)
  })()

  return {
    orgParent,
    orgSub,
    parentId,
    orgId,
    getOrgSub
  }
}
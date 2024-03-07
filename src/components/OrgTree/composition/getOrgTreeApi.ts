import { query as orgQuery, type Org } from "@/api/org";

export async function getOrgTreeApi(level: number, id: string = "0") {
  const data = await orgQuery(id);
  data.map((item) => {
    return {
      ...item,
      loading: false,
      loaded: false,
      level,
    };
  });
  return data as OrgTreeNode[];
}

export type OrgTreeNode = {
  loading: boolean;
  loaded: boolean;
  level: number;
} & Org;

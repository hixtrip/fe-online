import delay from "../utils/delay";
import LocalStorageUtil from "../utils/localStorage";

function getUserList(keys: string, name?: any) {
  function operation() {
    let orgData = LocalStorageUtil.getItem("orgData") ?? [];
    const indexes = keys.split("-");
    if (orgData.length > 0) {
      let resultData =
        orgData
          .find((_item: any, index: any) => index == indexes[0])
          .datas.find((_item: any, index: any) => index == indexes[1])
          ?.people || [];
      if (name) {
        resultData = resultData.filter(
          (i: { name: string | any[] }) => i.name.indexOf(name) != -1
        );
      }
      return resultData;
    }
    return [];
  }
  return delay(operation());
}

export default getUserList;

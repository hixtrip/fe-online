import { Org } from '../store/types/app';
import delay from '../utils/delay';

const getOrgData = (): Org[] => {
  const count = Math.floor(Math.random() * 20);
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
      };
    });
};

const query = () => {
  return delay(getOrgData());
};

const orgApi = {
  query,
};

export default orgApi;

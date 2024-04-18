/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
import piniaPersist from 'pinia-plugin-persist';
const piniaPersistConfig: piniaPersist = (...key: string[]) => {
    const persist = {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: key,
            },
        ],
    };
    return persist;
};
export default piniaPersistConfig;

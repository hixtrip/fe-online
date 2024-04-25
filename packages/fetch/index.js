import requst from "./request";

const prefix = "/api";

/**
 * 登录请求
 * @param {object} data包括username和password
 * @returns {Promise} 返回登录后的响应结果
 */
export const login = (data) => {
  return requst(`${prefix}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

/**
 * 获取用户信息请求
 * @param {object} data包括token
 * @returns {Promise} 返回获取用户信息后的响应结果
 */
export const getUserInfo = (data) => {
  return requst(`${prefix}/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

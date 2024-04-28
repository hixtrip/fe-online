/**
 * 通用的fetch请求封装函数
 * @param {string} url 请求的URL
 * @param {object} options 配置选项，包括method, headers等
 * @returns {Promise} 返回处理后的响应结果
 */
async function requst(url, options = {}) {
  // 设置默认的请求配置
  const defaultOptions = {
    method: "GET", // 默认请求方法
  };

  // 合并传入的配置和默认配置
  const finalOptions = { ...defaultOptions, ...options };

  try {
    // 使用fetch进行网络请求
    const response = await fetch(url, finalOptions);

    // 检查响应的HTTP状态码
    if (!response.ok) {
      // 如果响应状态码不是2xx, 抛出错误
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    // 根据响应头部的Content-Type处理不同类型的返回数据
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else if (contentType && contentType.includes("text")) {
      return await response.text();
    } else if (
      contentType &&
      (contentType.includes("image") || contentType.includes("blob"))
    ) {
      return await response.blob();
    } else {
      return response; // 直接返回原始响应对象以便进行特定处理
    }
  } catch (error) {
    // 处理错误
    console.error("Fetching error:", error);
    throw error; // 可以选择重新抛出错误，或者处理错误返回一个默认结果
  }
}

export default requst;

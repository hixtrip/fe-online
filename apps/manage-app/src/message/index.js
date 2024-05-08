import { ref } from 'vue';
export class MonitorBuilder {
    constructor() {
        this._eventOptionMap = new Map()
    }

    /**
     * 设置事件处理器
     * @param type 对应的事件类型
     * @param handler 处理器或者处理器配置
     * @returns
     */
    setEventHandler(type, handler) {
        this._eventOptionMap.set(type, {
            handler: handler,
        })
        return this
    }

    /**
     * 触发事件处理
     * @param type 对应的事件类型
     * @param data 事件携带的数据
     * @returns 回调数据
     */
    triggerEvent(type, data) {
        const option = this._eventOptionMap.get(type)
        if (option) {
            return option.handler(data)
        } else {
            throw new Error(`${type}`)
        }
    }
}

/**
* 监听对应的消息模块
* @param iframeRef 接收的目标iframe
* @returns 全部控制函数定义 可重用
*/
export const useHandleMessageCore = (iframeRef) => {
    /**
     * 封装的信息发送
     * @param eventType 事件名
     * @param data 数据
     */
    const sendEvent = (
        eventType,
        data,
    ) => {
        postMessage({ eventType, data })
    }

    /** 消息发送 */
    const postMessage = (message) => iframeRef.value?.contentWindow?.postMessage(message, '*')

    /** 事件回调 */
    const eventCallback = ref()
    const eventHandle = (cb) => {
        eventCallback.value = cb
    }

    /** 消息监听 */
    const eventListener = (e) => {
        const { data: eventWrapper, source } = e
        const { sourceName, data } = eventWrapper
        if (sourceName && source === iframeRef.value?.contentWindow) {
            console.log(eventWrapper)
            eventCallback.value?.(sourceName, data)
        }
    }

    window.addEventListener('message', eventListener)

    return {
        sendEvent,
        eventHandle,
        eventCallback,
    }
}
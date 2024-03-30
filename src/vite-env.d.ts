/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  import { AxiosRequestConfig } from 'axios'
  
  declare module 'axios' {
    export interface AxiosRequestConfig {
      // [自定义属性声明]
      // loading?: boolean;
    }
  }
  
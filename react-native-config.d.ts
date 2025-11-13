declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    API_KEY?: string;
    APP_NAME?: string;
    ENABLE_DEBUG?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

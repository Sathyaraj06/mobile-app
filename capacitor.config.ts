import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'evis.app',
  appName: 'evis',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;

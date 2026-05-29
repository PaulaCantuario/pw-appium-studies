import { remote } from 'webdriverio';

// Capabilities: são as "instruções" que você manda pro Appium
// dizendo QUAL dispositivo, QUAL app, QUAL driver usar
const capabilities = {
  platformName: 'Android', 
  'appium:automationName': 'UiAutomator2', // driver que o Appium vai usar
  'appium:deviceName': 'emulator-5554', // nome do emulador (veja com: adb devices)
  'appium:app': 'C:/sources/pw-appium-studies/apk/mda-2.2.0-25.apk', // caminho do APK, precisa trocar pro seu caminho local
  'appium:appPackage': 'com.saucelabs.mydemoapp.android', // package name do app
  'appium:noReset': true, // false = limpa dados entre sessões
  'appium:appActivity': 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity', // activity principal do app
  'appium:autoGrantPermissions': true,  // aceita permissões automaticamente
  'appium:newCommandTimeout': 240,           // tempo máximo sem comandos antes de encerrar
};



// Cria e retorna uma sessão Appium
export async function createDriver() {
  const driver = await remote({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,             // porta padrão do Appium
    path: '/',
    capabilities,
    logLevel: 'warn',       // 'info' pra debug, 'warn' pra produção
  });

  return driver;
}

// Tipo auxiliar para usar nos Page Objects
export type AppiumDriver = Awaited<ReturnType<typeof createDriver>>;
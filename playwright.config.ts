import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,          // Mobile é lento, 60s é razoável
  retries: 1,               // Flaky tests são comuns em mobile
  workers: 1,               // Appium + emulador geralmente não paraleliza bem sem farm
  reporter: [['html'], ['list']],
  use: {
    // Não usamos browser aqui — o "browser" é o Appium
    // Configurações globais de espera
    actionTimeout: 15_000,
  },
});
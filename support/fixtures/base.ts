import { test as base } from '@playwright/test'
import { createDriver, AppiumDriver } from '../helpers/driver'

// Define quais fixtures existem
type AppFixtures = {
  driver: AppiumDriver
}

export const test = base.extend<AppFixtures>({
  driver: async ({}, use) => {
    const driver = await createDriver()  // abre sessão com Appium
    await use(driver)                    // teste roda aqui
    await driver.deleteSession()         // fecha sessão sempre
  },
})

export { expect } from '@playwright/test'
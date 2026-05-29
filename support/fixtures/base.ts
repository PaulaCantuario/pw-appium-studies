// support/fixtures/base.ts
import { test as base } from '@playwright/test'
import { AppiumDriver, createDriver } from '../helpers/driver'
import { TopAppBarPage } from '../pages/topAppBar.page'
import { AppMenuPage } from '../pages/appMenu.page'
import { LoginPage } from '../pages/login.page'
import { CatalogoPage } from '../pages/catalogo.page'

// define os tipos de todas as fixtures disponíveis nos testes
type AppFixtures = {
  driver: AppiumDriver
  topAppBarPage: TopAppBarPage
  appMenuPage: AppMenuPage
  loginPage: LoginPage
  catalogoPage: CatalogoPage
}

export const test = base.extend<AppFixtures>({

  // fixture do driver — abre a sessão antes do teste e encerra depois
  // garante limpeza mesmo se o teste falhar
  driver: async ({}, use) => {
    const driver = await createDriver()
    await use(driver)
    await driver.deleteSession()
  },

  // cada page recebe o driver via fixture — não precisa instanciar no teste
  topAppBarPage: async ({ driver }, use) => {
    await use(new TopAppBarPage(driver))
  },

  appMenuPage: async ({ driver }, use) => {
    await use(new AppMenuPage(driver))
  },

  loginPage: async ({ driver }, use) => {
    await use(new LoginPage(driver))
  },

  catalogoPage: async ({ driver }, use) => {
    await use(new CatalogoPage(driver))
  },

})

export { expect } from '@playwright/test'
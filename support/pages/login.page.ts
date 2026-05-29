// login.page.ts
import { ChainablePromiseElement } from 'webdriverio'
import { AppiumDriver } from '../helpers/driver'

export class LoginPage {
  readonly usernameInputById: ChainablePromiseElement
  readonly usernameInputByUiAutomator: ChainablePromiseElement
  readonly usernameInputByXPath: ChainablePromiseElement

  readonly passwordInputById: ChainablePromiseElement
  readonly passwordInputByUiAutomator: ChainablePromiseElement
  readonly passwordInputByXPath: ChainablePromiseElement

  readonly loginButtonByAccessibilityId: ChainablePromiseElement
  readonly loginButtonById: ChainablePromiseElement
  readonly loginButtonByClassName: ChainablePromiseElement
  readonly loginButtonByUiAutomator: ChainablePromiseElement
  readonly loginButtonByXPath: ChainablePromiseElement

  constructor(private driver: AppiumDriver) {
    this.usernameInputById        = driver.$('id=com.saucelabs.mydemoapp.android:id/nameET')
    this.usernameInputByUiAutomator = driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")')
    this.usernameInputByXPath     = driver.$('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]')

    this.passwordInputById        = driver.$('id=com.saucelabs.mydemoapp.android:id/passwordET')
    this.passwordInputByUiAutomator = driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/passwordET")')
    this.passwordInputByXPath     = driver.$('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]')

    this.loginButtonByAccessibilityId = driver.$('~Tap to login with given credentials')
    this.loginButtonById          = driver.$('id=com.saucelabs.mydemoapp.android:id/loginBtn')
    this.loginButtonByClassName   = driver.$('android.widget.Button')
    this.loginButtonByUiAutomator = driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")')
    this.loginButtonByXPath       = driver.$('//android.widget.Button[@content-desc="Tap to login with given credentials"]')
  }

  // só preenche e submete — não navega até a tela
  async preencherELogar(usuario: string, senha: string): Promise<void> {
    //esses wait eu precisei colocar por conta da lentidão da execução do emulador na minha máquina
    await this.usernameInputById.waitForDisplayed({ timeout: 15_000 })
    await this.usernameInputById.setValue(usuario)
    await this.passwordInputById.setValue(senha)
    await this.loginButtonByAccessibilityId.click()
  }
}
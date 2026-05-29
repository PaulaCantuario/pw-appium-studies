import { ChainablePromiseElement } from 'webdriverio'
// ChainablePromiseElement é o tipo equivalente ao Locator do Playwright no WebdriverIO.
// Ele não busca o elemento agora, apenas descreve onde ele está.
// A busca real acontece só quando chama .click(), .setValue(), etc.
// Por isso funciona no constructor sem precisar de await.

import { AppiumDriver } from "../helpers/driver"

export class AppMenuPage {
    //aqui estou listando os elementos do menu da barra superior usando diferentes estratégias de localização por ordem de prioridade, apenas para exemplificar
    readonly appMenuByAccessibilityId: ChainablePromiseElement
    readonly appMenuById: ChainablePromiseElement
    readonly appMenuByUiAutomator: ChainablePromiseElement
    readonly appMenuByXPath: ChainablePromiseElement

    readonly loginMenuByAccessibilityId: ChainablePromiseElement
    readonly loginMenuByUiAutomator: ChainablePromiseElement
    readonly loginMenuByXPath: ChainablePromiseElement

    readonly logoutMenuByAccessibilityId: ChainablePromiseElement
    readonly logoutMenuByUiAutomator: ChainablePromiseElement
    readonly logoutMenuByXPath: ChainablePromiseElement

    constructor(private driver: AppiumDriver) {

        this.appMenuByAccessibilityId = driver.$('~View menu')
        this.appMenuById = driver.$('id=com.saucelabs.mydemoapp.android:id/cartIV')
        this.appMenuByUiAutomator = driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartIV")')
        this.appMenuByXPath = driver.$('//android.widget.ImageView[@content-desc="View menu"]')


        this.loginMenuByAccessibilityId = driver.$('~Login Menu Item')
        this.loginMenuByUiAutomator = driver.$('android=new UiSelector().text("Log In")')
        this.loginMenuByXPath = driver.$('//android.widget.TextView[@content-desc="Login Menu Item"]')

        this.logoutMenuByAccessibilityId = driver.$('~Logout Menu Item')
        this.logoutMenuByUiAutomator = driver.$('android=new UiSelector().text("Log Out")')
        this.logoutMenuByXPath = driver.$('//android.widget.TextView[@content-desc="Logout Menu Item"]')
    }
    async navegaOpcaoLogin(): Promise<void> {
        //esses wait eu precisei colocar por conta da lentidão da execução do emulador na minha máquina
        await this.appMenuByAccessibilityId.waitForDisplayed({ timeout: 15_000 })
        await this.appMenuByAccessibilityId.click()
        await this.loginMenuByAccessibilityId.waitForDisplayed({ timeout: 15_000 })
        await this.loginMenuByAccessibilityId.click()
    }
}
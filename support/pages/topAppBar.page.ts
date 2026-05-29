import { ChainablePromiseElement } from 'webdriverio'
// ChainablePromiseElement é o tipo equivalente ao Locator do Playwright no WebdriverIO.
// Ele não busca o elemento agora, apenas descreve onde ele está.
// A busca real acontece só quando chama .click(), .setValue(), etc.
// Por isso funciona no constructor sem precisar de await.

import { AppiumDriver } from "../helpers/driver"

export class TopAppBarPage {
  //aqui estou listando os elementos do menu da barra superior usando diferentes estratégias de localização por ordem de prioridade, apenas para exemplificar
  readonly cartByAccessibilityId: ChainablePromiseElement
  readonly cartById: ChainablePromiseElement
  readonly cartByUiAutomator: ChainablePromiseElement
  readonly cartByXPath: ChainablePromiseElement

  constructor(private driver: AppiumDriver) {
    this.cartByAccessibilityId = driver.$('~View cart')
    this.cartById = driver.$('id=com.saucelabs.mydemoapp.android:id/cartIV')
    this.cartByUiAutomator = driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartIV")')
    this.cartByXPath = driver.$('//android.widget.ImageView[@content-desc="Displays number of items in your cart"]')

  }

}
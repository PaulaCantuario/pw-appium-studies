import { ChainablePromiseElement } from 'webdriverio'
import { AppiumDriver } from "../helpers/driver"

export class CatalogoPage {
    readonly titleByAccessibilityId: ChainablePromiseElement

    constructor(private driver: AppiumDriver) {
        this.titleByAccessibilityId = driver.$('~title')
    }
}

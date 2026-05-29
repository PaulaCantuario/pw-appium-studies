import { test, expect } from '../support/fixtures/base'


const VALID_USER = 'bod@example.com'
const VALID_PASSWORD = '10203040'

test.describe('Login', () => {

    test('deve fazer login com credenciais válidas', async ({ driver, appMenuPage, loginPage, catalogoPage }) => {

        //esses wait eu precisei colocar por conta da lentidão da execução do emulador na minha máquina
        await appMenuPage.navegaOpcaoLogin()
        await loginPage.preencherELogar(VALID_USER, VALID_PASSWORD)

        await catalogoPage.titleByAccessibilityId.waitForDisplayed({ timeout: 15_000 })
        expect(await catalogoPage.titleByAccessibilityId.isDisplayed()).toBe(true)// aqui valida se apareceu o título da página inicial

        await appMenuPage.appMenuByAccessibilityId.click()
        await appMenuPage.logoutMenuByAccessibilityId.waitForDisplayed({ timeout: 15_000 })
        expect(await appMenuPage.logoutMenuByAccessibilityId.isDisplayed()).toBe(true)// aqui valida se apareceu o menu Logout, o que indica que o login foi bem sucedido
    })

})
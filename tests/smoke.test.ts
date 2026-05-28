// tests/smoke.spec.ts
import { test, expect } from '../support/fixtures/base'

test('app abre corretamente', async ({ driver }) => {
  // só pra validar que a sessão abriu e o app subiu
  const source = await driver.getPageSource()
  expect(source).toBeTruthy()
})
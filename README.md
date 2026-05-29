# pw-appium-studies

POC de automação mobile usando Playwright como test runner e Appium para comunicação com dispositivos Android.

> Objetivo: servir como base de referência para times de QA que queiram iniciar automação mobile com essa stack.

---

## Entendendo a Arquitetura

Antes de qualquer `npm install`, entenda o que está sendo montado:

```
Playwright (runner de testes)
    ↓
WebDriver Protocol (W3C)
    ↓
Appium Server (traduz comandos WebDriver para mobile)
    ↓
UIAutomator2 Driver (Android) ou XCUITest (iOS)
    ↓
Dispositivo / Emulador / APK
```

### Responsabilidade de cada ferramenta

```
@playwright/test  →  runner, expect, fixtures, relatório
webdriverio       →  cliente que manda comandos pro Appium
appium            →  servidor que executa no dispositivo Android
uiautomator2      →  driver que fala com o Android de verdade
```

### Pontos importantes

- O Playwright **não fala diretamente com o Appium** — ele usa o protocolo WebDriver. O Appium é o servidor que recebe esses comandos e os executa no dispositivo.
- O `@playwright/test` aqui é **somente o runner** — ele **não instala browsers**. Não é necessário rodar `npx playwright install`.
- O `webdriverio` é o **cliente HTTP** que manda comandos pro Appium.
- Quem navega no app é o **Appium + UiAutomator2**, não o Playwright.
- O Playwright serve para: rodar os testes (`test`, `describe`), fazer assertions (`expect`), gerar relatórios e gerenciar fixtures.

---

## Pré-requisitos

Antes de clonar e instalar o projeto, você precisa ter o ambiente Android configurado na sua máquina. Esses itens **não são instalados pelo `npm install`** — são dependências do sistema operacional.

| Ferramenta | Versão recomendada | Onde baixar |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| Java JDK | 11 ou 17 | https://adoptium.net |
| Android Studio | Mais recente | https://developer.android.com/studio |

> Evite o Java 21 — pode ter incompatibilidade com o Appium.

### Configurando o Android Studio

Após instalar o Android Studio, acesse o SDK Manager:

```
Settings → Languages & Frameworks → Android SDK → aba "SDK Tools"
```

Ative a opção **"Show Package Details"** no canto inferior direito e instale:

| Item | Pra que serve |
|---|---|
| `Android SDK Platform-Tools` | contém o `adb` — ferramenta de comunicação com dispositivos |
| `Android SDK Build-Tools` | contém o `aapt` — ferramenta para inspecionar APKs |
| `Android Emulator` | permite rodar emuladores Android na sua máquina |
| `Intel HAXM` ou `Android Emulator Hypervisor Driver` | aceleração de hardware do emulador (depende do seu chip) |

### Configurando variáveis de ambiente

O `adb` e o `emulator` precisam estar no PATH do sistema para funcionar no terminal.

**Windows** — adicione nas variáveis de ambiente do sistema:
```
ANDROID_HOME = C:\Users\<seu-usuario>\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\platform-tools
PATH += %ANDROID_HOME%\emulator
PATH += %ANDROID_HOME%\cmdline-tools\latest\bin
```

**Mac/Linux** — adicione no `~/.zshrc` ou `~/.bashrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

Após configurar, reabra o terminal e verifique:

```bash
adb version
# esperado: Android Debug Bridge version 1.x.x

java -version
# esperado: openjdk version "11.x.x" ou "17.x.x"

echo $ANDROID_HOME
# esperado: caminho para o SDK (Mac/Linux)
```

---

## Criando o Emulador

Você precisa de um emulador Android para rodar os testes. Crie um pelo Android Studio:

```
Device Manager → + → Create Virtual Device
→ Escolha um dispositivo (ex: Pixel 6a)
→ Escolha uma imagem de sistema (ex: API 33, x86_64)
→ Finish
```

Para subir o emulador pelo terminal:

```bash
# lista os emuladores criados
emulator -list-avds

# sobe o emulador pelo nome que aparecer
emulator -avd Pixel_6a

# confirma que o adb está vendo o emulador
adb devices
# esperado: emulator-5554   device
```

> Se `emulator` não for reconhecido, verifique se o PATH está configurado corretamente.

---

## APK de Teste

Este projeto usa o app de demo da Sauce Labs como alvo dos testes:

```
https://github.com/saucelabs/my-demo-app-android/releases
```

O arquivo já está na pasta `apk/` do projeto.

### Instalando o APK no emulador

```bash
# com o emulador rodando
adb install -r C:/sources/pw-appium-studies/apk/mda-2.2.0-25.apk

# confirma que instalou
adb shell pm list packages | grep saucelabs
# esperado: package:com.saucelabs.mydemoapp.android
```



## Estrutura do Projeto

```
pw-appium-studies/
├── apk/
│   └── mda-2.2.0-25.apk
├── tests/
│   └── login.spec.ts
├── pages/
│   └── LoginPage.ts
├── fixtures/
│   └── base.ts
├── helpers/
│   └── driver.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Instalação do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/pw-appium-studies.git
cd pw-appium-studies
```

### 2. Instale as dependências

```bash
npm install
```

Esse comando instala tudo que está declarado no `package.json`:

| Pacote | O que faz |
|---|---|
| `@playwright/test` | runner de testes, assertions e fixtures |
| `webdriverio` | cliente HTTP que manda comandos pro Appium |
| `appium` | servidor que executa comandos no dispositivo Android |
| `typescript` | suporte a TypeScript no projeto |
| `ts-node` | executa arquivos `.ts` diretamente sem compilar |
| `@types/node` | tipagem do Node.js para o TypeScript |

### 3. Instale o driver Android

```bash
npx appium driver install uiautomator2
```

> Esse passo é **separado do `npm install`** porque o UiAutomator2 não é um pacote npm — é um driver gerenciado pelo próprio Appium. Só precisa rodar **uma vez** por máquina.

Para verificar se o driver foi instalado:

```bash
npx appium driver list
# esperado: uiautomator2  (installed)
```

---

## Rodando os Testes

```bash
# terminal 1 — sobe o Appium Server (deixa rodando)
npm run appium

# terminal 2 — roda os testes
npm test

# roda com relatório HTML
npm run test:report
```

Os scripts estão definidos no `package.json`:

```json
{
  "scripts": {
    "appium": "appium",
    "test": "playwright test",
    "test:report": "playwright test --reporter=html && playwright show-report"
  }
}
```

---

## Appium Inspector

O Appium Inspector é uma ferramenta **independente de framework** para inspecionar elementos do app e descobrir seletores. É o equivalente do DevTools no browser — essencial para criar Page Objects.

### Download

```
https://github.com/appium/appium-inspector/releases
```

Baixe o `.exe` para Windows ou `.dmg` para Mac.

### Pré-requisitos para usar o Inspector

Antes de abrir uma sessão no Inspector, você precisa ter:

1. Emulador rodando (`emulator -avd Pixel_6a`)
2. APK instalado no emulador (`adb install -r ...`)
3. Appium Server rodando (`npm run appium`)

Confirme que está tudo ok:

```bash
adb devices
# esperado: emulator-5554   device
```

### Configuração

Ao abrir o Inspector, configure a aba **Server**:

```
Remote Host:  127.0.0.1
Remote Port:  4723
Remote Path:  /
```

Em seguida, clique em **JSON Representation** e cole as capabilities:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:app": "C:/sources/pw-appium-studies/apk/mda-2.2.0-25.apk",
  "appium:appPackage": "com.saucelabs.mydemoapp.android",
  "appium:noReset": true
}
```

Clique em **Start Session**.

> O `appium:deviceName` deve bater com o que aparece em `adb devices`.
> O `appium:appActivity` foi omitido intencionalmente — o Appium resolve automaticamente. Incluí-lo pode causar erro de permissão dependendo da versão do Android.

### Prioridade de seletores

Ao inspecionar elementos, siga essa ordem de preferência:

```
1º  Accessibility ID (content-desc)  →  ~nome_do_elemento         (mais estável)
2º  Resource ID                      →  android=new UiSelector().resourceId("com.app:id/elemento")
3º  XPath                            →  //android.widget.TextView[@text="Texto"]  (último recurso)
```

O XPath funciona, mas é frágil — qualquer mudança na hierarquia de telas quebra o seletor.


## Fluxo Completo — do zero até o Inspector

```bash
# 1. sobe o emulador
emulator -avd Pixel_6a

# 2. confirma o dispositivo
adb devices

# 3. instala o APK (se ainda não instalou)
adb install -r apk/mda-2.2.0-25.apk

# 4. sobe o Appium Server
npm run appium

# 5. abre o Appium Inspector → cola as capabilities → Start Session
#    inspeciona os elementos → copia os seletores → monta os Page Objects

# 6. roda os testes
npm test
```

Antes de executar os testes, é necessário encerrar a sessão do Appium Inspector!
O Appium só permite uma sessão por vez no mesmo dispositivo. Se o Inspector estiver com uma sessão ativa, o teste vai tentar criar outra e vai falhar com erro de sessão conflitante.

---

## Tecnologias

- [Playwright](https://playwright.dev/)
- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
- [UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Sauce Labs Demo App](https://github.com/saucelabs/my-demo-app-android)

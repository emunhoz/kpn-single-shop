## 🗂 Monorepo structure

| Apps/Package                    | Description                                 |
| ------------------------------- | ------------------------------------------- |
| [`@apps/shop`](./apps/shop)     | Front end application created with Nuxt     |
| [`@packages/ui`](./packages/ui) | Vue component library made with `@nuxt/kit` |

## ⚒️ Stack

- Lerna with NPM monorepo
- Nuxt
- Vue 3
- Cypress (E2E test)
- Github actions with Release
- Component library with Vue and `@nuxt/kit`
- Conventional commits
- Semantic releases

## ⚠️ Requirements

- Node >= `v18.12.1`
- NPM >= `8.19.2`

## 🌐 Link

- Front end application: [Demo](https://kpn-single-shop-web.vercel.app/)

## 🚀 Run locally

In the root folder run the following commands:

1. Install dependencies

```bash
  npm i
```

2. Run the project

```bash
  npm run dev
```

## 🚦 Testing

Unit tests: Go to [`shop`](./apps/shop) and then run the following command:

```bash
  npm run test
```

E2E tests: Go to [`shop`](./apps/shop) and then run the following command:

1. Running the project

```bash
  npm run dev
```

2. Start Cypress

```bash
  npm run cypress:open
```

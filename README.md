## [线上 DEMO](https://www.dshijie.fun/#/index/find-music/personalized-recommendations)

### [接口](https://github.com/Binaryify/NeteaseCloudMusicApi)

线上服务部分接口存在问题
建议 clone 此项目本地运行

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Compile and Hot-Reload for Electron

```sh
pnpm run electron
```

### Minify and Electron build

```sh
pnpm run electron:build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm run build
pnpm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

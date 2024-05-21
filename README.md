# dmh-ipapi-frontend

frontend part of dmh-ipapi to provide ip to gelocation services

## requirements

I am using **react-scripts** to bundle and serve this React app. That project is no longer actively maintained by Meta/Facebook, which required overriding the TypeScript package version to allow for TS 5.x support.

I am aware that modern React apps have since moved on to greener pastures, e.g. using Vite as the underlying tooling or just using a framework like Next.js, but it still worked well enough for me to be happy to get started quickly.

The app is very basic, makes use of a couple of Material Design components as provided by MUI, uses TypeScript and has ESLint + Prettier integration. The only other 3rd party inclusion is the use-debounce library as it provides a simple hook allowing to... well, debounce any action on an input.

## usage

install the packages with your favorite package manager (or npm ci to use the provided package-lock.json) and either serve the app directly with

```
npm run start
```

or build a bundle with

```
npm run build
```

and serve the static files with a web server of your choice.

Please note that since this app is only meant for local use, the backend url is statically set to **localhost:3100**, matching the default of dmh-ipapi-backend.

## one more thing

please hire me <3

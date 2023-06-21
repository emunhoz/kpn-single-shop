// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@packages/ui'],
  devtools: { enabled: true },
  css: ['@/layouts/global.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'KPN single shop',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    },
  },
})

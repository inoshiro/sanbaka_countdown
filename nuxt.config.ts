// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

    app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ""},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+1+Code:wght@100..700&display=swap' }
      ]
    }
  }
})

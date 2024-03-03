const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    
  },
  env:{
		baseUrl: 'https://pushing-it.vercel.app/',
    baseUrlApi: 'https://pushing-it.onrender.com/api/',
    token: '',
    username:'pushingit',
    password:'123456!',
    productPage:'https://pushing-it.onrender.com/api/products'

	}
});

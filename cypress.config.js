const { defineConfig } = require("cypress");
const {Client} = require ('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task",{
        async connectDB(query){
          const client = new Client({
            user: "pushingit",
            password:"E6gcqTtuRGliO02Wg3Gs8fqyQNK1fLjE",
            host: "dpg-cngrs0da73kc73c91170-a.oregon-postgres.render.com",
            database:"pushingit_j4z6",
            ssl: true,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    
  },
  env:{
		baseUrl: 'https://pushing-it.vercel.app/',
    baseUrlApi: 'https://pushing-it.onrender.com/api',
    token: '',
    username:'pushingit',
    password:'123456!',
    productPage:'https://pushing-it.onrender.com/api/products'

	}
});

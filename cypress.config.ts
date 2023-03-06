import { defineConfig } from "cypress"
import { CreateAndStartServer } from "./src/server"
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:run", async () => {
        // Start socket server
        console.log("Starting socket server");
        await CreateAndStartServer("3000");
      })
    },
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: ".report",
      reportFilename: 'index.html',
      toConsole: true,
    },

  },

});

import { defineConfig } from "cypress"
import { CreateAndStartServer } from "./src/server"

export default defineConfig({
  watchForFileChanges: true,
  e2e: {
    video: false,
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

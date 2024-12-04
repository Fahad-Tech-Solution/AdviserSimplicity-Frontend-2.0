// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

// For stop auto referesh 
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false, // Disable auto running tests when files change
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      include: [
        "**/*.node.test.{js,jsx,ts,tsx}",
        "**/Mock.test.{js,jsx,ts,tsx}",
        "**/Order.test.{js,jsx,ts,tsx}",
      ],
      name: "happy-dom",
      environment: "happy-dom",
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
      },
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/*.browser.test.{js,jsx,ts,tsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",  // you can use chromium or webkit here too
        coverage: {
        reporter: ["text", "json", "html"],
        },
      },
    },
  },
]);

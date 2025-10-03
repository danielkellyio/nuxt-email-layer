import type { Resolver } from "@nuxt/kit";
import type { Nuxt } from "nuxt/schema";
import { spawn, type ChildProcess } from "node:child_process";

const DEVTOOLS_UI_ROUTE = "/";
const DEVTOOLS_UI_LOCAL_PORT = 3030;

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  startDevtoolsServer(nuxt, resolver);

  nuxt.hook("devtools:customTabs", (tabs) => {
    tabs.push({
      // unique identifier
      name: "email-devtools",
      // title to display in the tab
      title: "Email",
      // any icon from Iconify, or a URL to an image
      icon: "mdi:email",
      // iframe view
      view: {
        type: "iframe",
        src: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}`,
      },
    });
  });
}

/**
 * Start the mail devtools as a new nuxt app running in a separate process
 * Parallel to the main server
 *
 * @param nuxt
 * @param resolver
 */
function startDevtoolsServer(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve("./devtools-client");

  let mainServerPort: number | undefined;
  let devtoolsProcess: ChildProcess | undefined;

  // Hook into when the main server starts listening to get the actual port
  nuxt.hook("listen", (server, { address }) => {
    mainServerPort = address.port;

    // Start the devtools client with the main server port as an environment variable
    if (!devtoolsProcess) startDevtoolsProcess();
  });

  function startDevtoolsProcess() {
    if (!mainServerPort) throw new Error("Main server port not found");
    devtoolsProcess = spawn(
      "npx",
      ["nuxi", "dev", "--port", DEVTOOLS_UI_LOCAL_PORT.toString()],
      {
        cwd: clientPath,
        stdio: "ignore",
        env: {
          ...process.env,
          MAIN_SERVER_PORT: mainServerPort.toString(),
        },
      }
    );
  }

  // If server is already listening start immediately
  if (mainServerPort && !devtoolsProcess) startDevtoolsProcess();

  function killDevtoolsProcess() {
    if (devtoolsProcess && !devtoolsProcess.killed) {
      devtoolsProcess.kill("SIGTERM");
    }
  }

  process.on("exit", killDevtoolsProcess);
  process.on("SIGINT", killDevtoolsProcess);
  process.on("SIGTERM", killDevtoolsProcess);
}

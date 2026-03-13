const { spawn } = require("child_process");

const runSmoke = process.argv.includes("--smoke");
const isWindows = process.platform === "win32";
const children = [];

function npmCommand() {
  return isWindows ? "npm.cmd" : "npm";
}

function npmSpawnConfig(args) {
  if (isWindows) {
    return {
      command: "cmd.exe",
      finalArgs: ["/d", "/s", "/c", `npm ${args.join(" ")}`],
    };
  }

  return {
    command: npmCommand(),
    finalArgs: args,
  };
}

function spawnNamed(name, args) {
  const { command, finalArgs } = npmSpawnConfig(args);

  const child = spawn(command, finalArgs, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: false,
  });

  children.push({ name, proc: child });

  child.stdout.on("data", (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  child.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`);
  });

  child.on("error", (err) => {
    console.error(`[${name}] failed to start: ${err.message}`);
  });

  return child;
}

function killProcessTree(pid) {
  if (!pid) {
    return Promise.resolve();
  }

  if (isWindows) {
    return new Promise((resolve) => {
      const killer = spawn("taskkill", ["/pid", String(pid), "/T", "/F"], {
        stdio: "ignore",
        shell: false,
      });
      killer.on("exit", () => resolve());
      killer.on("error", () => resolve());
    });
  }

  return new Promise((resolve) => {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      // Ignore failures during shutdown.
    }
    resolve();
  });
}

async function shutdown() {
  await Promise.all(children.map(({ proc }) => killProcessTree(proc.pid)));
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("Starting full dev stack...");
console.log("- API: npm start");
console.log("- Web: npm run dev");
if (runSmoke) {
  console.log("- Smoke: npm run smoke:api (after startup delay)");
}

spawnNamed("api", ["run", "start"]);
spawnNamed("web", ["run", "dev"]);

if (runSmoke) {
  setTimeout(() => {
    const smoke = spawnNamed("smoke", ["run", "smoke:api"]);
    smoke.on("exit", (code) => {
      if (code === 0) {
        console.log("[smoke] PASS");
      } else {
        console.log("[smoke] FAIL");
      }
    });
  }, 8000);
}

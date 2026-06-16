import { spawnSync } from "node:child_process";
import { existsSync, rmSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const env = {
  ...process.env,
  NEXT_PUBLIC_STATIC_EXPORT: "true",
  NEXT_PUBLIC_BASE_PATH: "/replica"
};

function run(command, args) {
  const result = spawnSync(command, args, {
    env,
    shell: process.platform === "win32",
    stdio: "inherit"
  });

  if (result.status !== 0) {
    const error = new Error(`${command} ${args.join(" ")} failed`);
    error.exitCode = result.status ?? 1;
    throw error;
  }
}

const apiDir = join(process.cwd(), "app", "api");
const disabledApiDir = join(process.cwd(), ".static-export-api");
const nextDir = join(process.cwd(), ".next");
const outDir = join(process.cwd(), "out");

if (existsSync(disabledApiDir)) {
  rmSync(disabledApiDir, { recursive: true, force: true });
}

try {
  if (existsSync(apiDir)) {
    renameSync(apiDir, disabledApiDir);
  }

  rmSync(nextDir, { recursive: true, force: true });
  rmSync(outDir, { recursive: true, force: true });

  run("npx", ["prisma", "generate"]);
  run("npx", ["next", "build"]);

  if (existsSync(outDir)) {
    writeFileSync(join(outDir, ".nojekyll"), "");
  }
} catch (error) {
  process.exitCode = error.exitCode ?? 1;
  console.error(error.message);
} finally {
  if (existsSync(disabledApiDir) && !existsSync(apiDir)) {
    renameSync(disabledApiDir, apiDir);
  }
}

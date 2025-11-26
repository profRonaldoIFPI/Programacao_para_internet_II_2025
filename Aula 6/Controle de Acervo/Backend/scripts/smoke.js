import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import "dotenv/config";

const logDir = path.resolve("logs");
const logFile = path.join(logDir, "test.log");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const appendLog = (message) => {
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(line);
  fs.appendFileSync(logFile, line + "\n");
};

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

const tests = [
  {
    name: "Swagger docs responde",
    path: "/docs",
    expectStatus: 200,
  },
  {
    name: "Listar usuarios exige token",
    path: "/user/listarUsuarios",
    expectStatus: 400,
  },
  {
    name: "Rota inexistente retorna 404",
    path: "/__not_found__",
    expectStatus: 404,
  },
];

const runTest = async (test) => {
  const url = `${baseUrl}${test.path}`;
  const start = Date.now();
  try {
    const response = await fetch(url, { method: test.method || "GET" });
    const duration = Date.now() - start;
    const ok = response.status === test.expectStatus;
    const statusMsg = `status ${response.status} (esperado ${test.expectStatus})`;
    appendLog(`${ok ? "OK" : "FAIL"} - ${test.name} - ${statusMsg} - ${duration}ms`);
    return ok;
  } catch (error) {
    const duration = Date.now() - start;
    appendLog(`ERROR - ${test.name} - ${error.message} - ${duration}ms`);
    return false;
  }
};

const run = async () => {
  appendLog(`Iniciando smoke tests contra ${baseUrl}`);
  let allOk = true;
  for (const test of tests) {
    const ok = await runTest(test);
    if (!ok) allOk = false;
  }
  appendLog(allOk ? "Smoke tests finalizados com sucesso." : "Smoke tests finalizados com falhas.");
  process.exit(allOk ? 0 : 1);
};

run();

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import "dotenv/config";

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const logDir = path.resolve("logs");
const logFile = path.join(logDir, `integration-${stamp}.log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const appendLog = (message) => {
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(line);
  fs.appendFileSync(logFile, `${line}\n`);
};

const maskSecrets = (value) => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return value;
  return JSON.parse(
    JSON.stringify(value, (key, val) => {
      if (key === "password") return "***";
      if (key === "token" && typeof val === "string") return `${val.slice(0, 10)}...`;
      return val;
    })
  );
};

const serialize = (value) => {
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(maskSecrets(value));
  } catch (error) {
    return `Erro ao serializar: ${error.message}`;
  }
};

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
const results = [];
let allOk = true;

const request = async ({ name, method = "GET", path: route, body, token, expectStatus }) => {
  const url = `${baseUrl}${route}`;
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const started = Date.now();
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const raw = await response.text();
    let parsed = raw;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch (_) {
      parsed = raw;
    }
    const duration = Date.now() - started;
    const ok = expectStatus ? response.status === expectStatus : response.ok;
    allOk = allOk && ok;
    const statusMsg = `status ${response.status}${expectStatus ? ` (esperado ${expectStatus})` : ""}`;
    appendLog(
      `${ok ? "OK" : "FAIL"} - ${name} - ${method} ${route} - ${statusMsg} - ${duration}ms - body=${serialize(parsed)}`
    );
    results.push({ name, ok, status: response.status });
    return { ok, status: response.status, body: parsed };
  } catch (error) {
    const duration = Date.now() - started;
    allOk = false;
    appendLog(`ERROR - ${name} - ${method} ${route} - ${error.message} - ${duration}ms`);
    results.push({ name, ok: false, status: 0, error: error.message });
    return { ok: false, error };
  }
};

const finish = () => {
  const success = results.filter((r) => r.ok).length;
  appendLog(`Resumo: ${success}/${results.length} passos bem sucedidos.`);
  appendLog(allOk ? "Testes finalizados com sucesso." : "Testes finalizados com falhas.");
  process.exit(allOk ? 0 : 1);
};

const run = async () => {
  appendLog(`Iniciando testes de integracao em ${baseUrl}. Log salvo em ${logFile}`);
  const suffix = Date.now().toString();
  const cpf = suffix.padStart(11, "0").slice(-11);
  const adminUser = {
    name: `Admin Test ${suffix}`,
    email: `admin.${suffix}@example.com`,
    password: `Pwd-${suffix}`,
    isAdmin: true,
  };

  const createdUser = await request({
    name: "Criar usuario admin de teste",
    method: "POST",
    path: "/user/cadastro",
    body: adminUser,
    expectStatus: 201,
  });
  if (!createdUser.ok) return finish();

  const login = await request({
    name: "Login admin de teste",
    method: "POST",
    path: "/user/login",
    body: { email: adminUser.email, password: adminUser.password },
    expectStatus: 200,
  });
  const token = login.body?.token;
  if (!login.ok || !token) {
    appendLog("Token nao retornado. Encerrando execucao dos testes.");
    return finish();
  }

  await request({
    name: "Listar usuarios autenticado",
    method: "GET",
    path: "/user/listarUsuarios",
    token,
    expectStatus: 200,
  });

  const collectionPayload = {
    name: `Colecao de teste ${suffix}`,
    description: "Colecao criada pelo script de integracao.",
    type: "demo",
    value: 123.45,
  };
  const collection = await request({
    name: "Criar colecao",
    method: "POST",
    path: "/collections",
    body: collectionPayload,
    token,
    expectStatus: 201,
  });
  const collectionId = collection.body?.collection?.id;
  if (!collection.ok || !collectionId) {
    appendLog("Colecao nao criada. Encerrando execucao dos testes.");
    return finish();
  }

  const object = await request({
    name: "Criar objeto na colecao",
    method: "POST",
    path: "/objects",
    body: {
      description: "Objeto de teste automatizado",
      type: "sample",
      value: 42.5,
      collectionId,
    },
    token,
    expectStatus: 201,
  });
  const objectId = object.body?.object?.id;
  if (!object.ok || !objectId) {
    appendLog("Objeto nao criado. Encerrando execucao dos testes.");
    return finish();
  }

  const person = await request({
    name: "Criar pessoa",
    method: "POST",
    path: "/people",
    body: {
      name: "Pessoa Teste",
      phone: "11999990000",
      email: `pessoa.${suffix}@example.com`,
      cpf,
    },
    token,
    expectStatus: 201,
  });
  const personId = person.body?.person?.id;
  if (!person.ok || !personId) {
    appendLog("Pessoa nao criada. Encerrando execucao dos testes.");
    return finish();
  }

  const today = new Date();
  const sevenDays = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  await request({
    name: "Criar emprestimo",
    method: "POST",
    path: "/loans",
    body: {
      loanDate: today.toISOString().slice(0, 10),
      repaymentDate: sevenDays.toISOString().slice(0, 10),
      personId,
      objectId,
      notes: "Emprestimo criado pelo script de integracao.",
    },
    token,
    expectStatus: 201,
  });

  await request({
    name: "Listar emprestimos",
    method: "GET",
    path: "/loans",
    token,
    expectStatus: 200,
  });

  await request({
    name: "Listar objetos",
    method: "GET",
    path: "/objects",
    token,
    expectStatus: 200,
  });

  finish();
};

run();

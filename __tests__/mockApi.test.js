import api, { ApiError } from "../src/services/mockApi";

jest.useFakeTimers();

// Resolve a promessa avançando os timers simulados de latência
async function rodar(promessa) {
  const p = promessa.catch((e) => e);
  await jest.runAllTimersAsync();
  return p;
}

beforeEach(() => {
  api.setCenario({ erroLeitura: false, listaVazia: false, falhaEscrita: false });
});

describe("login", () => {
  test("credencial válida devolve o supervisor", async () => {
    const u = await rodar(api.login("marcos.andrade@motiva.com.br", "grovia123"));
    expect(u.primeiro_nome).toBe("Marcos");
  });
  test("e-mail ignora maiúsculas e espaços nas pontas", async () => {
    const u = await rodar(api.login("  Marcos.Andrade@Motiva.com.br ", "grovia123"));
    expect(u.primeiro_nome).toBe("Marcos");
  });
  test("e-mail em formato inválido falha com EMAIL_INVALIDO", async () => {
    const e = await rodar(api.login("marcos", "grovia123"));
    expect(e.codigo).toBe("EMAIL_INVALIDO");
  });
  test("senha errada falha com CREDENCIAL_INVALIDA", async () => {
    const e = await rodar(api.login("marcos.andrade@motiva.com.br", "errada"));
    expect(e).toBeInstanceOf(ApiError);
    expect(e.codigo).toBe("CREDENCIAL_INVALIDA");
  });
  test("campos vazios falham com CAMPOS_OBRIGATORIOS", async () => {
    const e = await rodar(api.login("", ""));
    expect(e.codigo).toBe("CAMPOS_OBRIGATORIOS");
  });
});

describe("leitura", () => {
  test("cenário de sucesso traz a base completa", async () => {
    const d = await rodar(api.carregarTudo());
    expect(d.trechos).toHaveLength(10);
    expect(d.ordens).toHaveLength(4);
    expect(d.equipes).toHaveLength(4);
    expect(d.notificacoes).toHaveLength(6);
  });
  test("erro de rede rejeita com ERRO_REDE", async () => {
    api.setCenario({ erroLeitura: true });
    const e = await rodar(api.carregarTudo());
    expect(e.codigo).toBe("ERRO_REDE");
  });
  test("base vazia devolve listas vazias", async () => {
    api.setCenario({ listaVazia: true });
    const d = await rodar(api.carregarTudo());
    expect(d.trechos).toEqual([]);
    expect(d.ordens).toEqual([]);
  });
  test("a leitura devolve cópia: mutar o resultado não altera o seed", async () => {
    const a = await rodar(api.listarTrechos());
    a[0].status = "ok";
    const b = await rodar(api.listarTrechos());
    expect(b[0].status).toBe("critico");
  });
});

describe("escrita", () => {
  const trecho = { id: "t001", km_inicio: 78, km_fim: 79, altura_vegetacao_cm: 142, coordenadas: { lat: 1, lng: 2 } };

  test("abrirOrdem gera o próximo código sequencial", async () => {
    const o = await rodar(
      api.abrirOrdem({
        trecho,
        equipeId: "e002",
        prioridade: "alta",
        descricao: "",
        ordensAtuais: [{ codigo: "OS-2026-0148" }, { codigo: "OS-2026-0147" }],
      })
    );
    expect(o.codigo).toBe("OS-2026-0149");
    expect(o.status).toBe("aberta");
  });

  test("falha de escrita rejeita com ERRO_ESCRITA", async () => {
    api.setCenario({ falhaEscrita: true });
    const e = await rodar(
      api.abrirOrdem({ trecho, equipeId: "e002", prioridade: "alta", ordensAtuais: [] })
    );
    expect(e.codigo).toBe("ERRO_ESCRITA");
  });

  test("concluir uma ordem preenche a data de conclusão", async () => {
    const o = await rodar(api.atualizarStatusOrdem({ id: "o1", status: "em_andamento", conclusao: null }, "concluida"));
    expect(o.status).toBe("concluida");
    expect(o.conclusao).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("inspeção grava a altura numérica e usa vírgula no texto padrão", async () => {
    const e = await rodar(api.registrarInspecao({ trecho, status: "atencao", altura: 85.5, observacao: "" }));
    expect(e.altura_vegetacao_cm).toBe(85.5);
    expect(e.obs).toContain("85,5 cm");
  });

  test("inspeção sem altura mantém a medida anterior do trecho", async () => {
    const e = await rodar(api.registrarInspecao({ trecho, status: "ok", altura: null, observacao: "ok" }));
    expect(e.altura_vegetacao_cm).toBe(142);
  });
});

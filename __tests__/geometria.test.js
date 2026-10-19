import { montarGeometria, LARGURA } from "../src/utils/geometria";
import { trechos } from "../src/data/mockData";

describe("montarGeometria", () => {
  const g = montarGeometria(trechos);

  test("projeta todos os trechos dentro da área do mapa", () => {
    expect(g.pontos).toHaveLength(trechos.length);
    g.pontos.forEach((p) => {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(LARGURA);
      expect(p.y).toBeGreaterThan(0);
      expect(p.y).toBeLessThan(g.altura);
    });
  });

  test("agrupa por rodovia e ordena por km", () => {
    const nomes = g.rodovias.map((r) => r.nome).sort();
    expect(nomes).toEqual(["SP-280", "SP-300"]);
    g.rodovias.forEach((r) => {
      const kms = r.pontos.map((p) => p.trecho.km_inicio);
      expect(kms).toEqual([...kms].sort((a, b) => a - b));
    });
  });

  test("oeste fica à esquerda e norte fica acima", () => {
    const porId = Object.fromEntries(g.pontos.map((p) => [p.trecho.id, p]));
    // t003 (lng -47.88) está a oeste de t007 (lng -46.74)
    expect(porId.t003.x).toBeLessThan(porId.t007.x);
    // t010 (lat -22.99) está ao norte de t007 (lat -23.58)
    expect(porId.t010.y).toBeLessThan(porId.t007.y);
  });

  test("lista vazia não quebra", () => {
    expect(montarGeometria([])).toEqual({ pontos: [], rodovias: [], altura: 120 });
  });

  test("um único trecho não gera NaN", () => {
    const um = montarGeometria([trechos[0]]);
    expect(Number.isFinite(um.pontos[0].x)).toBe(true);
    expect(Number.isFinite(um.pontos[0].y)).toBe(true);
  });

  test("trecho sem coordenada é ignorado", () => {
    const g2 = montarGeometria([...trechos, { ...trechos[0], id: "x", coordenadas: null }]);
    expect(g2.pontos).toHaveLength(trechos.length);
  });
});

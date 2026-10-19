// ============================================================
// geometria.js — Projeção dos trechos para o mapa vetorial
// Módulo puro (sem React), coberto por testes em __tests__/.
// ============================================================

export const LARGURA = 760; // maior que a tela: o usuário rola na horizontal e os alvos ficam grandes
const MARGEM_X = 46;
const MARGEM_Y = 44;

/** Projeta lat/lng em x/y preservando proporção (correção por cos da latitude). */
export function montarGeometria(trechos) {
  const validos = trechos.filter((t) => t.coordenadas);
  if (validos.length === 0) return { pontos: [], rodovias: [], altura: 120 };

  const lats = validos.map((t) => t.coordenadas.lat);
  const lngs = validos.map((t) => t.coordenadas.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latMedia = ((minLat + maxLat) / 2) * (Math.PI / 180);

  // evita divisão por zero quando só há um ponto ou pontos alinhados
  const spanX = Math.max((maxLng - minLng) * Math.cos(latMedia), 0.05);
  const spanY = Math.max(maxLat - minLat, 0.05);

  const areaX = LARGURA - MARGEM_X * 2;
  const escala = areaX / spanX;
  const areaY = Math.min(Math.max(spanY * escala, 90), 230);
  const escalaY = areaY / spanY;
  const altura = areaY + MARGEM_Y * 2;

  const projetar = (t) => ({
    trecho: t,
    x: MARGEM_X + (t.coordenadas.lng - minLng) * Math.cos(latMedia) * escala,
    y: MARGEM_Y + (maxLat - t.coordenadas.lat) * escalaY,
  });

  const pontos = validos.map(projetar);
  const porRodovia = {};
  pontos.forEach((p) => {
    (porRodovia[p.trecho.rodovia] = porRodovia[p.trecho.rodovia] || []).push(p);
  });
  const rodovias = Object.entries(porRodovia).map(([nome, lista]) => ({
    nome,
    pontos: [...lista].sort((a, b) => a.trecho.km_inicio - b.trecho.km_inicio),
  }));

  return { pontos, rodovias, altura };
}

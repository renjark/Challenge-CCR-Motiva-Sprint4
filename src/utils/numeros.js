// ============================================================
// numeros.js — Conversão de números digitados pelo usuário
// ------------------------------------------------------------
// Corrige CT-6.4 (Sprint 3): o campo de altura não aceitava
// vírgula como separador decimal. No Brasil o teclado numérico
// entrega "85,5", e Number("85,5") é NaN.
// ============================================================

/**
 * Converte texto digitado em número.
 * Aceita "85", "85,5", "85.5" e espaços nas pontas.
 * Devolve null para vazio e NaN para texto inválido.
 */
export function lerDecimal(texto) {
  if (texto === null || texto === undefined) return null;
  const limpo = String(texto).trim().replace(",", ".");
  if (limpo === "") return null;
  // Rejeita "8,5,3", "1e3", "abc", "--5": só dígitos com um separador
  if (!/^\d+(\.\d+)?$/.test(limpo)) return NaN;
  return Number(limpo);
}

/** Mostra um número no padrão brasileiro: 85.5 -> "85,5". */
export function formatarDecimal(valor, casas = 1) {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return "—";
  return Number(valor).toFixed(casas).replace(".", ",").replace(/,0+$/, "");
}

/**
 * Valida a altura da vegetação em centímetros.
 * Devolve { valor, erro }. Campo vazio é permitido (valor null).
 */
export function validarAltura(texto) {
  const n = lerDecimal(texto);
  if (n === null) return { valor: null, erro: null };
  if (Number.isNaN(n)) {
    return {
      valor: null,
      erro: "Use apenas números, com vírgula ou ponto para decimais. Ex.: 85,5",
    };
  }
  if (n > 500) {
    return { valor: null, erro: "Altura acima de 500 cm. Confira o valor medido." };
  }
  return { valor: Math.round(n * 10) / 10, erro: null };
}

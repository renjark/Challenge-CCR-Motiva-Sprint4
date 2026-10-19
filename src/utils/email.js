// ============================================================
// email.js — Validação simples do e-mail de acesso
// ============================================================

/** Normaliza para comparação: sem espaços nas pontas e em minúsculas. */
export function normalizarEmail(texto) {
  return String(texto ?? "").trim().toLowerCase();
}

/** Formato básico: algo@dominio.ext, sem espaços. */
export function emailValido(texto) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizarEmail(texto));
}

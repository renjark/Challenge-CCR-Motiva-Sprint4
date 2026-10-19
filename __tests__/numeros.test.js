import { lerDecimal, validarAltura, formatarDecimal } from "../src/utils/numeros";

describe("lerDecimal (CT-6.4)", () => {
  test.each([
    ["85", 85],
    ["85,5", 85.5],
    ["85.5", 85.5],
    ["  12,25 ", 12.25],
    ["0", 0],
  ])("aceita %p", (entrada, esperado) => {
    expect(lerDecimal(entrada)).toBe(esperado);
  });

  test("campo vazio devolve null", () => {
    expect(lerDecimal("")).toBeNull();
    expect(lerDecimal("   ")).toBeNull();
    expect(lerDecimal(null)).toBeNull();
    expect(lerDecimal(undefined)).toBeNull();
  });

  test.each(["abc", "8,5,3", "1e3", "-5", "--5", "8,", ",5", "1 000"])(
    "rejeita %p",
    (entrada) => {
      expect(lerDecimal(entrada)).toBeNaN();
    }
  );
});

describe("validarAltura", () => {
  test("vírgula é aceita e arredondada a 1 casa", () => {
    expect(validarAltura("85,55")).toEqual({ valor: 85.6, erro: null });
  });
  test("vazio é permitido", () => {
    expect(validarAltura("")).toEqual({ valor: null, erro: null });
  });
  test("texto inválido explica o formato", () => {
    const r = validarAltura("alta");
    expect(r.valor).toBeNull();
    expect(r.erro).toMatch(/vírgula/);
  });
  test("valor absurdo é barrado", () => {
    expect(validarAltura("900").erro).toMatch(/500/);
  });
});

describe("formatarDecimal", () => {
  test("usa vírgula e remove zeros à direita", () => {
    expect(formatarDecimal(85.5)).toBe("85,5");
    expect(formatarDecimal(85)).toBe("85");
    expect(formatarDecimal(null)).toBe("—");
  });
});

import { emailValido, normalizarEmail } from "../src/utils/email";

describe("email", () => {
  test.each(["marcos.andrade@motiva.com.br", "a@b.co", "  NOME@Motiva.com.br "])("aceita %p", (e) => {
    expect(emailValido(e)).toBe(true);
  });
  test.each(["", "marcos", "marcos@", "@motiva.com", "marcos@motiva", "ma rcos@motiva.com", null])(
    "rejeita %p",
    (e) => {
      expect(emailValido(e)).toBe(false);
    }
  );
  test("normaliza espaços e maiúsculas", () => {
    expect(normalizarEmail("  A@B.com ")).toBe("a@b.com");
  });
});

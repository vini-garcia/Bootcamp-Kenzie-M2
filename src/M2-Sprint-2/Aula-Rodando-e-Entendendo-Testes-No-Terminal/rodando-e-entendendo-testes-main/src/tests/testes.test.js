import { invertValues } from "../scripts/index.js";

describe("testando função 'invertValues'", () => {
  test("testando em um array numérico [1, 2, 3, 4, 5, 6], esperando que todos os valores numéricos se invertam e retorne [-1, -2, -3, -4, -5, -6]", () => {
    expect(invertValues([1, 2, 3, 4, 5, 6])).toStrictEqual([
      -1, -2, -3, -4, -5, -6,
    ]);
  });

  test("testando em um array numérico [-1, 2, -3, 4, 5, -6] esperando que todos os valores numéricos se invertam e retorne [1, -2, 3, -4, -5, 6]", () =>  {
    expect(invertValues([-1, 2, -3, 4, 5, -6])).toStrictEqual([1, -2, 3, -4, -5, 6])
  });

  test("testando em um array de strings ['Rafael', 'churros', 'M2'] esperando que todos os valores numéricos se invertam e retorne ['Rafael', 'churros', 'M2']", () => {
    expect(invertValues(['Rafael', 'churros', 'M2'])).toStrictEqual(['Rafael', 'churros', 'M2'])
  })

  test("testando em um array misto de strings e números [1, 'Rafael', -2, 'churros', -3, 'M2', 4], esperando que todos os valores numéricos se invertam e retorne [-1, 'Rafael', 2, 'churros', 3, 'M2', -4]", () => {
    expect(invertValues([1, 'Rafael', -2, 'churros', -3, 'M2', 4])).toStrictEqual([-1, 'Rafael', 2, 'churros', 3, 'M2', -4])
  })
});

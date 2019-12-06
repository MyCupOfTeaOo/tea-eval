import "jest";
import { createFunc } from "../src";

describe("utils", () => {
  it("createFunction: noParams", () => {
    const func = createFunc(
      `
    return 1
    `,
      []
    );
    expect(func()).toBe(1);
  });
  it("createFunction: hasParams", () => {
    const func = createFunc(
      `
    return a
    `,
      ["a"]
    );
    expect(func("test")).toBe("test");
  });
  it("createFunction: context", () => {
    const func = createFunc(
      `
    return this.test
    `,
      [],
      { test: 1 }
    );
    expect(func()).toBe(1);
  });
  it("createFunction: global", () => {
    const func = createFunc(
      `
    return ttttt
    `,
      [],
      { ttttt: 1 }
    );
    expect(func).toThrow();
  });
  it("createFunction: errorContext", () => {
    const func = createFunc(
      `
    return this.test.ttt
    `,
      []
    );
    expect(func).toThrow();
  });
  it("createFunction: errorFunc", () => {
    expect(() =>
      createFunc(
        `
    aaaa%t32532532sfaslhfgbkj123215r./,./fs.f
    `,
        []
      )
    ).toThrow();
  });
});

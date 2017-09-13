describe("Tests", () => {
  beforeEach(done => {
    done();
  });

  it("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
    expect(1 + 2).not.toBe(2);
  });

  it("asynchronise 1 + 1 = 2", done => {
    const add = (a, b) =>
      new Promise((rs, rj) => {
        rs({
          result: a + b
        })
      });
    
    add(1, 1).then(result => {
      expect(result).toEqual(jasmine.any(Object));
      expect(result).toEqual({ result: 2 });
      done();
    })
  });

  afterEach(done => {
    done();
  });
})


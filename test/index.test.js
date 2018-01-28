import dot from "../lib"

test("get", () => {
  expect(
    dot.get(
      { foo: { bar: { buzz: "unicorn" } } },
      "foo.bar.buzz"
    )
  ).toBe("unicorn")

  expect(
    dot.get({ fooBar: { buzz: "unicorn" } }, "foo.bar.buzz")
  ).toBe("unicorn")

  expect(
    dot.get({ fooBarBuzz: "unicorn" }, "foo.bar.buzz")
  ).toBe("unicorn")
})

test("set", () => {
  expect(
    dot.set({ foo: { bar: "a" } }, "foo.bar", "b")
  ).toEqual({ foo: { bar: "b" } })

  expect(dot.set({ foo: {} }, "foo.bar", "b")).toEqual({
    foo: { bar: "b" },
  })

  expect(dot.set({ fooBar: "a" }, "foo.bar", "b")).toEqual({
    fooBar: "b",
  })
})

test("delete", () => {
  expect(
    dot.delete({ foo: { bar: "a" } }, "foo.bar")
  ).toEqual({ foo: {} })

  expect(dot.delete({ fooBar: "a" }, "foo.bar")).toEqual({})
})

test("toggle", () => {
  expect(
    dot.toggle({ foo: { bar: true } }, "foo.bar")
  ).toEqual({ foo: { bar: false } })

  expect(dot.toggle({ fooBar: true }, "foo.bar")).toEqual({
    fooBar: false,
  })
})

test("merge", () => {
  expect(
    dot.merge({ foo: { bar: { bang: "a" } } }, "foo.bar", {
      buzz: "b",
    })
  ).toEqual({ foo: { bar: { bang: "a", buzz: "b" } } })

  expect(
    dot.merge({ fooBar: { bang: "a" } }, "foo.bar", {
      buzz: "b",
    })
  ).toEqual({ fooBar: { bang: "a", buzz: "b" } })
})

import dot from "../dist"

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

  expect(
    dot.get({ foo: { barBuzz: "unicorn" } }, "foo.bar.buzz")
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

  expect(
    dot.set({ foo: { barBuzz: "a" } }, "foo.bar.buzz", "b")
  ).toEqual({
    foo: { barBuzz: "b" },
  })
})

test("delete", () => {
  expect(
    dot.delete({ foo: { bar: "a" } }, "foo.bar")
  ).toEqual({ foo: {} })

  expect(dot.delete({ fooBar: "a" }, "foo.bar")).toEqual({})

  expect(
    dot.delete({ foo: { barBuzz: "a" } }, "foo.bar.buzz")
  ).toEqual({ foo: {} })
})

test("toggle", () => {
  expect(
    dot.toggle({ foo: { bar: true } }, "foo.bar")
  ).toEqual({ foo: { bar: false } })

  expect(dot.toggle({ fooBar: true }, "foo.bar")).toEqual({
    fooBar: false,
  })

  expect(
    dot.toggle({ foo: { barBuzz: true } }, "foo.bar.buzz")
  ).toEqual({ foo: { barBuzz: false } })
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

  expect(
    dot.merge(
      { foo: { barBang: { buzz: "a" } } },
      "foo.bar.bang",
      {
        buzz: "b",
      }
    )
  ).toEqual({ foo: { barBang: { buzz: "b" } } })
})

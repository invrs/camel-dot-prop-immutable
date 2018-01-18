import dot from "../lib"

test("get", () => {
  expect(dot.get({foo: {bar: { buzz: 'unicorn'}}}, 'foo.bar.buzz'))
    .toBe("unicorn")

  expect(dot.get({fooBar: { buzz: 'unicorn'}}, 'foo.bar.buzz'))
    .toBe("unicorn")

  expect(dot.get({fooBarBuzz: 'unicorn'}, 'foo.bar.buzz'))
    .toBe("unicorn")
})

# camel-dot-prop-immutable

This extension to [dot-prop-immutable](/debitoor/dot-prop-immutable) allows `foo.bar` to match `{ foo: bar: 1 }` and `{ fooBar: 1 }`.

```js
import dot from "camel-dot-prop-immutable"

dot.get(
  { foo: { bar: { buzz: "unicorn" } } },
  "foo.bar.buzz"
)
//=> 'unicorn'

dot.get({ fooBar: { buzz: "unicorn" } }, "foo.bar.buzz")
//=> 'unicorn'

dot.get({ fooBarBuzz: "unicorn" }, "foo.bar.buzz")
//=> 'unicorn'
```

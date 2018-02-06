# camel-dot-prop-immutable

This extension to [dot-prop-immutable](/debitoor/dot-prop-immutable) allows `foo.bar.buzz` to match `{ foo: { barBuzz } }` and `{ fooBar: { buzz } }`.

```js
import dot from "camel-dot-prop-immutable"

dot.get(
  { foo: { bar: { buzz: "unicorn" } } },
  "foo.bar.buzz"
)
//=> 'unicorn'

dot.get({ fooBar: { buzz: "unicorn" } }, "foo.bar.buzz")
//=> 'unicorn'

dot.get({ foo: { barBuzz: "unicorn" } }, "foo.bar.buzz")
//=> 'unicorn'

dot.get({ fooBarBuzz: "unicorn" }, "foo.bar.buzz")
//=> 'unicorn'
```

## Restrictions

Only collapse from left or right. Middle collapses like this will not work:

```js
dot.get({ foo: { barBuzz: { bang: "unicorn" } }, "foo.bar.buzz.bang")
//=> 'unicorn'
```

But these do:

```js
dot.get({ fooBar: { buzz: { bang: "unicorn" } }, "foo.bar.buzz.bang")
//=> 'unicorn'

dot.get({ foo: { bar: { buzzBang: "unicorn" } }, "foo.bar.buzz.bang")
//=> 'unicorn'
```

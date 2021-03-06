A simplified version of deep-equal intended for comparing objects that are being
serialized to/from JSON that:

1.  Treats undefined as null as different
    (since they produce different JSON output)

2.  Treats a missing property and an undefined property as equal
    (since they produce the same JSON output)

3.  Only deals with POD for now since that's typically what you serialize and
    trying to deal other types like deep-equal does can lead to lots of unwanted
    dependencies.

    e.g. deep-equal has the following dependency chain:

        deep-equal -> is-regex -> has -> function-bind

    and function-bind does `eval()` (actually `Function(<string>)`) which causes
    problems for CSP.

Furthermore, this library is mostly tailored towards using browser APIs that are
commonly available. It uses Object.is which IE doesn't support but none of our
projects care about supporting IE.

In fact, if you're reading this, you probably shouldn't use it. It's basically
just trying to compare the result of `JSON.stringify()` on two objects but
allowing the order of keys to differ.

## Publishing

```
yarn release
git push --follow-tags origin master
yarn publish
yarn publish --registry https://npm.pkg.github.com
```

We need to publish to both NPM and GitHub because we're using the same scope,
`@birchill` in both places 🤦. (GitHub package registry doesn't seem to let you
change it from the org name and we were already using `@birchill` on npm.)

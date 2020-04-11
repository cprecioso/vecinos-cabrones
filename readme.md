1. Get dependencies

```sh
$ yarn
```

2. Start dev server

```sh
$ yarn next
```

3. Pull Requests will trigger a build and create a preview URL automatically

4. You can also export the static site doing

```sh
$ yarn next build && yarn next export
```

> ⚠️ To allow external linking, your static hosting should to rewrite/redirect requests to dynamic paths e.g. `/1x01/4583` to `/[chapter]/[scene].html?chapter=1x01&scene=4583`

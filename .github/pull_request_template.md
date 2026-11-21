## Summary

<!-- What changes and why. For data: which locations, places or screenshots. For code: a short tree, call
flow or diff sketch is clearer than prose. -->

## Evidence

<!-- Show it works. A screenshot from the PR preview (link posted on this PR) is best for anything visible.
For code, the test or command output before and after. -->

- **Before:**
- **After:**

## Merge Danger

**Door:** <!-- two-way (easy to revert) or one-way (hard to undo, e.g. renaming or moving files others link to) -->

**Blast Radius:** <!-- one word: data, map, embeds, build, ... -->

<!-- Files under public/ are linked from other sites. Moving or renaming one breaks those links. -->

## Checklist

- [ ] `pnpm build` passes (regenerates districts and validates the data)
- [ ] `pnpm lint`, `pnpm format:check` and `pnpm test` pass, if code changed
- [ ] New locations use map units, a unique `id` and a `kind` from `categories.json`
- [ ] Screenshots and pins are my own captures or drawings, as the [CLA](../CLA.md) requires

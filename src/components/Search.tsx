import { createMemo, createSignal, For, Show } from "solid-js";
import type { Item } from "../data";
import { useApp } from "../state";
import { SearchIcon } from "./icons";

const MAX_RESULTS = 30;

export function Search() {
  const app = useApp();
  const [query, setQuery] = createSignal("");
  const haystack = app.data.items.map((it) => ({
    it,
    text: `${it.name} ${it.type ?? ""} ${it.area ?? ""} ${app.data.catBy[it.kind].name}`.toLowerCase(),
  }));
  const hits = createMemo(() => {
    const q = query().trim().toLowerCase();
    return q.length < 2
      ? []
      : haystack
          .filter((h) => h.text.includes(q))
          .slice(0, MAX_RESULTS)
          .map((h) => h.it);
  });

  return (
    <>
      <div class="search">
        <SearchIcon />
        <input
          id="q"
          type="search"
          placeholder="Find a place, card or race"
          aria-label="Search the map"
          autocomplete="off"
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      <Show when={hits().length > 0}>
        <ul id="results">
          <For each={hits()}>{(it) => <SearchResult item={it} />}</For>
        </ul>
      </Show>
    </>
  );
}

function SearchResult(props: { item: Item }) {
  const app = useApp();
  return (
    <li>
      <button type="button" onClick={() => app.focus(props.item.id)}>
        <img src={app.map()?.itemIcon(props.item)} alt="" />
        <span>
          {props.item.name}
          <small>{props.item.type || app.data.catBy[props.item.kind].name}</small>
        </span>
      </button>
    </li>
  );
}

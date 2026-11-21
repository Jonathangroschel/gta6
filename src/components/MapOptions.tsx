import { For } from "solid-js";
import type { Style } from "../url";
import { useApp } from "../state";

const STYLES: { value: Style; label: string }[] = [
  { value: "night", label: "Night" },
  { value: "day", label: "Day" },
];

/** Base map switch plus the district and found toggles. */
export function MapOptions() {
  const app = useApp();
  return (
    <div class="bar">
      <div class="seg" role="radiogroup" aria-label="Base map">
        <For each={STYLES}>
          {(s) => (
            <label>
              <input
                type="radio"
                name="style"
                value={s.value}
                checked={app.style() === s.value}
                onChange={() => app.setStyle(s.value)}
              />{" "}
              {s.label}
            </label>
          )}
        </For>
      </div>
      <Chip label="Districts" checked={app.labels()} onChange={app.setLabels} />
      <Chip label="Hide found" checked={app.hideFound()} onChange={app.setHideFound} />
    </div>
  );
}

function Chip(props: { label: string; checked: boolean; onChange: (on: boolean) => void }) {
  return (
    <label class="chip">
      <input type="checkbox" checked={props.checked} onChange={(e) => props.onChange(e.currentTarget.checked)} />{" "}
      {props.label}
    </label>
  );
}

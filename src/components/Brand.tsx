import { useApp } from "../state";

export function Brand() {
  const app = useApp();
  return (
    <div class="brand">
      <div>
        <h1 class="wordmark">Leonida</h1>
        <p class="tagline">The open GTA 6 map</p>
      </div>
      <button class="icon-btn" type="button" aria-label="Hide panel" onClick={() => app.setPanelOpen(false)}>
        ×
      </button>
    </div>
  );
}

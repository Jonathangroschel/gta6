import { copy } from "../copy";
import { LICENSE_URL } from "../repo";
import { BASE, useApp } from "../state";

export function PanelFooter() {
  const app = useApp();
  return (
    <footer>
      <button class="btn primary" type="button" onClick={() => app.setEmbedOpen(true)}>
        Embed map
      </button>
      <button class="btn" type="button" onClick={(e) => void copy(`${BASE}?${app.link()}`, e.currentTarget)}>
        Copy link
      </button>
      <a href={LICENSE_URL} target="_blank" rel="noopener">
        CC BY 4.0
      </a>
    </footer>
  );
}

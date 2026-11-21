import "leaflet/dist/leaflet.css";
import "./styles.css";
import { render } from "@solidjs/web";
import { App } from "./App";
import { loadData } from "./data";

const root = document.getElementById("app")!;
try {
  const data = await loadData();
  render(() => <App data={data} />, root);
} catch (err) {
  root.innerHTML = `<p class="load-error">The map data didn't load (${String(err).replace(/</g, "&lt;")}). Reload the page to try again.</p>`;
  throw err;
}

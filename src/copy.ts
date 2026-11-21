/** Copies text and briefly relabels the button; falls back to a prompt where the clipboard is blocked. */
export async function copy(text: string, btn: HTMLElement) {
  try {
    await navigator.clipboard.writeText(text);
    const label = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = label;
    }, 1500);
  } catch {
    prompt("Copy this:", text);
  }
}

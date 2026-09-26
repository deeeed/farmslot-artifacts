// Start a Codex catalog read, then switch the picker to Claude before it answers.
// Reads the picker's loaded catalog afterwards; nothing is written into UI state.
const wizard = document.querySelector('dispatch-wizard');
const picker = wizard?.shadowRoot?.querySelector('runner-model-effort-picker');
if (!picker) throw new Error('runner model picker missing');
const byId = (id) => picker.shadowRoot?.querySelector(`[data-testid="${id}"]`);
byId('runner-option-codex')?.click();
await wizard.updateComplete;
await picker.updateComplete;
const toggle = byId('runner-model-catalog-toggle');
if (!toggle) throw new Error('catalog toggle missing');
if (picker.catalogOpen) {
  toggle.click();
  await picker.updateComplete;
}
toggle.click();
byId('runner-option-claude')?.click();
await new Promise((resolve) => setTimeout(resolve, 2000));
const loaded = picker.loadedCatalog;
return loaded && loaded.runner !== picker.runner
  ? `STALE_CATALOG ${loaded.runner} shown for ${picker.runner}`
  : `STALE_CATALOG_DROPPED runner=${picker.runner} loaded=${loaded?.runner ?? 'none'}`;

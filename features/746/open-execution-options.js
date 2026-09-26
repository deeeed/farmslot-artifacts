function find(root, selector) {
  const nodes = root.querySelectorAll ? [...root.querySelectorAll(selector)] : [];
  if (nodes[0]) return nodes[0];
  for (const el of root.querySelectorAll ? [...root.querySelectorAll('*')] : []) {
    if (el.shadowRoot) {
      const hit = find(el.shadowRoot, selector);
      if (hit) return hit;
    }
  }
  return null;
}

const details = find(document, '[data-testid="dispatch-execution-options"]');
if (!details) throw new Error('execution options missing');
if (!details.open) details.querySelector('summary').click();
return { open: details.open };

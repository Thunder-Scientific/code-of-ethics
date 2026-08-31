// Ordering lives here, not in the content files, so that the markdown
// stays frontmatter-free and volunteer editors never have to think about it.

// Rule pages are named for their rule ID (h5, h9, h10). A plain alphabetical
// sort would give h10, h5, h9 — so compare the numeric part numerically.
function ruleKey(id) {
  const base = id.split('/').pop();
  const m = base.match(/^([a-z]+)(\d+)$/i);
  return m ? [m[1].toLowerCase(), Number(m[2])] : [base.toLowerCase(), 0];
}

// about/ has no rule IDs, so its reading order is spelled out.
const ABOUT_ORDER = [
  'introduction',
  'general-information',
  'site-events',
  'combatant-status',
];

function sortItems(items, categoryLabel) {
  const docs = items.filter((i) => i.type === 'doc');
  const rest = items.filter((i) => i.type !== 'doc');

  if (categoryLabel === 'About') {
    docs.sort((a, b) => {
      const ia = ABOUT_ORDER.indexOf(a.id.split('/').pop());
      const ib = ABOUT_ORDER.indexOf(b.id.split('/').pop());
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  } else {
    docs.sort((a, b) => {
      const [pa, na] = ruleKey(a.id);
      const [pb, nb] = ruleKey(b.id);
      return pa === pb ? na - nb : pa.localeCompare(pb);
    });
  }

  for (const item of rest) {
    if (item.type === 'category') {
      item.items = sortItems(item.items, item.label);
    }
  }
  return [...docs, ...rest];
}

export {sortItems};

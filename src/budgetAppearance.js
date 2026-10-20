// Display-only aliases of public/designSystem.css; the verified source and vault stay intact.
export const BUDGET_APPEARANCE_CSS = `
:root[data-m3s-theme] {
  --bg:#f3f6fa; --surface:#ffffff; --sunk:#f8fafc;
  --ink:#172033; --muted:#52647a; --line:#d7e0eb;
  --accent:#1d4ed8; --accent-ink:#ffffff; --accent-soft:#eef6ff;
  --good:#047857; --good-soft:#ecfdf5; --warn:#a16207; --warn-soft:#fffbeb;
  --bad:#be123c; --bad-soft:#fff1f2; --rev:#047857; --dep:#be123c; --bar:#3b82f6;
  --sans:"Segoe UI",Inter,Arial,sans-serif;
  color-scheme:light;
}
:root[data-m3s-theme="standard"]:not([data-mode]),
:root[data-m3s-theme][data-mode="dark"] {
  --bg:#0b1424; --surface:#111e31; --sunk:#16263c;
  --ink:#f1f5f9; --muted:#b4c2d3; --line:#2c415d;
  --accent:#93c5fd; --accent-ink:#0b1424; --accent-soft:rgba(30,64,175,.22);
  --good:#6ee7b7; --good-soft:#102c26; --warn:#fcd34d; --warn-soft:#342d18;
  --bad:#fda4af; --bad-soft:#351d2a; --rev:#6ee7b7; --dep:#fda4af; --bar:#60a5fa;
  color-scheme:dark;
}
:root[data-m3s-theme="deep"]:not([data-mode]),
:root[data-m3s-theme][data-mode="deep"] {
  --bg:#0d0d0f; --surface:#171719; --sunk:#202024;
  --ink:#f4f4f5; --muted:#b8b8c0; --line:#343438;
  --accent:#93c5fd; --accent-ink:#0d0d0f; --accent-soft:rgba(59,130,246,.16);
  --good:#6ee7b7; --good-soft:#102c26; --warn:#fcd34d; --warn-soft:#342d18;
  --bad:#fda4af; --bad-soft:#351d2a; --rev:#6ee7b7; --dep:#fda4af; --bar:#60a5fa;
  color-scheme:dark;
}
body, button, input, select, textarea { letter-spacing:0; }
@media (max-width:400px) {
  .kpis.six { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .card .kpis { grid-template-columns:repeat(2,minmax(0,1fr)) !important; }
  .kpi .s { overflow-wrap:anywhere; }
}
`;

export const budgetHostTheme = theme => ['light', 'deep'].includes(theme) ? theme : 'standard';

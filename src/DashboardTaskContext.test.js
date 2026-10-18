import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardGovernanceViews from './DashboardGovernanceViews';

test.each([
  ['FR', 'Règle actuelle · 18.10.2026', /Une tâche opérationnelle relève d’un plan opérationnel/, /sans second registre/, 'Décision métier validée · 23.08.2026', /Chaque tâche porte un `phase_id` obligatoire/],
  ['DE', 'Aktuelle Regel · 18.10.2026', /Eine Betriebsaufgabe gehört zu einem Betriebsplan/, /ohne zweites Register/, 'Fachentscheidung validiert · 23.08.2026', /Jede Aufgabe besitzt eine verpflichtende `phase_id`/],
  ['EN', 'Current rule · 18 Oct 2026', /An operational task belongs to an operational plan/, /without a second register/, 'Business decision validated · 23 Aug 2026', /Each task has a required `phase_id`/]
])('keeps architecture complementary to execution and preserves the earlier decision in %s', (language, current, operation, shared, earlier, earlierBody) => {
  render(<DashboardGovernanceViews activeView="architecture" language={language} />);
  expect(screen.getByRole('heading', { name: current })).toBeInTheDocument();
  expect(screen.getByText(operation)).toBeInTheDocument();
  expect(screen.getByText(shared)).toBeInTheDocument();
  const historical = screen.getByText(earlierBody).closest('details');
  expect(historical).not.toHaveAttribute('open');
  fireEvent.click(screen.getByRole('heading', { name: earlier }).closest('summary'));
  expect(historical).toHaveAttribute('open');
  expect(screen.queryByRole('button', { name: /Nouvelle tâche|New task|Neue Aufgabe/ })).not.toBeInTheDocument();
});

test.each([
  ['FR', 'Exemples de résultats métier', ['Planification', 'Ressources humaines', 'IT & Support', 'Commercial & CRM', 'Production', 'Stock & Actifs', 'Finances'], /Opération métier → Résultat → Preuve/, /une écriture financière n’est qu’un résultat possible/i],
  ['DE', 'Beispiele fachlicher Ergebnisse', ['Planung', 'Personalwesen', 'IT & Support', 'Vertrieb & CRM', 'Produktion', 'Bestand & Anlagen', 'Finanzen'], /Fachlicher Vorgang → Ergebnis → Nachweis/, /Eine Finanzbuchung ist nur ein mögliches Ergebnis/],
  ['EN', 'Examples of business results', ['Planning', 'Human resources', 'IT & Support', 'Commercial & CRM', 'Production', 'Stock & Assets', 'Finance'], /Business operation → Result → Evidence/, /A financial entry is only one possible result/]
])('represents all seven business flow families without inventing transactions in %s', (language, title, domains, path, financialBoundary) => {
  const { container } = render(<DashboardGovernanceViews activeView="architecture" language={language} />);
  expect(screen.getByText(path)).toBeInTheDocument();
  expect(screen.getByText(financialBoundary)).toBeInTheDocument();
  const summary = screen.getByText(title);
  const disclosure = summary.closest('details');
  expect(disclosure).not.toHaveAttribute('open');
  fireEvent.click(summary);
  expect(disclosure).toHaveAttribute('open');
  const terms = Array.from(disclosure.querySelectorAll('dt')).map(el => el.textContent);
  expect(terms).toEqual(domains);
  expect(disclosure.querySelectorAll('dd')).toHaveLength(7);
  expect(container.querySelector('form')).toBeNull();
});

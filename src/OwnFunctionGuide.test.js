import { fireEvent, render, screen } from '@testing-library/react';
import OwnFunctionGuide from './OwnFunctionGuide';

const profile = Object.freeze({ personId: 'PER-2SG-0001', position: 'Manager et coordinateur général de 2SG - architecte fonctionnel M3S' });
const source = Object.freeze({ id: 'RH-001', status: 'validated_documentary' });

test.each([
  ['FR', 'Ma fonction, mon rôle et mes responsabilités', 'Ma mission de référence 2SG', 'Définition proposée', 'bureau fonctionne horizontalement'],
  ['DE', 'Meine Funktion, Rolle und Verantwortung', 'Meine 2SG-Referenzaufgabe', 'Vorgeschlagene Definition', 'Vorstand arbeitet horizontal'],
  ['EN', 'My function, role and responsibilities', 'My 2SG reference mission', 'Proposed definition', 'board works horizontally']
])('shows reference-based guidance and retains glossary status in %s', (language, title, mission, candidate, boundary) => {
  const { container } = render(<OwnFunctionGuide profile={profile} source={source} language={language}/>);
  expect(container.querySelector('details')).not.toHaveAttribute('open');
  fireEvent.click(screen.getByText(title));
  expect(container.querySelector('details')).toHaveAttribute('open');
  expect(screen.getByRole('heading', { name: mission })).toBeVisible();
  expect(screen.getByText(profile.position)).toBeVisible();
  expect(screen.getAllByText(new RegExp(candidate))).toHaveLength(3);
  expect(container).toHaveTextContent(boundary);
  expect(screen.getAllByRole('link').filter(a => a.getAttribute('href').startsWith('/ged?tab=knowledge&term=RH-'))).toHaveLength(3);
  expect(screen.getByRole('link', { name: /OpenStax/ })).toHaveAttribute('rel', 'noreferrer');
  expect(profile.position).toContain('coordinateur général');
});

test.each([
  [{ ...profile, personId: 'PER-2SG-9001' }, source],
  [{ ...profile, position: 'Other function' }, source],
  [profile, { ...source, status: 'candidate' }],
  [profile, { ...source, id: 'OTHER' }]
])('never infers a managerial mission from an unqualified profile', (person, origin) => {
  const { container } = render(<OwnFunctionGuide profile={person} source={origin}/>);
  expect(container.querySelector('.own-function-mission')).toBeNull();
  expect(container).toHaveTextContent('Rôle de connexion M3S');
});

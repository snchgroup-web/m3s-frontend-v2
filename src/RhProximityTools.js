import React from 'react';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { useAuth } from './AuthContext';
import InstitutionalGedBundle from './InstitutionalGedBundle';
import spec from './gedOffersSpec.json';

const KIT_IDS = [spec.files.find(file => file.name === '2SG_KIT_RH_PROXIMITE_V0_2_SANS_AUDIO.html').id];
const COPY = {
  FR: {
    title: 'Outils RH de proximit\u00e9',
    intro: 'Le pilote existant relie les outils suivants. Les versions nominatives restent locales et restreintes ; elles ne sont pas encore ouvertes depuis M3S.',
    tools: [['Pr\u00e9paration de paie', 'Brut, net, co\u00fbt employeur et param\u00e8tres \u00e0 qualifier.'],
      ['Confirmations de salaire', 'G\u00e9n\u00e9rateur gestionnaire et fiches individuelles apr\u00e8s paiement.'],
      ['Mon espace salari\u00e9 et mes heures', 'Dossier et d\u00e9clarations individuelles du pilote ; pas une authentification par choix de profil.'],
      ['Contr\u00f4le des retours', 'V\u00e9rification des d\u00e9clarations re\u00e7ues, distincte du paiement et de la paie.']],
    local: 'Outil local existant', kit: 'Kit fictif disponible dans la GED',
    kitNote: 'V0.2 sans audio Windows, notices int\u00e9gr\u00e9es, sans donn\u00e9es salari\u00e9s. T\u00e9l\u00e9chargement selon tes droits ; ce kit ne remplace pas les fiches individuelles d\u00e9j\u00e0 livr\u00e9es.',
    cycle: 'Documents du cycle RH V0.1', boundary: 'Le dossier remis, le kit fictif et les outils nominatifs sont des ressources distinctes. Aucun salaire, droit, paiement ou retour individuel n\u2019est valid\u00e9 ici.',
    employees: 'Ouvrir les dossiers employ\u00e9s', back: 'Revenir \u00e0 la vue RH', denied: 'Connecte-toi pour consulter les ressources autoris\u00e9es.'
  },
  DE: {
    title: 'Werkzeuge f\u00fcr wohnortnahe Personalarbeit',
    intro: 'Der bestehende Pilot verbindet die folgenden Werkzeuge. Personenbezogene Versionen bleiben lokal und gesch\u00fctzt; sie sind noch nicht aus M3S zu \u00f6ffnen.',
    tools: [['Lohnvorbereitung', 'Brutto, Netto, Arbeitgeberkosten und zu kl\u00e4rende Parameter.'],
      ['Gehaltsbest\u00e4tigungen', 'Verwaltungsgenerator und einzelne Best\u00e4tigungen nach der Zahlung.'],
      ['Mein Mitarbeiterbereich und meine Stunden', 'Pilotakten und individuelle Meldungen; eine Profilauswahl ist keine Anmeldung.'],
      ['R\u00fcckmeldungen pr\u00fcfen', 'Pr\u00fcfung eingegangener Erkl\u00e4rungen, getrennt von Zahlung und Lohnabrechnung.']],
    local: 'Bestehendes lokales Werkzeug', kit: 'Fiktives Kit im DMS verf\u00fcgbar',
    kitNote: 'V0.2 ohne Windows-Audio, mit integrierten Hinweisen und ohne Besch\u00e4ftigtendaten. Download gem\u00e4ss Ihren Rechten; kein Ersatz f\u00fcr bereits gelieferte Einzelbest\u00e4tigungen.',
    cycle: 'Dokumente des HR-Zyklus V0.1', boundary: '\u00dcbergebenes Dossier, fiktives Kit und personenbezogene Werkzeuge bleiben getrennt. Hier werden weder Lohn, Rechte, Zahlung noch individuelle R\u00fcckmeldung best\u00e4tigt.',
    employees: 'Besch\u00e4ftigtenakten \u00f6ffnen', back: 'Zur Personal\u00fcbersicht zur\u00fcck', denied: 'Melden Sie sich an, um berechtigte Ressourcen einzusehen.'
  },
  EN: {
    title: 'Proximity HR tools',
    intro: 'The existing pilot connects the following tools. Named employee versions remain local and restricted; they cannot yet be opened from M3S.',
    tools: [['Payroll preparation', 'Gross, net, employer cost and parameters to qualify.'],
      ['Salary confirmations', 'Manager generator and individual confirmations after payment.'],
      ['My employee space and hours', 'Pilot dossiers and individual declarations; a profile selector is not authentication.'],
      ['Return checks', 'Checking received declarations, separate from payment and payroll.']],
    local: 'Existing local tool', kit: 'Fictional kit available in the DMS',
    kitNote: 'V0.2 without Windows audio, with embedded notices and no employee data. Download subject to your permissions; not a replacement for individual sheets already delivered.',
    cycle: 'HR cycle V0.1 documents', boundary: 'The delivered dossier, fictional kit and named employee tools are separate resources. No salary, permission, payment or individual return is approved here.',
    employees: 'Open employee dossiers', back: 'Back to HR overview', denied: 'Sign in to view authorised resources.'
  }
};

export default function RhProximityTools({ language = 'FR', onBack, onOpenEmployees }) {
  const t = COPY[language] || COPY.FR, auth = useAuth();
  const principal = JSON.stringify([auth.isAuthenticated, auth.user?.id, auth.user?.tenantId]);
  return <section id="rh-proximity-tools" aria-labelledby="rh-tools-title" className="mb-8 space-y-5 border-b border-slate-700 pb-6" data-testid="rh-proximity-tools">
    <header>
      <h2 id="rh-tools-title" className="text-xl font-semibold text-slate-100">{t.title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">{t.intro}</p>
    </header>
    <dl className="divide-y divide-slate-700">
      {t.tools.map(([name, body]) => <div key={name} className="py-3">
        <dt className="text-sm font-semibold text-slate-100">{name}</dt>
        <dd className="mt-1 text-sm leading-6 text-slate-300">{body}</dd>
        <dd className="mt-1 text-xs text-slate-400">{t.local}</dd>
      </div>)}
    </dl>
    <div key={principal} className="space-y-4">
      <h3 className="text-base font-semibold text-slate-100">{t.kit}</h3>
      <p className="text-sm leading-6 text-slate-300">{t.kitNote}</p>
      {auth.isAuthenticated ? <>
        <InstitutionalGedBundle kind="offers" fileIds={KIT_IDS} language={language} />
        <h3 className="text-base font-semibold text-slate-100">{t.cycle}</h3>
        <InstitutionalGedBundle kind="rh" language={language} />
      </> : <p role="alert" className="text-sm text-slate-300">{t.denied}</p>}
    </div>
    <p className="text-sm leading-6 text-slate-400">{t.boundary}</p>
    <div className="flex flex-wrap gap-3">
      <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={onOpenEmployees}><FolderOpen size={18} aria-hidden="true" />{t.employees}</button>
      <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={onBack}><ArrowLeft size={18} aria-hidden="true" />{t.back}</button>
    </div>
  </section>;
}

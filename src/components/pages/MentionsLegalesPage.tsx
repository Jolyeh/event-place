import LegalPage from "./LegalPage";


const sections = [
  {
    title: "Éditeur du site",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Raison sociale", value: "Event Place SAS" },
          { label: "Forme juridique", value: "Société par Actions Simplifiée" },
          { label: "Capital social", value: "150 000 €" },
          { label: "RCS", value: "Paris B 921 456 789" },
          { label: "SIREN", value: "921 456 789" },
          { label: "Numéro TVA", value: "FR 12 921456789" },
          { label: "Siège social", value: "12 rue de l'Innovation, 75009 Paris" },
          { label: "Téléphone", value: "+33 1 87 66 54 32" },
          { label: "E-mail", value: "contact@Event Place.fr" },
          { label: "Directeur de publication", value: "Alexandre Dubois" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-base-200 border border-primary/8 rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-wider text-primary/60 mb-0.5">{label}</div>
            <div className="text-sm text-base-content">{value}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <div className="flex flex-col gap-2">
        <p>Le site Event Place est hébergé par :</p>
        <div className="bg-base-200 border border-primary/8 rounded-xl p-4 flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-base-content">Vercel Inc.</div>
          <div className="text-xs text-base-content/45">340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis</div>
          <div className="text-xs text-base-content/45">Site : www.vercel.com</div>
          <div className="text-xs text-base-content/45">Transfert international encadré par les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne.</div>
        </div>
        <p className="mt-1">L&apos;infrastructure est répartie sur plusieurs data centers en Europe (Francfort, Amsterdam) avec une disponibilité contractuelle de 99,99%.</p>
      </div>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <p>L&apos;ensemble des contenus présents sur le site Event Place (textes, images, logos, icônes, vidéos, données, code source) sont protégés par le droit de la propriété intellectuelle et appartiennent à Event Place SAS ou font l&apos;objet d&apos;une licence d&apos;utilisation. Toute reproduction, distribution, modification ou utilisation non autorisée de ces contenus est strictement interdite sans accord préalable écrit d&apos;Event Place. Les marques &quot;Event Place&quot; et le logo associé sont des marques déposées auprès de l&apos;INPI (n° 4 521 876).</p>
    ),
  },
  {
    title: "Conditions d'utilisation",
    content: (
      <p>L&apos;accès et l&apos;utilisation du site sont soumis aux présentes mentions légales et aux Conditions Générales d&apos;Utilisation (CGU) disponibles à l&apos;adresse <a href="/cgu" className="text-primary hover:underline">Event Place.fr/cgu</a>. En accédant au site, l&apos;utilisateur accepte sans réserve l&apos;ensemble de ces conditions. Event Place se réserve le droit de modifier à tout moment les contenus du site et ces mentions légales, sans préavis.</p>
    ),
  },
  {
    title: "Limitation de responsabilité",
    content: (
      <p>Event Place met tout en œuvre pour assurer l&apos;exactitude des informations publiées, mais ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus par leur utilisation. Event Place ne garantit pas la disponibilité permanente du site et se réserve le droit de le suspendre temporairement pour maintenance. Les liens hypertextes vers des sites tiers sont fournis à titre informatif ; Event Place décline toute responsabilité quant à leur contenu.</p>
    ),
  },
  {
    title: "Droit applicable et juridiction",
    content: (
      <p>Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l&apos;utilisation du site, les tribunaux de Paris seront seuls compétents, sauf disposition légale contraire. Pour les consommateurs, la Commission Européenne met à disposition une plateforme de règlement en ligne des litiges (RLL) accessible à : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ec.europa.eu/consumers/odr</a>.</p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>Pour toute question relative aux présentes mentions légales ou au fonctionnement du site, vous pouvez nous contacter à l&apos;adresse <a href="mailto:legal@Event Place.fr" className="text-primary hover:underline">legal@Event Place.fr</a> ou par courrier postal à : Event Place SAS — Service Juridique, 12 rue de l&apos;Innovation, 75009 Paris, France.</p>
    ),
  },
];

export default function MentionsLegalesContent() {
  return (
    <LegalPage
      title="Mentions légales"
      subtitle="Informations légales relatives à l'éditeur du site Event Place.fr."
      lastUpdated="1er Janvier 2025"
      sections={sections}
      relatedLinks={[
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Politique de cookies", href: "/cookies" },
        { label: "CGU", href: "/cgu" },
      ]}
    />
  );
}

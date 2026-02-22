import LegalPage from "./LegalPage";


const sections = [
  {
    title: "Responsable du traitement",
    content: (
      <p>Event Place SAS, société par actions simplifiée au capital de 150 000€, immatriculée au RCS de Paris sous le numéro 921 456 789, dont le siège social est situé au 12 rue de la Innovation, 75009 Paris, est responsable du traitement de vos données personnelles collectées via la plateforme Event Place (site web, application mobile et API).</p>
    ),
  },
  {
    title: "Données collectées",
    content: (
      <div className="flex flex-col gap-3">
        <p>Nous collectons les catégories de données suivantes :</p>
        <ul className="list-none flex flex-col gap-2">
          {[
            "Données d'identité : nom, prénom, adresse e-mail, numéro de téléphone, date de naissance (optionnel).",
            "Données de paiement : numéro de carte masqué, date d'expiration — aucune donnée bancaire complète n'est stockée sur nos serveurs (traitement par Stripe).",
            "Données de navigation : adresse IP, type de navigateur, pages visitées, durée des sessions (via cookies analytiques).",
            "Données de transaction : historique des achats, événements consultés, billets émis.",
            "Données de préférences : catégories favorites, alertes configurées, localisation géographique (avec consentement).",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    title: "Finalités du traitement",
    content: (
      <div className="flex flex-col gap-3">
        <p>Vos données sont traitées pour les finalités suivantes, chacune reposant sur une base légale distincte :</p>
        <div className="grid grid-cols-1 gap-2 mt-1">
          {[
            { base: "Exécution du contrat", finalite: "Création de compte, traitement des réservations, émission et envoi des billets." },
            { base: "Intérêt légitime", finalite: "Amélioration de nos services, prévention de la fraude, personnalisation de l'expérience." },
            { base: "Consentement", finalite: "Envoi de newsletters, notifications push, géolocalisation pour les suggestions de proximité." },
            { base: "Obligation légale", finalite: "Facturation, conservation des données comptables (10 ans), déclarations fiscales." },
          ].map(({ base, finalite }) => (
            <div key={base} className="bg-base-200 border border-primary/8 rounded-xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">{base}</div>
              <p className="text-xs">{finalite}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <p>Vos données de compte sont conservées pendant toute la durée de votre relation contractuelle avec Event Place, puis archivées pendant 3 ans à compter de votre dernière activité, sauf obligation légale différente. Les données de paiement sont supprimées dans les 13 mois suivant la transaction. Les cookies analytiques ont une durée de vie maximale de 13 mois.</p>
    ),
  },
  {
    title: "Destinataires des données",
    content: (
      <div className="flex flex-col gap-2">
        <p>Vos données peuvent être transmises à nos partenaires techniques :</p>
        <ul className="list-none flex flex-col gap-1.5 mt-1">
          {[
            "Stripe Inc. — traitement des paiements (USA, sous garanties adequacy)",
            "Sendgrid (Twilio) — envoi de communications transactionnelles",
            "Vercel Inc. — hébergement de l'infrastructure",
            "Mixpanel — analytics d'usage (données anonymisées)",
            "Les organisateurs d'événements — uniquement nom, e-mail et informations de billet",
          ].map((d, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2">Nous ne vendons jamais vos données à des tiers à des fins publicitaires.</p>
      </div>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <div className="flex flex-col gap-3">
        <p>Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits suivants sur vos données :</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { droit: "Accès", desc: "Obtenir une copie de vos données" },
            { droit: "Rectification", desc: "Corriger des informations inexactes" },
            { droit: "Effacement", desc: "Demander la suppression de votre compte" },
            { droit: "Portabilité", desc: "Recevoir vos données dans un format lisible" },
            { droit: "Opposition", desc: "Vous opposer à certains traitements" },
            { droit: "Limitation", desc: "Restreindre temporairement l'usage" },
          ].map(({ droit, desc }) => (
            <div key={droit} className="bg-base-200 border border-primary/8 rounded-xl p-3">
              <div className="text-xs font-bold text-primary mb-0.5">{droit}</div>
              <p className="text-[11px]">{desc}</p>
            </div>
          ))}
        </div>
        <p>Pour exercer vos droits : <strong>privacy@Event Place.fr</strong> ou via votre espace Paramètres → Confidentialité. Délai de réponse : 30 jours maximum. Vous pouvez également saisir la CNIL (www.cnil.fr).</p>
      </div>
    ),
  },
  {
    title: "Sécurité",
    content: (
      <p>Event Place met en œuvre des mesures techniques et organisationnelles conformes aux meilleures pratiques de l&apos;industrie : chiffrement TLS 1.3 des communications, hachage des mots de passe avec bcrypt, accès aux données restreint au personnel habilité, audits de sécurité trimestriels. En cas de violation de données susceptible d&apos;engendrer un risque élevé pour vos droits, vous serez notifié dans les 72 heures.</p>
    ),
  },
  {
    title: "Cookies",
    content: (
      <p>Nous utilisons des cookies pour le bon fonctionnement de la plateforme et l&apos;analyse de l&apos;audience. Pour une information détaillée sur les cookies utilisés et la gestion de votre consentement, consultez notre <a href="/cookies" className="text-primary hover:underline">Politique de cookies</a>.</p>
    ),
  },
];

export default function PrivacyPageContent() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      subtitle="Comment Event Place collecte, utilise et protège vos données personnelles."
      lastUpdated="1er Février 2025"
      sections={sections}
      relatedLinks={[
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de cookies", href: "/cookies" },
        { label: "Centre d'aide", href: "/support" },
      ]}
    />
  );
}

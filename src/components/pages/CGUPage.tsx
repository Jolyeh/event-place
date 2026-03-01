import LegalPage from "./LegalPage";


const sections = [
  {
    title: "Présentation et acceptation",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (ci-après &quot;CGU&quot;) régissent l&apos;accès et
          l&apos;utilisation de la plateforme Event Place, éditée par <strong className="text-base-content/70">Event Place SAS</strong>,
          société par actions simplifiée au capital de 150 000€, immatriculée au RCS de Paris sous le numéro
          921&nbsp;456&nbsp;789, dont le siège social est situé au 12 rue de l&apos;Innovation, 75009 Paris.
        </p>
        <p>
          En accédant à la plateforme Event Place — que ce soit via le site web, l&apos;application mobile ou tout autre
          point d&apos;accès — l&apos;utilisateur reconnaît avoir lu, compris et accepté sans réserve l&apos;intégralité
          des présentes CGU ainsi que notre{" "}
          <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>
          {" "}et notre{" "}
          <a href="/cookies" className="text-primary hover:underline">Politique de cookies</a>.
        </p>
        <div className="bg-primary/6 border border-primary/15 rounded-xl p-4">
          <p className="text-xs font-semibold text-primary/80 mb-1">Important</p>
          <p className="text-xs">
            Si vous n&apos;acceptez pas ces conditions, vous devez cesser immédiatement d&apos;utiliser la plateforme.
            L&apos;utilisation des services Event Place vaut acceptation pleine et entière des présentes CGU.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Définitions",
    content: (
      <div className="flex flex-col gap-2">
        <p>Dans les présentes CGU, les termes suivants ont la signification qui leur est donnée ci-après :</p>
        <div className="flex flex-col gap-2 mt-2">
          {[
            { term: "Plateforme", def: "Le site web Event Place.fr, l'application mobile Event Place et l'ensemble des services associés." },
            { term: "Utilisateur", def: "Toute personne physique ou morale qui accède à la Plateforme, avec ou sans création de compte." },
            { term: "Compte", def: "L'espace personnel créé par l'Utilisateur après inscription, permettant l'accès aux fonctionnalités avancées." },
            { term: "Organisateur", def: "Tout Utilisateur qui publie et gère des événements sur la Plateforme via un compte organisateur." },
            { term: "Participant", def: "Tout Utilisateur qui réserve ou achète des billets pour assister à un événement." },
            { term: "Billet", def: "Le titre d'accès électronique délivré au Participant après confirmation de sa réservation." },
            { term: "Événement", def: "Toute manifestation culturelle, sportive, gastronomique ou autre publiée sur la Plateforme." },
            { term: "Contenu", def: "Toute information, texte, image, vidéo ou donnée publiée par un Utilisateur sur la Plateforme." },
          ].map(({ term, def }) => (
            <div key={term} className="flex gap-3 bg-base-200 border border-primary/8 rounded-xl p-3">
              <span className="text-primary font-bold text-xs shrink-0 w-24">{term}</span>
              <span className="text-xs">{def}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Accès à la plateforme et création de compte",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          L&apos;accès à certaines fonctionnalités de la Plateforme est libre et gratuit (navigation, consultation
          des événements). D&apos;autres fonctionnalités (réservation, publication d&apos;événements, gestion de
          profil) nécessitent la création d&apos;un Compte.
        </p>
        <p>
          Pour créer un Compte, l&apos;Utilisateur doit être une personne physique majeure (18 ans ou plus) ou une
          personne morale dûment représentée. L&apos;Utilisateur doit fournir des informations exactes, complètes et
          à jour lors de son inscription, et s&apos;engage à les maintenir à jour.
        </p>
        <p>
          L&apos;Utilisateur est seul responsable de la confidentialité de ses identifiants de connexion. Toute
          utilisation du Compte avec les identifiants de l&apos;Utilisateur est présumée faite par ce dernier.
          En cas de perte, vol ou utilisation non autorisée, l&apos;Utilisateur doit en informer immédiatement
          Event Place à l&apos;adresse{" "}
          <a href="mailto:security@Event Place.fr" className="text-primary hover:underline">security@Event Place.fr</a>.
        </p>
        <p>
          Event Place se réserve le droit de suspendre ou supprimer tout Compte dont les informations seraient
          inexactes, incomplètes, ou en cas de violation des présentes CGU.
        </p>
      </div>
    ),
  },
  {
    title: "Services proposés",
    content: (
      <div className="flex flex-col gap-3">
        <p>Event Place propose les services suivants :</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {[
            { title: "Billetterie en ligne", desc: "Achat et gestion de billets pour des événements variés." },
            { title: "Publication d'événements", desc: "Création et promotion d'événements pour les organisateurs." },
            { title: "Alertes personnalisées", desc: "Notifications sur les événements selon vos préférences." },
            { title: "Espace personnel", desc: "Gestion du profil, des billets et de l'historique." },
            { title: "Dashboard organisateur", desc: "Suivi des ventes, statistiques et gestion des participants." },
            { title: "Support client", desc: "Assistance par chat, e-mail et téléphone." },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 bg-base-200 border border-primary/8 rounded-xl p-3">

              <div>
                <p className="text-xs font-semibold text-base-content/75">{title}</p>
                <p className="text-xs text-base-content/40 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p>
          Event Place se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services, à tout
          moment et sans préavis, notamment pour des raisons de maintenance, d&apos;évolution technique ou de
          contraintes légales.
        </p>
      </div>
    ),
  },
  {
    title: "Conditions de réservation et d'achat",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Toute réservation effectuée sur la Plateforme vaut acceptation ferme et définitive de l&apos;offre de
          l&apos;Organisateur aux conditions tarifaires affichées. Le contrat de vente est conclu directement entre
          le Participant et l&apos;Organisateur ; Event Place agit en qualité d&apos;intermédiaire technique.
        </p>
        <p>
          <strong className="text-base-content/70">Paiement :</strong> Le paiement est effectué en ligne par carte
          bancaire, PayPal ou Apple Pay au moment de la réservation. Les prix sont indiqués en euros TTC.
          Event Place perçoit une commission de service de 5% sur chaque transaction, clairement affichée avant
          confirmation.
        </p>
        <p>
          <strong className="text-base-content/70">Confirmation :</strong> La réservation est définitive après
          validation du paiement. Un e-mail de confirmation contenant le(s) billet(s) électronique(s) est envoyé
          dans les 5 minutes. En l&apos;absence de réception, le Participant doit consulter son espace personnel
          ou contacter le support.
        </p>
        <p>
          <strong className="text-base-content/70">Remboursement :</strong> Le Participant peut demander le
          remboursement intégral jusqu&apos;à 48 heures avant l&apos;événement, sauf politique spécifique de
          l&apos;Organisateur. Les remboursements sont effectués sur le moyen de paiement utilisé, dans un délai
          de 5 à 10 jours ouvrés.
        </p>
        <p>
          <strong className="text-base-content/70">Annulation par l&apos;Organisateur :</strong> En cas
          d&apos;annulation d&apos;un événement par l&apos;Organisateur, les Participants sont remboursés
          automatiquement dans un délai de 10 jours ouvrés. Event Place ne saurait être tenu responsable des
          préjudices résultant d&apos;une annulation par l&apos;Organisateur.
        </p>
      </div>
    ),
  },
  {
    title: "Obligations des utilisateurs",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          En utilisant la Plateforme, chaque Utilisateur s&apos;engage à respecter les présentes CGU et les
          législations en vigueur. Il est notamment interdit de :
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Utiliser la Plateforme à des fins illicites, frauduleuses ou contraires à l'ordre public.",
            "Usurper l'identité d'un tiers ou fournir des informations personnelles erronées.",
            "Accéder ou tenter d'accéder aux comptes d'autres Utilisateurs.",
            "Revendre des billets à des prix supérieurs au prix d'achat (scalping) sans autorisation explicite de l'Organisateur.",
            "Publier des contenus faux, trompeurs, diffamatoires, haineux ou portant atteinte aux droits de tiers.",
            "Utiliser des outils automatisés (bots, scrapers) pour accéder à la Plateforme ou collecter des données.",
            "Compromettre la sécurité, la stabilité ou l'intégrité de la Plateforme.",
            "Reproduire, copier, vendre ou exploiter commercialement tout ou partie de la Plateforme sans autorisation.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-error/50 mt-2 shrink-0" />
              <span className="text-xs">{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Tout manquement à ces obligations peut entraîner la suspension ou la suppression immédiate du Compte,
          sans préjudice des actions judiciaires que pourrait intenter Event Place.
        </p>
      </div>
    ),
  },
  {
    title: "Obligations des organisateurs",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Les Organisateurs bénéficient d&apos;un accès à des fonctionnalités supplémentaires et assument des
          obligations spécifiques en contrepartie :
        </p>
        <div className="flex flex-col gap-2">
          {[
            { title: "Exactitude des informations", desc: "L'Organisateur garantit l'exactitude et la complétude de toutes les informations publiées (date, lieu, tarifs, description, conditions d'accès)." },
            { title: "Conformité légale", desc: "L'Organisateur est seul responsable de la conformité de son événement aux réglementations applicables (autorisations administratives, normes de sécurité, droits d'auteur, licences SACEM, etc.)." },
            { title: "Gestion des remboursements", desc: "En cas d'annulation ou de modification substantielle, l'Organisateur s'engage à procéder aux remboursements dans les délais définis par Event Place." },
            { title: "Fonds en attente", desc: "Les fonds collectés sont versés à l'Organisateur 48h après la fin de l'événement, déduction faite de la commission Event Place. L'Organisateur doit avoir fourni un RIB valide." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-base-200 border border-primary/8 rounded-xl p-4">
              <p className="text-xs font-bold text-primary/70 mb-1">{title}</p>
              <p className="text-xs text-base-content/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          L&apos;ensemble des éléments constitutifs de la Plateforme (code source, design, logos, textes, images,
          base de données, architecture) sont la propriété exclusive d&apos;Event Place SAS et sont protégés par
          les lois françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Les Utilisateurs conservent la propriété des contenus qu&apos;ils publient sur la Plateforme. En
          publiant un Contenu, l&apos;Utilisateur accorde à Event Place une licence mondiale, non exclusive, gratuite
          et transférable d&apos;utilisation, de reproduction, de modification et d&apos;affichage de ce Contenu
          dans le cadre du fonctionnement et de la promotion de la Plateforme.
        </p>
        <p>
          L&apos;Utilisateur garantit qu&apos;il dispose de tous les droits nécessaires sur les Contenus qu&apos;il
          publie et qu&apos;ils ne portent pas atteinte aux droits de tiers. En cas de signalement d&apos;une
          violation, Event Place se réserve le droit de supprimer le Contenu concerné.
        </p>
      </div>
    ),
  },
  {
    title: "Responsabilité et garanties",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          <strong className="text-base-content/70">Responsabilité d&apos;Event Place :</strong> Event Place agit en
          qualité d&apos;intermédiaire technique entre les Organisateurs et les Participants. À ce titre, Event Place
          ne saurait être tenu responsable de la qualité, de la conformité ou de l&apos;annulation des événements
          proposés par les Organisateurs.
        </p>
        <p>
          Event Place met en œuvre tous les moyens raisonnables pour assurer la disponibilité de la Plateforme
          (objectif 99,9%) mais ne peut garantir un accès ininterrompu. Event Place ne saurait être tenu responsable
          des dommages indirects, pertes de données ou manques à gagner résultant de l&apos;utilisation ou de
          l&apos;impossibilité d&apos;utiliser la Plateforme.
        </p>
        <p>
          <strong className="text-base-content/70">Responsabilité de l&apos;Utilisateur :</strong> L&apos;Utilisateur
          est seul responsable de l&apos;utilisation qu&apos;il fait de la Plateforme et des Contenus qu&apos;il
          publie. Il garantit Event Place contre tout recours, réclamation ou condamnation résultant d&apos;une
          violation des présentes CGU.
        </p>
      </div>
    ),
  },
  {
    title: "Suspension et résiliation",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          <strong className="text-base-content/70">Résiliation par l&apos;Utilisateur :</strong> L&apos;Utilisateur
          peut supprimer son Compte à tout moment depuis les paramètres de son espace personnel. La suppression
          est définitive et irréversible. Les billets déjà achetés restent valables jusqu&apos;à leur utilisation.
        </p>
        <p>
          <strong className="text-base-content/70">Suspension par Event Place :</strong> Event Place se réserve le droit
          de suspendre ou supprimer tout Compte, sans préavis ni indemnité, en cas de violation des présentes CGU,
          d&apos;utilisation frauduleuse ou de mise en danger de la Plateforme ou d&apos;autres Utilisateurs.
          L&apos;Utilisateur sera notifié par e-mail, sauf si la notification elle-même compromettrait la sécurité
          de la Plateforme.
        </p>
        <p>
          En cas de suspension, les billets déjà achetés par l&apos;Utilisateur restent valables. Les billets en
          vente par un Organisateur suspendu seront remboursés automatiquement aux Participants.
        </p>
      </div>
    ),
  },
  {
    title: "Modification des CGU",
    content: (
      <p>
        Event Place se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en
        vigueur dès leur publication sur la Plateforme. Les Utilisateurs enregistrés seront informés par e-mail
        des modifications substantielles au moins 15 jours avant leur entrée en vigueur. L&apos;utilisation
        continue de la Plateforme après notification vaut acceptation des nouvelles CGU. Si l&apos;Utilisateur
        refuse les nouvelles CGU, il doit cesser d&apos;utiliser la Plateforme et peut demander la suppression
        de son Compte.
      </p>
    ),
  },
  {
    title: "Droit applicable et règlement des litiges",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige relatif à leur interprétation ou
          à leur exécution, les parties s&apos;engagent à rechercher une solution amiable dans un délai de 30 jours
          à compter de la notification du différend.
        </p>
        <p>
          À défaut d&apos;accord amiable, les litiges seront soumis à la compétence exclusive des tribunaux de
          Paris, sauf disposition légale d&apos;ordre public contraire (notamment pour les consommateurs qui
          peuvent saisir la juridiction de leur lieu de résidence).
        </p>
        <p>
          Conformément aux dispositions du Code de la consommation, vous pouvez recourir gratuitement au service
          de médiation <strong className="text-base-content/70">CNPM Médiation Consommation</strong> (27 avenue
          de la Libération, 42400 Saint-Chamond —{" "}
          <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            www.cnpm-mediation-consommation.eu
          </a>
          ). La Commission Européenne propose également une plateforme de résolution en ligne des litiges (RLL) :
          {" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            ec.europa.eu/consumers/odr
          </a>.
        </p>
      </div>
    ),
  },
  {
    title: "Dispositions diverses",
    content: (
      <div className="flex flex-col gap-3">
        <p>
          <strong className="text-base-content/70">Intégralité de l&apos;accord :</strong> Les présentes CGU
          constituent l&apos;intégralité de l&apos;accord entre l&apos;Utilisateur et Event Place concernant
          l&apos;utilisation de la Plateforme. Elles remplacent tout accord ou déclaration antérieur.
        </p>
        <p>
          <strong className="text-base-content/70">Divisibilité :</strong> Si une disposition des présentes CGU
          est déclarée nulle ou inapplicable, les autres dispositions restent en vigueur.
        </p>
        <p>
          <strong className="text-base-content/70">Non-renonciation :</strong> Le fait pour Event Place de ne pas
          se prévaloir d&apos;une disposition des CGU ne vaut pas renonciation à s&apos;en prévaloir
          ultérieurement.
        </p>
        <p>
          <strong className="text-base-content/70">Contact :</strong> Pour toute question relative aux présentes
          CGU, vous pouvez nous contacter à l&apos;adresse{" "}
          <a href="mailto:legal@Event Place.fr" className="text-primary hover:underline">legal@Event Place.fr</a> ou
          par courrier à Event Place SAS — Service Juridique, 12 rue de l&apos;Innovation, 75009 Paris.
        </p>
      </div>
    ),
  },
];

export default function CGUPage() {
  return (
    <LegalPage
      title="Conditions Générales d'Utilisation"
      subtitle="Les règles qui encadrent l'utilisation de la plateforme Event Place pour tous les utilisateurs."
      lastUpdated="1er Février 2025"
      sections={sections}
      relatedLinks={[
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de cookies", href: "/cookies" },
        { label: "Centre d'aide", href: "/support" },
      ]}
    />
  );
}

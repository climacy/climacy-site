// Shared content model for the Climacy homeowner landing page.
// All three design directions render this same copy (the brand's own
// brochure language) so the options stay content-consistent.
const CLIMACY = {
  brand: 'climacy',
  claim: 'architects of sustainability',
  nav: ['La tuile', 'Le moment', 'Performance', 'Financement', 'Étude gratuite'],
  hero: {
    eyebrow: 'Couverture solaire intégrée',
    title: ['Votre toiture protège.', 'Et si elle produisait aussi ?'],
    sub: 'En rénovation comme en construction neuve, les tuiles solaires Climacy remplacent la couverture classique et produisent votre électricité.',
    proprio: {
      eyebrow: 'Propriétaires',
      title: 'Vous rénovez votre toit ? Faites-le produire.',
      sub: 'Au lieu de tuiles classiques, posez des tuiles qui produisent votre électricité, pour toute la vie de votre toit.',
    },
    cta: 'Demandez votre étude gratuite',
    cta2: 'Découvrir la tuile',
    img: 'assets/photos/cells_glow.jpg',
  },
  moment: {
    eyebrow: 'Le bon moment',
    title: "C'est maintenant, pendant votre rénovation.",
    body: "Vous entreprenez la réfection de votre toiture, par nécessité ou pour la mettre en conformité avec les exigences énergétiques actuelles. Un tel chantier n'intervient qu'une fois par génération. L'échafaudage est monté, le toit est ouvert, le couvreur est sur place : toutes les conditions sont réunies pour poser, à la place de tuiles classiques, des tuiles qui produisent de l'électricité.",
    img: 'PHOTO · chantier de rénovation, échafaudage et toiture ouverte',
    cols: [
      { h: 'L’essentiel est déjà budgété', p: "Échafaudage, charpente, isolation, ferblanterie, dépose de l'ancienne couverture : ces postes sont identiques, que vos tuiles produisent ou non. Ils figurent déjà dans votre budget." },
      { h: 'Seul le choix des tuiles change', p: "C'est le seul poste qui diffère. Moyennant un supplément mesuré, votre toiture ne se contente plus de protéger : elle produit, pendant trente ans et plus." },
    ],
  },
  product: {
    eyebrow: 'La tuile solaire Climacy',
    title: ['Posée comme une tuile.', 'Produit comme un panneau.'],
    body: "Climacy conçoit et déploie des tuiles solaires intégrées en Suisse romande. Elles remplacent la couverture traditionnelle et produisent votre électricité, pour une toiture à la fois protectrice, productive et homogène.",
    img: 'PHOTO · détail macro de la tuile solaire, noir profond homogène',
    stats: [
      { n: '248', u: 'Weq / m²', d: 'une densité de puissance parmi les plus élevées du marché' },
      { n: '280', u: 'kWh / m² · an', d: "selon l’orientation et l’ensoleillement" },
      { n: '+6', u: '% de production', d: 'grâce à la technologie bifaciale' },
      { n: '30', u: 'ans', d: 'de garantie de performance : plus de 85 % de la puissance initiale' },
    ],
    concrete: "Une toiture de 120 m² produit environ 30 000 kWh par an, soit la consommation de deux à trois maisons modernes chauffées par pompe à chaleur.",
  },
  features: [
    { t: 'Bifacialité', h: '+6 % de production', p: 'La face arrière capte la lumière réfléchie : un gain de production sans surface supplémentaire.' },
    { t: 'Étanchéité renforcée', h: 'Recouvrement de 10 cm', p: 'Une conception pensée pour protéger durablement la toiture.' },
    { t: 'Verre trempé', h: 'Charges alpines', p: 'Conçue pour les conditions suisses : verre trempé sur les deux faces, charge de neige jusqu’à 8000 Pa, résistance à la grêle classe HW4.' },
    { video: 'videos/esthetique-integree.mp4', t: 'Esthétique intégrée', h: 'Une toiture, pas des panneaux', p: 'Une surface continue, moderne et architecturale, sans rupture visuelle.' },
    { video: 'videos/multicouches.mp4', t: 'Installation optimisée', h: 'Pose directe sur lattage', p: "Une mise en œuvre identique à celle d'une tuile traditionnelle, conçue pour les couvreurs et les chantiers de rénovation." },
      { video: 'videos/topcon.mp4', t: 'Technologie TOPCon', h: 'Qualité premium', p: 'Cellules de nouvelle génération, encapsulation verre-verre et structure haute résistance.' },
  ],
  finance: {
    eyebrow: 'Le cas financier',
    title: ['Vous rénovez votre toit.', 'Pour un supplément mesuré, faites-le produire.'],
    body: "La question pertinente n'est pas « combien coûte un toit solaire ? », mais « combien de plus qu'une couverture classique que j'allais poser de toute façon ? ». Voici la réponse, à partir de l'exemple d'une toiture de 120 m².",
    rows: [
      { k: 'Couverture tuiles classiques', note: 'déjà budgétée', v: "18 000" },
      { k: 'Votre supplément solaire', note: 'le seul poste supplémentaire', v: "+20 000" },
      { k: 'Toiture solaire Climacy posée', note: '~30 kWc installés', v: "38 000", total: true },
    ],
    unit: 'CHF',
    highlights: [
      { n: '~3 800', u: 'CHF / an', d: 'économies, revenus du surplus et valorisation du bien' },
      { n: '~5', u: 'ans', d: 'pour amortir le supplément solaire' },
      { n: '30+', u: 'ans', d: 'de bénéfice net ensuite' },
    ],
    foot: "Exemple illustratif (toiture 120 m², bien orientée), net de la Rétribution Unique fédérale (Pronovo). Les montants exacts dépendent de votre toiture et sont établis dans une étude personnalisée gratuite.",
  },
  coprod: {
    eyebrow: 'Une autre voie · La Coproduction Solaire',
    title: ['Votre budget ne permet pas ce supplément ?', 'Une solution existe.'],
    body: "Le supplément solaire est modéré et s'amortit, mais il doit néanmoins être avancé. Si votre budget de rénovation ne le permet pas, Climacy le finance à votre place : vous bénéficiez d'une toiture solaire sans dépense supplémentaire.",
    img: 'assets/photos/villa_pool.jpg',
    pillars: [
      { k: 'Votre toit, votre bien', p: 'Vous restez propriétaire de votre toit et de vos tuiles solaires dès le premier jour.' },
      { k: 'Un partenariat équilibré', p: 'Vous économisez dès le premier jour ; nous exploitons l’énergie produite pendant 30 ans.' },
      { k: 'Au terme des 30 ans', p: '100 % de la production vous revient. Le partenariat est attaché au bien et se transmet à la revente.' },
    ],
    steps: [
      { k: 'Vous planifiez votre rénovation', p: 'Vous menez déjà un projet de réfection de toiture avec votre architecte ou votre couvreur.' },
      { k: 'Climacy équipe votre toit', p: 'Climacy finance l’intégralité du supplément solaire. Vous êtes propriétaire de votre toiture solaire dès le premier jour.' },
      { k: 'Votre toit produit', p: 'Vous consommez directement votre électricité solaire, à tarif préférentiel et stable.' },
      { k: 'Pendant une génération', p: 'Climacy exploite la production pendant 30 ans. Au-delà, toute la production vous revient.' },
    ],
    faq: [
      { q: 'Et si je vends ma maison pendant les 30 ans ?', a: "Le partenariat est attaché au bien, pas à vous. Il se transmet au nouvel acquéreur dans les mêmes conditions : un toit neuf et une électricité à tarif préférentiel. Un argument de valorisation à la revente." },
      { q: 'Puis-je racheter mon installation avant la fin ?', a: "Oui. Vous pouvez à tout moment racheter la part de Climacy et récupérer l'intégralité de la production. Les conditions sont définies clairement dans le contrat." },
    ],
  },
  selfclean: {
    title: 'Naturellement auto-nettoyant',
    body: "Notre système de montage, basé sur une juxtaposition parfaitement maîtrisée, offre un rendu de toiture homogène et sans compromis esthétique. Cette conception favorise un nettoyage continu par l’eau de pluie, contrairement aux modules avec cadre où les poussières ont tendance à s’accumuler.",
    video: 'videos/autonettoyant.mp4',
    poster: 'posters/autonettoyant.jpg',
  },
  proof: {
    items: [
      { video: 'videos/bifacial.mp4', t: 'Puissance & bifacialité', h: '+6 % de production', p: 'Une sous-couverture spécialement réfléchissante renvoie la lumière vers la face arrière de la tuile bifaciale. Votre toiture capte ainsi davantage d’énergie, sans occuper un mètre carré de plus.' },
      { video: 'videos/etancheite-recouvrement.mp4', t: 'Étanchéité renforcée', h: 'Recouvrement de 10 cm', p: 'Un recouvrement généreux qui garantit une protection continue et durable de la toiture.' },
      { video: 'videos/impact.mp4', t: 'Résistance', h: 'Verre trempé, charges alpines', p: 'Conçue pour les conditions suisses : verre trempé sur les deux faces, charge de neige jusqu’à 8000 Pa, résistance à la grêle de classe HW4.' },
    ],
  },
  installs: {
    eyebrow: 'Déjà sur les toits de Suisse romande',
    title: 'Des toitures qui produisent, sans en avoir l’air.',
    intro: 'De la maison individuelle aux bâtiments collectifs, industriels et publics, Climacy équipe déjà des projets variés en Suisse. Découvrez ici une sélection de réalisations représentatives — quelques exemples parmi l’ensemble des toitures livrées ou actuellement en cours.',
    shots: [
      { img: 'assets/photos/realisation-saint-prex.jpg', cap: 'Saint-Prex · rénovation',
        info: ['Saint-Prex · 2023 · Rénovation', '58 m² · 10,8 kWc · 10’260 kWh'] },
      { img: 'assets/photos/realisation-maison-thomas.jpg', cap: 'Maison contemporaine · toiture intégrale',
        info: ['Bussigny · 2021 · Nouvelle construction', '110 m² · 20,3 kWc · 19’810 kWh'] },
      { img: 'assets/photos/morges-pergola.png', cap: 'Morges · pergola solaire',
        info: ['Morges · 2025 · Pergola (Romande Energie)', '130 m² · 23,85 kWc · 23’370 kWh'] },
      { img: 'assets/photos/crissier-industrial.png', cap: 'Crissier · industriel', big: true, right: true,
        info: ['Crissier · 2024 · Industriel', '2’000 m² · 988,57 kWc · 1’000’000 kWh'] },
      { img: 'assets/photos/froideville-grid.png', cap: 'Froideville',
        info: ['Froideville · 2023 · Garage', '47 m² · 10,32 kWc · 10’320 kWh'] },
      { img: 'assets/photos/genolier.jpg', cap: 'Genolier · couvert à voiture',
        info: ['Genolier · 2024 · Construction d’un couvert à voiture', '75 m² · 7,7 kWc · 8’459 kWh'] },
      { img: 'assets/photos/realisation-villars-sainte-croix.jpg', cap: 'Villars-Sainte-Croix · rénovation', zoom: 1.48, zoomHover: 1.54, position: '58% 37%',
        info: ['Villars-Sainte-Croix · 2024 · Rénovation', '155 m² · 22,4 kWc · 22’180 kWh'] },
      { img: 'assets/photos/realisation-saint-cergue.jpg', cap: 'Saint-Cergue',
        info: ['Saint-Cergue · 2025 · Rénovation', '143 m² · 33,4 kWc · 29’520 kWh'] },
      { img: 'assets/photos/epalinges.jpg', cap: 'Epalinges',
        info: ['Epalinges · 2025 · Rénovation', '43,56 kWc'] },
      { img: 'assets/photos/renens-stade.png', cap: 'Renens · rénovation d’un stade',
        info: ['Renens · 2024 · Rénovation d’un stade', '570 m² · 125,6 kWc · 138’160 kWh'] },
      { img: 'assets/photos/renens-2026.png', cap: 'Renens · nouvelle construction',
        info: ['Renens · 2026 · Nouvelle construction', '380 m² · 67,9 kWc · 74’690 kWh'] },
      { img: 'assets/photos/essertines.jpg', cap: 'Essertines · rénovation',
        info: ['Essertines · 2024 · Rénovation', '125 m² · 34,12 kWc · 37’532 kWh'] },
      { img: 'assets/photos/champery-integration-partielle.png', cap: 'Champéry · intégration partielle',
        info: ['Champéry · 2025 · Intégration partielle', '176 m² · 34,83 kWc · 34’830 kWh'] },
      { img: 'assets/photos/rougemont.jpg', cap: 'Rougemont · site protégé',
        info: ['Rougemont · 2026 · Rénovation en périmètre protégé', '121,5 m² · 18,06 kWc · 18’060 kWh'] },
      { img: 'assets/photos/huemoz-isos.png', cap: 'Huémoz · rénovation en cours', status: 'En cours',
        info: ['Huémoz · 2026 · Rénovation en périmètre protégé', '105 m² · 16,9 kWc'] },
      { img: 'assets/photos/champery-2026.png', cap: 'Champéry · rénovation en cours', big: true, right: true, status: 'En cours',
        info: ['Champéry · 2026 · Rénovation', '530 m² · 121,8 kWc'] },
    ],
  },
  process: {
    eyebrow: 'Prochaine étape',
    title: 'Découvrez ce que votre toit peut produire.',
    steps: [
      { n: '01', k: 'Découvrez votre potentiel', p: 'Renseignez l’adresse de votre bâtiment pour obtenir une première estimation.' },
      { n: '02', k: 'Parlons de votre projet', p: 'Nous examinons ensemble vos besoins et les prochaines étapes.' },
      { n: '03', k: 'Préparez votre rénovation', p: 'Climacy accompagne votre projet avec les professionnels concernés.' },
    ],
  },
  how: {
    eyebrow: "Comment l'obtenir",
    title: 'Demandez la tuile Climacy à votre professionnel.',
    body: "La tuile se pose sur le lattage, dans la logique d'une couverture traditionnelle. Vos artisans conservent leurs gestes habituels : aucun savoir-faire nouveau n'est requis.",
    steps: [
      { k: 'Votre architecte', p: "Il intègre la tuile au projet de rénovation et à son esthétique d'ensemble." },
      { k: 'Votre couvreur', p: 'Il la pose sur lattage, comme une couverture classique. Le système d’accrochage breveté ne requiert aucune sous-construction spécifique.' },
      { k: 'Climacy', p: "Nous fournissons le produit, la documentation technique et la coordination. L'électricien gère le raccordement." },
    ],
    quote: "« Pour ma rénovation de toiture, je souhaiterais étudier les tuiles solaires Climacy à la place des tuiles classiques. Pouvez-vous les intégrer au projet ? »",
    quoteLabel: 'À transmettre à votre architecte ou à votre couvreur',
  },
  cta: {
    eyebrow: 'Étude personnalisée · gratuite · sans engagement',
    title: ['Parlons de', 'votre projet.'],
    body: "Explorez vous-même le potentiel solaire de votre toiture et obtenez une première estimation de votre projet. Pour la coproduction, Climacy étudie ensuite l’éligibilité et les conditions de financement.",
    button: 'Estimer mon toit',
    sub: 'Réponse sous 48 h ouvrées',
  },
  about: {
    eyebrow: 'À propos',
    title: ['Climate', '+ Legacy'],
    history: {
      eyebrow: 'Histoire et développement',
      body: "Fondée en 2022 et établie à Bussigny, Climacy développe des tuiles solaires intégrées qui deviennent la couverture du bâtiment. Son nom, contraction de « Climate » et de « Legacy », traduit son ambition : agir aujourd’hui pour transmettre un héritage durable. Sa technologie, qui associe protection du toit, production d’électricité et intégration architecturale, est protégée par un brevet européen.",
      facts: [
        { n: '2022', d: 'Fondation de Climacy SA' },
        { n: 'Bussigny', d: 'Canton de Vaud' },
        { n: 'BIPV', d: 'Tuiles solaires intégrées à la toiture' },
        { n: 'EP 4020602 B1', d: 'Brevet européen sur sa technologie propriétaire' },
      ],
    },
    cofounder: {
      eyebrow: 'Le cofondateur et directeur',
      name: 'Alex Villela',
      role: 'Cofondateur et directeur',
      img: 'assets/photos/alex-villela.jpg',
      bio: [
        "Après une carrière internationale dans des fonctions de direction chez Nestlé, Alex s’est tourné vers l’entrepreneuriat et l’innovation. Sa conviction : les meilleures solutions ne demandent pas toujours plus de ressources, mais une autre manière de penser.",
        "Son ambition chez Climacy est de transformer les toitures en actifs énergétiques durables et de rendre le solaire intégré plus accessible, notamment grâce à la coproduction.",
      ],
      qa: { q: 'L’idée Climacy', a: "« Pourquoi poser une couverture inerte, puis la recouvrir de panneaux solaires ? Avec les tuiles Climacy, la couverture elle-même protège le bâtiment et produit son énergie. C’est tout le sens de “Make the roof itself solar”. »" },
    },
    cto: {
      eyebrow: 'Le CTO',
      name: 'Benjamin Strahm',
      role: 'CTO · Directeur technique',
      initials: 'BS',
      img: 'assets/photos/benjamin-strahm.jpg',
      bio: [
        "Ingénieur en science des matériaux et docteur en physique des plasmas de l'EPFL, Benjamin a consacré sa carrière à l'innovation photovoltaïque, de la recherche jusqu'au développement de produits solaires.",
        "Chez Climacy, il dirige le développement du produit en étroite collaboration avec les installateurs. Présent sur les chantiers, il identifie au plus près du terrain les améliorations à apporter à la tuile et à sa mise en œuvre.",
        "Il pilote également le développement commercial, ainsi que le développement et la gestion des projets.",
      ],
    },
    sales: {
      eyebrow: "La chargée d'affaires",
      name: 'Patricia Cagnazzo',
      role: "Chargée d'affaires",
      img: 'assets/photos/patricia-cagnazzo.jpg',
      bio: [
        "Forte de plus de quinze ans d'expérience en gestion administrative, commerciale et comptable, Patricia a également acquis une solide expérience en coordination de projets, notamment dans les secteurs de l'énergie et du développement durable.",
        "Chez Climacy, elle prend en charge la prospection et le suivi de la clientèle. Elle organise également les événements qui permettent de présenter la tuile Climacy.",
      ],
    },
    marketing: {
      eyebrow: 'Marketing et communication',
      name: 'Sira Ndiaye',
      role: 'Stagiaire en marketing et communication',
      img: 'assets/photos/sira-ndiaye.jpg',
      bio: [
        "Issue de HEC Lausanne, Sira a rejoint Climacy avec l'envie de faire connaître la tuile solaire au plus grand nombre.",
        "Elle donne une voix à la marque sur les réseaux sociaux et le site web, et accompagne l'équipe lors des rencontres avec les clients et les partenaires.",
      ],
    },
    founder: {
      eyebrow: 'Le cofondateur et administrateur',
      name: 'Thomas Söderström',
      role: 'Cofondateur et administrateur',
      img: 'assets/photos/thomas-soderstrom.jpg',
      bio: [
        "Il a fait ses armes dans l'industrie solaire suisse : formé à l'EPFL, docteur en microtechnique de l'Université de Neuchâtel, il a dirigé la R&D des modules chez Meyer Burger. Il dirige aujourd'hui le bureau d'ingénieurs Ström SA.",
        "Il en retient un paradoxe : la technologie progresse, mais sur les toits, le solaire se superpose encore à l'architecture au lieu de s'y intégrer.",
        "Climacy est sa réponse : une toiture solaire esthétique, performante et durable.",
      ],
      qa: { q: 'Pourquoi miser sur le solaire ?', a: "« Parce que l'énergie solaire tombe déjà sur nos toits, chaque jour. Il serait absurde de ne pas la capter. »" },
    },
  },
  audiences: {
    architectes: {
      context: {
        eyebrow: 'Le contexte',
        title: 'Une exigence énergétique, une réponse architecturale.',
        body: [
          "En construction neuve comme en réfection de toiture, la production d'électricité fait désormais partie du programme : les prescriptions énergétiques la prévoient de plus en plus, et les maîtres d'ouvrage l'attendent.",
          "Deux modes de mise en œuvre sont possibles : des panneaux posés en surimposition sur la couverture, ou des modules intégrés qui constituent eux-mêmes la couverture.",
        ],
        cols: [
          { h: 'En construction neuve', p: "La couverture solaire s'intègre dès la conception, dans la composition d'ensemble. Vous dessinez la toiture comme une cinquième façade, sans rupture ni élément rapporté." },
          { h: 'En rénovation de toiture', p: 'Lorsque la couverture est refaite, la tuile solaire remplace les tuiles existantes. Le bâtiment améliore son bilan énergétique et garde une toiture sobre et homogène.' },
        ],
        tagline: ["Le solaire s'impose au projet.", 'Son intégration relève du parti architectural.'],
      },
      integration: {
        eyebrow: "L'intégration",
        title: 'Une surface, pas un assemblage.',
        body: [
          "Chaque projet porte une intention : des proportions, des matériaux, une écriture que vous avez patiemment composée. L'intégration du photovoltaïque doit pouvoir répondre aux exigences énergétiques sans compromettre les lignes et l'identité architecturale que vous avez conçues.",
          "Avec Climacy, la tuile solaire remplace directement la couverture et devient une véritable surface architecturale, continue et homogène, sans cadres ni éléments rapportés. La technologie s'efface au profit de l'architecture.",
        ],
        compare: [
          { h: 'Le panneau rapporté', p: 'Posé sur la couverture : cadres, reliefs, ruptures visuelles' },
          { h: 'La tuile intégrée', p: 'Remplace la couverture : surface continue, plane, sans rupture' },
        ],
        tagline: ["La performance d'un panneau.", "La discrétion d'une toiture."],
      },
      formats: {
        eyebrow: 'La mise en œuvre',
        title: 'Trois formats pour s’adapter à chaque géométrie de toiture.',
        body: "Une toiture a rarement des proportions de panneau standard. La tuile Climacy se décline en trois formats (entier, demi et quart) qui se combinent pour couvrir le pan jusqu'aux rives et limiter les surfaces non couvertes autour des émergences.",
        cols: [
          { h: 'Un calepinage sur mesure', p: "Climacy établit le plan d'implantation des tuiles pour chaque toiture, en tenant compte de la géométrie, des émergences et de la production visée. Les détails de rive, de faîtage et de raccord sont fournis avec le calepinage." },
          { h: 'Caractéristiques techniques', list: ['Pose directe sur lattage, comme une couverture traditionnelle', 'Recouvrement de 10 cm pour une étanchéité continue', 'Verre trempé, résistance à la grêle de classe 4 ou 5', 'Modules sans cadre, cellules TOPCon, structure verre-verre'] },
        ],
        table: [
          { k: 'CLIMACY L', d: 'tuile entière', dim: '1’856 × 1’128 mm', w: '455 Wc' },
          { k: 'CLIMACY M', d: 'demi-tuile', dim: '978 × 1’128 mm', w: '225 Wc' },
          { k: 'CLIMACY S', d: 'quart de tuile', dim: '539 × 1’128 mm', w: '110 Wc' },
        ],
      },
      client: {
        eyebrow: "L'argument client",
        title: 'Un atout à offrir à votre maître d\'ouvrage.',
        body: "Une toiture productive confère au bâtiment de meilleures performances, une plus grande pérennité et une valeur accrue.",
        boxes: [
          { h: 'Un bien valorisé', p: 'Une toiture productive et durable augmente la valeur du bâtiment et anticipe les exigences énergétiques.' },
          { h: 'Des charges réduites', p: "L'électricité produite allège durablement les factures, en neuf comme en rénovation." },
        ],
      },
      support: {
        eyebrow: 'Notre accompagnement',
        title: 'Vous prescrivez. Nous vous accompagnons.',
        body: "Vous gardez la maîtrise du projet. Climacy fournit l'expertise photovoltaïque et la documentation technique nécessaires à la prescription. Sur la base de vos plans, nous établissons un premier calepinage, sans engagement.",
        boxes: [
          { t: '01', h: 'Fiches et détails CAO', p: "Performances, dimensions, coupes, raccords et plans d'implantation." },
          { t: '02', h: 'Appui en commission', p: "Arguments, références et dossiers visuels pour justifier l'intégration de la toiture dans le site." },
          { t: '03', h: 'Coordination chantier', p: "Lien avec le couvreur et l'électricien jusqu'à la mise en service." },
        ],
      },
      together: {
        eyebrow: 'Travaillons ensemble',
        title: 'Votre prochain projet peut produire.',
        body: "Vous avez un projet en conception, neuf ou en rénovation ? Associez Climacy dès maintenant : nous vous fournissons les spécifications, les principes d'implantation et les premiers calepinages, sans engagement.",
        steps: [
          { k: 'Prise de contact', p: 'Un échange sur votre projet et ses contraintes d\'intégration.' },
          { k: 'Appui technique', p: "Spécifications, calepinage, détails CAO et éléments pour l'autorisation." },
          { k: 'Réalisation', p: "Coordination avec les corps de métier jusqu'à la mise en service." },
        ],
      },
    },
    ppe: {
      context: {
        eyebrow: 'Le contexte',
        title: "Votre copropriété rénove. C'est le bon moment.",
        body: [
          "Réfection de toiture, isolation, mise aux normes : votre assemblée vote un chantier qui n'arrive qu'une fois par génération.",
          "Pendant les travaux, chaque mètre carré de couverture peut devenir une surface de production partagée par tout l'immeuble.",
        ],
        cols: [
          { h: 'Une obligation qui se profile', p: "Les bâtiments mal notés énergétiquement seront contraints de rénover leur enveloppe : isolation, étanchéité, couverture." },
          { h: 'Une opportunité patrimoniale', p: "Une toiture solaire valorise l'immeuble, réduit les charges communes et protège contre la hausse du prix de l'électricité." },
        ],
        tagline: "Rénover une fois. Produire pour tout l'immeuble, pendant une génération.",
      },
      concrete: {
        eyebrow: 'Ce que cela représente concrètement',
        text: "Une toiture d'immeuble de 300 m² produit environ 80 000 kWh par an : de quoi alimenter les communs et une large part des appartements.",
      },
      share: {
        eyebrow: 'La répartition',
        title: 'Une énergie partagée équitablement.',
        body: "L'électricité produite profite à l'ensemble de l'immeuble : elle alimente d'abord les parties communes, puis les appartements, chacun selon sa consommation réelle.",
        top: 'La toiture produit : une centrale solaire sur le toit de l’immeuble',
        boxes: [
          { h: 'Les communs', p: 'Éclairage, ascenseur, PAC collective, buanderie, bornes de recharge', r: 'charges communes réduites' },
          { h: 'Les appartements', p: 'Chaque lot consomme sa part d’électricité à tarif préférentiel', r: 'factures individuelles allégées' },
          { h: 'Le surplus', p: 'L’énergie non consommée est injectée et valorisée sur le réseau', r: 'revenus pour la copropriété' },
        ],
        faq: { q: "L'énergie est-elle répartie équitablement entre les lots ?", a: 'Oui. Chaque lot consomme sa part selon sa consommation réelle et mesurée, et les charges communes baissent pour tous.' },
      },
      regie: {
        eyebrow: 'Pour la régie',
        title: 'Les éléments pour éclairer le vote de votre assemblée.',
        body: 'Climacy accompagne la régie à chaque étape et lui fournit les documents nécessaires à une décision éclairée.',
        items: [
          { h: 'Une étude personnalisée', p: 'potentiel de production et économies estimées.' },
          { h: "Le plan de répartition de l'énergie", p: 'entre parties communes et appartements, transparent et équitable.' },
          { h: 'La coordination avec vos mandataires', p: 'architecte, couvreur, ferblantier et électricien, sans bouleverser le chantier prévu.' },
        ],
        tagline: ['Nous ne remplaçons pas vos mandataires.', 'Nous équipons leur travail, et nous outillons votre assemblée.'],
      },
    },
  },
  faq: [
    { theme: 'Le produit', items: [
      { q: 'Quelle est la différence avec des panneaux solaires classiques ?', a: "La tuile Climacy ne se pose pas sur le toit : elle est le toit. Elle remplace la couverture traditionnelle et forme une surface plane et continue, sans cadre ni relief." },
      { q: 'Ma toiture est-elle compatible ?', a: "Climacy travaille sur les toits en pente. Trois formats de modules (entier, demi et quart) s'adaptent à la géométrie de chaque toiture, jusqu'aux rives et autour des fenêtres de toit et des cheminées." },
      { q: 'Combien produit une toiture Climacy ?', a: "Une toiture Climacy produit environ 280 kWh par m² et par an, selon l'orientation et l'ensoleillement. Une toiture de 120 m² produit environ 30 000 kWh par an." },
      { q: 'Résiste-t-elle à la grêle et à la neige ?', a: "Oui. Le verre trempé sur les deux faces atteint la classe de grêle HW4, ou HW5 avec un verre de 3 mm. La tuile supporte jusqu'à 8000 Pa de charge de neige." },
      { q: 'Quelles sont les garanties ?', a: "La tuile bénéficie d'une garantie produit de 10 ans et d'une garantie de performance de plus de 85 % de la puissance initiale après 30 ans. Les coûts de remplacement sont assurés." },
    ] },
    { theme: 'La pose', items: [
      { q: 'Qui pose la tuile ?', a: "La pose est assurée par votre couvreur, sur lattage, comme pour une couverture classique. Climacy fournit le produit, la documentation et la coordination. L'électricien s'occupe du raccordement." },
      { q: "Dois-je changer d'architecte ou de couvreur ?", a: "Non. La tuile s'intègre au chantier que vous menez déjà, avec les professionnels que vous avez choisis." },
    ] },
    { theme: 'Le financement', items: [
      { q: 'Existe-t-il des subventions ?', a: "Oui. La Rétribution Unique fédérale (Pronovo) réduit le coût de toute installation. Dans le canton de Vaud, une aide cantonale soutient aussi les toitures solaires intégrées sur les bâtiments protégés : jusqu'à 40 % du coût, plafonnée à 50 000 CHF. Enfin, certaines communes subventionnent le photovoltaïque : renseignez-vous auprès de la vôtre." },
      { q: 'Quelle solution si mon budget ne couvre pas le supplément solaire ?', a: "Avec la Coproduction Solaire, Climacy finance le supplément. Vous achetez l'électricité de votre toit à tarif préférentiel pendant 30 ans, puis toute la production vous revient." },
      { q: 'Que se passe-t-il en cas de vente du bien durant ces 30 ans ?', a: "Le partenariat est attaché au bien et se transmet au nouvel acquéreur dans les mêmes conditions." },
      { q: "Puis-je racheter l'installation avant la fin ?", a: "Oui, à tout moment, selon les conditions prévues dans le contrat." },
    ] },
    { theme: 'Le projet', items: [
      { q: "Comment se déroule l'étude gratuite ?", a: "Elle débute par un premier échange consacré à votre projet, puis aboutit à une étude personnalisée : production estimée, supplément réel, économies attendues et, si vous le souhaitez, le scénario de Coproduction. La réponse intervient sous 48 h ouvrées." },
      { q: 'Que devient la tuile en fin de vie ?', a: "Elle est recyclée via SENS eRecycling, grâce à la taxe anticipée de recyclage." },
    ] },
  ],
  contact: {
    addr: ['Chemin de la Mochettaz 7', '1030 Bussigny (VD), Suisse'],
    phone: '+41 21 510 31 51',
    email: 'info@climacy.ch',
    web: 'www.climacy.ch',
  },
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/climacy.ch/', logo: 'assets/social/instagram-white.png' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/climacy', logo: 'assets/social/linkedin-white.png' },
  ],
  footer: {
    addr: 'CLIMACY SA · Bussigny (VD)',
    tag: 'Tuiles solaires intégrées · Suisse romande',
    cols: [
      { h: 'Produit', items: ['La tuile solaire', 'Performance', 'Caractéristiques', 'Garanties'] },
      { h: 'Solutions', items: ['Particuliers', 'Coproduction Solaire', 'Copropriétés (PPE)', 'Architectes'] },
      { h: 'Climacy', items: ['À propos', 'info@climacy.ch', '+41 21 510 31 51', 'www.climacy.ch'] },
    ],
  },
};

export { CLIMACY };

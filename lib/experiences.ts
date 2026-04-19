export type Experience = {
  slug: string;
  title: string;
  label: string;
  image: string;
  intro: string;
  details: string[];
  titleEn?: string;
  labelEn?: string;
  introEn?: string;
  detailsEn?: string[];
  pdf?: string;
};

export const experiences: Experience[] = [
  {
    slug: "mes-etudes",
    title: "Mes Etudes",
    titleEn: "My Studies",
    label: "Formation",
    labelEn: "Education",
    image: "/experiences/tsm-ecole-management-toulouse.webp",
    intro:
      "Un parcours oriente management et marketing, avec une ambition claire : devenir expert du marketing digital.",
    introEn:
      "A management and marketing track with a clear goal: becoming a digital marketing expert.",
    details: [
      "2026-2028 : Integrer un Master Marketing en alternance pour construire une expertise solide en marketing digital.",
      "2026 : Obtention de la licence Management de TSM, gage d'excellence academique.",
      "2023 : Baccalaureat general, specialites Maths/Physique.",
      "2023-aujourd'hui : Autodidacte en developpement web et d'applications, forme via les ressources en ligne.",
    ],
    detailsEn: [
      "2026-2028: Plan to join a work-study Master's in Marketing to build strong digital marketing expertise.",
      "2026: TSM Management Bachelor's degree, a mark of academic excellence.",
      "2023: General baccalaureate with Math/Physics specializations.",
      "2023-present: Self-taught in web and app development using online resources.",
    ],
  },
  {
    slug: "stage-marketing",
    title: "Stage Marketing",
    titleEn: "Marketing Internship",
    label: "Business",
    labelEn: "Business",
    image: "/stages/aimsun.jpg",
    intro:
      "Stage de 2 mois a Paris en tant que responsable de communication, au coeur des actions marketing et de la production de contenu.",
    introEn:
      "Two-month internship in Paris as a communication lead, at the core of marketing actions and content production.",
    details: [
      "2025 : stage marketing chez Aimsun SARL (19 boulevard Malesherbes, 75008 Paris), du 12/05/2025 au 08/07/2025, en tant que responsable de communication.",
      "Construction d'un plan de communication et d'un plan media, avec une vraie logique business.",
      "Production de contenus (podcast, video, webinar) et organisation d'evenements professionnels physiques.",
      "Gestion des reseaux sociaux en multiformat pour renforcer l'image de marque.",
      "Mise en place d'automatisations avec Make et Zapier, plus CRM et newsletters pour les campagnes de mailing.",
      "Force de proposition et progression acceleratee grace aux equipes de Londres et Barcelone.",
    ],
    detailsEn: [
      "2025: marketing internship at Aimsun SARL (19 boulevard Malesherbes, 75008 Paris), from 12/05/2025 to 08/07/2025, as communication lead.",
      "Built a communication plan and a media plan grounded in business goals.",
      "Produced content (podcasts, videos, webinars) and organized in-person professional events.",
      "Managed social media with multiformat content to strengthen brand image.",
      "Implemented automations with Make and Zapier, plus CRM and newsletters for email campaigns.",
      "Proactive mindset and fast growth through collaboration with London and Barcelona teams.",
    ],
  },
  {
    slug: "voyage-photo",
    title: "Ambassadeur ASICS",
    titleEn: "ASICS Ambassador",
    label: "Vente & relation client",
    labelEn: "Sales & customer care",
    image: "/experiences/ASICS.jpg",
    intro:
      "Ambassadeur ASICS pendant deux mois chez Intersport Labège, avec pour mission de representer la marque, conseiller et accompagner les clients.",
    introEn:
      "ASICS ambassador for two months at Intersport Labege, representing the brand while advising and supporting customers.",
    details: [
      "2026 : presence tous les samedis de mars et avril chez Intersport Labège.",
      "Presentation de la marque ASICS et vente de chaussures, avec une approche conseil multi-marques selon les besoins clients.",
      "Objectif : offrir une excellente image pour ASICS et le magasin qui m'a accueilli.",
      "Premiere experience retail : j'ai decouvert la vente terrain et le contact client direct, et j'ai aime ca.",
      "Ecoute active et capacite de recommendation : comprendre le besoin, orienter vers le bon produit, rassurer.",
      "Competences renforcees : relation client, argumentation, sens du service et confiance en soi.",
    ],
    detailsEn: [
      "2026: present every Saturday in March and April at Intersport Labege.",
      "Presented the ASICS brand and sold running shoes, while advising customers across brands based on their needs.",
      "Goal: deliver an excellent image for ASICS and the hosting store.",
      "First retail experience: discovered on-floor sales and direct customer contact, and I enjoyed it.",
      "Active listening and recommendation skills: understand needs, guide to the right product, build confidence.",
      "Stronger skills: customer relations, sales argumentation, service mindset, and confidence.",
    ],
  },
  {
    slug: "musique-live",
    title: "Tuteur",
    titleEn: "Student Tutor",
    label: "Pedagogie",
    labelEn: "Teaching",
    image: "/experiences/tuteur.webp",
    intro:
      "Tuteur etudiant a l'UT1 pendant ma L3 a TSM, pour aider les etudiants a comprendre les cours de management.",
    introEn:
      "Student tutor at UT1 during my third year at TSM, helping students understand management subjects.",
    details: [
      "2025-2026 : tuteur etudiant pour l'Universite Toulouse Capitole (UT1), dans la plus grande bibliotheque de l'universite.",
      "Accompagnement sur des matieres de management : marketing, comptabilite, mathematiques, entre autres.",
      "Une equipe de 20 tuteurs : 17 en droit, 1 a TSM (moi), 2 en finance/economie.",
      "Organisation des rendez-vous, ecoute active, capacite d'expliquer simplement.",
      "Environ une centaine de rendez-vous pour aider des etudiants a progresser.",
      "Competences renforcees : communication, pedagogie, patience et sens du service.",
    ],
    detailsEn: [
      "2025-2026: student tutor for Universite Toulouse Capitole (UT1) in the university's largest library.",
      "Supported management subjects including marketing, accounting, and mathematics.",
      "Team of 20 tutors: 17 in law, 1 at TSM (me), 2 in finance/economics.",
      "Scheduling sessions, active listening, and explaining concepts clearly.",
      "Around one hundred sessions to help students make progress.",
      "Stronger skills: communication, teaching, patience, and service mindset.",
    ],
  },
  {
    slug: "podcast",
    title: "Mon podcast entrepreneuriat",
    titleEn: "Entrepreneurship Podcast",
    label: "Communication",
    labelEn: "Communication",
    image: "/experiences/podcast.png",
    intro:
      "En 2024, j'ai lance Newpreneur pour interviewer des entrepreneurs francais et apprendre l'entrepreneuriat avec eux.",
    introEn:
      "In 2024, I launched Newpreneur to interview French entrepreneurs and learn about entrepreneurship alongside them.",
    details: [
      "Podcast Newpreneur (YouTube et Spotify) avec plus de 50 interviews en 2024.",
      "Objectif : apprendre l'entrepreneuriat et partager les apprentissages avec la communaute.",
      "Preparation des episodes, montage, publication et production de formats courts (TikTok, YouTube Shorts).",
      "Creation d'un reseau solide sur LinkedIn (4000+ abonnes et relations).",
      "Le reseau cree m'a aide a trouver mon stage marketing a Paris.",
      "Competences renforcees : ecoute, communication, rigueur, communication digitale, creation de contenus, networking, podcasting.",
    ],
    detailsEn: [
      "Newpreneur podcast (YouTube and Spotify) with 50+ interviews in 2024.",
      "Goal: learn entrepreneurship and share the insights with the community.",
      "Episode preparation, editing, publishing, and short-form content (TikTok, YouTube Shorts).",
      "Built a strong LinkedIn network (4,000+ followers and connections).",
      "That network helped me secure my marketing internship in Paris.",
      "Stronger skills: listening, communication, rigor, digital communication, content creation, networking, podcasting.",
    ],
  },
  {
    slug: "lecture-ecriture",
    title: "Developpement Web",
    titleEn: "Web Development",
    label: "Tech",
    labelEn: "Tech",
    image: "/experiences/dev.webp",
    intro:
      "Autodidacte, je conçois des sites et des applications modernes en alliant code, produit et iteration rapide.",
    introEn:
      "Self-taught, I build modern websites and apps by combining code, product thinking, and fast iteration.",
    details: [
      "Formation autonome via des ressources en ligne, en partant des bases (HTML, CSS, JavaScript).",
      "Aujourd'hui, j'utilise des frameworks comme Next.js et Nuxt pour livrer des experiences web au gout du jour.",
      "Developpement d'applications mobiles natives publiees sur le Play Store et l'App Store.",
      "Demarche entrepreneuriale : tester, mesurer, iterer, et comprendre ce qui marche vraiment.",
      "Le web evolue vers du prompting et du debugging : une logique proche du prompt engineering.",
      "Vous avez un projet ? Discutons-en et construisons une solution utile et efficace.",
    ],
    detailsEn: [
      "Self-training through online resources, starting from the fundamentals (HTML, CSS, JavaScript).",
      "Today I use frameworks like Next.js and Nuxt to deliver modern web experiences.",
      "I also build native mobile apps published on the Play Store and the App Store.",
      "Entrepreneurial approach: test, measure, iterate, and learn what truly works.",
      "Web development is shifting toward prompting and debugging, close to prompt engineering.",
      "Have a project? Let's talk and build a useful, effective solution.",
    ],
  },
  {
    slug: "passions",
    title: "Passions",
    titleEn: "Passions",
    label: "Equilibre",
    labelEn: "Balance",
    image: "/experiences/marathon-toulouse.webp",
    intro:
      "Le sport et la curiosite structurent mon quotidien : j'aime me fixer des objectifs exigeants et decouvrir de nouvelles choses.",
    introEn:
      "Sport and curiosity shape my routine: I like demanding goals and discovering new things.",
    details: [
      "Running et trail : marathon de Toulouse 2025, entrainement en cours pour un trail de 100 km.",
      "Experience TBZ Survivor (backyard) : boucle de 8.2 km, depart 16h, fin 6h, edition 2026 rendue tres difficile par la pluie et un terrain impraticable.",
      "Le running est social : il permet de rencontrer du monde, de se fixer des objectifs et de renforcer le mental.",
      "Prochain objectif : marathon du Pic des Trois Seigneurs (3100 m de D+) dans les Pyrenees.",
      "J'aime la nature, ce qui m'a naturellement oriente vers le trail, et j'aime aussi l'escalade, le padel et la musculation.",
      "Decouvrir : je lis beaucoup (biographies, developpement personnel, sante). Livre conseille : Why We Sleep de Matthew Walker.",
      "J'aime l'art (moderne et architecture) et comprendre le point de vue des autres : c'est enrichissant.",
    ],
    detailsEn: [
      "Running and trail: Toulouse Marathon 2025, currently training for a 100 km trail race.",
      "TBZ Survivor (backyard) experience: 8.2 km loop, start 4pm, finish 6am; the 2026 edition was extremely tough due to heavy rain and muddy terrain.",
      "Running is social: it helps you meet people, set goals, and strengthen mental resilience.",
      "Next goal: Pic des Trois Seigneurs marathon (3,100 m elevation gain) in the Pyrenees.",
      "I love nature, which drew me to trail running, and I also enjoy climbing, padel, and strength training.",
      "Discovering new things: I read a lot (biographies, personal development, health). Recommended book: Why We Sleep by Matthew Walker.",
      "I enjoy art (modern and architecture) and understanding other perspectives; it is enriching.",
    ],
  },
  {
    slug: "cv",
    title: "Mon CV",
    titleEn: "Resume",
    label: "Parcours",
    labelEn: "Resume",
    image: "/experiences/CV.jpg",
    pdf: "/experiences/CV Cyprien Rubio Master Marketing.pdf",
    intro:
      "Une vue claire de mon parcours, de mes experiences et des competences que je mobilise sur les projets.",
    introEn:
      "A clear view of my background, experiences, and the skills I bring to projects.",
    details: [
      "Formation et experiences professionnelles.",
      "Competences techniques et methodes de travail.",
    ],
    detailsEn: [
      "Education and professional experience.",
      "Technical skills and ways of working.",
    ],
  },
];

export function getExperience(slug: string) {
  return experiences.find((item) => item.slug === slug);
}

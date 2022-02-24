const span = document.querySelector("#buttonLangue");
const classes = span.classList;

span.addEventListener('click', function() {
    const result = classes.toggle("🇫🇷");

    if (result) {
        span.textContent = `🇫🇷`;
        toggleLanguage('English');

    } else {
        span.textContent = `🇬🇧`;
        toggleLanguage('French');

    }
})

function toggleLanguage(language) {
  let description = document.getElementById("apropos");

  let formationButton = document.getElementById("formationButton");
  let experienceButton = document.getElementById("experienceButton");
  let hobbiesButton = document.getElementById("hobbiesButton");
  let contactButton = document.getElementById("contactButton");

  let enQuelquesMots = document.getElementById("enQuelquesMots");
  let enQuelquesMotsText1 = document.getElementById("enQuelquesMotsText1");
  let enQuelquesMotsTitre2 = document.getElementById("enQuelquesMotsTitre2");
  let enQuelquesMotsText2 = document.getElementById("enQuelquesMotsText2");

  let formationTitre1 = document.getElementById("formationTitre1");
  let formationText1 = document.getElementById("formationText1");
  let formationTitre2 = document.getElementById("formationTitre2");
  let formationText2 = document.getElementById("formationText2");

  let competencesTitre = document.getElementById("competencesTitre");
  let skills1 = document.getElementById("skills1");
  let skills2 = document.getElementById("skills2");
  let skills3 = document.getElementById("skills3");
  let skills4 = document.getElementById("skills4");
  let skills5 = document.getElementById("skills5");
  let skills6 = document.getElementById("skills6");
  let skills7 = document.getElementById("skills7");
  let skills8 = document.getElementById("skills8");
  let skills9 = document.getElementById("skills9");

  let hobbiesTitre1 = document.getElementById("hobbiesTitre1");
  let hobbiesTexte1 = document.getElementById("hobbiesTexte1");
  let hobbiesTexte2 = document.getElementById("hobbiesTexte2");
  let passions = document.getElementById("passions");

  let contactTitre = document.getElementById("contactTitre");

  let expTitre1 = document.getElementById("expTitre1");
  let expText11 = document.getElementById("expText11");
  let expText12 = document.getElementById("expText12");
  let expText13 = document.getElementById("expText13");
  let expText14 = document.getElementById("expText14");

  let expTitre2 = document.getElementById("expTitre2");
  let expText21 = document.getElementById("expText21");
  let expText22 = document.getElementById("expText22");
  let expText23 = document.getElementById("expText23");
  let expText24 = document.getElementById("expText24");
  let expText25 = document.getElementById("expText25");

  let realisationTitre = document.getElementById("realisationTitre");
  let realisationTitre1 = document.getElementById("realisationTitre1");
  let realisationTitre11 = document.getElementById("realisationTitre11");
  let realisationText11 = document.getElementById("realisationText11");
  let realisationText12 = document.getElementById("realisationText12");
  let realisationText13 = document.getElementById("realisationText13");
  let realisationText14 = document.getElementById("realisationText14");
  let realisationText15 = document.getElementById("realisationText15");
  let realisationText16 = document.getElementById("realisationText16");
  let realisationText17 = document.getElementById("realisationText17");

  let realisationTitre2 = document.getElementById("realisationTitre2");
  let realisationTitre21 = document.getElementById("realisationTitre21");
  let realisationText21 = document.getElementById("realisationText21");
  let realisationText22 = document.getElementById("realisationText22");
  let realisationText23 = document.getElementById("realisationText23");
  let realisationText24 = document.getElementById("realisationText24");
  let realisationText25 = document.getElementById("realisationText25");

  let realisationTitre3 = document.getElementById("realisationTitre3");
  let realisationTitre31 = document.getElementById("realisationTitre31");
  let realisationText31 = document.getElementById("realisationText31");
  let realisationText32 = document.getElementById("realisationText32");
  let realisationText33 = document.getElementById("realisationText33");
  let realisationText34 = document.getElementById("realisationText34");
  let realisationText35 = document.getElementById("realisationText35");
  let realisationText36 = document.getElementById("realisationText36");

  let realisationTitre4 = document.getElementById("realisationTitre4");
  let realisationTitre41 = document.getElementById("realisationTitre41");
  let realisationText41 = document.getElementById("realisationText41");
  let realisationText42 = document.getElementById("realisationText42");
  let realisationText43 = document.getElementById("realisationText43");
  let realisationText44 = document.getElementById("realisationText44");
  let realisationText45 = document.getElementById("realisationText45");

  let realisationTitre5 = document.getElementById("realisationTitre5");
  let realisationTitre51 = document.getElementById("realisationTitre51");
  let realisationText51 = document.getElementById("realisationText51");
  let realisationText52 = document.getElementById("realisationText52");
  let realisationText53 = document.getElementById("realisationText53");
  let realisationText54 = document.getElementById("realisationText54");
  let realisationText55 = document.getElementById("realisationText55");
  let realisationText56 = document.getElementById("realisationText56");
  let realisationText57 = document.getElementById("realisationText57");

  let realisationTitre6 = document.getElementById("realisationTitre6");
  let realisationTitre61 = document.getElementById("realisationTitre61");
  let realisationText61 = document.getElementById("realisationText61");
  let realisationText62 = document.getElementById("realisationText62");
  let realisationText63 = document.getElementById("realisationText63");
  let realisationText64 = document.getElementById("realisationText64");
  let realisationText65 = document.getElementById("realisationText65");
  let realisationText66 = document.getElementById("realisationText66");
  let realisationText67 = document.getElementById("realisationText67");
  let realisationText68 = document.getElementById("realisationText68");

  let realisationTitre7 = document.getElementById("realisationTitre7");
  let realisationTitre71 = document.getElementById("realisationTitre71");
  let realisationText71 = document.getElementById("realisationText71");
  let realisationText72 = document.getElementById("realisationText72");
  let realisationText73 = document.getElementById("realisationText73");

  let info1 = document.getElementById("info1");
  let info2 = document.getElementById("info2");
  let info3 = document.getElementById("info3");
  let info4 = document.getElementById("info4");
  let info5 = document.getElementById("info5");
  let info6 = document.getElementById("info6");

  if (language === "French") {
    description.innerHTML = "A propos";
    formationButton.innerHTML = "Formation";
    experienceButton.innerHTML = "Experience";
    hobbiesButton.innerHTML = "Hobbies";
    contactButton.innerHTML = "Contact";

    enQuelquesMots.innerHTML = "En quelques mots";
    enQuelquesMotsText1.innerHTML =
      "Après presque 10 ans dans la restauration et avoir mûrement préparé ma reconversion, j’ai donc décidé de me tourner vers un métier qui me passionne depuis longtemps à savoir les nouvelles technologies et plus particulièrement le developpement web. Ce métier est pour moi magnifique car les seules limites d'un bon développeur sont son imagination et sa créativité. ";
    enQuelquesMotsTitre2.innerHTML =
      "Étudiant à La Sorbonne | CFA des Sciences";
    enQuelquesMotsText2.innerHTML =
      "Grâce à ma double formation, à la fois dans la restauration, dans l’informatique et à une somme d’expériences professionnelles performantes, j’ai acquis une certaine rigueur, un sens de l’organisation et une capacité à m’adapter très facilement. Le travail en équipe et la rapidité d’exécution sont par essence des valeurs essentielles dans la restauration, que je souhaite mettre au service du métier de développeur web. Je ne souhaite plus être spectateur mais acteur dans ce monde en perpétuel changement et renouvellement.";

    formationTitre1.innerHTML =
      "Licence Projet Web et Mobile Sorbonne Université | CFA des Sciences";
    formationText1.innerHTML =
      "Création graphique et animations Web </br>POO et Architecture Logicielle, conception de bases de données pour le Web Frameworks pour le développement Back Office</br>Réseaux et Sécurité, Système d’exploitation et Serveur Web</br>UX design et Ergonomie</br>Développement Mobile</br>Gestion de projet Web, Méthodes Agiles</br>";
    formationTitre2.innerHTML =
      "Analyste développeur d’applications informatiques ESIEE Paris Tech | Paris";
    formationText2.innerHTML =
      "Formation ayant pour but d’acquérir les techniques de codage, d’analyse de projet et d’intégration technique de nouvelles technologies numériques. Les cours sont dispensés selon des méthodes SCRUM - Agiles autour de projets ( sprint ) en équipe sous la responsabilité d’un coach.";

    competencesTitre.innerHTML = "Compétences clés";
    skills1.innerHTML = "Création de sites dynamiques pour restaurants";
    skills2.innerHTML = "Méthodes Agiles";
    skills3.innerHTML = "Planification et gestion de projet";
    skills4.innerHTML = "Langage de programmation orienté objet";
    skills5.innerHTML = "Fiable et rigoureux";
    skills6.innerHTML =
      "Réactif et toujours à la pointe des dernières technologies";
    skills7.innerHTML = "Enthousiaste et curieux";
    skills8.innerHTML = "Sens du relationnel";
    skills9.innerHTML = "Créatif et imaginatif";

    hobbiesTitre1.innerHTML = "Globe trotter amateur de découvertes";
    hobbiesTexte1.innerHTML =
      "Voyage culinaire à vélo en Europe ( 12 pays - 8000km )";
    hobbiesTexte2.innerHTML = "Nombreux sentiers de GR et voyages en backpack";
    passions.innerHTML =
      "Passionné par les nouvelles technologies, la musique et la cinématographie";

    contactTitre.innerHTML = "Vous pouvez me joindre par : ";

    expTitre1.innerHTML = "Stage développeur full-stack - BBFT";
    expText11.innerHTML =
      "Création d’une plate-forme web de vente de produits de fitness";
    expText12.innerHTML =
      "Vision globale des objectifs d’accessibilité, d’attractivité, de référencement, d’ergonomie et de légitimité ainsi qu’un module de visualisation de la salle en 3D";
    expText13.innerHTML = "Création du site web en PHP / MySQL / JS / Three.js";
    expText14.innerHTML =
      "Veille et validation du code pour garantir la compatibilité et la sécurité de la plate-forme de vente";

    expTitre2.innerHTML = "Développeur front-end - Aero-Bay";
    expText21.innerHTML = "Réalisation de la nouvelle identité visuelle";
    expText22.innerHTML = "Lancement de nouvelles fonctionnalités ( services )";
    expText23.innerHTML = "Utilisation de Figma / HTML5 / CSS3 / JS / Java";
    expText24.innerHTML = "Refonte de l'intranet (UI/UX)";
    expText25.innerHTML = "Réalisation du design des posts LinkedIn";

    realisationTitre.innerHTML = "Réalisations";
    realisationTitre1.innerHTML =
      "SCHOOL & U - Application de carnet connecté ";
    realisationTitre11.innerHTML =
      "Réalisation d'une application en React-Native pour faciliter la communication des parents et des professeurs. L'application est disponible pour iOS, Android et Web.";
    realisationText11.innerHTML = "Identification";
    realisationText12.innerHTML =
      "Messagerie: chat commun et/ou entre deux parents de la classe";
    realisationText13.innerHTML =
      "Blog: affichage des photos et messages de la maitresse concernant la classe";
    realisationText14.innerHTML = "Carnet de liaison";
    realisationText15.innerHTML =
      "Modification des informations et ajout d'un nouvel enfant";
    realisationText16.innerHTML = "Base de données : Firebase & Firestore";
    realisationText17.innerHTML = "Aller sur GitHub";

    realisationTitre2.innerHTML =
      "Feelin'Food mobile - Application de vente à emporter pour restaurant";
    realisationTitre21.innerHTML =
      "Réalisation d'une application en React-Native de vente à emporter pour restaurants. Projet réalisé en React-Native sur Snack. ";
    realisationText21.innerHTML = "Page de connexion";
    realisationText22.innerHTML =
      "Page home : affichage des restaurants & cathégorie";
    realisationText23.innerHTML = "Redirection vers le restaurants sélectionné";
    realisationText24.innerHTML = "Panier & Validation du paiement";
    realisationText25.innerHTML = "Aller sur Snack";

    realisationTitre3.innerHTML =
      "Feelin'Food - site pour restaurant click & collect";
    realisationTitre31.innerHTML =
      "Réalisation d'un site dynamique pour restaurant souhaitant mettre en place de la vente à emporter Ce projet a été réalisé en: HTML5, CSS3, PHP, mySQL, Vanilla JS.";
    realisationText31.innerHTML = "Identification";
    realisationText32.innerHTML =
      "Infos restaurant - possibilité de suivre sur une carte";
    realisationText33.innerHTML = "Compte utilisateur";
    realisationText34.innerHTML =
      "Suivi des fournisseurs, stocks, fiches techniques";
    realisationText35.innerHTML = "Click & collect";
    realisationText36.innerHTML = "Aller sur le site";

    realisationTitre4.innerHTML = "Projet Vue.js";
    realisationTitre41.innerHTML =
      "HTML5, CSS3, VANILLA JS, VUE.JS - Projet regroupant différentes fonctionnalités Vue.js";
    realisationText41.innerHTML = "Horloge (Vue-Clock2)";
    realisationText42.innerHTML = "Horloge digitale (Date-fns)";
    realisationText43.innerHTML =
      "Création d'un formulaire dynamique en drag & drop (FormBuilder)";
    realisationText44.innerHTML =
      "Liste des différents Bitcoins et barre de recherche (Axios)";
    realisationText45.innerHTML = "Aller sur GitHub";

    realisationTitre5.innerHTML = "Projet Vanilla JS";
    realisationTitre51.innerHTML =
      "Projet regroupant différentes fonctionnalités en JS Vanilla ";
    realisationText51.innerHTML = "ToDo List";
    realisationText52.innerHTML =
      "Modifier le contenu du site avec l'espace Admin";
    realisationText53.innerHTML = "Recherche d'utilisateurs GitHub";
    realisationText54.innerHTML = "Quizz";
    realisationText55.innerHTML = "App Météo";
    realisationText56.innerHTML = "Lecteur MP3 avec barre d'oscillation 2D";
    realisationText51.innerHTML = "Théme jour/nuit - custom";

    realisationTitre6.innerHTML = "Projet E-Shop Java";
    realisationTitre61.innerHTML =
      "Application de magasin en ligne en Java (terminal & Swing) ";
    realisationText61.innerHTML = "Commandes";
    realisationText62.innerHTML = "Visibilité des produits";
    realisationText63.innerHTML = "Ajout dans le panier";
    realisationText64.innerHTML = "Paiement";
    realisationText65.innerHTML = "Admin";
    realisationText66.innerHTML = "Visibilité des commabdes clients";
    realisationText67.innerHTML = "Ajout des produits";
    realisationText68.innerHTML = "Commandes clients";

    realisationTitre7.innerHTML = "Projet jeu de plates-formes java";
    realisationTitre71.innerHTML ="Projet jeu de plateformes en tour par tour ";
    realisationText71.innerHTML = "Ennemis différents en fonction des salles";
    realisationText72.innerHTML = "Gestion de la vie";
    realisationText73.innerHTML = "Gestion des armes";

    info1.innerHTML ="Double click sur le portail pour entrer dans une autre dimension";
    info2.innerHTML = "Flèches directionnelles pour déplacer le renard";
    info3.innerHTML ="Possibilité de changer la langue ( FR / EN ) en cliquant sur '🇬🇧'";
    info4.innerHTML ="La scène change en fonction du jour et de la nuit. Possibilité de permuter en appuyant sur le bouton '🌗'";
    info5.innerHTML = "Possibilité de zoomer / déplacer sur les côtés ";
    info6.innerHTML ="Possibilité de passer en VR ( Oculus Quest 2 ou autres )";
  } else {
    description.innerHTML = "Special Skills";
    formationButton.innerHTML = "Training";
    experienceButton.innerHTML = "Experience";
    hobbiesButton.innerHTML = "Hobbies";
    contactButton.innerHTML = "Contact";

    enQuelquesMots.innerHTML = "In a few words";
    enQuelquesMotsText1.innerHTML = "After almost 10 years in the restaurant business and having carefully prepared my conversion,I have therefore decided to turn to a profession that has fascinated me for a long time, namely new technologies and more particularly web development. This job is for me beautiful because the only limits of a good developer are his imagination and his creativity.";
    enQuelquesMotsTitre2.innerHTML = "Student at Sorbonne University | CFA des Sciences";
    enQuelquesMotsText2.innerHTML = "Thanks to my dual training, both in catering, in IT and a sum successful professional experiences, I acquired a certain rigor, a sense of organization and an ability to adapt very easily. Teamwork and speed of execution are par essence of the essential values ​​in catering, which I wish to put at the service of the profession of Web developer. I no longer wish to be a spectator but an actor in this constantly changing world and renewal.";

    formationTitre1.innerHTML = "Bachelor’s Degree Web and Mobile </br>Sorbonne University | CFA of Sciences";
    formationText1.innerHTML = "Graphic design and web animations</br> POO and Software Architecture, design of databases for Web Frameworks for Back Office development</br> Networks and Security, Operating System and Web Server</br> UX design and Ergonomics </br>Mobile Development Web project management, Agile Methods";
    formationTitre2.innerHTML = "IT application developer analyst ESIEE Paris Tech | Paris";
    formationText2.innerHTML = "Training aimed at acquiring coding techniques, project analysis and technical integration of new digital technologies. The courses are given according to SCRUM - Agile methods around projects (sprint) in teams under the responsibility of a coach.";
    competencesTitre.innerHTML = "Skills";

    skills1.innerHTML = "Creation of dynamic sites for restaurants";
    skills2.innerHTML = "Agile methods";
    skills3.innerHTML = "Project planning and management";
    skills4.innerHTML = "Object-oriented programming language";
    skills5.innerHTML = "Reliable and rigorous";
    skills6.innerHTML = "Reactive and always at the forefront of the latest technologies";
    skills7.innerHTML = "Enthousiaste et curieux";
    skills8.innerHTML = "The meaning of relational";
    skills9.innerHTML = "Creative and imaginative";

    hobbiesTitre1.innerHTML = "Globe trotter lover of discoveries";
    hobbiesTexte1.innerHTML = "Culinary bike trip in Europe (12 countries - 8000km)";
    hobbiesTexte2.innerHTML = "Many GR trails and backpack trips";
    passions.innerHTML = "Passionate about new technologies, music and cinematography";

    contactTitre.innerHTML = "You can reach me by : ";

    expTitre1.innerHTML = "Full-stack developer internship - BBFT";
    expText11.innerHTML = "Creation of a web platform for the sale of fitness products";
    expText12.innerHTML = "Global vision of the objectives of accessibility, attractiveness, referencing, ergonomics and legitimacy as well as a module of visualization of the room in 3D";
    expText13.innerHTML = "Creation of the website in PHP / MySQL / JS / Three.js";
    expText14.innerHTML = "Code monitoring and validation to ensure compatibility and security of the sales platform";

    expTitre2.innerHTML = "Front-end developer apprenticeship - Aero-Bay";
    expText21.innerHTML = "Realization of the new visual identity";
    expText22.innerHTML = "Launch of new functionalities (services)";
    expText23.innerHTML = "Using Figma / HTML5 / CSS3 / JS / Java";
    expText24.innerHTML = "Redesign of the intranet (UI/UX)";
    expText25.innerHTML = "Realization of the design of the LinkedIn posts";

    realisationTitre.innerHTML = "Achievements";
    realisationTitre1.innerHTML = "SCHOOL & U - Connected notebook application";
    realisationTitre11.innerHTML = "Realization of a React-Native application to facilitate communication between parents and teachers. The app is available for iOS, Android and Web.";
    realisationText11.innerHTML = "Identification";
    realisationText12.innerHTML = "Messaging: common chat and/or between two parents of the class";
    realisationText13.innerHTML = "Blog: posting photos and messages from the teacher about the class";
    realisationText14.innerHTML = "Liaison book";
    realisationText15.innerHTML = "Editing information and adding a new child";
    realisationText16.innerHTML = "Database: Firebase & Firestore";
    realisationText17.innerHTML = "Go to GitHub";

    realisationTitre2.innerHTML = "Feelin'Food mobile - Restaurant takeaway app";
    realisationTitre21.innerHTML ="Realization of a React-Native takeaway application for restaurants. Project realized in React-Native on Snack.";
    realisationText21.innerHTML = "Login page";
    realisationText22.innerHTML = "Home page: display of restaurants & categories";
    realisationText23.innerHTML = "Redirection to the selected restaurants";
    realisationText24.innerHTML = "Basket & Payment validation";
    realisationText25.innerHTML = "Go to Snack";

    realisationTitre3.innerHTML = "Feelin'Food - website for click & collect restaurants";
    realisationTitre31.innerHTML = "Realization of a dynamic site for restaurant wishing to set up take-out sales This project was carried out in: HTML5, CSS3, PHP, mySQL, Vanilla JS.";
    realisationText31.innerHTML = "Identification";
    realisationText32.innerHTML = "Restaurant info - possibility to follow on a map";
    realisationText33.innerHTML = "User account";
    realisationText34.innerHTML = "Follow-up of suppliers, stocks, technical sheets";
    realisationText35.innerHTML = "Click & collect";
    realisationText36.innerHTML = "Go to the website";

    realisationTitre4.innerHTML = "Vue.js project";
    realisationTitre41.innerHTML ="HTML5, CSS3, VANILLA JS, VUE.JS - Project bringing together different Vue.js functionalities";
    realisationText41.innerHTML = "Clock (View-Clock2)";
    realisationText42.innerHTML = "Digital clock (Date-fns)";
    realisationText43.innerHTML = "Creation of a dynamic drag & drop form (FormBuilder)";
    realisationText44.innerHTML = "List of different Bitcoins and search bar (Axios)";
    realisationText45.innerHTML = "Go on GitHub";

    realisationTitre5.innerHTML = "VanillaJS Project";
    realisationTitre51.innerHTML ="Project grouping different functionalities in JS Vanilla";
    realisationText51.innerHTML = "ToDo List";
    realisationText52.innerHTML = "Modify the content of the site with the Admin space";
    realisationText53.innerHTML = "GitHub User Finder";
    realisationText54.innerHTML = "Quiz";
    realisationText55.innerHTML = "Weather app";
    realisationText56.innerHTML = "MP3 player with 2D wobble bar";
    realisationText51.innerHTML = "Day/night theme - custom";

    realisationTitre6.innerHTML = "Java E-Shop project";
    realisationTitre61.innerHTML = "Online Store Application in Java (Terminal & Swing)";
    realisationText61.innerHTML = "Orders";
    realisationText62.innerHTML = "Product visibility";
    realisationText63.innerHTML = "Add to cart";
    realisationText64.innerHTML = "Payment";
    realisationText65.innerHTML = "Admin";
    realisationText66.innerHTML = "Visibility of customer orders";
    realisationText67.innerHTML = "Adding products";
    realisationText68.innerHTML = "Customer orders";

    realisationTitre7.innerHTML = "Java platform game project";
    realisationTitre71.innerHTML = "Turn-based platform game project";
    realisationText71.innerHTML = "Different enemies depending on the rooms";
    realisationText72.innerHTML = "Life management";
    realisationText73.innerHTML = "Weapon management";

    info1.innerHTML = "Double click on the portal to enter another dimension";
    info2.innerHTML = "Directional arrows to move the fox";
    info3.innerHTML = "Possibility to change the language (FR / EN) by clicking on '🇬🇧'";
    info4.innerHTML = "The scene changes depending on day and night. Ability to swap by pressing the '🌗' button";
    info5.innerHTML = "Ability to zoom / move to the sides";
    info6.innerHTML = "Possibility to switch to VR (Oculus Quest 2 or others)";
  }
}

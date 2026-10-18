/* =====================================================================
   DATA — this is the file you will edit the most.
   ---------------------------------------------------------------------
   Everything the website displays about people and projects lives here.
   You do NOT need to touch the HTML files to add a member or a project.
   Both pages use this file:  index.html (home)  and  member.html (portfolio).

   Rules for editing a list:
   - Each item is an object { ... } separated by commas.
   - Text goes between quotes ' '.
   - Don't forget the comma between items!
   ===================================================================== */


/* ---------- MEMBERS ----------
   slug        : used in the URL (member.html?member=slug). Lowercase, no spaces.
   firstName   : shown in the big title
   lastName    : shown in the big title (keep the final dot, it's part of the design)
   role        : shown in pop-ups
   caption     : small text on the photo
   biography   : "My story" text (leave '' to show "coming soon")
   description : "About me" text (leave '' to show "coming soon")
   isManager   : true -> the MANAGER. He appears only on the home page ("Leading the
                 unit" banner), he has NO portfolio page.
   phone       : (manager only) phone number shown on the banner's Contact button.
                 Leave '' to make the button open an email instead.
   accent      : 'pink' -> pink theme (optional)
   photo       : path to the portrait (optional).
                 MEMBERS: you do not need this line. Just save a PNG named after the
                 slug in  images/members/  (example: images/members/amal-hamdi.png).
                 Write photo: '...' only if your file has another name or type.
                 A transparent PNG (person cut out) looks best. While the file does not
                 exist, a placeholder with the member's initials is shown.

   PERSONAL SECTIONS ("More than projects" on the member page)
   experiences    : [ ... ]   work, internships, projects, clubs
   events         : [ ... ]   events attended
   certifications : [ ... ]   courses and certificates
   Each member has HIS OWN lists. Add as many items as you want, or none:
     - an empty list  []  (or no line at all)  -> that tab is hidden for this member
     - all three empty                           -> the whole section is hidden
   Copy the examples at the bottom of this block to see the fields of each item.
*/
const members = [
  { slug: 'oussama-berrehouma', firstName: 'Oussama', lastName: 'BERREHOUMA.', role: 'Business Unit Manager', caption: 'Leading BU3 in the right direction.', isManager: true, phone: '+216 56 105 444', photo: 'images/oussama-berrehouma.jpg', biography: '', description: '' },
  { slug: 'alaeddine-ouni', firstName: 'Alaeddine', lastName: 'OUNI.', role: 'Creative member', caption: 'Curious mind. Hands-on maker.', biography: 'I am Aladdin Ouni, a Tunisian engineering student with an academic background in mathematics and physics and a growing focus on technology, innovation, and entrepreneurship. My academic journey has shaped my analytical thinking, problem-solving abilities, and interest in understanding how complex ideas can be transformed into practical solutions. Alongside my studies, I have been exploring digital product development, artificial intelligence, and business creation through independent projects. As the founder of MonLab, an educational platform designed around the needs of Tunisian medical and pharmaceutical students, I have been developing my understanding of product design, AI-assisted development, and the challenges of building a digital service from the ground up. My journey reflects a broader ambition: to combine engineering, technology, and business thinking to create useful solutions that address real-world needs.', description: 'I am driven by curiosity, continuous learning, and the desire to turn ideas into meaningful projects. My interests lie at the intersection of engineering, artificial intelligence, entrepreneurship, and digital innovation. I enjoy exploring how technology can solve practical problems, improve existing experiences, and create new opportunities. I am particularly interested in AI-powered applications, digital product strategy, and the relationship between technology and business.',
     experiences: [ { title: 'Founder', organization: 'MonLab', period: 'December 2025 – Present', description: 'Developing an AI-assisted educational platform for Tunisian medical and pharmaceutical students, focusing on digital learning experiences, product design, and AI-powered tools.' },{ title: 'E-commerce & Brand Development', organization: 'Velorni&CrownCo', period: 'May 2024 – Present', description: 'Exploring e-commerce, digital branding, product positioning, and social media marketing within the beauty and personal-care sector.' }],
     events: [{ title: 'Medical Ai initiation', type: 'Conference', date: 'April 2026', participation: 'Participant', description: '' },
      { title: 'START-IT UP Hackathon 1st edition', type: 'Competition', date: 'March 2022-2023', participation: 'Participant', description: '' }
     ], 
     certifications: [
      { title: '3rd prize Hackathon 1st edition - PRISTINI School of Ai.', area: 'Competition', year: 'March 2023', description: '' },
      { title: 'Neuromarketing/Neurobranding Coursera certification - Online version', area: 'Pshychologie of Branding', year: '2026', description: 'Credits to Johns Hopkins Whiting School of Engineering' },
      { title: 'Initiation for web development - ODCEE', area: 'Web development', year: '2026', description: '' },
      { title: 'Initiation for mobile development - ODCEE', area: 'Mobile development', year: '2026', description: '' },
     ] },
  
  
  { slug: 'amal-hamdi', firstName: 'Amal', lastName: 'HAMDI.', role: 'Creative member', caption: 'Ideas with intention.', accent: 'pink', biography: '', description: '', experiences: [
    { title: 'Creative contributor', organization: 'Business Unit 3 · JEENISo', period: '2025 — Present', description: 'Exploring ideas, shaping concepts, and building projects with the collective.', sample: true },
    { title: 'Project collaborator', organization: 'Independent creative project', period: '2026', description: 'From first sketches to a shared visual concept, with a small creative team.', sample: true },
  ], 
  events: [{ title: 'Ideas in motion', type: 'Creative workshop', date: 'May 2026', participation: 'Participant', image: 'images/creative-workshop.jpg', description: 'A day of brainstorming, exchanging perspectives, and turning ideas into concepts.', sample: true },
      { title: 'Design together', type: 'Community meetup', date: 'March 2026', participation: 'Attendee', image: 'images/creative-concepts.jpg', description: 'Meeting fellow creatives and exploring visual storytelling through hands-on exercises.', sample: true },
    ], 
  certifications: [{ title: 'Design thinking foundations', area: 'Creative problem-solving', year: '2026', description: 'Sample entry for a course covering research, ideation, and prototyping.', sample: true },
      { title: 'Creative project management', area: 'Planning & collaboration', year: '2026', description: 'Sample entry for learning about organizing creative work.', sample: true },
    ] },






  { slug: 'eya-haouari', firstName: 'Eya', lastName: 'HAOUARI.', role: 'Creative member', caption: 'Stories waiting to be built.', accent: 'pink', biography: 'My name is Eya Haouari, and I am a first-year engineering student specializing in Applied Computer Science. Passionate about technology, innovation, and problem-solving, I am continuously exploring new technologies and developing my programming skills. I aim to combine technical knowledge with creativity and teamwork to build useful digital solutions and grow as a future engineer.', description: '  I am a curious, sociable, and adaptable person who enjoys learning new things and taking on challenges. I believe that personal growth comes from curiosity, collaboration, and continuous improvement. Beyond my academic studies, I am interested in software development, digital innovation, and project management. I enjoy exchanging ideas, working with others, and discovering new perspectives. My strengths: Adaptability, communication, teamwork, curiosity, and willingness to learn. My goal: To strengthen my technical skills, gain practical experience, and contribute to innovative projects.', experiences: [
      // title, organization, period, description
      { title: 'Junior Enterprise Member', organization: 'Business Unit 3 · JEENISo', period: '2026 — Present', description: 'Participating in collaborative activities and challenges focused on professional development, teamwork, and digital project creation.', sample: true },
     { title: 'ENISo Team Member', organization: 'Club · ENISo', period: '2026 — Present', description: 'Participating in collaborative activities and challenges focused on professional development, teamwork, and digital project creation.', sample: true },
      { title: 'CyberGuards Member', organization: 'Club · ENISo', period: '2026 — Present', description: 'Participating in collaborative activities and challenges focused on professional development, teamwork, and digital project creation.', sample: true },


    ],

    events: [
      // title, type, date, participation, description, image (optional)
      { title: 'Engineering road V8 & V9', type: 'Creative workshop', date:'', participation: 'Participant', image: '', description: 'A day of brainstorming, exchanging perspectives, and turning ideas into concepts.', sample: true },
    ],

    certifications: [
      // title, area, year, description
       { title: 'Initiation for web development - ODCEE', area: 'Web development', year: '2026', description: '' },
      { title: 'Initiation for mobile development - ODCEE', area: 'Mobile development', year: '2026', description: '' },
    ],
  },



  { slug: 'hamdi-karmai', firstName: 'Hamdi', lastName: 'KARMANI.', role: 'Creative member', caption: 'From sketch to something real.', biography: 'First-year Automotive Software Engineering student at ENISO. Obtained my Baccalaureate in 2024 and successfully completed two years of preparatory classes in 2025. Interested in programming, embedded systems, and automotive innovation, with certifications in Arduino programming, HTML, and CSS.', description: 'I am a motivated and curious engineering student with a strong interest in programming and automotive technologies. I enjoy learning new skills, exploring innovative ideas, and working on projects that combine software and electronics. I am particularly interested in Arduino programming, web development, and embedded systems, and I am always looking for opportunities to improve my knowledge and collaborate with others.', experiences: [
      // title, organization, period, description
      { title: 'Junior Entreprise ENISO', organization: 'Business Unit 3 · JEENISo', period: '2026 — Present', description: ' Integration Week Participant (2026) Participated in the Integration Week organized by Junior Entreprise ENISO. Discovered the world of student entrepreneurship, teamwork, and project management. Developed communication and collaboration skills while interacting with other students. Gained insights into the role of Junior Enterprises in developing students’ professional and entrepreneurial skills.', sample: true },
      { title: 'CSWA', organization: '', period: '2026', description: 'SolidWorks CAD design and 3D modeling. Arduino Programming — Fundamentals of Arduino programming and electronics. HTML and CSS — Fundamentals of web development and webpage design.', sample: true },
    ],

    events: [
      // title, type, date, participation, description, image (optional)
      { title: 'ATAST Summer Camp', type: 'Creative workshop', date: '2019', participation: 'Participant', image: 'images/creative-workshop.jpg', description: ' Participated in the ATAST Summer Camp in 2019. Took part in activities that encouraged learning, collaboration, and personal development.', sample: true },
    ],

    certifications: [
      // title, area, year, description
      { title: 'Design thinking foundations', area: 'Creative problem-solving', year: '2026', description: 'Sample entry for a course covering research, ideation, and prototyping.', sample: true },
      { title: 'Creative project management', area: 'Planning & collaboration', year: '2026', description: 'Sample entry for learning about organizing creative work.', sample: true },
    ],
  },





  { slug: 'farah-haj-fraj', firstName: 'Farah', lastName: 'HAJ FRAJ.', role: 'Creative member', caption: 'Making connections visible.', accent: 'pink', biography: 'I am Farah HAJ FRAJ ,an Applied Computer Science engineering student at the National Engineering School of Sousse (ENISo), Tunisia. After earning my Baccalaureate in Mathematics, I pursued two years of intensive preparatory studies in Mathematics and Physics (MP), which strengthened my analytical thinking, problem-solving abilities, and academic discipline. Today, I am continuing my academic journey in engineering, with a focus on developing my technical knowledge, expanding my skills, and preparing myself for the challenges of the technology sector. ', description: 'I am a motivated and curious engineering student with a strong interest in technology, continuous learning, and personal development. My background in mathematics and preparatory studies has shaped my analytical mindset and taught me the importance of perseverance, adaptability, and structured problem-solving. Beyond academics, I value teamwork, communication, and meaningful collaboration. My interest in student organizations and extracurricular activities reflects my desire to step outside my comfort zone, take initiative, exchange ideas, and develop the interpersonal skills that complement my technical education. I enjoy exploring new concepts, challenging myself with unfamiliar situations, and learning from the people around me. I believe that becoming a successful engineer requires more than technical knowledge: it also requires curiosity, responsibility, creativity, and the ability to work effectively with others. My goal is to keep growing both personally and professionally while contributing to projects and initiatives that create meaningful value.', experiences: [
      // title, organization, period, description
      { title: 'Junior Entreprise ENISO ', organization: 'Business Unit 3 · JEENISo', period: '2025 — Present', description: 'Exploring ideas, shaping concepts, and building projects with the collective.', sample: true },
      { title: 'Academic Projects & Practical Learning ', organization: '', period: '2025 — Present', description: ' Integration Week Participant (2026) Participated in the Integration Week organized by Junior Entreprise ENISO. Discovered the world of student entrepreneurship, teamwork, and project management. Developed communication and collaboration skills while interacting with other students. Gained insights into the role of Junior Enterprises in developing students’ professional and entrepreneurial skills.', sample: true },
      { title: 'Teamwork & Student Involvement', organization: 'Independent creative project', period: '2026', description: 'From first sketches to a shared visual concept, with a small creative team.', sample: true },
    ],

    events: [
      // title, type, date, participation, description, image (optional)
      { title: 'Ideas in motion', type: 'Creative workshop', date: 'May 2026', participation: 'Participant', image: 'images/creative-workshop.jpg', description: 'A day of brainstorming, exchanging perspectives, and turning ideas into concepts.', sample: true },
      { title: 'Design together', type: 'Community meetup', date: 'March 2026', participation: 'Attendee', image: 'images/creative-concepts.jpg', description: 'Meeting fellow creatives and exploring visual storytelling through hands-on exercises.', sample: true },
    ],

    certifications: [
      // title, area, year, description
       { title: 'Initiation for web development - ODCEE', area: 'Web development', year: '2026', description: '' },
      { title: 'Initiation for mobile development - ODCEE', area: 'Mobile development', year: '2026', description: '' },
    ],
  },









  { slug: 'momen-nsiri', firstName: 'Momen', lastName: 'NSIRI.', role: 'Creative member', caption: 'Energy, ideas, momentum.', biography: 'I am an applied computer science engineering student  at eniso with a passion for technology, creative development, and the art of building things that feel different. I love exploring the intersection of code, design, and imagination — turning ideas into interactive experiences that people can see, feel, and remember. For me, every project is an opportunity to experiment, push boundaries, and discover new ways to bring ideas to life. I am constantly learning, building, and challenging myself to think beyond the obvious. ', description: 'I’m someone who is always looking for more — more to learn, more to understand, and more ways to grow. I’m curious by nature, and I enjoy exploring ideas, discovering how things work, and turning my thoughts into something meaningful. I know that becoming the person I want to be takes time, patience, and effort, and I’m willing to keep learning along the way. I don’t have everything figured out, but I believe that every experience, every challenge, and every mistake has something to teach me. I want to create my own path, stay true to myself, and build a future that reflects who I am and what I believe in. ', experiences: [
      // title, organization, period, description
       { title: 'Junior Entreprise ENISO', organization: 'Business Unit 3 · JEENISo', period: '2026 — Present', description: ' Integration Week Participant (2026) Participated in the Integration Week organized by Junior Entreprise ENISO. Discovered the world of student entrepreneurship, teamwork, and project management. Developed communication and collaboration skills while interacting with other students. Gained insights into the role of Junior Enterprises in developing students’ professional and entrepreneurial skills.', sample: true },

      { title: 'Arduino workshop', organization: 'ENISo', period: '2026 — Present', description: 'Exploring ideas, shaping concepts, and building projects with the collective, electronics and embedded systems.', sample: true },
      { title: 'Artificial Intelligence Hackathon', organization: 'GoMyCode & NVIDIA', period: '2026', description: 'Exposure to AI-driven problem-solving and collaborative innovation.', sample: true },
      { title: 'Experience at LEONI', organization: 'LEONI', period: '', description: 'Gain valuable insight into the industrial environment, teamwork, and professional discipline.', sample: true },

    ],

    events: [
      // title, type, date, participation, description, image (optional)
      { title: 'Aerotrinix', type: 'Aeronautical workshop', date: 'October 2026', participation: 'Participant', image: '', description: ' Discovered the fundamentals of aircraft construction and engineering.', sample: true },
    ],

    certifications: [
      // title, area, year, description
      { title: 'Arduino Workshop', area: '', year: '2026', description: 'Earned a certificate after participating in a hands-on workshop focused on Arduino and electronics.', sample: true },
      { title: 'Aeronautical Workshop', area: 'Aerotrinix', year: '2026', description: 'Earned a certificate of participation in a workshop exploring aircraft construction and aeronautical engineering.', sample: true },
      { title: 'Public Speaking Certification', area: 'Planning & collaboration', year: '2026', description: 'Earned a certificate of participation in a workshop exploring aircraft construction and aeronautical engineering.', sample: true },
      { title: 'BMC Training Certification', area: 'Planning & collaboration', year: '2026', description: 'Successfully completed the BMC training program sponsored by jeeniso and obtained a certificate, demonstrating a commitment to continuous learning and personal development.', sample: true },

    ],
  },











  /* This member shows a complete example of the three personal sections.
     "sample: true" prints a small "Sample" label: delete it once the text is real. */
  { slug: 'mohamed-aziz-mili', firstName: 'Mohamed Aziz', lastName: 'MILI.', role: 'Creative member', caption: 'Curious mind. Hands-on maker.', biography: '', description: '',

    experiences: [
      // title, organization, period, description
      { title: 'Junior Entreprise ENISO', organization: 'Business Unit 3 · JEENISo', period: '2026 — Present', description: ' Integration Week Participant (2026) Participated in the Integration Week organized by Junior Entreprise ENISO. Discovered the world of student entrepreneurship, teamwork, and project management. Developed communication and collaboration skills while interacting with other students. Gained insights into the role of Junior Enterprises in developing students’ professional and entrepreneurial skills.', sample: true },

      { title: 'Creative contributor', organization: 'Business Unit 3 · JEENISo', period: '2025 — Present', description: 'Exploring ideas, shaping concepts, and building projects with the collective.', sample: true },
      { title: 'Project collaborator', organization: 'Independent creative project', period: '2026', description: 'From first sketches to a shared visual concept, with a small creative team.', sample: true },
    ],

    events: [
      // title, type, date, participation, description, image (optional)
      { title: 'Ideas in motion', type: 'Creative workshop', date: 'May 2026', participation: 'Participant', image: 'images/creative-workshop.jpg', description: 'A day of brainstorming, exchanging perspectives, and turning ideas into concepts.', sample: true },
      { title: 'Design together', type: 'Community meetup', date: 'March 2026', participation: 'Attendee', image: 'images/creative-concepts.jpg', description: 'Meeting fellow creatives and exploring visual storytelling through hands-on exercises.', sample: true },
    ],

    certifications: [
      // title, area, year, description
      { title: 'Design thinking foundations', area: 'Creative problem-solving', year: '2026', description: 'Sample entry for a course covering research, ideation, and prototyping.', sample: true },
      { title: 'Creative project management', area: 'Planning & collaboration', year: '2026', description: 'Sample entry for learning about organizing creative work.', sample: true },
    ],
  },
];

// The manager has no portfolio page: these are the members who do.
const portfolioMembers = members.filter(function (m) { return !m.isManager; });

// Which member is shown when the page is opened without ?member=...
const DEFAULT_MEMBER_SLUG = 'mohamed-aziz-mili';

// Find a member by slug (returns undefined if not found)
function getMember(slug) {
  return members.find(function (m) { return m.slug === slug; });
}

// Path of a member's photo: the "photo" field, or images/members/<slug>.png
function photoOf(member) {
  return member.photo || 'images/members/' + member.slug + '.png';
}


/* ---------- PROJECTS ----------
   The first project is shown in scene 02 of the hero, the second in scene 03.
   image: path to a picture inside the images/ folder.
*/
const projects = [
  { id: 'concept', title: 'Beyond the ordinary', category: 'Creative direction', image: 'images/creative-concepts.jpg', description: 'A visual concept exploring how shared ideas become a distinctive creative identity.', tags: ['Moodboards', 'Visual storytelling', 'Design'], status: 'Completed', role: 'Concept contributor', period: '2026 · Sample project' },
  { id: 'collective', title: 'The idea collective', category: 'Collaborative project', image: 'images/creative-workshop.jpg', description: 'An idea-to-prototype session bringing different perspectives around one table.', tags: ['Ideation', 'Collaboration', 'Prototyping'], status: 'In progress', role: 'Creative collaborator', period: '2026 · Sample project' },
];


/* ---------- SKILLS ("My playground") ---------- */
const skills = [
  { name: 'Creative thinking', tags: ['Ideation', 'Research', 'Storytelling'] },
  { name: 'Design & expression', tags: ['Moodboards', 'Visual design', 'Prototyping'] },
  { name: 'Making it happen', tags: ['Collaboration', 'Project planning', 'Communication'] },
];


/* =====================================================================
   HOME PAGE DATA  (used by index.html through home.js)
   ===================================================================== */

/* ---------- SITE INFO ----------
   email / location : shown in the footer and on the "Say hello" buttons
   edition          : the years shown in the hero, the stats and the footer
   challenge        : the "current challenge" pill at the bottom of the hero
   manifesto        : the big statement in "The unit" section
   heroPhoto        : the team photo shown behind "BUSINESS UNIT 03" in the hero.
                      Save your photo with this name in images/ (or change the path).
                      Set it to '' to turn the photo off. Nothing is shown while the file is missing.
   heroPhotoAlt     : text read by screen readers for that photo
*/
const site = {
  email: 'businessunit3.jeeniso.eniso@gmail.com',
  location: 'National School of Engineering - Sousse.',
  edition: { start: 2026, end: 2027 },
  heroPhoto: 'images/team-photo.jpg',
  heroPhotoAlt: 'All the members of Business Unit 3 together',
  challenge: { week: '02', title: 'Web design & its conception', status: 'In progress' },
  manifesto: 'We are a creative center where ideas are born, projects take shape, and curious minds move forward together.'
};

/* ---------- NAVIGATION ----------
   Used for the header menu AND the footer links.
   href: '#id' scrolls to the section with that id in index.html.
*/
const navigation = [
  { label: 'The unit', href: '#unit' },
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'Members', href: '#members' },
  { label: 'Contact', href: '#contact' }
];

/* ---------- SOCIAL LINKS ----------
   Empty on purpose: the footer shows the list only when it has items.
   Example:  { label: 'Instagram', href: 'https://www.instagram.com/your-page' }
*/
const socials = [{label: 'Instagram', href:'https://www.instagram.com/businessunit3.eniso?utm_source=ig_web_button_share_sheet&rpxt=ZDNlZDc0MzIxNw=='}];

/* ---------- "WHAT WE DO" CARDS ---------- */
const capabilities = [
  { title: 'Ideas', text: 'Where every project begins.', image: 'images/creative-concepts.jpg', alt: 'Creative concept objects and visual experiments', href: '#challenges' },
  { title: 'Projects', text: 'Ideas made real, together.', image: 'images/robot-rover.jpg', alt: 'A collaborative rover prototype', href: '#challenges' },
  { title: 'Experiences', text: 'Events, growth and shared moments.', image: 'images/engineering-lab.jpg', alt: 'Students collaborating in a hands-on workshop', href: '#members' }
];

/* ---------- COUNTS (calculated, never typed by hand) ----------
   They update by themselves when you add or remove a member above.
*/
const unitCounts = {
  total: members.length,
  creative: members.filter(function (m) { return !m.isManager; }).length,
  managers: members.filter(function (m) { return m.isManager; }).length
};

// "Mohamed Aziz" + "MILI." -> "MM"   (the big outlined letters on the member cards)
function memberInitials(firstName, lastName) {
  return (firstName.trim().charAt(0) + lastName.trim().charAt(0)).toUpperCase();
}

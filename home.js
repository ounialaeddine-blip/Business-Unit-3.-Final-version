/* =====================================================================
   HOME.JS — the BU3 home page (index.html)
   ---------------------------------------------------------------------
   Reads data.js and common.js, then:
     1. fills the data-driven parts of the page (menu, stats, cards...)
     2. makes the page interactive (mobile menu, pause button, scroll)

   Sections of this file:
     A. Setup values
     B. Header + footer links
     C. Hero (+ team photo)
     D. Unit statement + stats
     E. "What we do" cards
     F. Manager card + member cards
     G. Footer
     H. Interactions (menu, pause, scroll)
     I. Start everything
   ===================================================================== */


/* ---------------------------------------------------------------------
   A. SETUP VALUES
   --------------------------------------------------------------------- */
const page = $('top');                                             // the whole page wrapper
const manager = members.find(function (m) { return m.isManager; }); // the unit manager (or undefined)
const team = portfolioMembers;                                      // everybody else (they have a portfolio page)

// "2026—2027"
const editionText = site.edition.start + '—' + site.edition.end;

// "BERREHOUMA." -> "BERREHOUMA"  (the final dot is only used by the member page)
function surname(member) {
  return member.lastName.replace('.', '');
}

// Link to a member's portfolio page
function memberUrl(member) {
  return 'member.html?member=' + encodeURIComponent(member.slug);
}


/* ---------------------------------------------------------------------
   B. HEADER + FOOTER LINKS
   Both lists come from "navigation" in data.js.
   --------------------------------------------------------------------- */
function renderNavigation() {
  // Header: insert the links BEFORE the "Say hello" button
  let headerLinks = '';
  navigation.forEach(function (link) {
    headerLinks += '<a href="' + escapeHTML(link.href) + '">' + escapeHTML(link.label) + '</a>';
  });
  $('home-navigation').insertAdjacentHTML('afterbegin', headerLinks);

  // Footer: same links, with a small arrow
  let footerLinks = '';
  navigation.forEach(function (link) {
    footerLinks += '<a href="' + escapeHTML(link.href) + '">' + escapeHTML(link.label) + icon('arrow-up-right') + '</a>';
  });
  document.querySelector('.site-footer nav').insertAdjacentHTML('beforeend', footerLinks);
}

// Every element with data-mailto becomes a "mail to" link
function renderMailLinks() {
  document.querySelectorAll('[data-mailto]').forEach(function (link) {
    link.href = 'mailto:' + site.email;
  });
}


/* ---------------------------------------------------------------------
   C. HERO
   --------------------------------------------------------------------- */

function renderHeroPhoto() {
  addPhoto($('hero-photo'), site.heroPhoto, site.heroPhotoAlt, function () {
    // "has-photo" switches on the veil + darker texts in style.css
    document.querySelector('.home-hero').classList.add('has-photo');
  });
}

function renderHero() {
  $('hero-edition').textContent = editionText;

  // One <span> per letter, so the CSS can make them appear one after the other.
  // (A space becomes a "non-breaking space" so it keeps its width.)
  let letters = '';
  'BUSINESS UNIT'.split('').forEach(function (letter) {
    letters += '<span class="home-letter">' + (letter === ' ' ? '&nbsp;' : letter) + '</span>';
  });
  $('hero-words').innerHTML = letters;

  // Current challenge pill
  $('challenge-week').textContent = site.challenge.week;
  $('challenge-title').textContent = site.challenge.title;
  $('challenge-status').textContent = site.challenge.status;
}


/* ---------------------------------------------------------------------
   D. UNIT STATEMENT + STATS
   --------------------------------------------------------------------- */
function renderManifesto() {
  // Each word gets its own <span> (the CSS colors them when the section appears).
  // The final dot of "together." is drawn in blue.
  let html = '';
  site.manifesto.split(' ').forEach(function (word) {
    if (word === 'together.') {
      html += '<span>together<span class="home-period">.</span></span>';
    } else {
      html += '<span>' + escapeHTML(word) + ' </span>';
    }
  });
  $('manifesto-copy').innerHTML = html;
}

function renderStats() {
  $('stat-members').textContent = unitCounts.total;
  $('stat-breakdown').textContent = unitCounts.creative + ' creative members + ' + unitCounts.managers + ' manager';
  // <em> lets the dash be styled on its own (see .home-stat em in style.css)
  $('stat-edition').innerHTML = site.edition.start + '<em>—</em>' + site.edition.end;
}


/* ---------------------------------------------------------------------
   E. "WHAT WE DO" CARDS
   --------------------------------------------------------------------- */
function renderCapabilities() {
  let html = '';
  capabilities.forEach(function (card) {
    html += '<a href="' + escapeHTML(card.href) + '" class="home-cap reveal">' +
      '<img src="' + escapeHTML(card.image) + '" alt="' + escapeHTML(card.alt) + '" loading="lazy" />' +
      '<div><h3>' + escapeHTML(card.title) + '<span class="home-period">.</span></h3><p>' + escapeHTML(card.text) + '</p></div>' +
      icon('arrow-up-right', 'home-cap-arrow') +
      '</a>';
  });
  $('cap-grid').innerHTML = html;
}


/* ---------------------------------------------------------------------
   E2. WEEKLY CHALLENGES (timeline)
   One card per item of "challenges" in data.js.
   --------------------------------------------------------------------- */
function challengeState(status) {
  const text = String(status).toLowerCase();
  if (text.indexOf('progress') !== -1) return 'is-progress';
  if (text.indexOf('complet') !== -1) return 'is-completed';
  return 'is-upcoming';
}

function renderChallenges() {
  let html = '';
  challenges.forEach(function (item) {
    let links = '';
    (item.links || []).forEach(function (link) {
      links += '<a class="challenge-link" href="' + escapeHTML(link.href) + '">' + escapeHTML(link.label) + icon('arrow-up-right') + '</a>';
    });

    // The Executive Bureau review is shown only when its text is filled in data.js
    let review = '';
    if (item.review && item.review.text && item.review.text.trim() !== '') {
      review = '<blockquote class="challenge-review"><span>Executive Bureau review</span>' +
        '<p>“' + escapeHTML(item.review.text.trim()) + '”</p>' +
        '<cite>' + escapeHTML(item.review.author || 'Executive Bureau') + '</cite></blockquote>';
    }

    html += '<li class="challenge-card reveal ' + challengeState(item.status) + '">' +
      '<span class="challenge-dot" aria-hidden="true"></span>' +
      '<div class="challenge-top"><span class="challenge-week">' + escapeHTML(item.week) + '</span>' +
      '<span class="challenge-status">' + escapeHTML(item.status) + '</span></div>' +
      '<h3>' + escapeHTML(item.title) + '</h3>' +
      '<p>' + escapeHTML(item.text) + '</p>' +
      (links ? '<div class="challenge-links">' + links + '</div>' : '') +
      review +
      '</li>';
  });
  $('challenge-timeline').innerHTML = html;
}


/* ---------------------------------------------------------------------
   F. MANAGER CARD + MEMBER CARDS
   --------------------------------------------------------------------- */
function renderManager() {
  if (!manager) {                        // no manager in data.js -> hide the whole section
    $('leadership').hidden = true;
    return;
  }
  // First name is plain text, the surname is inside a <span> (the CSS makes it gold)
  $('manager-title').innerHTML = escapeHTML(manager.firstName) + '<br /><span>' + escapeHTML(surname(manager)) + '</span><span class="home-period">.</span>';
  $('manager-text').textContent = manager.role + ' · ' + manager.caption;

  // Contact button: call link when a phone number is written in data.js, otherwise email.
  // (The manager has no portfolio page, only this banner.)
  const phone = (manager.phone || '').trim();
  const link = $('manager-link');
  if (phone) {
    link.href = 'tel:' + phone.replace(/[^\d+]/g, '');           // keep digits and a leading +
    $('manager-link-label').textContent = 'Contact ' + manager.firstName;
    $('manager-phone').textContent = phone;
    $('manager-phone').hidden = false;
  } else {
    link.href = 'mailto:' + site.email;
    $('manager-link-label').textContent = 'Contact ' + manager.firstName;
  }

  // Photo on the right of the card (placeholder initials until the file exists)
  $('manager-initials').textContent = memberInitials(manager.firstName, manager.lastName);
  addPhoto($('manager-photo'), manager.photo, 'Portrait of ' + manager.firstName + ' ' + surname(manager), function () {
    $('manager-photo').classList.add('has-photo');
  });
}

function renderMembers() {
  $('members-count').textContent = unitCounts.creative + ' CREATIVE MEMBERS + ' + unitCounts.managers + ' MANAGER';

  let html = '';
  team.forEach(function (member, index) {
    const pink = member.accent === 'pink' ? ' home-member-pink' : '';
    html += '<a href="' + memberUrl(member) + '" class="home-member reveal' + pink + '" data-slug="' + escapeHTML(member.slug) + '">' +
      // Photo area: the big initials are the placeholder, the photo is added on top once its file exists
      '<div class="home-member-photo">' +
        '<span class="home-member-initials" aria-hidden="true">' + escapeHTML(memberInitials(member.firstName, member.lastName)) + '</span>' +
      '</div>' +
      '<span class="home-member-index">' + pad(index + 1) + '</span>' +
      icon('arrow-up-right', 'home-member-arrow') +
      '<div class="home-member-body">' +
        '<h3>' + escapeHTML(member.firstName) + '<br /><span>' + escapeHTML(surname(member)) + '</span><span class="home-period">.</span></h3>' +
        '<p>' + escapeHTML(member.caption) + '</p>' +
      '</div>' +
      '</a>';
  });
  $('home-members').innerHTML = html;

  // Member photos: images/members/<slug>.png (see photoOf() in data.js)
  team.forEach(function (member) {
    const box = document.querySelector('.home-member[data-slug="' + member.slug + '"] .home-member-photo');
    addPhoto(box, photoOf(member), 'Portrait of ' + member.firstName + ' ' + surname(member), function () {
      box.classList.add('has-photo');
    });
  });
}


/* ---------------------------------------------------------------------
   G. FOOTER
   --------------------------------------------------------------------- */
function renderFooter() {
  $('footer-email').textContent = site.email;
  $('footer-location').textContent = site.location;
  $('footer-edition').textContent = editionText;

  // Social links: only drawn when "socials" in data.js is not empty
  if (socials.length > 0) {
    let items = '';
    socials.forEach(function (social) {
      items += '<li><a href="' + escapeHTML(social.href) + '" rel="noopener noreferrer" target="_blank">' +
        escapeHTML(social.label) + icon('arrow-up-right') + '</a></li>';
    });
    $('footer-contact').insertAdjacentHTML('beforeend', '<ul class="site-socials" aria-label="Social links">' + items + '</ul>');
  }
}


/* ---------------------------------------------------------------------
   H. INTERACTIONS
   --------------------------------------------------------------------- */

// Phone menu: the button opens / closes the navigation panel
function setupMenu() {
  const nav = $('home-navigation');
  const button = $('menu-toggle');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    button.innerHTML = icon(open ? 'x' : 'menu');
  }

  button.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });

  // Choosing a link closes the menu
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
}

// Pause / resume all animations (the CSS rule .motion-paused does the work)
function setupMotionToggle() {
  const button = $('motion-toggle');
  button.addEventListener('click', function () {
    const paused = page.classList.toggle('motion-paused');
    const label = paused ? 'Resume animation' : 'Pause animation';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(paused));
  });
}

// Scrolling adds two classes to the page:
//   is-scrolled : the header gets a thin bottom line
//   past-hero   : the "back to top" button appears
function setupScroll() {
  const hero = document.querySelector('.home-hero');

  function onScroll() {
    page.classList.toggle('is-scrolled', window.scrollY > 12);
    page.classList.toggle('past-hero', Boolean(hero && hero.getBoundingClientRect().bottom <= 96));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();   // run once at start
}


/* ---------------------------------------------------------------------
   I. START EVERYTHING
   Order matters: build the content first, THEN watch it for the
   fade-in effect (setupReveal).
   --------------------------------------------------------------------- */
function init() {
  injectIcons();            // icons written in the HTML
  renderNavigation();
  renderMailLinks();
  renderHero();
  renderHeroPhoto();
  renderStrip('kinetic-track', true);
  renderManifesto();
  renderStats();
  renderCapabilities();
  renderChallenges();
  renderManager();
  renderMembers();
  renderFooter();
  setupMenu();
  setupMotionToggle();
  setupScroll();
  setupReveal(page);
}

init();

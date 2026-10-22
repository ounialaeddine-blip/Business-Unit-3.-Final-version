/* =====================================================================
   SUBPAGE.JS — header, footer and menu for the extra pages
   (magazine.html and podcast.html)
   ---------------------------------------------------------------------
   index.html does the same things inside home.js. The extra pages are
   simpler, so they share this small file instead.
   Loaded after data.js and common.js, before magazine.js / podcast.js.
   ===================================================================== */

const page = $('top');
const editionText = site.edition.start + '—' + site.edition.end;

// Menu links in data.js are written for the home page ('#unit').
// From another page they must go back to the home page: 'index.html#unit'.
function fromSubpage(href) {
  return href.charAt(0) === '#' ? 'index.html' + href : href;
}

// Name of the current file ('magazine.html'), to underline the active menu link
const currentFile = window.location.pathname.split('/').pop();

function renderSubNavigation() {
  let headerLinks = '';
  let footerLinks = '';
  navigation.forEach(function (link) {
    const href = fromSubpage(link.href);
    const current = href === currentFile ? ' aria-current="page" class="is-current"' : '';
    headerLinks += '<a href="' + escapeHTML(href) + '"' + current + '>' + escapeHTML(link.label) + '</a>';
    footerLinks += '<a href="' + escapeHTML(href) + '">' + escapeHTML(link.label) + icon('arrow-up-right') + '</a>';
  });
  $('home-navigation').insertAdjacentHTML('afterbegin', headerLinks);
  document.querySelector('.site-footer nav').insertAdjacentHTML('beforeend', footerLinks);
}

function renderSubFooter() {
  document.querySelectorAll('[data-mailto]').forEach(function (link) { link.href = 'mailto:' + site.email; });
  $('footer-email').textContent = site.email;
  $('footer-location').textContent = site.location;
  $('footer-edition').textContent = editionText;

  if (socials.length > 0) {
    let items = '';
    socials.forEach(function (social) {
      items += '<li><a href="' + escapeHTML(social.href) + '" rel="noopener noreferrer" target="_blank">' +
        escapeHTML(social.label) + icon('arrow-up-right') + '</a></li>';
    });
    $('footer-contact').insertAdjacentHTML('beforeend', '<ul class="site-socials" aria-label="Social links">' + items + '</ul>');
  }
}

// Phone menu button
function setupSubMenu() {
  const nav = $('home-navigation');
  const button = $('menu-toggle');
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    button.innerHTML = icon(open ? 'x' : 'menu');
  }
  button.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
}

// Header gets a thin line once the page is scrolled
function setupSubScroll() {
  function onScroll() { page.classList.toggle('is-scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Members' comments (bottom of magazine.html and podcast.html).
// key = 'magazine' or 'podcast' (the list in data.js), label = name used in the email subject.
function renderComments(key) {
  const list = comments[key] || [];
  let html = '';
  list.forEach(function (item) {
    const member = members.find(function (m) { return m.slug === item.member; });
    if (!member) { console.warn('Comment ignored: no member with slug "' + item.member + '"'); return; }
    html += '<article class="cm-card' + (member.accent === 'pink' ? ' is-pink' : '') + '">' +
      '<div class="cm-avatar" data-slug="' + escapeHTML(member.slug) + '"><span aria-hidden="true">' +
        escapeHTML(memberInitials(member.firstName, member.lastName)) + '</span></div>' +
      '<div class="cm-body">' +
        '<div class="cm-meta"><strong>' + escapeHTML(member.firstName + ' ' + member.lastName.replace(/\.$/, '')) + '</strong>' +
        '<span>' + escapeHTML(member.role) + '</span>' +
        (item.date ? '<time>' + escapeHTML(item.date) + '</time>' : '') + '</div>' +
        (item.text ? '<p>' + escapeHTML(item.text) + '</p>' : '<p class="cm-placeholder">Comment</p>') +
      '</div></article>';
  });
  if (html === '') {
    html = '<div class="cm-empty"><i data-sparkle></i><p>The comments of our members will appear here.</p></div>';
  }
  $('cm-list').innerHTML = html;

  // Member photos (a missing file keeps the initials)
  document.querySelectorAll('.cm-avatar').forEach(function (box) {
    const member = members.find(function (m) { return m.slug === box.dataset.slug; });
    addPhoto(box, photoOf(member), member.firstName, function () { box.classList.add('has-photo'); });
  });

  injectIcons();
}

// Call this first in magazine.js / podcast.js
function initSubpage() {
  injectIcons();
  renderSubNavigation();
  renderSubFooter();
  setupSubMenu();
  setupSubScroll();
  setupReveal(page);
}

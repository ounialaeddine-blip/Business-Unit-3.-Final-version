/* =====================================================================
   PODCAST.JS — the podcast script page (podcast.html)
   ---------------------------------------------------------------------
   Everything shown comes from "podcast" in data.js: guest, script
   segments and video. This file builds the page and adds three reading
   tools:
     - text size   (A− / A+)
     - reading mode (big text on a dark background, for filming)
     - auto-scroll  (a teleprompter, with a speed slider)

   Sections:
     A. Texts + guest
     B. Script segments
     C. Reading tools (size, mode, auto-scroll)
     D. Video
     E. Start
   ===================================================================== */

const script = $('script');
const sizeSteps = [80, 90, 100, 115, 130, 150, 175, 200, 240];   // text size in %
let sizeIndex = 2;                                               // 100%
let reading = false;                                             // reading mode on?
let scrolling = false;                                           // auto-scroll on?
let carry = 0;                                                   // fraction of a pixel not yet scrolled

// Light "remember my choice" storage. It can fail (private window), so every use is protected.
function remember(key, value) { try { localStorage.setItem('bu3-pod-' + key, String(value)); } catch (e) {} }
function recall(key) { try { return localStorage.getItem('bu3-pod-' + key); } catch (e) { return null; } }


/* ---------------------------------------------------------------------
   A. TEXTS + GUEST
   --------------------------------------------------------------------- */
function renderPodcastTexts() {
  $('pod-week').textContent = site.challenge.week;
  $('pod-show').textContent = podcast.show;
  $('pod-episode').textContent = podcast.episode;
  $('pod-title').textContent = podcast.title;
  $('pod-description').textContent = podcast.description;

  const guest = podcast.guest;
  $('pod-guest-name').textContent = guest.name || 'Guest name';
  $('pod-guest-name').classList.toggle('is-empty', !guest.name);
  $('pod-guest-role').textContent = guest.role;
  $('pod-guest-bio').textContent = guest.bio;
  $('pod-status').textContent = podcast.status;

  // Empty fields are hidden (the page is a template: fill data.js and they appear)
  $('pod-description').hidden = !podcast.description;
  $('pod-meta').hidden = !podcast.episode && !podcast.title;
  $('pod-meta-sep').hidden = !podcast.episode || !podcast.title;
  $('pod-guest-role').hidden = !guest.role;
  $('pod-guest-bio').hidden = !guest.bio;
  $('pod-status').hidden = !podcast.status;

  // Initials are the placeholder until a photo file exists
  const initials = (guest.name || '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  $('pod-guest-initials').textContent = initials;
  addPhoto($('pod-guest-photo'), guest.photo, 'Portrait of ' + (guest.name || 'the guest'), function () {
    $('pod-guest-photo').classList.add('has-photo');
  });
}


/* ---------------------------------------------------------------------
   B. SCRIPT SEGMENTS
   --------------------------------------------------------------------- */
const typeLabels = { intro: 'Intro', question: 'Question', answer: 'Answer', break: 'Break', outro: 'Outro' };

function renderSegments() {
  let html = '';
  podcast.segments.forEach(function (segment, i) {
    const type = typeLabels[segment.type] ? segment.type : 'answer';

    // "\n" in the text starts a new paragraph
    let paragraphs = '';
    String(segment.text || '').split('\n').forEach(function (line) {
      if (line.trim() !== '') paragraphs += '<p>' + escapeHTML(line.trim()) + '</p>';
    });

    if (paragraphs === '') paragraphs = '<p class="pod-seg-empty">Text of this segment</p>';

    html += '<li class="pod-seg pod-seg-' + type + '" data-index="' + i + '">' +
      '<div class="pod-seg-side"><span class="pod-seg-number">' + pad(i + 1) + '</span>' +
      (segment.time ? '<span class="pod-seg-time">' + escapeHTML(segment.time) + '</span>' : '') + '</div>' +
      '<div class="pod-seg-main">' +
        '<div class="pod-seg-meta"><span class="pod-seg-type">' + typeLabels[type] + '</span>' +
        (segment.speaker ? '<span class="pod-seg-speaker">' + escapeHTML(segment.speaker) + '</span>' : '') +
        '</div>' +
        '<div class="pod-seg-text">' + paragraphs + '</div>' +
        (segment.note ? '<p class="pod-seg-note">' + escapeHTML(segment.note) + '</p>' : '') +
      '</div></li>';
  });
  $('pod-segments').innerHTML = html;
  $('pod-endnote').hidden = podcast.segments.length === 0;
}


/* ---------------------------------------------------------------------
   C. READING TOOLS
   --------------------------------------------------------------------- */

// Text size: the CSS variable --pod-scale multiplies every font size of the script
function applySize() {
  const percent = sizeSteps[sizeIndex];
  script.style.setProperty('--pod-scale', percent / 100);
  $('pod-size').textContent = percent + '%';
  $('pod-smaller').disabled = sizeIndex === 0;
  $('pod-bigger').disabled = sizeIndex === sizeSteps.length - 1;
  remember('size', sizeIndex);
}

// The thing that scrolls: the whole window, or the script itself in reading mode
function scroller() {
  return reading ? script : (document.scrollingElement || document.documentElement);
}

function setReading(on) {
  reading = on;
  script.classList.toggle('is-reading', on);
  document.body.classList.toggle('pod-reading-lock', on);   // stops the page behind from scrolling
  $('pod-mode').setAttribute('aria-pressed', String(on));
  $('pod-mode').querySelector('span').textContent = on ? 'Exit reading mode' : 'Reading mode';
  $('pod-mode').querySelector('svg').outerHTML = icon(on ? 'minimize' : 'maximize');
  if (on) script.scrollTop = 0;
}

// Auto-scroll: a time-based loop, so the speed is the same on every screen
let lastFrame = 0;
function scrollStep(now) {
  if (!scrolling) return;
  const seconds = Math.min((now - lastFrame) / 1000, 0.1);
  lastFrame = now;

  const speed = Number($('pod-speed').value);          // 1 to 10
  carry += speed * 14 * seconds;                       // pixels per second
  const whole = Math.floor(carry);
  if (whole >= 1) {
    carry -= whole;
    const element = scroller();
    const before = element.scrollTop;
    element.scrollBy({ top: whole, behavior: 'instant' });
    // Reached the end: stop by itself
    if (Math.abs(element.scrollTop - before) < 1 && before > 0) { setScrolling(false); return; }
  }
  requestAnimationFrame(scrollStep);
}

function setScrolling(on) {
  scrolling = on;
  script.classList.toggle('is-scrolling', on);
  $('pod-scroll').setAttribute('aria-pressed', String(on));
  $('pod-scroll').querySelector('span').textContent = on ? 'Stop scrolling' : 'Auto-scroll';
  if (on) {
    carry = 0;
    lastFrame = performance.now();
    requestAnimationFrame(scrollStep);
  }
}

// In reading mode, the segment being read stays bright and the others fade
let marking = false;
function markCurrentSegment() {
  if (marking) return;
  marking = true;
  requestAnimationFrame(function () {
    marking = false;
    const line = (reading ? script.getBoundingClientRect().top : 0) + (reading ? script.clientHeight : window.innerHeight) * 0.4;
    let best = null;
    let bestDistance = Infinity;
    document.querySelectorAll('.pod-seg').forEach(function (item) {
      const box = item.getBoundingClientRect();
      const distance = box.top <= line && box.bottom >= line ? 0 : Math.min(Math.abs(box.top - line), Math.abs(box.bottom - line));
      if (distance < bestDistance) { bestDistance = distance; best = item; }
    });
    document.querySelectorAll('.pod-seg.is-current').forEach(function (item) { item.classList.remove('is-current'); });
    if (best) best.classList.add('is-current');
  });
}

function setupTools() {
  // Restore the visitor's last choices (if the browser allows it)
  const savedSize = Number(recall('size'));
  if (savedSize >= 0 && savedSize < sizeSteps.length && recall('size') !== null) sizeIndex = savedSize;
  const savedSpeed = Number(recall('speed'));
  if (savedSpeed >= 1 && savedSpeed <= 10) $('pod-speed').value = savedSpeed;
  applySize();

  $('pod-smaller').addEventListener('click', function () { if (sizeIndex > 0) { sizeIndex--; applySize(); } });
  $('pod-bigger').addEventListener('click', function () { if (sizeIndex < sizeSteps.length - 1) { sizeIndex++; applySize(); } });
  $('pod-mode').addEventListener('click', function () { setScrolling(false); setReading(!reading); markCurrentSegment(); });
  $('pod-scroll').addEventListener('click', function () { setScrolling(!scrolling); });
  $('pod-speed').addEventListener('input', function () { remember('speed', $('pod-speed').value); });

  // Keyboard: Esc = leave reading mode, space = start / stop, + / - = text size
  document.addEventListener('keydown', function (event) {
    if (event.target.closest('input, textarea')) return;
    if (event.key === 'Escape' && reading) setReading(false);
    if (event.target.closest('button, a')) return;          // space / enter belong to the focused button
    if (event.key === ' ' && (reading || window.scrollY > 200)) { event.preventDefault(); setScrolling(!scrolling); }
    if (event.key === '+' || event.key === '=') $('pod-bigger').click();
    if (event.key === '-') $('pod-smaller').click();
  });

  window.addEventListener('scroll', markCurrentSegment, { passive: true });
  script.addEventListener('scroll', markCurrentSegment, { passive: true });
  markCurrentSegment();

}


/* ---------------------------------------------------------------------
   D. VIDEO
   --------------------------------------------------------------------- */
function renderVideo() {
  const video = podcast.video || {};
  const frame = $('pod-frame');
  const aspect = /^\d+\s*\/\s*\d+$/.test(video.aspect || '') ? video.aspect : '16/9';
  frame.style.setProperty('--pod-aspect', aspect);
  frame.classList.toggle('is-vertical', Number(aspect.split('/')[0]) < Number(aspect.split('/')[1]));

  if (video.youtubeId && /^[\w-]{6,20}$/.test(video.youtubeId)) {
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + video.youtubeId + '" title="' + escapeHTML(podcast.title || podcast.show) +
      '" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
  } else if (video.file) {
    frame.innerHTML = '<video controls preload="metadata" src="' + escapeHTML(video.file) + '"></video>';
  } else {
    // No video yet: a "coming soon" frame
    frame.classList.add('is-empty');
    frame.innerHTML = '<div class="pod-frame-soon">' + sparkle() + '<strong>Video coming soon</strong>' +
      '<span>The episode with our guest will appear here.</span></div>';
  }
}


/* ---------------------------------------------------------------------
   E. START
   --------------------------------------------------------------------- */
initSubpage();
renderPodcastTexts();
renderSegments();
setupTools();
renderVideo();
renderComments('podcast');

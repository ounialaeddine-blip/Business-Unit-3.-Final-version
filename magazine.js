/* =====================================================================
   MAGAZINE.JS — the online magazine (magazine.html)
   ---------------------------------------------------------------------
   How it works:
     1. PDF.js opens the PDF named in "magazine.pdf" (data.js)
     2. every page is drawn once and saved as a JPEG picture
     3. StPageFlip (page-flip library) turns those pictures into a book
        with the page-turning animation
   The reader needs a web server (Vercel, or VS Code "Live Server"):
   a browser does not let a page read a PDF when it is opened by a
   double-click (file://).

   Sections:
     A. Texts of the page
     B. Open the PDF + draw the pages
     C. Build the book + size it
     D. Controls (arrows, counter, full screen, keyboard)
     E. Start
   ===================================================================== */

// Where PDF.js finds its helper (also copied in vendor/)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';

const viewer = $('mag-viewer');
const bookBox = $('mag-book');
const fitBox = $('mag-fit');
let book = null;             // the page-turning object
let pageRatio = 1.414;       // height / width of one page (A4 = 1.414), read from the PDF
let totalPages = 0;


/* ---------------------------------------------------------------------
   A. TEXTS OF THE PAGE
   --------------------------------------------------------------------- */
function renderMagazineTexts() {
  $('mag-week').textContent = site.challenge.week;
  $('mag-title').textContent = magazine.title;
  $('mag-issue').textContent = magazine.issue;
  $('mag-topic').textContent = magazine.topic;
  $('mag-description').textContent = magazine.description;
  // Empty fields are hidden (the page is a template: fill data.js and they appear)
  $('mag-description').hidden = !magazine.description;
  $('mag-meta').hidden = !magazine.issue && !magazine.topic;
  $('mag-meta-sep').hidden = !magazine.issue || !magazine.topic;

  const download = $('mag-download');
  download.href = magazine.pdf;
  download.setAttribute('download', magazine.pdfName || 'magazine.pdf');
}


/* ---------------------------------------------------------------------
   B. OPEN THE PDF + DRAW THE PAGES
   --------------------------------------------------------------------- */

// Draws one PDF page and returns the address of a JPEG picture of it.
async function renderPage(pdf, number, targetWidth) {
  const pdfPage = await pdf.getPage(number);
  const base = pdfPage.getViewport({ scale: 1 });
  const viewport = pdfPage.getViewport({ scale: targetWidth / base.width });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff';                    // white paper under transparent areas
  context.fillRect(0, 0, canvas.width, canvas.height);
  await pdfPage.render({ canvasContext: context, viewport: viewport }).promise;

  // A JPEG picture uses far less memory than keeping every canvas alive
  const blob = await new Promise(function (resolve) { canvas.toBlob(resolve, 'image/jpeg', 0.88); });
  canvas.width = 0;                                 // free the canvas memory
  return URL.createObjectURL(blob);
}

async function loadPages() {
  const pdf = await pdfjsLib.getDocument(magazine.pdf).promise;
  totalPages = pdf.numPages;

  // The ratio of the first page decides the shape of the whole book
  const first = await pdf.getPage(1);
  const size = first.getViewport({ scale: 1 });
  pageRatio = size.height / size.width;

  // Sharp enough for a big screen, light enough for a phone
  const targetWidth = Math.min(1100, 900 * Math.min(window.devicePixelRatio || 1, 2));

  const pictures = [];
  for (let n = 1; n <= totalPages; n++) {
    pictures.push(await renderPage(pdf, n, targetWidth));
    $('mag-progress').style.width = Math.round((n / totalPages) * 100) + '%';
    $('mag-loading-text').textContent = 'Preparing page ' + n + ' of ' + totalPages + '…';
  }
  return pictures;
}


/* ---------------------------------------------------------------------
   C. BUILD THE BOOK + SIZE IT
   --------------------------------------------------------------------- */

// Is the book shown as ONE page (phone) or a two-page spread (computer)?
const MIN_PAGE_WIDTH = 300;
function isSinglePage() {
  return viewer.clientWidth < MIN_PAGE_WIDTH * 2;
}

// Chooses the width of the book: as big as possible, never taller than the screen.
// (The page-turning library works out the height from the width and the page ratio.)
function sizeBook() {
  const available = viewer.clientWidth;
  const fullscreen = Boolean(document.fullscreenElement);
  const maxHeight = Math.max(360, window.innerHeight - (fullscreen ? 110 : 190));
  const single = isSinglePage();

  let pageWidth = single ? available : Math.min(available, 1200) / 2;
  if (pageWidth * pageRatio > maxHeight) pageWidth = maxHeight / pageRatio;   // too tall: shrink it

  fitBox.style.width = Math.round(single ? pageWidth : pageWidth * 2) + 'px';
}

// On the cover (or the back cover) only ONE page is visible, on one side of the book.
// We slide the book so that this single page stays centered.
function centerBook(index) {
  let shift = 0;
  if (!isSinglePage()) {
    if (index === 0) shift = -25;                                              // cover: right page only
    else if (index + 1 >= totalPages && index % 2 === 1) shift = 25;          // back cover alone: left page only
  }
  bookBox.style.transform = shift ? 'translateX(' + shift + '%)' : '';
}

function buildBook(pictures) {
  let html = '';
  pictures.forEach(function (src, i) {
    // First and last pages are "hard" (like a real cover), the others bend
    const hard = (i === 0 || i === pictures.length - 1) ? 'hard' : 'soft';
    html += '<div class="mag-page" data-density="' + hard + '">' +
      '<img src="' + src + '" alt="Magazine page ' + (i + 1) + '" draggable="false" />' +
      '</div>';
  });
  bookBox.innerHTML = html;

  sizeBook();
  book = new St.PageFlip(bookBox, {
    width: 400,                                    // base size of one page (any size, the ratio matters)
    height: Math.round(400 * pageRatio),
    size: 'stretch',                               // fills the box we sized above
    minWidth: MIN_PAGE_WIDTH,
    maxWidth: 1200,
    minHeight: Math.round(MIN_PAGE_WIDTH * pageRatio),
    maxHeight: 2000,
    showCover: true,
    drawShadow: true,
    maxShadowOpacity: 0.45,
    flippingTime: 800,
    usePortrait: true,
    mobileScrollSupport: false,                    // swiping sideways turns the page
    autoSize: true
  });
  book.loadFromHTML(bookBox.querySelectorAll('.mag-page'));
  book.on('flip', function (event) { updateCounter(event.data); });
  updateCounter(0);
}


/* ---------------------------------------------------------------------
   D. CONTROLS
   --------------------------------------------------------------------- */

// "1" on the cover, "4–5" for a spread, "6" for a single page
function updateCounter(index) {
  centerBook(index);
  let label;
  if (isSinglePage() || index === 0 || index + 1 >= totalPages) {
    label = String(index + 1);
  } else {
    label = (index + 1) + '–' + (index + 2);
  }
  $('mag-counter').textContent = label + ' / ' + totalPages;
  $('mag-prev').disabled = index <= 0;
  $('mag-next').disabled = index >= totalPages - 1;
}

function setupControls() {
  $('mag-prev').addEventListener('click', function () { book.flipPrev(); });
  $('mag-next').addEventListener('click', function () { book.flipNext(); });

  document.addEventListener('keydown', function (event) {
    if (!book || event.target.closest('input, textarea')) return;
    if (event.key === 'ArrowRight') book.flipNext();
    if (event.key === 'ArrowLeft') book.flipPrev();
  });

  // Full screen
  const fullButton = $('mag-full');
  fullButton.addEventListener('click', function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (viewer.requestFullscreen) viewer.requestFullscreen();
  });
  if (!viewer.requestFullscreen) fullButton.hidden = true;   // very old browsers

  document.addEventListener('fullscreenchange', function () {
    const on = Boolean(document.fullscreenElement);
    fullButton.innerHTML = icon(on ? 'minimize' : 'maximize');
    fullButton.setAttribute('aria-label', on ? 'Leave full screen' : 'Full screen');
    refreshLayout();
  });

  // Window resized (or phone turned): size the book again
  let timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(refreshLayout, 150);
  });
}

function refreshLayout() {
  if (!book) return;
  sizeBook();
  book.update();
  updateCounter(book.getCurrentPageIndex());
}


/* ---------------------------------------------------------------------
   E. START
   --------------------------------------------------------------------- */
function showProblem(message) {
  $('mag-loading').hidden = true;
  $('mag-empty-text').textContent = message;
  $('mag-empty').hidden = false;
}

async function start() {
  initSubpage();
  renderMagazineTexts();
  renderComments('magazine');

  try {
    const pictures = await loadPages();
    $('mag-loading').hidden = true;
    $('mag-controls').hidden = false;
    $('mag-hint').hidden = false;
    buildBook(pictures);
    setupControls();
  } catch (error) {
    console.error('Magazine error:', error);
    if (window.location.protocol === 'file:') {
      showProblem('The reader needs a web server. Open the site with VS Code "Live Server", or on its Vercel address. You can still download the PDF with the button above.');
    } else {
      showProblem('We could not open "' + magazine.pdf + '". Check that the file exists in the magazine folder and that the name in data.js is exactly the same.');
    }
  }
}

start();

# BU3 website — plain HTML / CSS / JavaScript

Same design as the Lovable (React + TypeScript) project, rebuilt so you can read it, edit it and grow it.
It has **four pages**:

| Page | What it is |
|---|---|
| `index.html` | The BU3 **home page**: hero, statement + numbers, "What we do", manager banner (with Contact button), member cards with photos, closing banner, footer |
| `member.html?member=amal-hamdi` | One member's **portfolio** (the part after `member=` is the member's `slug` in `data.js`). The home page links to every member. **The manager has no portfolio page** (opening his link sends you back to the home page). |
| `magazine.html` | **Week 3 — online magazine.** Your PDF shown as a page-turning book, a download button, and the members' comments at the bottom |
| `podcast.html` | **Week 3 — podcast script.** Guest card, script with reading tools (text size, reading mode, auto-scroll), the guest video, and the members' comments at the bottom |

## How to run it
Double-click `index.html`. No install, no build step.
**Exception: the magazine reader** (`magazine.html`) needs a web server, a browser will not read a PDF from a double-click. Use VS Code **Live Server**, or the Vercel address.
Tip: in VS Code, the **Live Server** extension reloads the page every time you save.
(You need an internet connection for the Montserrat font; without it the page still works with a default font.)

## The files

| File | What it does | When you edit it |
|---|---|---|
| `index.html` | Structure of the home page | To add/remove/reorder a home section |
| `member.html` | Structure of the member page | To change the portfolio layout |
| `style.css` | **All** colors, fonts, layout, animations, phone layout. Member styles first, **home styles at the end** (section 7) | To change the look |
| `data.js` | **All content**: members, projects, skills, experience, events, certifications + home info (email, menu links, "What we do" cards, current challenge) | **Most often** |
| `common.js` | Helpers + icons + scrolling banner + fade-in, shared by both pages | Rarely |
| `home.js` | Builds the home page from `data.js` + its interactions (phone menu, pause button, sticky header, back-to-top) | To change home behavior |
| `member.js` | Same, for the member page (scenes, tabs, pop-ups) | To change portfolio behavior |
| `magazine.html` · `magazine.js` | Magazine page and its page-turning reader | Rarely |
| `podcast.html` · `podcast.js` | Podcast script page and its reading tools | Rarely |
| `subpage.js` | Header, footer, menu and members' comments for the two Week 3 pages | Rarely |
| `magazine/` | The magazine PDF (`magazine.pdf`, a blank layout until you replace it) | Each issue |
| `vendor/` | Two libraries used by the reader (PDF.js and StPageFlip), with their licenses | Never |
| `images/` | Photos and logos | To change pictures |

Script order in each HTML file matters: `data.js` → `common.js` → `home.js` (or `member.js`).


Until you do, the BU3 logo shows as a small 64px version (`images/favicon.png`, a bit blurry in the big hero) and the JEENISo emblem in the footer is simply hidden.

## Where to put the photos
Two photos are already wired in. Save each file in `images/` with the exact name below. Until a file exists the page looks normal (no broken image), then the photo appears by itself.

| Photo | File name | What to use |
|---|---|---|
| **Team photo** behind "BUSINESS UNIT 03." in the hero | `images/team-photo.jpg` | Landscape, at least 1920 × 1080 px, all members together. Keep the file under ~400 KB (compress it on squoosh.app). |
| **Manager portrait** on the right of the "Leading the unit" card | `images/oussama-berrehouma.jpg` | Portrait (about 4:5), at least 900 × 1100 px, face in the upper third (the photo is cropped from the top). |

- **Different file name or type?** Change the path in `data.js`: `site.heroPhoto` for the team photo, `photo:` on the manager's line for the portrait. Use `''` to turn a photo off.
- **Transparent PNG cut-out for the manager:** use a `.png` (and change the path). The big gold outlined initials then appear *behind* the person, which looks great.
- **Text hard to read on the team photo?** In `style.css`, section 8, make `--home-hero-wash` stronger (raise the last number, for example `.78` to `.85`). To change which part of the photo stays visible when it is cropped (phones especially), edit `--home-hero-focus` (for example `center 20%`).
- On a phone the team photo is cropped to its middle, so keep the group centered.

### Member photos (PNG)
Save each member's photo in **`images/members/`**, named after his slug (the `slug` in `data.js`), as a **.png**:

`images/members/alaeddine-ouni.png`, `amal-hamdi.png`, `eya-haouari.png`, `hamdi-karmai.png`, `farah-haj-fraj.png`, `momen-nsiri.png`, `mohamed-aziz-mili.png`

- The photo appears on his card on the home page **and** as the big portrait on his member page. No code to change.
- A **transparent PNG** (person cut out, no background) looks best: the big outlined initials show behind him. A normal photo works too.
- Portrait format, about 4:5 (for example 800 × 900 px), face in the upper part. Keep each file under ~300 KB.
- No file yet? The card shows the initials, nothing breaks.
- Different file name or type? Add `photo: 'images/members/my-file.jpg'` to that member's line in `data.js`.

### Manager Contact button
The manager is only on the home page, in the "Leading the unit" banner. Write his number in `data.js`, on his line: `phone: '+216 XX XXX XXX'`. The button then calls that number (on a phone) and the number is shown next to the button. While `phone` is `''`, the button opens an email to `site.email` instead.

## Common edits

**Change the contact email, years or current challenge:** `site` in `data.js` (the hero pill, the stats and the footer update by themselves).

**Add a menu link:** add a line to `navigation` in `data.js`. It appears in the header and in the footer. The `href` must match an `id` in `index.html`.

**Add a member:** copy one line of `members` in `data.js`. The home page cards, the counters ("8 members", "7 creative members + 1 manager") and the members pop-up update automatically.

**Experience / Events / Certifications (different for each member):** open the member's line in `data.js` and fill his own lists `experiences`, `events`, `certifications`. Add or delete items freely (copy the example on the last member, `mohamed-aziz-mili`, it shows every field). A list left empty `[]` hides that tab for him; if all three are empty the whole "More than projects" section disappears. Event photos are optional (`image`). Add `sample: true` to an item only if it is a placeholder (it prints a small "Sample" label).

**Write a biography:** fill `biography: ''` and `description: ''` for that member in `data.js`.

**Add social links:** put items in `socials` in `data.js` (example is in the comment). The footer list appears only when it has items.

**Change the main blue:** `--primary` at the top of `style.css`.

**Change the "What we do" photos:** `capabilities` in `data.js` (put the picture in `images/`).

## Week 3 pages (templates, content comes from you)
The three Week 3 pages are empty templates: structure and placement only. Everything is filled from `data.js`; a field left as `''` is hidden.

- **Magazine:** replace `magazine/magazine.pdf` with your PDF (same name, A4 portrait, under ~15 MB, page 1 = cover, last page = back cover). Fill `magazine` in `data.js` (issue, topic, description).
- **Podcast:** fill `podcast` in `data.js`: episode, title, `guest` (name, role, photo, bio), and the `segments` of the script (copy, delete or add blocks). Video: write `video.youtubeId` or `video.file`; until then a "Video coming soon" frame is shown.
- **Members' comments:** `comments.magazine` and `comments.podcast` in `data.js`. One card per member is already set (photo, name and role come from `members`). Write the `text` of each one. Delete a line to remove a card.
- **Challenges:** the timeline on the home page comes from `challenges` in `data.js` (status, text, links, Executive Bureau review).

## Ideas to go further
1. Fill the Executive Bureau reviews of the challenges (`review.text` in `challenges`).
2. Make the manifesto words light up one after the other (add a `transition-delay` per word in `renderManifesto()`).
3. Add a search box that filters the member cards.
4. Make projects and "My playground" skills per member too (same idea as `experiences`: move the lists into each member, hide when empty).
5. Load the members from a JSON file with `fetch()` (needs Live Server, not a double-click).

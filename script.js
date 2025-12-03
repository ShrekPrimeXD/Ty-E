/*******************
 *   PROJETS
 *******************/
const projetsParFiliere = {
  melec: [
    { titre: "LECTURE SIGNAUX", lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux" },
    { titre: "REDRESSEUR DIODE", lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode" }
  ],
  ciel: [
    { titre: "Feux tricolore", lien: "https://www.tinkercad.com/things/3xvFANLNDCH-amazing-hango-albar",
      code: `// Feux Tricolore Arduino
int ledRouge = 10;
int ledOrange = 9;
int ledVerte = 8;

void setup() {
  pinMode(ledRouge, OUTPUT);
  pinMode(ledOrange, OUTPUT);
  pinMode(ledVerte, OUTPUT);
}

void loop() {
  digitalWrite(ledRouge, HIGH);
  delay(3000);
  digitalWrite(ledRouge, LOW);
  digitalWrite(ledOrange, HIGH);
  delay(1000);
  digitalWrite(ledOrange, LOW);
  digitalWrite(ledVerte, HIGH);
  delay(3000);
  digitalWrite(ledVerte, LOW);
}`}
    // autres projets ...
  ]
};

/*******************
 *   SYNTAX HIGHLIGHT
 *******************/
function highlightCode(code) {
  const comments = /(\/\/.*)/g;
  const keywords = /\b(void|int|float|const|long|pinMode|digitalWrite|delay|Serial|tone|noTone|INPUT|OUTPUT|HIGH|LOW)\b/g;
  const functions = /\b(setup|loop|pulseIn|begin)\b/g;
  const numbers = /\b\d+(\.\d+)?\b/g;

  return code
    .replace(comments, '<span class="comment">$1</span>')
    .replace(keywords, '<span class="keyword">$1</span>')
    .replace(functions, '<span class="function">$1</span>')
    .replace(numbers, '<span class="number">$&</span>');
}

/*******************
 *   RENDER LISTES
 *******************/
function renderProjects(filiere) {
  const container = document.getElementById(filiere + "-list");
  container.innerHTML = "";
  const frag = document.createDocumentFragment();

  projetsParFiliere[filiere].forEach(p => {
    const box = document.createElement("div");
    box.className = "project fade-zoom-up";

    const title = document.createElement("h3");
    title.textContent = p.titre;
    title.classList.add("multicolor");

    const link = document.createElement("a");
    link.href = p.lien;
    link.target = "_blank";
    link.textContent = "🔗 Ouvrir le montage";

    box.append(title, link);

    if (p.code) {
      const btn = document.createElement("button");
      btn.textContent = "Afficher le code";

      const copy = document.createElement("button");
      copy.textContent = "📋 Copier";
      copy.style.display = "none";

      const pre = document.createElement("pre");
      pre.style.display = "none";
      pre.innerHTML = highlightCode(p.code);

      btn.onclick = () => {
        const show = pre.style.display === "none";
        pre.style.display = show ? "block" : "none";
        copy.style.display = show ? "inline-block" : "none";
        btn.textContent = show ? "Masquer le code" : "Afficher le code";
      };

      copy.onclick = () => {
        navigator.clipboard.writeText(p.code);
        copy.textContent = "✔ Copié";
        setTimeout(() => copy.textContent = "📋 Copier", 1200);
      };

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.gap = "10px";
      row.append(btn, copy);

      box.append(row, pre);
    }

    frag.appendChild(box);
  });

  container.appendChild(frag);
}

// Rendu initial
renderProjects("melec");
renderProjects("ciel");

/*******************
 *   SEARCH
 *******************/
document.getElementById("searchBox").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".project").forEach(p => {
    const t = p.querySelector("h3").textContent.toLowerCase();
    p.style.display = t.includes(term) ? "block" : "none";
  });
});

/*******************
 *   SCROLL TOP BTN
 *******************/
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*******************
 *   PLUIE D’EMOJIS
 *******************/
const emojiContainer = document.createElement("div");
emojiContainer.className = "emoji-bg";
document.body.appendChild(emojiContainer);

const emojis = ["📁", "🔒"];
function createEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";
  e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = 18 + Math.random() * 36 + "px";
  e.style.animationDuration = 3 + Math.random() * 5 + "s";

  emojiContainer.appendChild(e);
  setTimeout(() => e.remove(), parseFloat(e.style.animationDuration) * 1000);
}
setInterval(createEmoji, 120);

/*******************
 *   FADE + ZOOM + SLIDE-UP CINEMATIQUE
 *******************/
const fadeElements = document.querySelectorAll('.fade-zoom-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rect = entry.target.getBoundingClientRect();
      const delay = rect.top * 0.3; // délai basé sur position verticale
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

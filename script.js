const projetsParFiliere = {
  melec: [
    { titre: "LECTURE SIGNAUX", lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux" },
    { titre: "REDRESSEUR DIODE", lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode" }
  ],
  ciel: [
    { titre: "Feux tricolore", lien: "https://www.tinkercad.com/things/3xvFANLNDCH-amazing-hango-albar", code: `// Feux Tricolore Arduino\nint ledRouge=10,ledOrange=9,ledVerte=8;\nvoid setup(){pinMode(ledRouge,OUTPUT);pinMode(ledOrange,OUTPUT);pinMode(ledVerte,OUTPUT);}\nvoid loop(){digitalWrite(ledRouge,HIGH);delay(3000);digitalWrite(ledRouge,LOW);digitalWrite(ledOrange,HIGH);delay(1000);digitalWrite(ledOrange,LOW);digitalWrite(ledVerte,HIGH);delay(3000);digitalWrite(ledVerte,LOW);}` },
    { titre: "Allumage LED", lien: "https://www.tinkercad.com/things/1UpGT1sjzcR-allumage-led", code: `const int led=13;\nvoid setup(){pinMode(led,OUTPUT);}\nvoid loop(){digitalWrite(led,HIGH);delay(500);digitalWrite(led,LOW);delay(500);}` },
    { titre: "Capteur Ultrason", lien: "https://www.tinkercad.com/things/elsRRyCBrV7-neat-crift-sango", code: `const int TRIGGER_PIN=2,ECHO_PIN=3;\nvoid setup(){Serial.begin(9600);pinMode(TRIGGER_PIN,OUTPUT);pinMode(ECHO_PIN,INPUT);}\nvoid loop(){digitalWrite(TRIGGER_PIN,HIGH);delayMicroseconds(10);digitalWrite(TRIGGER_PIN,LOW);long m=pulseIn(ECHO_PIN,HIGH,25000);float dist=m*0.01715;Serial.println(dist);delay(200);}` },
    { titre: "Bouton + Buzzer", lien: "https://www.tinkercad.com/things/dkqLm6Srjgs-funky-curcan", code: `int bouton=8,buzzer=7;\nvoid setup(){pinMode(bouton,INPUT);pinMode(buzzer,OUTPUT);}\nvoid loop(){digitalRead(bouton)==HIGH?tone(buzzer,1000):noTone(buzzer);}` }
  ]
};

function highlightCode(code) {
  return code
    .replace(/\/\/.*/g, '<span class="comment">$&</span>')
    .replace(/\b(void|int|float|const|long|if|else|for|while|return|pinMode|digitalWrite|delay|tone|noTone|Serial|INPUT|OUTPUT|HIGH|LOW)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(setup|loop|pulseIn)\b/g, '<span class="function">$1</span>')
    .replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');
}

function renderProjects(filiere) {
  const container = document.getElementById(filiere + "-list");
  container.innerHTML = "";
  projetsParFiliere[filiere].forEach(p => {
    const box = document.createElement("div"); box.className = "project";
    const title = document.createElement("h3"); title.textContent = p.titre; title.classList.add("multicolor");
    const link = document.createElement("a"); link.href = p.lien; link.target = "_blank"; link.textContent = "Ouvrir le montage";
    box.append(title, link);
    if (p.code) {
      const btn = document.createElement("button"); btn.textContent = "Afficher le code";
      const copy = document.createElement("button"); copy.textContent = "Copier"; copy.style.display = "none";
      const pre = document.createElement("pre"); pre.style.display = "none"; pre.innerHTML = highlightCode(p.code);
      btn.onclick = () => {
        const show = pre.style.display === "none";
        pre.style.display = show ? "block" : "none";
        copy.style.display = show ? "inline-block" : "none";
        btn.textContent = show ? "Masquer" : "Afficher le code";
      };
      copy.onclick = () => {
        navigator.clipboard.writeText(p.code);
        copy.textContent = "Copié !";
        setTimeout(() => copy.textContent = "Copier", 1500);
      };
      const row = document.createElement("div"); row.style.display = "flex"; row.style.gap = "8px"; row.append(btn, copy);
      box.append(row, pre);
    }
    container.appendChild(box);
  });
}
renderProjects("melec"); renderProjects("ciel");

document.getElementById("searchBox").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".project").forEach(p => {
    p.style.display = p.querySelector("h3").textContent.toLowerCase().includes(term) ? "block" : "none";
  });
});

const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

// Pluie d'emojis discrète
const emojiContainer = document.createElement("div"); emojiContainer.className = "emoji-bg"; document.body.appendChild(emojiContainer);
const emojis = ["Folder", "Lock"];
function createEmoji() {
  const e = document.createElement("div"); e.className = "emoji";
  e.textContent = emojis[Math.random() < 0.7 ? 0 : 1];
  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = 20 + Math.random() * 30 + "px";
  e.style.animationDuration = 4 + Math.random() * 6 + "s";
  emojiContainer.appendChild(e);
  setTimeout(() => e.remove(), parseFloat(e.style.animationDuration) * 1000 + 1000);
}
setInterval(createEmoji, 180);

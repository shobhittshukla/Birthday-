const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* Decorative stars */
const stars = $("#stars");

for (let i = 0; i < 90; i++) {
  const s = document.createElement("span");

  s.className = "star";
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.style.animationDelay = `${Math.random() * 3}s`;
  s.style.animationDuration = `${2 + Math.random() * 4}s`;

  stars.appendChild(s);
}


/* Open website */
$("#openBtn").addEventListener("click", () => {
  $("#intro").style.display = "none";

  $("#site").classList.remove("is-hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  launchConfetti(70);
});


/* Smooth scroll buttons */
$$("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {

    const target = document.getElementById(btn.dataset.scroll);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }

  });
});


/* Reveal animations */
const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);

$$(".reveal").forEach((el) => {
  observer.observe(el);
});


/* Photo Lightbox */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCaption = $("#lightboxCaption");

$$(".photo-card").forEach((card) => {

  card.addEventListener("click", () => {

    lightboxImg.src = card.dataset.photo;

    lightboxCaption.textContent = card.dataset.caption;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

  });

});


function closeLightbox() {

  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


$("#closeLightbox").addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {
    closeLightbox();
  }

});


document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    closeLightbox();
  }

});


/* Gift interaction */
$("#gift").addEventListener("click", () => {

  const gift = $("#gift");

  gift.classList.add("open");

  launchConfetti(100);

  setTimeout(() => {

    $("#secret").classList.remove("hidden");

    $("#secret").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 650);

});


/* Replay */
$("#replay").addEventListener("click", () => {

  $("#secret").classList.add("hidden");

  $("#gift").classList.remove("open");

  $("#site").classList.add("is-hidden");

  $("#intro").style.display = "grid";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* Confetti */
function launchConfetti(count = 60) {

  const pieces = [
    "#efa6bb",
    "#f4dfcf",
    "#c77c9b",
    "#ffffff",
    "#e6b4c2"
  ];

  for (let i = 0; i < count; i++) {

    const piece = document.createElement("span");

    piece.className = "confetti";

    piece.style.background =
      pieces[i % pieces.length];

    const x =
      (Math.random() - 0.5) *
      window.innerWidth *
      1.25;

    const y =
      (Math.random() - 0.5) *
      window.innerHeight *
      1.05;

    const rotate =
      Math.random() * 900 - 450;

    document.body.appendChild(piece);

    piece.animate(
      [
        {
          transform:
            "translate(0,0) rotate(0deg)",
          opacity: 1
        },

        {
          transform:
            `translate(${x}px,${y}px) rotate(${rotate}deg)`,
          opacity: 0
        }
      ],
      {
        duration:
          1200 + Math.random() * 1000,

        easing:
          "cubic-bezier(.12,.7,.25,1)"
      }
    );

    setTimeout(() => {
      piece.remove();
    }, 2400);

  }

}


/* Birthday Melody */
let audioContext = null;

let musicOn = false;

let musicTimer = null;


$("#musicBtn").addEventListener("click", () => {

  musicOn = !musicOn;

  $("#musicBtn").textContent =
    musicOn ? "♫" : "♪";


  if (musicOn) {

    audioContext =
      audioContext ||
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    playNote();

  } else {

    clearTimeout(musicTimer);

  }

});


function playNote() {

  if (!musicOn) return;

  const notes = [
    261.63,
    329.63,
    392.00,
    329.63,
    293.66,
    349.23,
    440.00,
    392.00
  ];

  const note =
    notes[
      Math.floor(
        Math.random() * notes.length
      )
    ];


  const osc =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();


  osc.type = "sine";

  osc.frequency.value = note;


  gain.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.025,
    audioContext.currentTime + 0.05
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 1.1
  );


  osc.connect(gain);

  gain.connect(audioContext.destination);


  osc.start();

  osc.stop(
    audioContext.currentTime + 1.1
  );


  musicTimer = setTimeout(
    playNote,
    1250
  );

}


/* Birthday Cake interaction */
$("#cake").addEventListener("click", () => {

  launchConfetti(45);

});

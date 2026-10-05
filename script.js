
/* =========================
   FLOATING HEART ANIMATION
========================= */

const heartsContainer = document.getElementById("hearts");

const heartSymbols = ["♡", "♥", "ღ", "♡", "✧"];

function createHeart() {
  const heart = document.createElement("span");

  heart.classList.add("heart");
  heart.innerHTML =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 25) + "px";

  const isRed = Math.random() > 0.5;

  heart.style.color = isRed ? "#fff1dc" : "#d98b87";
  heart.style.animationDuration = (7 + Math.random() * 8) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 15000);
}

setInterval(createHeart, 600);


/* =========================
   A FEW PAGES BOOK
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const fewPages = document.querySelectorAll(".fewbook-page");
  const fewNext = document.getElementById("fewNext");
  const fewPrev = document.getElementById("fewPrev");
  const fewCurrent = document.getElementById("fewCurrent");

  if (!fewPages.length || !fewNext || !fewPrev) return;

  let fewIndex = 0;
  let fewAnimating = false;


  function updateFewBook(direction) {

    if (fewAnimating) return;

    fewAnimating = true;

    const oldPage = fewPages[fewIndex];

    oldPage.classList.add(
      direction === "next"
        ? "flip-next"
        : "flip-prev"
    );


    setTimeout(() => {

      oldPage.classList.remove(
        "active",
        "flip-next",
        "flip-prev"
      );


      if (direction === "next") {
        fewIndex++;

        if (fewIndex >= fewPages.length) {
          fewIndex = 0;
        }

      } else {

        fewIndex--;

        if (fewIndex < 0) {
          fewIndex = fewPages.length - 1;
        }
      }


      fewPages[fewIndex].classList.add("active");

      fewCurrent.textContent =
        String(fewIndex + 1).padStart(2, "0");


      setTimeout(() => {
        fewAnimating = false;
      }, 100);

    }, 500);
  }


  fewNext.addEventListener("click", () => {
    updateFewBook("next");
  });


  fewPrev.addEventListener("click", () => {
    updateFewBook("prev");
  });


  /* SWIPE UNTUK HP */

  let touchStartX = 0;
  let touchEndX = 0;

  const fewBook = document.querySelector(".fewbook");

  fewBook.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });


  fewBook.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    const difference =
      touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
      updateFewBook("next");
    } else {
      updateFewBook("prev");
    }
  });


  /* KEYBOARD */

  document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {
      updateFewBook("next");
    }

    if (e.key === "ArrowLeft") {
      updateFewBook("prev");
    }

  });

});


/* =========================
   LETTER OPEN ANIMATION
========================= */

const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");

let letterOpened = false;

letterButton.addEventListener("click", () => {

  letterOpened = !letterOpened;

  envelope.classList.toggle("open", letterOpened);

  letterButton.innerHTML = letterOpened
    ? "Close your letter ♡"
    : "Open your letter ♡";

});


/* =========================
   CONFETTI ANIMATION
========================= */

const confettiButton = document.getElementById("confettiButton");
const confettiContainer = document.getElementById("confetti-container");

const confettiColors = [
  "#4d0909",
  "#a52e35",
  "#c65b58",
  "#fff1dc",
  "#e8c8a3",
  "#d99b80"
];

function createConfetti() {

  const confetti = document.createElement("div");

  confetti.classList.add("confetti");

  confetti.style.left = Math.random() * 100 + "%";

  confetti.style.backgroundColor =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];

  confetti.style.animationDuration =
    (2 + Math.random() * 3) + "s";

  confetti.style.animationDelay =
    Math.random() * 0.5 + "s";

  confetti.style.width =
    (5 + Math.random() * 8) + "px";

  confetti.style.height =
    (8 + Math.random() * 12) + "px";

  confetti.style.borderRadius =
    Math.random() > 0.5 ? "50%" : "2px";

  confettiContainer.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 6000);

}


confettiButton.addEventListener("click", () => {

  // Confetti utama
  for (let i = 0; i < 160; i++) {
    setTimeout(() => {
      createConfetti();
    }, i * 10);
  }

  // Ganti tulisan tombol
  confettiButton.innerHTML = "Happy Birthday! ♡";

  // Tambahkan love yang lebih banyak
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 100);
  }

  // Tambahkan efek getar ringan
  document.querySelector(".ending-title").animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.08)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 600,
      iterations: 2
    }
  );

  setTimeout(() => {
    confettiButton.innerHTML = "Make a wish! ♡";
  }, 4000);

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".section-title, .section-desc, .polaroid, .calendar-card, .book-container, .letter-wrapper"
);

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});


/* =========================
   SCROLL REVEAL STYLE
========================= */

const revealStyle = document.createElement("style");

revealStyle.innerHTML = `
  .reveal {
    opacity: 0;
    transform: translateY(35px);
    transition: opacity 1s ease, transform 1s ease;
  }

  .reveal.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(revealStyle);


/* =========================
   POLAROID HOVER EFFECT
========================= */

document.querySelectorAll(".polaroid").forEach((photo) => {

  photo.addEventListener("click", () => {

    photo.classList.toggle("selected");

  });

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function(e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});
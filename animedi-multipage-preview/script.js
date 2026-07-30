const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const dialog = document.querySelector("#department-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector(".dialog-close");

const departments = {
  "small-animals": {
    eyebrow: "Kleine huisdieren · Nevele",
    title: "Zorg voor uw huisdier",
    text: "Consultaties zijn enkel op afspraak. Voor vaste klanten blijft het team telefonisch bereikbaar bij spoedgevallen.",
    phone: "09 321 02 40",
    phoneHref: "+3293210240",
    email: "kleinehuisdieren@animedi.be",
  },
  horses: {
    eyebrow: "Paarden · Nevele",
    title: "Paardengeneeskunde",
    text: "Voor afspraken en inlichtingen kunt u het paardenteam tijdens de openingsuren bereiken. Bij dringende gevallen voor vaste klanten is het team steeds telefonisch bereikbaar.",
    phone: "09 321 02 40",
    phoneHref: "+3293210240",
    email: "paarden@animedi.be",
  },
  farm: {
    eyebrow: "Landbouwdieren · Lotenhulle",
    title: "Zorg op het bedrijf",
    text: "Maak uw afspraak bij voorkeur tussen 08:00 en 09:00. Voor dringende gevallen is de eigen wachtdienst dag en nacht bereikbaar.",
    phone: "09 221 57 95",
    phoneHref: "+3292215795",
    email: "landbouwdieren@animedi.be",
  },
};

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function showDepartment(department) {
  if (!dialog || !dialogContent) return;

  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow">${department.eyebrow}</p>
      <h2>${department.title}</h2>
      <p>${department.text}</p>
      <div class="dialog-details">
        <a href="tel:${department.phoneHref}">${department.phone}</a>
        <a href="mailto:${department.email}">${department.email}</a>
      </div>
      <div class="dialog-actions">
        <a class="button" href="tel:${department.phoneHref}">Bel de praktijk</a>
        <a class="button button--outline" href="mailto:${department.email}">Stuur een e-mail</a>
      </div>
    </div>
  `;
  dialog.showModal();
}

document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.dialog;

    if (target === "contact-choice") {
      dialogContent.innerHTML = `
        <div class="dialog-body">
          <p class="eyebrow">Kies uw afdeling</p>
          <h2>Wie kunnen we helpen?</h2>
          <p>Neem rechtstreeks contact op met het juiste gespecialiseerde team.</p>
          <div class="dialog-details">
            <button class="card-link dialog-choice" data-department="horses" type="button">Paarden — Nevele <span>→</span></button>
            <button class="card-link dialog-choice" data-department="farm" type="button">Landbouwdieren — Lotenhulle <span>→</span></button>
          </div>
        </div>
      `;
      dialog.showModal();
      dialogContent.querySelectorAll("[data-department]").forEach((choice) => {
        choice.addEventListener("click", () => showDepartment(departments[choice.dataset.department]));
      });
      return;
    }

    if (departments[target]) showDepartment(departments[target]);
  });
});

closeDialogButton?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("[data-year], #year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

function shuffleNodes(nodes) {
  const items = [...nodes];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function initHeroSlideshow(root) {
  const track = root.querySelector(".hero__slides");
  const slides = Array.from(root.querySelectorAll(".hero__slide"));
  if (!track || slides.length < 2) return;

  // Pick a random order once on load, then keep cycling through it.
  const ordered = shuffleNodes(slides);
  ordered.forEach((slide, i) => {
    track.appendChild(slide);
    slide.classList.toggle("is-active", i === 0);
    slide.setAttribute("aria-hidden", i === 0 ? "false" : "true");
  });

  let index = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalMs = reducedMotion ? 0 : 3000;
  let timer = null;

  function goTo(nextIndex) {
    if (nextIndex === index) return;
    ordered[index].classList.remove("is-active");
    ordered[index].setAttribute("aria-hidden", "true");

    index = (nextIndex + ordered.length) % ordered.length;

    ordered[index].classList.add("is-active");
    ordered[index].setAttribute("aria-hidden", "false");
  }

  function next() {
    goTo(index + 1);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    if (!intervalMs || timer) return;
    timer = setInterval(next, intervalMs);
  }

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) start();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

document.querySelectorAll("[data-hero-slideshow]").forEach(initHeroSlideshow);
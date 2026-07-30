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

document.querySelector("#year").textContent = new Date().getFullYear();

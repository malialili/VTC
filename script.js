// PERSONNALISATION : remplacez ces valeurs par les coordonnées réelles de votre activité.
const VTC_CONFIG = {
  phone: "", // Exemple : "+33612345678"
  email: "", // Exemple : "contact@monvtc.fr"
  whatsapp: "" // Exemple : "33612345678" (indicatif pays, sans + ni espaces)
};

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.textContent = opened ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("booking-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const message = [
    "Bonjour, je souhaite demander un devis VTC.",
    "",
    "Nom : " + data.name,
    "Téléphone : " + data.phone,
    "Départ : " + data.from,
    "Destination : " + data.to,
    "Date : " + data.date,
    "Heure : " + (data.time || "À préciser"),
    "Passagers : " + data.passengers,
    "Type : " + data.type,
    "Informations : " + (data.message || "Aucune")
  ].join("\n");

  if (VTC_CONFIG.email) {
    const subject = encodeURIComponent("Demande de devis VTC");
    window.location.href = "mailto:" + VTC_CONFIG.email + "?subject=" + subject + "&body=" + encodeURIComponent(message);
    status.textContent = "Votre application e-mail va s'ouvrir. Vérifiez puis envoyez votre demande.";
  } else if (VTC_CONFIG.whatsapp) {
    window.open("https://wa.me/" + VTC_CONFIG.whatsapp + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    status.textContent = "WhatsApp va s'ouvrir avec votre demande préremplie.";
  } else {
    status.textContent = "Le formulaire est prêt. Ajoutez votre adresse e-mail ou votre numéro WhatsApp dans script.js pour recevoir les demandes.";
  }
});

const floating = document.getElementById("floating-contact");
if (VTC_CONFIG.whatsapp) {
  floating.href = "https://wa.me/" + VTC_CONFIG.whatsapp;
  floating.target = "_blank";
  floating.rel = "noopener";
  floating.setAttribute("aria-label", "Contacter par WhatsApp");
}

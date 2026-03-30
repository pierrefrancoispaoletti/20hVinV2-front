export const placeLocation = "20hvin";
export const serverURI = process.env.REACT_APP_SERVER_URI;

export const colors = {
  main: "white", //white
  secondary: "#777758", //vert foncé
  tertiary: "#62714e", // vert clair
  ecriture: "#000000", //black
  background: "#f4ba9a",
  background2: "#ff8080",
  gold: "#7B7338",
};
// pour le style2 et non pas le style ardoise
export const categoriesStyle2 = [];

// pour les separations entre les articles
export const allowedCategories = [];

export const phoneNumber = "+33495722052";

export const facebook = "https://www.facebook.com/20HeuresVin";
export const instagram = "https://www.instagram.com/le_20_heures_vin";
export const url = "https://20h20.fr";
export const mail = "christophe.torre75@gmail.com";

export const GOOGLE_API_KEY = "AIzaSyCXqBKgfwkkW1urDlW0_GBNaS79P1ZjU0E";

export const TIME_SLOTS = { MIDI: "midi", SOIR: "soir", ALWAYS: "always" };

export function getCurrentTimeSlotFrance() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "12", 10);
  const min = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  // Midi : 02h01 → 14h59 | Soir : 15h00 → 02h00
  if (hour > 2 || (hour === 2 && min >= 1)) {
    if (hour < 15) return TIME_SLOTS.MIDI;
  }
  return TIME_SLOTS.SOIR;
}

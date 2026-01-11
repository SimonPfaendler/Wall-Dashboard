import aldiCover from '../assets/Aldi.jpg';

// Hardcoded
const PROSPEKT_URL = "https://prospekt.aldi-sued.de/kw03-26-op-mp/page/1";
const COVER_IMAGE = aldiCover;

export function useAldi() {
    return {
        prospektUrl: PROSPEKT_URL,
        coverImage: COVER_IMAGE,
        title: "Aldi SÜD Vorschau KW 03"
    };
}

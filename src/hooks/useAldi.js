import { useState, useEffect } from 'react';

// Hardcoded
const PROSPEKT_URL = "https://prospekt.aldi-sued.de/kw03-26-op-mp/page/1";
const COVER_IMAGE = "https://view.publitas.com/56570/2034870/pages/225c9602-0e26-4074-be6a-93118ce245f7-at1600.jpg";

export function useAldi() {
    return {
        prospektUrl: PROSPEKT_URL,
        coverImage: COVER_IMAGE,
        title: "Aldi SÜD Vorschau KW 03"
    };
}

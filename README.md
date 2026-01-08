# Wall Dashboard

A clean, dark-mode dashboard designed for an always-on tablet display.

## Features
- **Clock**: Large digital time and date.
- **Weather**: Current conditions and daily high/low.
- **Trash Schedule**: Next pickup indicator.
- **Personal Calendar**: Upcoming events list.

## Setup (Development)

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Use Data:**
    - **Trash:** Place your specific `trash.ics` in the `public/` folder.
    - **Calendar:** Add your iCloud Public URL to `src/hooks/useCalendar.js`.

3.  **Run locally:**
    ```bash
    npm run dev
    ```

## Deployment & Home Setup
To run this as a real dashboard appliance:

1.  **Host Online (Free):**
    - usage services like **Vercel** or **Netlify**.
    - Connect your GitHub repo and deploy. It will give you a live URL.

2.  **Tablet Setup (Android):**
    - Install **Fully Kiosk Browser**.
    - Set the "Start URL" to your Vercel link.
    - Enable "Keep Screen On" and "Fullscreen Mode".

3.  **Hardware Tips:**
    - Use a dedicated wall mount.
    - Enable "Battery Protection" (85% limit) if keeping it plugged in 24/7.

## Technology
- React + Vite
- TailwindCSS

## TODO
- Add more Weather information
- Add second Apple calendar
- Add Shopping List from Bring! App

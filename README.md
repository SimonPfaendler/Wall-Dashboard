# Wall Dashboard

A clean, dark-mode dashboard designed for an always-on tablet display.

## Features
- **Clock**: Large digital time and date.
- **Weather**: Current conditions and daily high/low.
- **Trash Schedule**: Next pickup indicator.
- **Personal Calendar**: Upcoming events list.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Trash Schedule:**
    - Download your local trash schedule as an `.ics` file.
    - Rename it to `trash.ics` and place it in the `public/` folder.

3.  **Configure Calendar:**
    - Get your iCloud Public Calendar URL (`webcal://...`).
    - Open `src/hooks/useCalendar.js`.
    - Replace the `CALENDAR_URL` variable with your link.

4.  **Run locally:**
    ```bash
    npm run dev
    ```

## Technology
- React + Vite
- TailwindCSS

## TODO
- Add more Weather information

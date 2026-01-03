import { useState, useEffect } from 'react';
import axios from 'axios';
import ICAL from 'ical.js';
import { startOfDay, addDays } from 'date-fns';

// Placeholder URL - User will replace this with their iCloud link
const CALENDAR_URL = "webcal://p160-caldav.icloud.com/published/2/MTAxODI4MDAzNDYxMDE4MrV3ZCTqV2vw9GFeXkE05U5GWw6KkRxq0tTqhghmAMG1";

export function useCalendar() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!CALENDAR_URL) {
                // Return empty if no URL configured yet
                return;
            }

            try {
                // iCloud webcal:// needs to be treated as https://
                // Use corsproxy.io to bypass CORS restrictions for client-side fetch
                const url = "https://corsproxy.io/?" + CALENDAR_URL.replace('webcal://', 'https://');

                const response = await axios.get(url);
                const jcalData = ICAL.parse(response.data);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents('vevent');

                const now = new Date();

                const parsedEvents = vevents.map(ev => {
                    const event = new ICAL.Event(ev);
                    return {
                        summary: event.summary,
                        startDate: event.startDate.toJSDate(),
                        endDate: event.endDate.toJSDate(),
                        isAllDay: event.startDate.isDate
                    };
                });

                // Filter future events (or today) and sort
                const futureEvents = parsedEvents
                    .filter(ev => ev.endDate >= now)
                    .sort((a, b) => a.startDate - b.startDate)
                    .slice(0, 5); // Just take next 5 events

                setEvents(futureEvents);
                setError(false);
            } catch (err) {
                console.error("Calendar fetch failed", err);
                setError(true);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 15 * 60 * 1000); // 15 mins
        return () => clearInterval(interval);
    }, []);

    return { events, error };
}

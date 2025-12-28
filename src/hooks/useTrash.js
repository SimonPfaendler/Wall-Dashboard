import { useState, useEffect } from 'react';
import axios from 'axios';
import ICAL from 'ical.js';
import { isAfter, startOfDay, addDays } from 'date-fns';

const TRASH_URL = "/trash.ics";

export function useTrash() {
    const [nextPickup, setNextPickup] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(TRASH_URL);
                const jcalData = ICAL.parse(response.data);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents('vevent');
                const now = startOfDay(new Date()); // 00:00 today

                const events = vevents.map(ev => {
                    const event = new ICAL.Event(ev);
                    return {
                        summary: event.summary,
                        date: event.startDate.toJSDate()
                    };
                });
                const futureEvents = events
                    .filter(ev => {
                        const evDate = startOfDay(ev.date);
                        return evDate.getTime() >= now.getTime();
                    })
                    .sort((a, b) => a.date.getTime() - b.date.getTime());

                if (futureEvents.length > 0) {
                    setNextPickup(futureEvents[0]);
                }
                setError(false);
            } catch (err) {
                console.error("Trash ICS failed", err);
                setError(true);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 4 * 60 * 60 * 1000); // 4 hours
        return () => clearInterval(interval);
    }, []);

    return { nextPickup, error };
}

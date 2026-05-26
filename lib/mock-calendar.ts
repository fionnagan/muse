import type { DMO } from "./types";
import { MOCK_DMOS } from "./mock-data";

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: "brainstorm" | "review" | "client" | "workshop" | "standup";
  project: string;
  relatedDMOs: DMO[];
  attendees: string[];
}

export const TODAY_EVENTS: CalendarEvent[] = [
  {
    id: "evt_001",
    title: "Onboarding Redesign Brainstorm",
    time: "2:00 PM",
    duration: "60 min",
    type: "brainstorm",
    project: "Onboarding Redesign",
    attendees: ["Priya", "Marcus", "Soo-Jin"],
    relatedDMOs: MOCK_DMOS.filter((d) => d.project === "Onboarding Redesign"),
  },
  {
    id: "evt_002",
    title: "Analytics Dashboard Review",
    time: "4:30 PM",
    duration: "45 min",
    type: "review",
    project: "Analytics Dashboard",
    attendees: ["Priya", "Tomás"],
    relatedDMOs: MOCK_DMOS.filter((d) => d.project === "Analytics Dashboard"),
  },
  {
    id: "evt_003",
    title: "Brand Refresh Workshop",
    time: "Tomorrow, 10:00 AM",
    duration: "2 hours",
    type: "workshop",
    project: "Brand Refresh",
    attendees: ["Priya", "Leila", "Jun", "Marcus"],
    relatedDMOs: MOCK_DMOS.filter((d) => d.project === "Brand Refresh"),
  },
];

export const EVENT_TYPE_STYLES: Record<CalendarEvent["type"], string> = {
  brainstorm: "bg-lilac-light text-lilac-dark border-lilac",
  review: "bg-blue-light text-blue-dark border-blue",
  client: "bg-gold-light text-gold-dark border-gold",
  workshop: "bg-rose-light text-rose-dark border-rose",
  standup: "bg-sage-light text-sage-dark border-sage",
};

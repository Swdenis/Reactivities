import { Profile } from "./profile";

export interface Activity {
    id: string,
    title: string,
    date: Date | null,
    category: string,
    description: string,
    city: string,
    venue: string,
    hostUsername?: string,
    isCancelled?: boolean,
    attendees?: Profile[],
    host?: Profile,
    isGoing?: boolean,
    isHost?: boolean,
  }
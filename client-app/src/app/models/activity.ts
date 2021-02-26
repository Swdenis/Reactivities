import { act } from "@testing-library/react";
import { Profile } from "./profile";

export interface Activity {
    id: string,
    title: string,
    date: Date | null,
    category: string,
    description: string,
    city: string,
    venue: string,
    hostUsername: string,
    isCancelled: boolean,
    attendees: Profile[],
    host?: Profile,
    isGoing: boolean,
    isHost: boolean,
  }

export class Activity implements Activity
{
    constructor(init?: ActivityFormValues)
    {
      Object.assign(this,init)
    }
}

export class ActivityFormValues {
    id?: string= undefined
    title: string = ''
    date: Date | null = null
    category: string = ''
    description: string = ''
    city: string = ''
    venue: string = ''
    
    constructor(activity?: ActivityFormValues)
    {
      if(activity) {
        this.id = activity.id
        this.title = activity.title
        this.date = activity.date
        this.city = activity.city
        this.venue = activity.venue
        this.category = activity.category
        this.description =  activity.description
      }
    }
}
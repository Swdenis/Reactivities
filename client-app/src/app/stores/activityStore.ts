import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activities: Activity[] = []
    selectedActivity: Activity | undefined = undefined
    editMode : boolean = false
    loading: boolean = false
    loadingInitial: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activities.list()
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0]
                    this.activities.push(activity)
                    
            }   
            )
            this.setLoadingInitial(false)
        }
        catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
            
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setSelectedActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    openForm = (id?: string) => {
        id ? this.setSelectedActivity(id) : this.cancelSelectedActivity()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false;
    }
}
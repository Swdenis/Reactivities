import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>()
    selectedActivity: Activity | undefined = undefined
    editMode : boolean = false
    loading: boolean = false
    loadingInitial: boolean = true

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
            Date.parse(a.date)-Date.parse(b.date))
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities
            }, {} as {[key: string]: Activity[]})
        )
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id,activity)
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id)
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity
        } else {
            this.loadingInitial = true
        try {
            activity = await agent.Activities.details(id)
            this.setActivity(activity)
            runInAction(()=> {
                this.selectedActivity = activity
            })
            this.setLoadingInitial(false)
            return activity
        }
        catch(error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }
    }

    loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list()
                activities.forEach(activity => {
                this.setActivity(activity)
                    
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

    ///This code was used to display form and details on a single page
    // setSelectedActivity = (id: string) => {
    //     this.selectedActivity = this.activityRegistry.get(id)
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined
    // }

    // openForm = (id?: string) => {
    //     id ? this.setSelectedActivity(id) : this.cancelSelectedActivity()
    //     this.editMode = true
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }
    ///
    
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity)
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false;
            }) 
        }
        catch(error) {
            console.log(error)
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true
        try {
            await agent.Activities.update(activity)
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false;
            }) 
        }
        catch(error) {
            console.log(error)
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

        deleteActivity = async (id: string) => {
            this.loading = false
            try {
                await agent.Activities.delete(id)
                runInAction(()=>{
                    this.activityRegistry.delete(id)
                    ///Check whether an activity is selected, no need for this with routing
                    //if( this.selectedActivity?.id === id) this.cancelSelectedActivity()
                    this.loading = false;
                }    
                )
            }
            catch(error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false
                }
                )
            }
        }
        
}
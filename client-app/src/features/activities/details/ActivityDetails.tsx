import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store'
import ActivityDetailedsHeader from './ActivityDetailedHeader';
import ActivityDetailedsInfo from './ActivityDetailedInfo';
import ActivityDetailedsChat from './ActivityDetailedChat';
import ActivityDetailedsSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity,loadActivity, loadingInitial, clearSelectedActivity} = activityStore
    const {id} =  useParams<{id: string}>()

    useEffect(()=>{
      if (id) {
        loadActivity(id)
      }
      return ()=>clearSelectedActivity()
    }, [id, loadActivity,clearSelectedActivity])

    if (loadingInitial || !activity) return <LoadingComponents />
    
    return(
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedsHeader activity={activity}/>
          <ActivityDetailedsInfo activity={activity}/>
          <ActivityDetailedsChat activityId={activity.id}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedsSidebar activity={activity!}/>
        </Grid.Column>
      </Grid>
  )
}
)
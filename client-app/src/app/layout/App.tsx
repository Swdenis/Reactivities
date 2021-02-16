import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const url="http://localhost:5000/api/activities"

  useEffect(
    ()=>{
      axios.get<Activity[]>(url).then(response => {
        setActivities(response.data)
      })
    },[]
  )

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard activities={activities} />
      </Container>  
    </>
  );
}

export default App;

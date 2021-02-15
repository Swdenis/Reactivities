import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';


function App() {
  const [activities, setActivities] = useState([])
  const url="http://localhost:5000/api/activities"

  useEffect(
    ()=>{
      axios.get(url).then(response => {
        console.log(response)
        setActivities(response.data)
      })
    },[]
  )

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
        <List>
          <List.Item>
          {activities.map((activity: any) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
          </List.Item>
        </List>
    </div>
  );
}

export default App;

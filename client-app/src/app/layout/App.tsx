import React, { useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
  const location = useLocation()

  const {commonStore, userStore} = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      userStore.getFacebookLoginStatus().then(() => commonStore.setApploaded());
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponents content="Loading app" />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage}/>
      <Route
      path={'/(.+)'}
      render={
        ()=>(
          <>
          <NavBar/>
          <Container style={{marginTop: '7em'}}>
            <Switch>
            <PrivateRoute exact path='/activities/:id' component={ActivityDetails}/>
            <PrivateRoute path='/activities' component={ActivityDashboard}/>
            <PrivateRoute key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
            <PrivateRoute path='/profiles/:username' component={ProfilePage} />
            <PrivateRoute path='/errors' component={TestErrors} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
            </Switch>
          </Container> 
          </>
        )
      }
      />  
    </>
  );
}

export default observer(App);

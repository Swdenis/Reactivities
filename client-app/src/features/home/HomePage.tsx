import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore()
    const {isLoggedIn} = userStore
    return(
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image alt='logo' size='massive' src='/assets/logo.png' style={{marginBotton: 12}}/>
                    Reactivities
                </Header>
                {isLoggedIn ? 
                (
                <>
                <Header inverted as='h2' content="Welcome to Reactivities"/>
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to Activities!
                </Button>
                </>
                ) :
                (
                <>
                <Button onClick={()=> modalStore.openModal(<LoginForm />)} size='huge' inverted>
                Login
                </Button> 
                <Button onClick={()=> modalStore.openModal(<RegisterForm /> )} size='huge' inverted>
                Register
                </Button> 
                </>
                )}
            </Container>
        </Segment>
    )
})
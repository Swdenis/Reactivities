import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

export default function HomePage() {
    return(
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image alt='logo' size='massive' src='/assets/logo.png' style={{marginBotton: 12}}/>
                    Reactivities
                </Header>
                <Header inverted as='h2' content="Welcome to Reactivities"/>
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to the Activities
                </Button>
            </Container>
        </Segment>
    )
}
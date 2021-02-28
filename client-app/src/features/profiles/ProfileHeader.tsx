import React from 'react'
import { Grid, Item, Segment,Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'

export default function ProfileHeader()
{
    return(
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={'/assets/user.png'}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content='DiplayName'/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                <Statistic.Group>
                    <Statistic label='Followers' value='5'/>
                    <Statistic label='Following' value='42'/>
                </Statistic.Group>
                <Divider />
                <Reveal animated='move'>
                    <Reveal.Content visible style={{width: '100%'}}>
                        <Button color='teal' fluid content='Following'/>
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width: '100%'}}>
                        <Button 
                        color={true ? 'red' : 'green'} 
                        fluid 
                        basic
                        content={true ? 'Unfollow' : 'Follow'} 
                        />
                    </Reveal.Content>
                </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}
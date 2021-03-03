import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Item, Segment,Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'

interface Props {
    profile: Profile
}

export default observer(function ProfileHeader({profile}: Props)
{
    return(
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                <Statistic.Group>
                    <Statistic label='Followers' value={profile.followersCount}/>
                    <Statistic label='Following' value={profile.followingCount}/>
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
})
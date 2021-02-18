import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

interface Props {
    createOrEdit: (activity: Activity) => (void);
    submitting: boolean
}

export default function ActivityForm({createOrEdit,submitting}: Props) {
    const {activityStore} = useStore()
    const {selectedActivity, closeForm} = activityStore
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        category: '',
        description: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)

    function handleSubmit() {
        createOrEdit(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing fixed>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name="title" value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name="description" value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name="category" value={activity.category} onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' name="date" value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name="city" value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name="venue" value={activity.venue} onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
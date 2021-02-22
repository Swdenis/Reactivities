import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Segment } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents'
import { useStore } from '../../../app/stores/store'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import MyDateInput from '../../../app/common/form/MyDateInput'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import { Activity } from '../../../app/models/activity'

export default observer(function ActivityForm() {
    const history = useHistory()
    const {activityStore} = useStore()
    const {loadActivity, loading, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>()
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        category: '',
        description: '',
        city: '',
        venue: ''
    })

    const validationSchema= Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(()=>{
        if(id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    },[id, loadActivity])

    // function handleSubmit() {
    //     if(activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`))
    //         } else {
    //             updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
    //         }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target
    //     setActivity({...activity, [name]: value})
    // }
    
    if(loadingInitial) return <LoadingComponents content='Loading activity...' />

    return(
        <Segment clearing>
            <Formik
            enableReinitialize
            initialValues={activity}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}>
            {({values: activity, handleChange, handleSubmit}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name='title' placeholder='title' />
                <MyTextArea rows={3} placeholder='Description' name="description" />
                <MySelectInput options={categoryOptions} placeholder='Category' name="category" />
                <MyDateInput
                placeholderText='Date'
                name="date"
                showTimeSelect
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm aa'
                />
                <MyTextInput placeholder='City' name="city" />
                <MyTextInput placeholder='Venue' name="venue" />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel' />
            </Form>
            )}
            </Formik>
        </Segment>
    )
}
)
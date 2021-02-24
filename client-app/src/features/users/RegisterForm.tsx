import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors'

export default observer(function RegisterForm() {
    const {userStore} = useStore()
    const {register} = userStore

    return(
        <Formik
        initialValues={{displayName: '', username: '', email:'', password:'', error: null}}
        validationSchema={Yup.object(
            {
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            }
        )}
        onSubmit={(values,{setErrors})=> register(values).catch(error=> 
        setErrors({error}))}>
            {({handleSubmit, isSubmitting, errors, isValid, dirty})=> (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                <Header as='h2' color='teal' textAlign='center' content='Sign up to Reactivities' />
                <MyTextInput name='displayName' placeholder='Display Name' />
                <MyTextInput name='username' placeholder=' Username' />
                <MyTextInput name='email' placeholder='Email' />
                <MyTextInput name= 'password' placeholder='Password' type='password' />
                <ErrorMessage name='error'>
                    {() =>
                    (<ValidationErrors errors={errors.error} />
                    )}
                </ErrorMessage>
                <Button disabled={!isValid || ! dirty || isSubmitting} 
                loading={isSubmitting} positive type='submit' fluid content='Register' />
            </Form>
            )}    
        </Formik>
    )
})

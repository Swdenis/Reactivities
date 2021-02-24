import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'

export default observer(function LoginForm() {
    const {userStore} = useStore()
    const {login} = userStore

    return(
        <Formik
        initialValues={{email:'', password:'', error: null}}
        onSubmit={(values,{setErrors})=> login(values).catch(error=> 
        setErrors({error: 'Invalid email or password'}))}>
            {({handleSubmit, isSubmitting, errors})=> (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name='email' placeholder='Email' />
                <MyTextInput name= 'password' placeholder='Password' type='password' />
                <ErrorMessage name='error'>
                    {() =>
                    (<Label style={{marginBottom: 10}} basic color='red' content={errors.error}
                    />
                    )}
                </ErrorMessage>
                <Button loading={isSubmitting} positive type='submit' fluid content='login' />
            </Form>
            )}    
        </Formik>
    )
})

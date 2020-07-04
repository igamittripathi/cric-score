import * as React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }: any) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }: any) => (
    <Select
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event: any, index: any, value: any) => input.onChange(value)}
        children={children}
        {...custom}
    />
)

const MaterialUiForm = (props: any) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="firstName"
                    component={renderTextField}
                    label="First Name"
                />
            </div>
            <div>
                <Field name="lastName" component={renderTextField} label="Last Name" />
            </div>
            <div>
                <Field
                    name="favoriteColor"
                    component={renderSelectField}
                    label="Favorite Color"
                >
                    <MenuItem value="ff0000">Red</MenuItem>
                    <MenuItem value="00ff00">Green</MenuItem>
                    <MenuItem value="0000ff">Blue</MenuItem>
                </Field>
            </div>
            <div>
                <Field
                    name="notes"
                    component={renderTextField}
                    label="Notes"
                    multiLine={true}
                    rows={2}
                />
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
          </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </button>
            </div>
        </form>
    )
}


const validate = (values: any) => {
    const errors: any = {}
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'favoriteColor',
        'notes'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values: any /*, dispatch */) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw { email: 'Email already Exists' }
        }
    })
}

export default reduxForm({
    form: 'MaterialUiForm', // a unique identifier for this form
    validate,
    asyncValidate
})(MaterialUiForm)
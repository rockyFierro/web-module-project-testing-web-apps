import React from 'react';
import {findAllByTestId, getByLabelText, getByTestId, render, screen, waitFor, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    const {getByRole} = render(<ContactForm/>)
    const header = getByRole( 'heading', { level: 1 })
    const headerText = getByRole ('heading', { name: 'Contact Form'})
    expect(header).toBeInTheDocument()
    expect(headerText).toBeInTheDocument()
    //sanity
    // expect(header).toBeEmpty()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const {getByLabelText, getAllByTestId} = render(<ContactForm/>)
    const firstName = getByLabelText(/first name/i)
    userEvent.type(firstName, "rock")
    const errs = await waitFor( ()=> getAllByTestId("error"))
    expect(errs).toHaveLength(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const {getByTestId, getAllByTestId} = render(<ContactForm/>)
    const submit = getByTestId("submit")
    userEvent.click(submit)
    const errors = await waitFor(()=> getAllByTestId("error"))
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const {getByLabelText,getByTestId, getAllByTestId} = render(<ContactForm/>)
    const firstName = getByLabelText(/first name/i)
    const lastName = getByLabelText(/last name/i)
    userEvent.type(lastName, "Fierro")
    userEvent.type(firstName, "Albert")
    const submit = getByTestId("submit")
    userEvent.click(submit)
    const errors = await waitFor(()=> getAllByTestId("error"))
    expect(errors).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
});
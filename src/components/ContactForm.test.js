import React from 'react';
import {findAllByTestId, getAllByTestId, getByLabelText, getByTestId, render, screen, wait, waitFor, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

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
    const {getByLabelText, getByTestId} = render(<ContactForm/>)
    const email = getByLabelText(/email/i)
    userEvent.type(email, "emailaddress@netnet")
    const invalidError =  await waitFor( ()=> getByTestId("error"))
    expect(invalidError).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const {getByLabelText,getByTestId} = render(<ContactForm/>)
    const firstName = getByLabelText(/first name/i)
    const email = getByLabelText(/email/i)
    userEvent.type(email, "Fierro@risktofall.com")
    userEvent.type(firstName, "Albert")
    const submit = getByTestId("submit")
    userEvent.click(submit)
    const err = await waitFor(()=> getByTestId("error"))
    expect(err).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const {getByLabelText,getByTestId} = render(<ContactForm/>)
    const firstName = getByLabelText(/first name/i)
    const email = getByLabelText(/email/i)
    const lastName = getByLabelText(/last name/i)
    userEvent.type(email, "Fierro@risktofall.com")
    userEvent.type(firstName, "Albert")
    userEvent.type(lastName, "Fierro")
    const submit = getByTestId("submit")
    const firstnameDisplay = await waitFor(() => getByTestId("firstnameDisplay"))
    expect(firstnameDisplay).not.toBeInTheDocument()
    userEvent.click(submit)
    expect(firstnameDisplay).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
});
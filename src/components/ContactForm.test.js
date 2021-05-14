import React from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
	render(<ContactForm />);
});

test("renders the contact form header", () => {
	render(<ContactForm />);
	const header = screen.getByText(/Contact Form/);
	expect(header).toBeDefined();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
	render(<ContactForm />);
	const firstNameInput = screen.getByLabelText(/First Name/);
	userEvent.type(firstNameInput, "abcd");
	const errorPrompt = screen.getAllByTestId("error");
	expect(errorPrompt).toBeDefined();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
	render(<ContactForm />);
	const firstName = screen.getByLabelText(/First Name/);
	const lastName = screen.getByLabelText(/Last Name/);
	const email = screen.getByLabelText(/Email/);
	const submit = screen.getByTestId("submitButton");
	userEvent.click(submit);
	const allErrorPrompt = screen.getAllByTestId("error");
	expect(allErrorPrompt).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
	render(<ContactForm />);
	const firstName = screen.getByLabelText(/First Name/);
	const lastName = screen.getByLabelText(/Last Name/);
	const submit = screen.getByTestId("submitButton");
	userEvent.type(firstName, "abcde");
	userEvent.type(lastName, "abcde");
	userEvent.click(submit);
	const allErrorPrompt = screen.getAllByTestId("error");
	expect(allErrorPrompt).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);
	const email = screen.getByLabelText(/Email/);
	userEvent.type(email, "abcde");
	const errorPrompt = screen.getByTestId("error");
	expect(errorPrompt).toBeDefined();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);
	const firstName = screen.getByLabelText(/First Name/);
	const email = screen.getByLabelText(/Email/);
	const submit = screen.getByTestId("submitButton");
	userEvent.type(firstName, "abcde");
	userEvent.type(email, "abcde@gmail.com");
	userEvent.click(submit);
	const errorPrompt = screen.getByText(/lastName is a required field/);
	expect(errorPrompt).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
	render(<ContactForm />);
	const firstName = screen.getByLabelText(/First Name/);
	const lastName = screen.getByLabelText(/Last Name/);
	const email = screen.getByLabelText(/Email/);
	const submit = screen.getByTestId("submitButton");
	userEvent.type(firstName, "abcde");
	userEvent.type(lastName, "abcde");
	userEvent.type(email, "abcde@gmail.com");
	userEvent.click(submit);

	const firstnameDisplay = screen.getByTestId("firstnameDisplay");
	const lastnameDisplay = screen.getByTestId("lastnameDisplay");
	const emailDisplay = screen.getByTestId("emailDisplay");

	expect(firstnameDisplay).toBeInTheDocument();
	expect(lastnameDisplay).toBeInTheDocument();
	expect(emailDisplay).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
	render(<ContactForm />);
	const firstName = screen.getByLabelText(/First Name/);
	const lastName = screen.getByLabelText(/Last Name/);
	const email = screen.getByLabelText(/Email/);
	const message = screen.getByLabelText(/Message/);

	const submit = screen.getByTestId("submitButton");
	userEvent.type(firstName, "abcde");
	userEvent.type(lastName, "abcde");
	userEvent.type(email, "abcde@gmail.com");
	userEvent.type(message, "adcdefghijklmnopqrstuvwxyz");
	userEvent.click(submit);

	const firstnameDisplay = screen.getByTestId("firstnameDisplay");
	const lastnameDisplay = screen.getByTestId("lastnameDisplay");
	const emailDisplay = screen.getByTestId("emailDisplay");
	const messageDisplay = screen.getByTestId("messageDisplay");

	expect(firstnameDisplay).toBeInTheDocument();
	expect(lastnameDisplay).toBeInTheDocument();
	expect(emailDisplay).toBeInTheDocument();
	expect(messageDisplay).toBeInTheDocument();
});

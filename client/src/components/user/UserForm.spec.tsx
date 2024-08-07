import React from 'react';
import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import UserForm from './UserForm';

describe('User form tests', async () => {

    it('should render form', () => {
        render(
            <BrowserRouter>
                <UserForm
                    isRegisterMode={true}
                    submitCallback={() => { }}
                    submitBtnText='Sign up'
                />
            </BrowserRouter>
        );
        expect(screen.getByText('Subscribe for our newsletter (optional)')).toBeVisible();
    })

    it('should give an error if email is invalid', async () => {
        render(
            <BrowserRouter>
                <UserForm isRegisterMode={true} submitCallback={() => { }} />
            </BrowserRouter>
        );
        const emailInput = screen.getByTestId('email');
        await fireEvent.change(emailInput, { target: { value: 'invalid_email' } })
        await fireEvent.blur(emailInput)
        await waitFor(() => {
            expect(screen.getByText('Please enter valid email')).toBeVisible();
        })
    })

    it('should give an error if username is not between 3 and 15 chars', async () => {
        render(
            <BrowserRouter>
                <UserForm isRegisterMode={true} submitCallback={() => { }} />
            </BrowserRouter>
        );
        const usernameInput = screen.getByTestId('username');
        await fireEvent.change(usernameInput, { target: { value: '12' } })
        await fireEvent.blur(usernameInput)
        await waitFor(() => {
            expect(screen.getByText('Username must be between 3 and 15 characters long')).toBeVisible();
        })
    })

    it("should give an error if password and retype doesn't match", async () => {
        render(
            <BrowserRouter>
                <UserForm isRegisterMode={true} submitCallback={() => { }} />
            </BrowserRouter>
        );
        const passwordInput = screen.getByTestId('password');
        const rePasswordInput = screen.getByTestId('rePassword');
        await fireEvent.change(passwordInput, { target: { value: '12345678' } })
        await fireEvent.change(rePasswordInput, { target: { value: '123456789' } })
        await fireEvent.blur(rePasswordInput)
        await waitFor(() => {
            expect(screen.getByText('Retyped password is diffrent from password')).toBeVisible();
        })
    })

    it("should copy state dropdown value into city input", async () => {
        render(
            <BrowserRouter>
                <UserForm isRegisterMode={true} submitCallback={() => { }} />
            </BrowserRouter>
        );
        const stateInput = screen.getByTestId('state');
        await fireEvent.change(stateInput, { target: { value: 'Sofia Province' } })
        await fireEvent.blur(stateInput)
        await waitFor(() => {
            expect(screen.getByTestId('city')).toHaveValue('Sofia Province');
        })
    })

    it("should NOT copy state dropdown value into city, if city is defined", async () => {
        render(
            <BrowserRouter>
                <UserForm isRegisterMode={true} submitCallback={() => { }} />
            </BrowserRouter>
        );
        const cityInput = screen.getByTestId('city');
        await fireEvent.change(cityInput, { target: { value: 'Kaspichan' } })
        const stateInput = screen.getByTestId('state');
        await fireEvent.change(stateInput, { target: { value: 'Shumen' } })
        await fireEvent.blur(stateInput)
        await waitFor(() => {
            expect(screen.getByTestId('city')).toHaveValue('Kaspichan');
        })
    })

    it("should submit typed values", async () => {
        const typedValues = {
            email: 'test@test.com',
            username: 'test',
            password: '12345678',
            rePassword: '12345678',
            address: 'Test address 13',
            city: 'Sofia',
            state: 'Sofia Province',
            zip: '1000',
            subscribed: true,
        }
        let submitvalues = {}
        render(
            <BrowserRouter>
                <UserForm
                    isRegisterMode={true}
                    submitCallback={(values) => { submitvalues = values }}
                    submitBtnText='Sign up'
                />
            </BrowserRouter>
        );
        const emailInput = screen.getByTestId('email');
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        const rePasswordInput = screen.getByTestId('rePassword');
        const cityInput = screen.getByTestId('city');
        const zipInput = screen.getByTestId('zip');
        const stateInput = screen.getByTestId('state');
        const addressInput = screen.getByTestId('address');
        const subscribeCheck = screen.getByTestId('subscribe');
        await fireEvent.change(emailInput, { target: { value: typedValues.email } })
        await fireEvent.change(usernameInput, { target: { value: typedValues.username } })
        await fireEvent.change(passwordInput, { target: { value: typedValues.password } })
        await fireEvent.change(rePasswordInput, { target: { value: typedValues.rePassword } })
        await fireEvent.change(addressInput, { target: { value: typedValues.address } })
        await fireEvent.change(cityInput, { target: { value: typedValues.city } })
        await fireEvent.change(stateInput, { target: { value: typedValues.state } })
        await fireEvent.change(zipInput, { target: { value: typedValues.zip } })
        await fireEvent.click(subscribeCheck)
        await fireEvent.click(screen.getByText('Sign up'))
        await waitFor(() => {
            expect(submitvalues).toStrictEqual(typedValues);
        })
    })
})
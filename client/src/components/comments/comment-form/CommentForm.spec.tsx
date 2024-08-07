
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CommentForm from './CommentForm';

describe('Comment form tests', () => {
    it('Should be true', () => {
        expect(true).toBe(true)
    })

    it('Comment form should be visible', () => {
        render(<CommentForm productId='product1' confirmHandler={() => { }} />)
        const commentInput = document.querySelector('#content')
        expect(commentInput).toBeVisible()
    })

    it('Comment less than 5 chars should display error', async () => {
        render(<CommentForm productId='product1' confirmHandler={() => { }} />)
        const commentInput = document.querySelector('#content') as HTMLTextAreaElement

        await fireEvent.change(commentInput, { target: { value: 'Bad' } })
        await screen.getByText('Save').click()
        await waitFor(() => {
            expect(screen.getByText('Comment must be at least 5 characters long')).toBeVisible()
        })
    })

    it('Comment more than 5 chars should invoke submit handler', async () => {
        let isSubmitted = false
        render(<CommentForm productId='product1' confirmHandler={() => { isSubmitted = true }} />)
        const commentInput = document.querySelector('#content') as HTMLTextAreaElement

        await fireEvent.change(commentInput, { target: { value: 'Good comment' } })
        await screen.getByText('Save').click()
        await waitFor(() => {
            expect(isSubmitted).toBe(true)
        })
    })
})
'use server'

import { z } from 'zod'
import { ContactFormSchema } from "./schemas"
import { Resend } from 'resend'
import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
    const result = ContactFormSchema.safeParse(data)

    if (result.error) {
        return { error: result.error.format() }
    }

    try {
        const { name, email, message } = result.data
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['franciscotrianto@gmail.com'],
            subject: 'Contact Form Submission - Portofolio',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            react: ContactFormEmail({ name, email, message })
        })
        if (!data || error) {
            throw new Error('Failed to send email')
        }

        return { success: true }

    } catch (error) {
        return { error }
    }
}
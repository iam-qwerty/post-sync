"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import * as z from "zod"

// Shared validation schema
const authSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export type AuthResult = {
    error?: string;
    fieldErrors?: {
        email?: string[];
        password?: string[];
    };
    success?: boolean;
}

export async function signUp(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
    // Create client inside the function (required for server actions)
    const supabase = await createClient()

    // Extract form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate form data
    const result = authSchema.safeParse({ email, password })

    if (!result.success) {
        return {
            fieldErrors: result.error.flatten().fieldErrors as AuthResult['fieldErrors']
        }
    }

    // User sign up
    const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`
        }
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}


export async function loginWithEmail(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
    // Create client inside the function (required for server actions)
    const supabase = await createClient()

    // Extract form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate form data
    const result = authSchema.safeParse({ email, password })

    if (!result.success) {
        return {
            fieldErrors: result.error.flatten().fieldErrors as AuthResult['fieldErrors']
        }
    }

    // User login
    const { error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
    })

    if (error) {
        return { error: error.message }
    }

    // Redirect on success
    redirect("/dashboard")
}

export async function loginWithGoogle() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })

    if (error) {
        redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
}
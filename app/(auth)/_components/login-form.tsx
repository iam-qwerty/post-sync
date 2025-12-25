"use client"

import { useActionState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Mail, Lock, } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { loginWithEmail, loginWithGoogle } from "../actions"

export default function LoginForm() {
    const [state, action, isPending] = useActionState(loginWithEmail, null)
    const { toast } = useToast()

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: "destructive",
                title: "Login failed",
                description: state.error,
            })
        }
    }, [state, toast])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Zap className="h-12 w-12 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl dark:text-white">Welcome back</CardTitle>
                    <CardDescription className="dark:text-gray-300">Sign in to your Post-Sync account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="dark:text-gray-200">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    required
                                />
                            </div>
                            {state?.fieldErrors?.email && (
                                <p className="text-sm text-red-500">{state.fieldErrors.email[0]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="dark:text-gray-200">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            {state?.fieldErrors?.password && (
                                <p className="text-sm text-red-500">{state.fieldErrors.password[0]}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <form action={loginWithGoogle}>
                        <Button variant="outline" className="w-full" type="submit">
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                    </form>

                    <Separator className="my-6 dark:bg-gray-600" />

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

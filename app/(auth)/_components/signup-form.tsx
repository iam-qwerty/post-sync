"use client"

import { useActionState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Mail, Lock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signUp } from "../actions"

export default function SignUpForm() {
    const [state, action, isPending] = useActionState(signUp, null)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: state.error,
            })
        } else if (state?.success) {
            toast({
                title: "Check your email!",
                description: "We've sent you a confirmation link to complete your registration.",
            })
            router.push("/login?message=Check your email to confirm your account")
        }
    }, [state, toast, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Zap className="h-12 w-12 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl dark:text-white">Create your account</CardTitle>
                    <CardDescription className="dark:text-gray-300">Start your free trial today</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="dark:text-gray-200">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>
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
                            {isPending ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <Separator className="my-6 dark:bg-gray-600" />

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

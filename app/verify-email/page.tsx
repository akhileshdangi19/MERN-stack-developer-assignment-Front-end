"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      setError("Verification token is missing")
      return
    }

    const verifyEmail = async () => {
      try {
        // Replace with your actual API endpoint
        await axios.post("/api/auth/verify-email", { token })
        setIsVerified(true)
      } catch (error) {
        console.error("Verification error:", error)
        setError("Invalid or expired verification token")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">Verifying your email address...</p>
            </div>
          ) : isVerified ? (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold">Email Verified Successfully!</h3>
                <p className="text-muted-foreground">
                  Your email has been verified. You can now sign in to your account.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold">Verification Failed</h3>
                <p className="text-muted-foreground">
                  {error || "There was an error verifying your email. Please try again."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {isVerified ? (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

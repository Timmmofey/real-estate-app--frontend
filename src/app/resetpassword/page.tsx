'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import axiosUser from '@/lib/axiosUser'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendResetCode = async () => {
    setLoading(true)
    try {
      await axiosUser.post('/Users/start-password-reset-via-email', new URLSearchParams({ email }))
      toast.success('Verification code sent to email')
      setStep(2)
    } catch (err: unknown) {
      toast.error('Failed to send reset code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
      setLoading(true)
      try {
          await axiosUser.post('/Users/get-password-reset-token-via-email', { email, verificationCode: code })
          toast.success('Verification successful')
          setStep(3)
      } catch (err: unknown) {
          toast.error('Failed to verify code')
      } finally {
          setLoading(false)
      }
  }

  const handleResetPassword = async () => {
    setLoading(true)
    try {
      await axiosUser.post(
        '/Users/complete-password-restoration-via-email',
        new URLSearchParams({ newPassword })
      )
      toast.success('Password reset successfully!')
      setStep(1)
      setEmail('')
      setCode('')
      setNewPassword('')
      router.push('/login')
    } catch (err: unknown) {
      toast.error('Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleSendResetCode} disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter the verification code sent to your email.</p>
          <div className="grid gap-1">
            <Label>Verification Code</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleVerifyCode} disabled={loading} className="w-full">
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="grid gap-1">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleResetPassword} disabled={loading} className="w-full">
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      )}
    </div>
  )
}

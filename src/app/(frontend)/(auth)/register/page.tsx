import { Gutter } from '@/components/Gutter'
import { RenderParams } from '@/components/RenderParams/RenderParams'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getMeUser } from '@/utilities/getMeUser'
import { Suspense } from 'react'
import RegisterForm from './RegisterForm'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?message=${encodeURIComponent('You are already logged in')}`,
  })
  return (
    <Gutter className="flex flex-col gap-4">
      <RenderParams />
      <Card className="mx-auto max-w-sm mb-4">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <RegisterForm />
          </Suspense>
        </CardContent>
      </Card>
    </Gutter>
  )
}

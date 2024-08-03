import { Gutter } from '@/components/Gutter'
import { RenderParams } from '@/components/RenderParams/RenderParams'
import { getMeUser } from '@/utilities/getMeUser'
import Link from 'next/link'

export default async function Account() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <Gutter>
      <RenderParams />
      <h1>Account</h1>
      <p>
        {`This is your account dashboard. Here you can update your account information and more. To manage all users, `}
        <Link href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}>
          login to the admin dashboard
        </Link>
        {'.'}
      </p>
    </Gutter>
  )
}

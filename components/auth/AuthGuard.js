// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from '@/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/auth/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/auth/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  // console.log(auth.loading, auth.user);
  // if (auth.loading || auth.user === null) {
  //   return fallback
  // }

  return <>{children}</>
}

export default AuthGuard

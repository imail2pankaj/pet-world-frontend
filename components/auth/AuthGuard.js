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

      if (auth.user !== null && window.localStorage.getItem('userData')) {
        if (router.asPath === '/auth/login' || router.asPath === '/auth/register') {
          auth.setUser({...window.localStorage.getItem('userData')});
          router.replace({
            pathname: '/'
          })
        }
      } else if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath.search("accounts") >= 0 || router.asPath.search("dashboard") >= 0) {
          router.replace({
            pathname: '/auth/login',
            query: { returnUrl: router.asPath }
          })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (auth.loading) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard

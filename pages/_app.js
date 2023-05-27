import { SSRProvider, Spinner } from 'react-bootstrap';
import { appWithTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from '@/context/AuthContext'

// ** Store Imports
import { store } from '@/store'
import { Provider } from 'react-redux'

import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo';
import GuestGuard from '@/components/auth/GuestGuard';
import AuthGuard from '@/components/auth/AuthGuard';
import Loader from '@/components/Common/Loader';

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Loader />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Loader />}>{children}</AuthGuard>
  }
}

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <DefaultSeo
              title={undefined}
              titleTemplate="%s | Pet World"
              defaultTitle="Pet World"
              description="The Pet World"
              openGraph={{
                type: 'website',
                site_name: 'Pet World'
              }}
            />
            <Guard authGuard={Component.authGuard ?? true} guestGuard={Component.guestGuard ?? false}>
              <Layout settings={pageProps?.appSettings}>
                <Component {...pageProps} />
              </Layout>
            </Guard>
              <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </SSRProvider>
  )
}

export default appWithTranslation(App);
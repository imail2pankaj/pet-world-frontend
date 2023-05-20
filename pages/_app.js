import { SSRProvider } from 'react-bootstrap';
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

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>

            <Layout>
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
              <Component {...pageProps} />
            </Layout>
            <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </SSRProvider>
  )
}

export default appWithTranslation(App);
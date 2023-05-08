import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from '@/context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css'
import { Container, SSRProvider } from 'react-bootstrap';
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <ThemeProvider>
        <AuthProvider>
          
            <Layout>
              <Component {...pageProps} />
            </Layout>
          
        </AuthProvider>
      </ThemeProvider>
    </SSRProvider>
  )
}

export default appWithTranslation(App);
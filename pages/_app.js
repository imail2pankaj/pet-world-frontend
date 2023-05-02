import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, SSRProvider } from 'react-bootstrap';
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <ThemeProvider>
        <AuthProvider>
          <Container>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </SSRProvider>
  )
}

export default appWithTranslation(App);
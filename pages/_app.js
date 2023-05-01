import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Dropdown, SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
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

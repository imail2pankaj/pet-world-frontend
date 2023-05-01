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
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Component {...pageProps} />
            </Layout>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </SSRProvider>
  )
}

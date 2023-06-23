import privateNavigation from '@/core/utils/private-navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ProtectedNavbar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [active, setActive] = useState('')
  const router = useRouter();

  useEffect(() => {
    setActive(router.asPath);
  }, [router])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="inner-navbar" />
        <Navbar.Collapse id="inner-navbar">
          <Nav className="me-auto">
            {privateNavigation.map(nav =>
              (nav.for === "" || (user && user?.role === nav.for)) &&
              <Link key={nav.name} className={`nav-link ${active === nav.path ? 'active' : ''}`} href={nav.path}>{t(nav.name)}</Link>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProtectedNavbar;
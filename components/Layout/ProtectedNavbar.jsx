import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';

function ProtectedNavbar() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const navigation = [
    { path: "/dashboard", name: 'Dashboard', for: "" },
    { path: "/dashboard/campaigns", name: 'Campaigns', for: "DOCTOR" },
    { path: "/dashboard/donations", name: 'Donations', for: "DONOR" },
    { path: "/dashboard/pets", name: 'Pets', for: "DONOR" },
    { path: "/accounts/profile", name: 'Profile', for: "" },
    { path: "/accounts/about", name: 'Bio', for: "DOCTOR" },
    { path: "/accounts/change-password", name: 'Change Password', for: "" },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="inner-navbar" />
        <Navbar.Collapse id="inner-navbar">
          <Nav className="me-auto">
            {navigation.map(nav => (nav.for === "" || (user && user?.role === nav.for)) && <Link key={nav.name} className='nav-link' href={nav.path}>{t(nav.name)}</Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProtectedNavbar;
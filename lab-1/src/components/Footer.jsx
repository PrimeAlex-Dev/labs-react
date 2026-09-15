import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5 border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 fw-semibold">🌿 Orchid Gallery App &copy; {new Date().getFullYear()}</p>
        <p className="text-muted small mb-0">
          SBA301 Integrated React Lab 01 • Built with React &amp; React-Bootstrap
        </p>
      </Container>
    </footer>
  );
}

export default Footer;

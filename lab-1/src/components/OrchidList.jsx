import { Container, Row, Col } from "react-bootstrap";
import { OrchidsData } from "../shared/OrchidsData";
import OrchidCard from "./OrchidCard";

function OrchidList() {
  return (
    <Container id="orchids" className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-dark">🌸 Orchid Collection</h1>
        <p className="lead text-muted">
          Explore beautiful orchid species with detailed specifications and origins.
        </p>
      </div>
      <Row className="g-4">
        {OrchidsData.map((orchid) => (
          <Col key={orchid.id} xs={12} sm={6} lg={4}>
            <OrchidCard orchid={orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OrchidList;

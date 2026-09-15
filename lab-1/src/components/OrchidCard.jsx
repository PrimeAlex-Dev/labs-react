import { useState } from "react";
import { Badge, Button, Card, Modal } from "react-bootstrap";

function OrchidCard({ orchid }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm border-0 hover-shadow">
        <Card.Img
          variant="top"
          src={orchid.image}
          alt={orchid.orchidName}
          style={{ height: "220px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="fw-bold mb-0">{orchid.orchidName}</Card.Title>
            {orchid.isSpecial && (
              <Badge bg="warning" text="dark" className="ms-2 fs-6">
                ★ Special
              </Badge>
            )}
          </div>
          <Card.Text className="text-muted mb-2">
            <strong>Category:</strong> {orchid.category}
          </Card.Text>
          <Card.Text className="text-muted mb-3">
            <strong>Origin:</strong> {orchid.origin} | <strong>Rating:</strong> ⭐ {orchid.rating}
          </Card.Text>
          <Button
            variant="outline-primary"
            className="mt-auto w-100 fw-semibold"
            onClick={() => setShow(true)}
          >
            View Detail
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold text-primary">
            {orchid.orchidName}
            {orchid.isSpecial && (
              <Badge bg="warning" text="dark" className="ms-3 fs-6">
                ★ Special Orchid
              </Badge>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={orchid.image}
            alt={orchid.orchidName}
            className="img-fluid rounded mb-4 w-100 shadow-sm"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <p className="mb-2"><strong>Category:</strong> {orchid.category}</p>
              <p className="mb-2"><strong>Origin:</strong> {orchid.origin}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>Color:</strong> {orchid.color}</p>
              <p className="mb-2"><strong>Rating:</strong> ⭐ {orchid.rating} / 5.0</p>
            </div>
          </div>
          <hr />
          <div>
            <h6 className="fw-bold">Description</h6>
            <p className="text-secondary">{orchid.detail}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrchidCard;

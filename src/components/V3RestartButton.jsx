import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isV3JourneyRoute, restartV3Journey } from '../pages/V3/v3Journey';

function V3RestartButton({ className = '', isV3Page = false }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const restartButtonRef = useRef(null);

  if (!isV3Page && !isV3JourneyRoute()) {
    return null;
  }

  return (
    <>
      <div className={`d-flex justify-content-end ${className}`.trim()}>
        <Button
          ref={restartButtonRef}
          type="button"
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowConfirmation(true)}
        >
          Restart
        </Button>
      </div>
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onExited={() => restartButtonRef.current?.focus()}
        centered
        aria-labelledby="v3-restart-title"
        aria-describedby="v3-restart-description"
      >
        <Modal.Header closeButton>
          <Modal.Title id="v3-restart-title">Restart this experience?</Modal.Title>
        </Modal.Header>
        <Modal.Body id="v3-restart-description">
          Your progress through the activities will be reset, and you will return to the
          beginning. This will not undo any survey responses you have already submitted.
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="outline-secondary"
            autoFocus
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={restartV3Journey}>
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default V3RestartButton;

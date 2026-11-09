// Synthetic source-review fixture. No React/PF dependencies are bundled.
// Based on the public PF v6 Modal/ModalHeader composition; inspect the target
// project's installed APIs before treating this as a runnable integration.
import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@patternfly/react-core';

export function ReviewDetails() {
  const [open, setOpen] = useState(false);
  return <>
    <Button onClick={() => setOpen(true)}>Review details</Button>
    <Modal isOpen={open} onClose={() => setOpen(false)} aria-labelledby="review-title">
      <ModalHeader title="Review details" labelId="review-title" />
      <ModalBody>Review this summary before continuing.</ModalBody>
      <ModalFooter><Button onClick={() => setOpen(false)}>Cancel</Button></ModalFooter>
    </Modal>
  </>;
}

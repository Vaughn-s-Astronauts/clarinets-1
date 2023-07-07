import React from 'react';
import { useState } from 'react';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactImageMagnify from 'react-image-magnify';

export default function CarouselItem({ pic }) {

  const [show, setShow] = useState(false);
  const [selectedPic, setSelectedPic] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = (evt) => {
    setSelectedPic(evt.target.src);
    setShow(true);
  }



  return (
    <>
      <Ratio>
        <Image
          src={pic.url}
          rounded
          fluid
          style={{ objectFit: 'cover' }}
          onClick={handleShow}
          style={{cursor: 'zoom-in'}}
        />
      </Ratio>


      <Modal size='md' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hover to Zoom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactImageMagnify
            style={{}}
            {...
            {
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: selectedPic
              },
              largeImage: {
                src: selectedPic,
                width: 2734,
                height: 4101
              },
              isHintEnabled: true
            }} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}


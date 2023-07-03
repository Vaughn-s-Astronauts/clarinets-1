import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddToCart({ state, setState }) {

  let handleSizeChange = (evt) => {
    // console.log(evt.currentTarget.value);
    let quantity = [];
    for (let i = 1; i <= Math.min(15, state.currentStyle.skus[evt.target.value].quantity); i++) {
      quantity.push(i)
    }
    // console.log('quantity: ', quantity)
    setState({
      ...state,
      currentSize: state.currentStyle.skus[evt.target.value].size,
      currentQuantity: quantity
    })
  }

  let getQuantity = (state) => {

  }


  return (
    <>
      <Row>
        <Col xs={8}>
          <Form.Select variant='outline-info' style={{ borderColor: 'black' }} onChange={handleSizeChange}>
            <option>SELECT SIZE</option>
            {Object.keys(state.currentStyle.skus).map((sku) => {
              return (
                <option value={sku}>{state.currentStyle.skus[sku].size}</option>
              )
            })}
          </Form.Select>
        </Col>

        <Col xs={4}>
          <Form.Select variant='outline-info' style={{ borderColor: 'black' }}>
            {state.currentQuantity.map((value) => {
              return(<option>{value}</option>)
            })}
          </Form.Select>
        </Col>
      </Row>
      <p></p>
      <Row>
        <Col xs={10}>
          <Button xs={8} variant='outline-info' type='submit' style={{ color: 'black', borderColor: 'black', width: '100%', textAlign: 'left' }}>ADD TO BAG +</Button>
        </Col>
        <Col xs={2}>
          <Button xs={4} variant='outline-info' type='button' style={{ color: 'black', borderColor: 'black', width: '100%', height: '100%' }}><i className="bi bi-star"></i></Button>
        </Col>
      </Row>
    </>
  )
}

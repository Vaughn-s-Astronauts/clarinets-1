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
            {state.currentSize === '' && <option>SELECT SIZE</option>}
            {Object.keys(state.currentStyle.skus).map((sku) => {
              return (
                <option key={sku} value={sku}>{state.currentStyle.skus[sku].size}</option>
              )
            })}
          </Form.Select>
        </Col>

        <Col xs={4}>
          <Form.Select variant='outline-info' style={{ borderColor: 'black' }}>
            {state.currentSize === '' && <option>-</option>}
            {state.currentQuantity.map((value) => {
              return(<option key={value}>{value}</option>)
            })}
          </Form.Select>
        </Col>
      </Row>
      <p></p>
      <Row>
        <Col xs={10}>
          <button xs={8} type='submit' style={{ color: 'black', borderColor: 'black', width: '100%', textAlign: 'left', borderRadius: '5px', borderWidth: 'thin', backgroundColor: 'white' }}>ADD TO BAG +</button>
        </Col>
        <Col xs={2}>
          <button xs={4} type='button' style={{ color: 'black', borderColor: 'black', width: '100%', height: '100%', borderRadius: '10%', borderWidth: 'thin', backgroundColor: 'white'}}><i className="bi bi-star" style={{borderColor: 'yellow' }}></i></button>
        </Col>
      </Row>
    </>
  )
}

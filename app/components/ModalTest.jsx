import React from 'react'
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { BrowserRouter, Link } from 'react-router-dom';

function FooModal() {
  return (
    <div>
      <div>FOO</div>
      <div><Link to='/bar'>now let's go to bar!</Link></div>
    </div>
    )
}

function BarModal() {
  return (
    <div>
      <div>BAR</div>
      <div><Link to='/foo'>now let's go to foo!</Link></div>
    </div>
    )
}

function ModalTest() {
 return (
   <BrowserRouter>
     <div>
       <Link to='/foo/5'>show foo</Link>
       <Link to='/bar'>show bar</Link>

       <ModalRoute path='/foo' component={FooModal} className='test-modal test-modal-foo' />
       <ModalRoute path='/bar' component={BarModal} className='test-modal test-modal-bar' />

       <ModalContainer />
     </div>
   </BrowserRouter>
 );
}

export default ModalTest

// <ModalRoute path='/foo' className='test-modal test-modal-foo'>Hello</ModalRoute>
//        <ModalRoute path='/bar' className='test-modal test-modal-bar'>Hi</ModalRoute>

import React from 'react'
import { ModalContainer, ModalRoute, Modal } from 'react-router-modal';
// import { BrowserRouter, Link } from 'react-router-dom';
import { Link } from 'react-router'

import GoalFormContainer from './GoalFormContainer'

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
  let id = '1234'
  return (
    <div>
      <Modal component={GoalFormContainer} props={{ id: id }} className='test-modal' />
      <ModalContainer />
    </div>
  )
}

export default ModalTest

/*
to do:
on popover click: instead of browserHistory pushing, change modal state to open, and

*/
// function ModalTest() {
//   let id='1234'
//  return (
//    <BrowserRouter>
//      <div>
//        <Link to='/foo/5'>show foo</Link>
//        <Link to='/bar'>show bar</Link>
//        <Link to={`/goal/${id}`}>show goal 1234</Link>

//        <ModalRoute path='/foo' component={FooModal} className='test-modal test-modal-foo' />
//        <ModalRoute path='/bar' component={BarModal} className='test-modal test-modal-bar' />
//        <ModalRoute path={`/goal/${id}`} component={GoalFormContainer} props={{ id: id }} className='test-modal' />

//        <ModalContainer id={id} />
//      </div>
//    </BrowserRouter>
//  );
// }

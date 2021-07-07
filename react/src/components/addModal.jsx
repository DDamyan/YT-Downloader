import Modal from 'react-modal';

// import {Form} from './form.jsx';

Modal.setAppElement('#root');

export default function AddModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      preventScroll={true}
      overlayClassName='overlay'
      className='modal'
      onRequestClose={() => props.closeModal()}
      //style={{overlay: {}, content: {}}}
    >
      {/* <Form /> */}
    </Modal>
  );
}

import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../../hoc/Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent) => {

    return (props) => {
        return(
            <Auxillary>
                <Modal>
                    Something Didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Auxillary>
        );
    }
}

export default withErrorHandler;
import Modal from "react-bootstrap/Modal";
import { Jiqnzs } from '../../models/jiqnz.interface';
import React, { useEffect, useState, ChangeEvent } from 'react';

type ModalCommentPropsType ={
    show: boolean,
    post: Jiqnzs
}

export const ModalComment = (props: ModalCommentPropsType) => {
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState('')

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value)
    }

    const handleClose = () => {
        setCommentText('');
        setShowModal(false);
    }

    useEffect(() => {
        setShowModal(props.show)
    })

    return (
    <Modal show={showModal}>
        <Modal.Header>Wanna say something?</Modal.Header>
        <Modal.Body>
            <input type="text" className="form-control" placeholder="Type something here...." maxLength={150} onChange={handleInput} />
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
            </button>
            <button type="button" className="btn btn-primary">
                Let's Go!
            </button>
        </Modal.Footer>
    </Modal>
    )
}
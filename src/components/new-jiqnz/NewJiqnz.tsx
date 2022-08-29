import { ChangeEvent, useState } from 'react';
import './NewJiqnz.css'
import { newJiqnz } from '../../services/firestore.service'
import { UserContext } from '../../context/UserContext';
import React from 'react';

export const NewJiqnz = () => {
    const [post, setPost] = useState('');
    const [userContext] = useState(React.useContext(UserContext));
    const handleSubmit = () => {
        newJiqnz(post, userContext.user || null).then(() => {
            const textArea = document.getElementById("message-content") as HTMLTextAreaElement;
            if (textArea.value) {
                textArea.value = '';
            }
        })
    }

    const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(event.target.value);
    }

    return (
        <div>
            <div className="d-flex p-3">
                <img src={userContext.user?.photoURL || ''} className="rounded-circle p-1 small shadow me-2" alt="Pic" />
                <textarea className="form-control shadow " name="message" id="message-content"
                    placeholder="What's happening!" onChange={handleTextArea}>
                </textarea>
            </div>
            <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary btn-lg shadow " onClick={handleSubmit}>Go live!</button>
            </div>
        </div>
    );
}
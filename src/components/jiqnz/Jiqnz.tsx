import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { User as FirebaseUser } from '@firebase/auth-types'
import 'firebase/firestore';
import { firestore } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { Comment } from '../comment/Comment';
import { Jiqnzs } from '../../models/jiqnz.interface';
import { formatDistance, parseISO } from 'date-fns';
import { ModalComment } from '../modal/Modal';
import { UserContext } from '../../context/UserContext';

type JiqnzProps = {
    post: Jiqnzs
};
export const Jiqnz = (props: JiqnzProps | null) => {
    const [post, setPost] = useState<any>(props?.post);
    const [userContext] = useState(React.useContext(UserContext));
    const [postComments, setPostComments] = useState<any[]>([])
    const [showModal, setShowModal] = useState<boolean>(userContext.showModal)
    const comments: any = [];

    const fetchComments = async () => {
        firestore.collection(`/jiqnz/${post.id}/comments`).onSnapshot((s) => {
            s.docs.map(doc => {
                comments.push(doc.data());
            })
            setPostComments(comments);
        })
    }

    const jiqnzCreatedAt = () => {
        if (!post) {
          return '';
        }
        return formatDistance(parseISO(post?.createdAt), new Date());
      }

    useEffect(() => {
        fetchComments()
    }, [])

    const handleLike = () => {
        const likeDocRef = firestore.collection(`/jiqnz`).doc(`/${post.id}`).collection('/likes').doc(`/${userContext?.user?.uid}`)
        const docRef = firestore.collection(`/jiqnz`).doc(`/${post.id}`);
        likeDocRef.get().then(
            res => {
                let copyPost = post;
                if (res.data()) {
                    copyPost.likedBy = copyPost.likedBy.filter((id: string) => id !== userContext?.user?.uid);
                    copyPost.liked = false;
                    likeDocRef.delete().then(() => {
                        docRef.set(copyPost);
                        setPost(copyPost)

                    })
                } else {
                    copyPost.likedBy.push(userContext?.user?.uid)
                    copyPost.liked = true;
                    likeDocRef.set({
                        id: userContext?.user?.uid,
                        displayName: userContext?.user?.displayName,
                        photoURL: userContext?.user?.photoURL,
                    }).then(() => {
                        docRef.set(copyPost);
                        setPost(copyPost);
                    })
                }
            }
        )
    }

    const handleComment = () => {
        console.log(post.id);
        //setShowModal(true)
        
    }

    console.log('POST', post)

    return (
        <div className="jiqnz-container shadow" key={post.id}>
            <div className="row">
                <div className="col-lg-1 col-md-12 p-1">
                    <img className="rounded-circle p-1 small shadow" src={post.by.profileURL} alt="logo" />
                </div>
                <div className="col-lg-8 col-md-12 ms-3">
                    <a href={`https://twitter.com/${post.by.username}`}>
                        <span>{post.by.name}</span>
                    </a>
                    <div className="fw-lighter">{jiqnzCreatedAt()} ago</div>
                </div>
                <div className="col-12">
                    <div className="d-flex flex-row-reverse">
                        <button type="button" className="btn btn-secondary" onClick={handleLike} disabled={userContext?.user ? false : true}>
                            <span className="me-2 pointer">
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            <span>{post.likedBy.length}</span>
                        </button>
                        <button type="button" className="btn btn-primary me-2" onClick={handleComment} disabled={userContext?.user ? false : true}>
                            <span className="me-2 pointer">
                                <FontAwesomeIcon icon={faComment} />
                            </span>
                            <span className="me-2">{post.commentedBy.length}</span>
                        </button >
                    </div >
                </div >
            </div >
            <div className="row">
                <div className="col-12 jiqnz">
                    {post.content}
                </div>
            </div>
            <Comment comments={comments} />
            <ModalComment show={showModal} post={post} />
        </div >
    )

}
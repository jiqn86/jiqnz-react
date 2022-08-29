import 'firebase/firestore';
import { useState } from 'react';
import './Comment.css'
import { formatDistance, parseISO } from 'date-fns';

type CommentProps = {
    comments: any
};
export const Comment = (props: CommentProps | null) => {
    const [comments] = useState<any>(props?.comments);

    const commentCreatedAt = (comment: any) => {
        if (!comment) {
            return '';
        }
        return formatDistance(parseISO(comment?.createdAt), new Date());
    }

    return (
        <>
            {comments && comments.map((comment: any, i: number) => {
                return (
                    <div className="row" key={i}>
                        <div className="col-md-12">
                            <div className="single-comment">
                                <div className="comment-container">
                                    <hr />
                                    <div className="comment-content">
                                        {comment.comment}
                                    </div>
                                    <div className="comment-author">
                                        {comment.displayName} {commentCreatedAt(comment)} ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            })}
        </>
    )

}
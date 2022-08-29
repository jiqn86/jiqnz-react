import { firestore } from '../config/firebase';
import 'firebase/firestore';
import { Jiqnzs } from '../models/jiqnz.interface';
import { formatISO } from 'date-fns';
import { User as FirebaseUser } from '@firebase/auth-types'

export const newJiqnz = (post: string, user: FirebaseUser | null) => {
    const newRef = firestore.collection('jiqnz').doc();
    const newPost: Jiqnzs = {
        id: newRef.id,
        commentedBy: [],
        content: post,
        createdAt: formatISO(new Date()),
        liked: false,
        likedBy: [],
        by: {
            id: user?.uid || '',
            name: user?.displayName || '',
            profileURL: user?.photoURL || '',
            username: ''
        },
    }
    return newRef.set(newPost)
}

export const fetch = (collection: string, orderBy: string) => {

    return firestore.collection(collection).orderBy(orderBy, 'desc');
}
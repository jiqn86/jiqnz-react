import { User as FirebaseUser } from '@firebase/auth-types'
import { useEffect, useState } from 'react';
import { Jiqnz } from '../jiqnz/Jiqnz';
import './Timeline.css';
import { fetch } from '../../services/firestore.service';

export const Timeline = () => {
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        fetch('jiqnz', 'createdAt').onSnapshot((snapShot) => {
            const jiqnz: any = []
            snapShot.docs.map(async (doc) => {
                console.log('UPDATE')
                jiqnz.push(doc.data());
            })
            setPosts(jiqnz)
        })
    }

    useEffect(() => {
        fetchPosts() 
    }, [])

    return (
        <>
        {
            posts && posts.map((post, i) => {
                return (
                    <Jiqnz post={post} key={`post-${i}`}/>
                )
                
            })}
        </>
    );
}
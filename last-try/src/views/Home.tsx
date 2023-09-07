import { useState } from 'react';
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';

type Post = {
    id: number,
    title: string
}

type HomeProps = {
    isLoggedIn: boolean
}

export default function Home({ isLoggedIn }: HomeProps) {
    const name: string = 'Christian';
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({ id: 1, title: '' });
    const [message, setMessage] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (newPost.title.trim() !== '') {
            setPosts([...posts, newPost]);
            setMessage(`Added task: "${newPost.title}"`);
            setNewPost({ id: posts.length + 2, title: '' });
        }
    }

    const handleEdit = (id: number, updatedTitle: string) => {
        const updatedPosts = posts.map(post => {
            if (post.id === id) {
                const oldTitle = post.title;
                post.title = updatedTitle;
                setMessage(`Edited task: "${oldTitle}" to "${updatedTitle}"`);
            }
            return post;
        });
        setPosts(updatedPosts);
    }

    const handleRemove = (id: number) => {
        const removedTask = posts.find(post => post.id === id);
        if (removedTask) {
            const updatedPosts = posts.filter(post => post.id !== id);
            setMessage(`Removed task: "${removedTask.title}"`);
            setPosts(updatedPosts);
        }
    }

    return (
        <>
            <h1>Sup {isLoggedIn ? name : 'Friend'}</h1>
            <PostForm
                handleChange={handleInputChange}
                handleSubmit={handleFormSubmit}
                newPost={newPost}
            />
            {message && <p>{message}</p>}
            {isLoggedIn &&
                posts.map(p => (
                    <PostCard
                        post={p}
                        key={p.id}
                        onEdit={(id, updatedTitle) => handleEdit(id, updatedTitle)}
                        onRemove={(id) => handleRemove(id)}
                    />
                ))}
        </>
    )
}

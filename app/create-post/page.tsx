"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [image, setImage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [userId, setUserId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
    const router = useRouter();

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const generateId = () => {
        return Math.floor(Math.random() * 10000).toString();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const slug = generateSlug(title);
            const publishedAt = new Date().toLocaleString();
            const updatedAt = new Date().toLocaleString();
            console.log(updatedAt);
            
            const response = await fetch('http://localhost:8000/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: generateId(),
                    title,
                    content,
                    category,
                    image,
                    thumbnail,
                    slug,
                    userId,
                    publishedAt,
                    updatedAt,
                }),
            });

            if (!response.ok) throw new Error('Failed to add post');

            setMessage({ type: 'success', text: 'Post added successfully!' });
            setTitle('');
            setContent('');
            setCategory('General');
            setImage('');
            setThumbnail('');
            setUserId(1);

            setTimeout(() => router.push('/blogs'), 1000);
        } catch (err) {
            setMessage({ type: 'error', text: (err as Error).message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Add New Post</h2>

            <label htmlFor="title" className="font-semibold">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full"
                required
            />

            <label htmlFor="content" className="font-semibold">Content</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 rounded w-full h-32"
                required
            />

            <label htmlFor="image" className="font-semibold">Image URL</label>
            <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border p-2 rounded w-full"
                required
            />

            <label htmlFor="thumbnail" className="font-semibold">Thumbnail URL</label>
            <input
                type="url"
                id="thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="border p-2 rounded w-full"
                required
            />

            <label htmlFor="category" className="font-semibold">Category</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded w-full"
            >
                <option value="General">General</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
            </select>

            <label htmlFor="userId" className="font-semibold">User ID</label>
            <input
                type="number"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value, 10) || 1)}
                className="border p-2 rounded w-full"
                required
            />

            {message && <p className={`text-${message.type === 'error' ? 'red' : 'green'}-500`}>{message.text}</p>}

            <button
                type="submit"
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Post'}
            </button>
        </form>
    );
}

export default AddPost;

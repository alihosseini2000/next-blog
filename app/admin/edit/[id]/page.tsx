"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

function EditArticle() {
    const { id } = useParams();
    const router = useRouter();
    const updatedAt = new Date().toLocaleString();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        slug: "",
        userId: 1,
        updatedAt: updatedAt
    });

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/posts/${id}`);
            const data = await res.json();
            setForm({
                title: data.title,
                content: data.content,
                category: data.category,
                slug: data.slug,
                userId: data.userId,
                updatedAt
            });
        }
        fetchData();
    }, [id, updatedAt]);

    const handleUpdate = async () => {
        await fetch(`http://localhost:8000/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        alert("Article updated!");
        router.push("/admin");
    };
    
    return (
        <div className="container max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Article</h1>

            <label className="block font-semibold">Title:</label>
            <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 w-full my-2 rounded-md"
            />

            <label className="block font-semibold">Content:</label>
            <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="border p-2 w-full my-2 rounded-md h-32"
            />

            <label className="block font-semibold">Category:</label>
            <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 w-full my-2 rounded-md"
            />
            <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded"
            >
                <option value="General">General</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
            </select>

            <label className="block font-semibold">Slug:</label>
            <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="border p-2 w-full my-2 rounded-md"
            />

            <label className="block font-semibold">User Id:</label>
            <input
                type="number"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: parseInt(e.target.value , 10) || 1 })}

                className="border p-2 w-full my-2 rounded-md"
            />

            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
                Save Changes
            </button>
        </div>
    );
}

export default EditArticle;

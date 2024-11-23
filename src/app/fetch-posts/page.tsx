"use client";

import { useState, useEffect } from "react";

export default function FetchPostsPage() {
    const [posts, setPosts] = useState([]); // Fixed naming: 'SetPosts' to 'setPosts'
    const [error, setError] = useState(""); // Fixed naming: 'setPosts' to 'setError'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("An unexpected error occurred"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post: { id: number; title: string; body: string }) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../API";
import { motion } from "framer-motion";

function Posts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [query, setQuery] = useState("");
  const [filterMine, setFilterMine] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!form.title) return alert("Title required");
    try {
      const res = await API.post("/posts", form);
      setPosts([res.data, ...posts]);
      setForm({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async () => {
    try {
      const res = await API.put(`/posts/${editingPost._id}`, form);
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      setEditingPost(null);
      setForm({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content });
  };

  const filteredPosts = posts.filter((p) => {
    if (
      query &&
      ![p.title, p.content]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
      return false;
    if (filterMine) return p.user?._id === user?._id;
    return true;
  });

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-6 border-t-4 border-blue-500 hover:shadow-blue-200 transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      

      {/* Search & Filter */}
      <div className="mb-5 flex gap-3 items-center">
        <input
          className="flex-1 p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={filterMine}
            onChange={(e) => setFilterMine(e.target.checked)}
          />
          My posts
        </label>
      </div>

      {/* Create / Edit Post */}
      <div className="mb-6 space-y-3">
        <input
          className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Content"
          rows="4"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        {editingPost ? (
          <div className="flex gap-3">
            <button
              className="flex-1 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
              onClick={updatePost}
            >
              Update
            </button>
            <button
              className="flex-1 py-2 border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition"
              onClick={() => {
                setEditingPost(null);
                setForm({ title: "", content: "" });
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="w-full py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
            onClick={createPost}
          >
            Create Post
          </button>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post._id}
            className="p-5 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition bg-blue-50"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold text-blue-700">
              {post.title}
            </h4>
            <p className="text-gray-700 mt-1">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              By: <span className="font-medium">{post.user?.name}</span> (
              {post.user?.email})
            </div>

            {post.user?._id === user?._id && (
              <div className="flex gap-3 mt-3">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => startEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Posts;

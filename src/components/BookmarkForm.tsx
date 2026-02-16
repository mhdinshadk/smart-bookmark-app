
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

export default function BookmarkForm({
  userId,
  onAdd,
}: {
  userId: string;
  onAdd: (bookmark: Bookmark) => void;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!url.trim()) return toast.error("URL is required");
    if (!url.startsWith("http"))
      return toast.error("URL must start with http/https");

    setLoading(true);

    const tempBookmark = {
      id: uuidv4(),
      title: title.trim(),
      url: url.trim(),
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    onAdd(tempBookmark); // instantly update UI

    const { error } = await supabase.from("bookmarks").insert({
      title: tempBookmark.title,
      url: tempBookmark.url,
      user_id: userId,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Bookmark added!");
    }

    setTitle("");
    setUrl("");
    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded bg-black border border-gray-700"
      />

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded bg-black border border-gray-700"
      />

      <button
        onClick={addBookmark}
        disabled={loading}
        className="w-full bg-white text-black p-3 rounded font-semibold hover:scale-105 transition"
      >
        {loading ? "Adding..." : "Add Bookmark"}
      </button>
    </div>
  );
}

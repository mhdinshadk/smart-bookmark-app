
"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import Image from "next/image";

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export default function BookmarkCard({
  bookmark,
  onDelete,
}: {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}) {
  const deleteBookmark = async () => {
    onDelete(bookmark.id); // optimistic update

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Deleted");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-3">
        <Image
          src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
          alt="favicon"
          width={24}
          height={24}
          unoptimized
        />
        <div>
          <a
            href={bookmark.url}
            target="_blank"
            className="font-semibold text-blue-400"
          >
            {bookmark.title}
          </a>
          <p className="text-sm text-gray-400">{bookmark.url}</p>
        </div>
      </div>

      <button
        onClick={deleteBookmark}
        className="text-red-400 hover:scale-110 transition"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}


"use client";

import { AnimatePresence } from "framer-motion";
import BookmarkCard from "./BookmarkCard";
import Loader from "./Loader";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
}

export default function BookmarkList({
  bookmarks,
  setBookmarks,
  loading,
}: {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  loading: boolean;
}) {
  if (loading) return <Loader />;

  if (!bookmarks.length)
    return <p className="text-gray-400 mt-6">No bookmarks yet.</p>;

  return (
    <div className="space-y-4 mt-6 max-h-100 overflow-y-auto pr-2">
      <AnimatePresence>
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={(id) =>
              setBookmarks((prev: Bookmark[]) =>
                prev.filter((b) => b.id !== id)
              )
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

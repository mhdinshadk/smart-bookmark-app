
"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BookmarkForm from "../../components/BookmarkForm";
import BookmarkList from "../../components/BookmarkList";
import { User } from "@supabase/supabase-js";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
        fetchBookmarks(session.user.id);
      }
    };

    checkSession();
  }, [router, fetchBookmarks]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-black to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>

        <BookmarkForm
          userId={user.id}
          onAdd={(newBookmark) =>
            setBookmarks((prev) => [newBookmark, ...prev])
          }
        />

        <BookmarkList
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          loading={loading}
        />
      </div>
    </div>
  );
}

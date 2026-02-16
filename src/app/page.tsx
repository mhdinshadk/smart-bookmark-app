"use client";

import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Smart Bookmark App</h1>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition"
        >
          {loading ? "Redirecting..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}

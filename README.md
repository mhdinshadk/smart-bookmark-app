# Smart Bookmark App

A real-time bookmark manager built with Next.js (App Router) and Supabase.

## 🚀 Live Demo

smart-bookmark-app-nine-nu.vercel.app

## 🛠 Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Framer Motion
- React Hot Toast

## 🔐 Authentication

The app uses Supabase Auth with Google OAuth.
Users log in using their Google account.
Session is securely managed by Supabase.

## 🗄 Database Design

Table: bookmarks

- id (uuid)
- user_id (references auth.users)
- title (text)
- url (text)
- created_at (timestamp)

## 🔒 Row Level Security (RLS)

Enabled RLS policies:

- Users can view only their bookmarks
- Users can insert only their bookmarks
- Users can delete only their bookmarks

Implemented using:

auth.uid() = user_id

## 🔄 Realtime Feature

Supabase Realtime listens to Postgres changes.
New bookmarks appear instantly without page refresh.

## ✨ Features

- Google Login
- Add Bookmark
- Delete Bookmark
- Real-time updates
- Optimistic UI updates
- Animated UI (Framer Motion)
- Glassmorphism design
- Scrollable list
- Favicon preview

## ⚠ Problems Faced & Solutions

### 1. Google OAuth redirect issues
Fixed by properly configuring:
- Supabase URL Configuration
- Google Cloud OAuth redirect URI

### 2. Bookmarks not showing after insert
Initially relied only on Realtime.
Improved by implementing optimistic UI updates.

### 3. Delete not updating UI instantly
Solved by updating local state before DB response.

### 4. RLS blocking queries
Fixed by correctly configuring SELECT, INSERT, DELETE policies.

## 📦 Deployment

Hosted on Vercel.
Environment variables configured in Vercel dashboard.

---


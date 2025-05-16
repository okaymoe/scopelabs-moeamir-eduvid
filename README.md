# EduVid

Educational Video Platform built with Next.js 14, React, and Tailwind CSS. Some components packaged from shadcn.

## Overview

EduVid allows users to:

- View a grid of educational videos sorted by newest first
- Watch videos with a custom player (fullscreen, playback speed, volume control)
- Create new video entries with title, description, and video URL
- Edit existing videos
- Comment on videos and view comments from others
- View all videos by a specific user

*Note: Screenshots coming soon!*

## Tech Stack

- React/Next.js 14 (App Router)
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Sonner for toast notifications
- Shadcn for boilerplate modules

## Features

- **Home Page (/)**: Displays a responsive grid of video cards
- **Video Player**: Custom controls (play/pause, skip, volume, speed, fullscreen)
- **Create Video (/videos/create)**: Form with Zod validation
- **Edit Video (/videos/edit/[id])**: Pre-filled form for updates
- **Comments**: Add and list comments under each video
- **User Page (/users/[userId])**: List all videos by a user
- **Splash Screen**: Animated intro before loading the app (6s)

## Installation

Clone the repository:

    git clone https://github.com/your-username/eduvid.git
    cd eduvid

Install dependencies:

    npm install

Run the development server:

    npm run dev

Open http://localhost:3000 in your browser.

## Usage

- **Browse Videos**: Landing page shows all videos. Click a card to watch.
- **Create Video**: Click "+ New Video" in the header or visit /videos/create.
- **Edit Video**: On a video page, click "Edit" to update details.
- **Comment**: Fill out the comment form under the player to post.
- **View User Videos**: Click a user's name on any card or video page.

## Some Project Structure

    ├── app/
    │   ├── layout.tsx       # Root layout with theme, header, footer, splash
    │   ├── globals.css      # Global styles
    │   ├── page.tsx         # Home page
    │   ├── videos/
    │   │   ├── create/      # New video form
    │   │   ├── [id]/        # Video detail + comments
    │   │   └── edit/[id]/   # Edit video page
    │   └── users/[userId]/  # User's videos
    ├── src/
    │   ├── components/      # Reusable UI components, most custom made and some from Shadcn
    │   ├── lib/             # API helpers & utils
    │   └── styles/          # Tailwind config
    └── README.md            # This file

## Environment Variables

No environment variables are required. The API endpoint is hardcoded to the provided FastAPI server.

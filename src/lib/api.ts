export interface Video {
  id: string
  title: string
  description: string
  video_url: string
  user_id: string
  created_at: string
}

export interface Comment {
  id: string
  video_id: string
  user_id: string
  content: string
  created_at: string
}

// These obviously go in .env.local file but just for ease for whoever is reviewing my code - no need to state any variables
const API_BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api"
const USER_ID = "moe_amir"

export async function getVideos(userId: string = USER_ID): Promise<Video[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/videos?user_id=${encodeURIComponent(userId)}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status}`)
    }

    const data = (await response.json()) as { videos: Video[] }

    const videosArray = Array.isArray(data.videos) ? data.videos : []
// newest vids first
    return videosArray.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  } catch (error) {
    console.error("Error fetching videos:", error)
    return []
  }
}



export async function getVideoById(id: string): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/videos/single?video_id=${id}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch video: ${response.status}`)
  }

  const data = await response.json()         
  const vid = data.video                   
  if (!vid) throw new Error("Malformed response from getVideoById")
  return vid                             
}



export async function createVideo(videoData: {
  title: string
  description: string
  video_url: string
}): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...videoData,
      user_id: USER_ID,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create video: ${response.status}`)
  }

  return await response.json()
}

export async function editVideo(videoData: {
  video_id: string
  title: string
  description: string
  user_id: string
}): Promise<Video> {
  console.log("EDIT PAYLOAD →", videoData)
  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoData),
  })

  if (!response.ok) {
    throw new Error(`Failed to edit video: ${response.status}`)
  }

  return await response.json()
}

export async function getCommentsByVideoId(videoId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/comments?video_id=${videoId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.comments) ? data.comments : [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}


export async function createComment(commentData: {
  video_id: string
  content: string
  user_id: string
}): Promise<Comment> {
  const response = await fetch(`${API_BASE_URL}/videos/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create comment: ${response.status}`)
  }

  return await response.json()
}

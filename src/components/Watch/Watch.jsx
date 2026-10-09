import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api";

function Watch() {
  const { videoId } = useParams();
  const { status } = useSelector((state) => state.auth);

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/getVideoComments/${videoId}`);
      setComments(res.data.data.docs);
    } catch (err) {
      console.log(err);
    }
  };

  // video + comments
  useEffect(() => {
    api
      .get(`/videos/getVideoById/v/${videoId}`)
      .then((res) => setVideo(res.data.data.video))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load video")
      );
    loadComments();
  }, [videoId]);

  // initial liked state (only when logged in)
  useEffect(() => {
    if (!status) {
      setLiked(false);
      return;
    }
    api
      .get("/likes/getLikedVideos")
      .then((res) => {
        const list = res.data.data || [];
        setLiked(list.some((v) => v.videoId === videoId));
      })
      .catch((err) => console.log(err));
  }, [videoId, status]);

  const handleLike = async () => {
    try {
      const res = await api.post(`/likes/toggleVideoLike/${videoId}`);
      setLiked(!!res.data.data?._id); // created like has _id, deleted one doesn't
    } catch (err) {
      setError(err.response?.data?.message || "Could not like video");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post(`/comments/addComment/${videoId}`, { comment: newComment });
      setNewComment("");
      loadComments();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add comment");
    }
  };

  if (error && !video) return <p className="p-6 text-red-600">{error}</p>;
  if (!video) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <video
        src={video.videoFile}
        poster={video.thumbnail}
        controls
        className="w-full rounded-lg bg-black"
      />
      <h1 className="text-xl font-bold mt-3">{video.title}</h1>
      <p className="text-gray-600">{video.description}</p>
      <p className="text-sm text-gray-500 mt-1">{video.views} views</p>

      <div className="mt-3">
        {status ? (
          <button
            onClick={handleLike}
            className={`rounded px-3 py-1 border ${
              liked ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {liked ? "Liked" : "Like"}
          </button>
        ) : (
          <p className="text-sm text-gray-500">Log in to like or comment.</p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <h2 className="font-semibold mt-6 mb-2">Comments</h2>

      {status && (
        <form onSubmit={handleComment} className="flex gap-2 mb-4">
          <input
            className="border rounded p-2 flex-1"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-3">
            Post
          </button>
        </form>
      )}

      <ul className="flex flex-col gap-3">
        {comments.map((c) => (
          <li key={c._id} className="bg-white rounded p-3 shadow-sm flex gap-3">
            <img
              src={c.owner?.avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{c.owner?.username}</p>
              <p>{c.content}</p>
            </div>
          </li>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </ul>
    </div>
  );
}

export default Watch;
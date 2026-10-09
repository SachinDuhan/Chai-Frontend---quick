import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import { BASE_URL } from "../../constants";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/videos/getAllVideos`, {
        params: { page: 1, limit: 12, sortBy: "createdAt", sortType: "desc" },
      })
      .then((res) => setVideos(res.data.data.docs))
      .catch((err) => setError(err.response?.data?.message || "Failed to load videos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((v) => (
        <VideoCard key={v._id} video={v} />
      ))}
    </div>
  );
}

export default Home;
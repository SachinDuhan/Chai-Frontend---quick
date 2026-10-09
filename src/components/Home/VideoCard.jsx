import { Link } from "react-router-dom";
function VideoCard({ video }) {
  const owner = video.owner?.[0];
  return (
    <Link to={`/video/${video._id}`} className="block rounded-lg overflow-hidden shadow bg-white">
    <div className="rounded-lg overflow-hidden shadow bg-white">
      <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
      <div className="p-3 flex gap-3">
        <img src={owner?.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-500">{owner?.fullName} · {video.views} views</p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default VideoCard;
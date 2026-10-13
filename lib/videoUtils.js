export const extractYouTubeId = (ytUrl) => {
  if (!ytUrl) return null;
  const match = ytUrl.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

export const getThumbnailUrl = (video) => {
  if (video?.thumbnail && video.thumbnail.length > 0) {
    return video.thumbnail;
  }
  if (video?.ytUrl) {
    const videoId = extractYouTubeId(video.ytUrl);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }
  return null;
};

export const hasCustomThumbnail = (video) => {
  return video?.thumbnail && video.thumbnail.length > 0;
};

export const hasYouTubeThumbnail = (video) => {
  if (!video?.ytUrl) return false;
  return extractYouTubeId(video.ytUrl) !== null;
};

export const hasUploadedVideo = (video) => {
  return video?.uploadedUrl && video.uploadedUrl.length > 0;
};
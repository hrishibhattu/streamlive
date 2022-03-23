import React from "react";
import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

const AppBody = ({ streamIsActive, playbackId }) => {
  const [videoEl, setVideoEl] = React.useState(null);
  const onVideo = React.useCallback((el) => {
    setVideoEl(el);
  }, []);

  React.useEffect(() => {
    if (videoEl == null) return;
    if (streamIsActive && playbackId) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });
    }
  }, [streamIsActive, playbackId, videoEl]);

  return (
    <div className="container w-full flex flex-col items-center overflow-auto pb-14 pt-10">
      <div className="relative bg-black h-56 lg:h-96 w-full xl:w-3/5 overflow-hidden">
        <div data-vjs-player>
          <video
            id="video"
            ref={onVideo}
            className="h-full w-full video-js vjs-theme-city"
            controls
            playsInline
          />
        </div>
        <div className="bg-white rounded-xl flex items-center justify-center absolute right-2 top-2 p-1 text-xs">
          <div
            className={`animate-pulse ${
              streamIsActive ? "bg-green-700" : "bg-yellow-600"
            } h-2 w-2 mr-2 rounded-full`}
          ></div>
          {streamIsActive ? "Live" : "Waiting for Video"}
        </div>
      </div>
    </div>
  );
};

export default AppBody;

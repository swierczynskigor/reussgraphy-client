import "./VideoGallery.scss";

import { Video } from "@/types";
import React from "react";

type Props = {
  videos: Video[];
};

export const VideosGallery = (props: Props) => {
  return (
    <div className="videogallery-container">
      {props.videos.map((video) => (
        <div key={video.id} className="videogallery-container">
          <div
            dangerouslySetInnerHTML={{ __html: video.content }}
            className="videogallery-content"
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};

import { Video } from "@/types";
import React from "react";

import "./VideosList.scss";
import { Button, Row } from "@/components/atoms";
import { VideoIcon } from "@/assets";

type Props = {
  videos: Video[];
  deleteVideo: (id: string) => void;
};

export const VideosList = (props: Props) => {
  return (
    <div className="videolist-main">
      {props.videos &&
        props.videos.map((video, index) => (
          <div key={index} className="videolist-item">
            <Row>
              <VideoIcon />
              <h3>{video.title}</h3>
            </Row>
            <Button type="delete" onClick={() => props.deleteVideo(video.id)}>
              Delete
            </Button>
          </div>
        ))}
    </div>
  );
};

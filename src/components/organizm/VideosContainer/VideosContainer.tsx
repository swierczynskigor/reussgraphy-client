import { getVideos } from "@/api/videosActions";
import { Button } from "@/components/atoms";
import { AddVideoModal } from "@/modals";
import { Video } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  url: string;
};

export const VideosContainer = (props: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  useEffect(() => {
    // fetch videos
    getData();
  }, []);

  const getData = async () => {
    const data = await getVideos(props.url);
    setVideos(data);
  };

  const handleOpenAddVideoModal = () => setShowAddVideoModal(true);
  const handleCloseAddVideoModal = () => setShowAddVideoModal(false);

  return (
    <>
      <AddVideoModal
        close={handleCloseAddVideoModal}
        isVisible={showAddVideoModal}
      />
      <div>
        <h2>{props.title}</h2>
        <Button type="add" onClick={() => handleOpenAddVideoModal()}>
          Add video
        </Button>
        {/* <VideosList videos={videos} /> */}
      </div>
    </>
  );
};

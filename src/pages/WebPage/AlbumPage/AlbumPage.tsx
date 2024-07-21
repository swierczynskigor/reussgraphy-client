/* eslint-disable @typescript-eslint/no-unused-vars */
import "./AlbumPage.scss";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ImageViewer from "react-simple-image-viewer";
import StackGrid from "react-stack-grid";

import { getFiles, getFolder, getFolders } from "@/api";
import { BackgroundImage, Loader, Spacer, VideosGallery } from "@/components";
import { apiUrl } from "@/constant";
import { useTheme } from "@/theme";
import {
  FolderTypeEnum,
  HeaderDocumentI,
  PhotoI,
  Video,
  VideoDocutmentI,
} from "@/types";
import { getImagePath } from "@/utils";

export const AlbumPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [header, setHeader] = useState<HeaderDocumentI>({
    title: "",
    description: "",
    sections: [],
    id: "",
    type: FolderTypeEnum.IMAGE,
    photosVisible: true,
    _id: "",
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<PhotoI[]>([]);
  const [titleImage, setTitleImage] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  const [countLoaded, setCountLoaded] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const getData = async () => {
    if (params.name) {
      const folders = await getFolders();
      const thisFolder = folders.find((folder) => folder.name === params.name);

      if (!thisFolder) navigate("/gallery");

      const data = await getFolder(params.name);

      const header: HeaderDocumentI = data.find(
        (document: any) => document.id === "index"
      ) as HeaderDocumentI;

      const videosData: VideoDocutmentI = data.find(
        (document: any) => document.id === "videos"
      ) as VideoDocutmentI;

      setVideos(videosData.videos as Video[]);
      setTitleImage(thisFolder!.image);
      setImages(await getFiles(params.name));
      setHeader(header);
    }
  };

  useEffect(() => {
    getData();
    addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, []);

  useMemo(() => {
    if (countLoaded >= images.length && images.length > 0) setLoading(false);
  }, [countLoaded, images.length]);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const handleLoadPicture = () => setCountLoaded((prev) => prev + 1);

  return (
    <>
      {loading && images.length > 0 && (
        <Loader message="Na fajne zdjęcia musisz chwilę poczekać" />
      )}
      {images.length > 0 && (
        <>
          <BackgroundImage
            src={
              titleImage &&
              getImagePath(images.find((img) => img.id === titleImage)!)
            }
          >
            <div className="album-title">
              <h1>{header?.title}</h1>
              <article
                dangerouslySetInnerHTML={{ __html: header?.description }}
              />
            </div>
          </BackgroundImage>

          <div className="album-sections">
            {header?.sections.map((section, index) => (
              <div key={index} className="album-section">
                {index % 2 === 0 ? (
                  <>
                    <img
                      src={getImagePath(
                        images.find((img) => img.id === section.image)!,
                        "thumb"
                      )}
                      alt=""
                      loading="lazy"
                    />
                    <div className="album-section-content">
                      <h2>{section.title}</h2>
                      <article
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="album-section-content">
                      <h2>{section.title}</h2>
                      <article
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                    <img
                      src={`${apiUrl}/api/image/${params.name}/${section.image}`}
                      alt=""
                      loading="lazy"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {!header?.sections.length && <div className="album-spacer" />}
      <VideosGallery videos={videos} />
      {videos.length > 0 && <Spacer width="40%" />}
      <StackGrid columnWidth={window.innerWidth < 620 ? 150 : 300}>
        {images.map((image, index) => (
          <img
            key={image._id}
            className="album-image"
            src={getImagePath(image, "thumb")}
            onClick={() => openImageViewer(index)}
            onLoad={handleLoadPicture}
            loading="lazy"
          />
        ))}
      </StackGrid>
      <div style={{ height: "24px" }} />
      {isViewerOpen && (
        <div className="album-imageViewer">
          <ImageViewer
            src={images.map((image) => getImagePath(image))}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            backgroundStyle={{
              backgroundColor: theme.theme.cover.seeThroughtDark,
            }}
            onClose={closeImageViewer}
          />
        </div>
      )}
    </>
  );
};

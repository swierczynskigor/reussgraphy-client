import React, { useEffect, useState } from "react";
import "./Carousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreI } from "@/store/types";
import { getImagePath } from "@/utils";
import { getFiles } from "@/api";
import { currentPhotosActions } from "@/store";
import { Loader } from "@/components";

export const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const loadedPhotosCounter = useSelector(
    (state: StoreI) => state.currentPhotos.loaded
  );

  const dispatch = useDispatch();

  const images = useSelector((state: StoreI) => state.currentPhotos.photos);

  const handleLoadImages = async () => {
    const resImages = await getFiles("slider");
    dispatch(currentPhotosActions.setPhotos(resImages));

    console.log(resImages);

    return resImages.length;
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    const loadCarousel = async () => {
      const length = await handleLoadImages();
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % length);
      }, 6000);
    };
    dispatch(currentPhotosActions.setLoaded(0));
    loadCarousel();

    console.log();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {images.length - 1 > loaded && (
        <Loader message="Piękne zdjęcia jeszcze się ładują" />
      )}
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            loading="lazy"
            key={index}
            src={getImagePath(image)}
            alt={`Image ${index + 1}`}
            className={`carousel-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
            onLoad={() => setLoaded((prev) => prev + 1)}
          />
        ))}
      </div>
    </>
  );
};

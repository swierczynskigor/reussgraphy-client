import { Carousel } from "@/components";
import { Contact } from "@/pages";
import "./HomePage.scss";
import { Information } from "./Information";

export const HomePage = () => {
  return (
    <>
      <Carousel />
      <Information />
      <Contact />
    </>
  );
};

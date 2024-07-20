import "./Card.scss";

import { useNavigate } from "react-router";
import React from "react";
import { getCardThumb } from "@/utils";
import { FolderTypeEnum } from "@/types";

interface CardProps {
  icon?: JSX.Element | null;
  children: JSX.Element | string;
  to?: string;
  img?: string;
  folderName: string;
  type: FolderTypeEnum;
}

export const Card = ({
  icon = null,
  children,
  to,
  img,
  folderName,
  type,
}: CardProps) => {
  const navigate = useNavigate();

  if (to)
    return (
      <article className="card" onClick={() => navigate(to)}>
        <div className="card-imgbox">
          {type === FolderTypeEnum.VIDEO && <></>}
          <div className="card-img">
            {img && (
              <img
                src={getCardThumb(img, folderName)}
                alt={img}
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="card-details">
          <h2 className="card-title">{children}</h2>
        </div>
      </article>
    );
  else
    return (
      <button className="card-main">
        {icon} {children}
      </button>
    );
};

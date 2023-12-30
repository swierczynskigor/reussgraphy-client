import { DeleteIcon } from "@/assets";
import "./ImagePreview.scss";

interface PropsI {
  id: string;
  image: string;
  alt: string;
  onDelete?: (idx: string) => void;
  onImageClick?: (idx: string) => void;
}

export const ImagePreview = ({
  id,
  image,
  alt,
  onDelete,
  onImageClick,
}: PropsI) => {
  return (
    <div className="image-preview">
      {onDelete && (
        <button onClick={() => onDelete(id)}>
          <DeleteIcon fill="white" />
        </button>
      )}
      <img
        loading="lazy"
        onClick={onImageClick && (() => onImageClick(id))}
        src={image}
        style={{ cursor: onImageClick ? "pointer" : "default" }}
        alt={alt}
      />
    </div>
  );
};

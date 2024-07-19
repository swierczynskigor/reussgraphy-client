import "./FolderPagePanel.scss";

import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  getFolder,
  getFolders,
  removeWholeFolder,
  updateFolderImage,
  updateIndexDocument,
} from "@/api";
import {
  Button,
  FormSection,
  ImagePreview,
  Spacer,
  TextInput,
  UploadContainer,
} from "@/components";
import { HeaderDocumentI, SectionI } from "@/types";
import { SelectImageModal } from "@/modals";
import { getCardThumb } from "@/utils";

export const FolderPagePanel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<SectionI[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [showSelectImageModal, setShowSelectImageModal] = useState(false);

  const getData = async () => {
    if (params.name) {
      const folders = await getFolders();
      const thisFolder = folders.find((folder) => folder.name === params.name);
      if (!thisFolder) navigate("/czadowyPanel/settings");
      const data: { id: string }[] = (await getFolder(params.name)) as {
        id: string;
      }[];
      console.log(data);
      setSelectedImage(thisFolder!.image);
      const header: HeaderDocumentI = data.find(
        (document) => document.id === "index"
      ) as HeaderDocumentI;

      console.log(data);

      setTitle(header.title);
      setDescription(header.description);
      setSections(header.sections);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    if (params.name)
      await updateIndexDocument(params.name, {
        title,
        description,
        sections,
      });
  };

  const handleCreateSection = () => {
    setSections([...sections, { title: "", content: "", image: "" }]);
  };
  const handleUpdateSection = (idx: number, updatedSection: SectionI) => {
    const tempSections = [...sections];

    tempSections[idx] = updatedSection;

    setSections([...tempSections]);
  };

  const handleDeleteSection = (idx: number) => {
    const tempSections = [...sections];
    tempSections.splice(idx, 1);
    setSections([...tempSections]);
  };

  const handleSelectImage = async (idx: string) => {
    if (params.name) await updateFolderImage({ name: params.name, image: idx });
    setSelectedImage(idx);
  };

  const handleRemoveFolder = async () => {
    if (params.name) {
      await removeWholeFolder(params.name);
      navigate("/czadowyPanel/settings");
    }
  };

  return (
    <main className="folder-page-main">
      <h2>Folder name: {params.name}</h2>
      <p>
        Jak chcesz usunąć to kliknij tutaj👉{" "}
        <span className="cursor-pointer" onClick={() => handleRemoveFolder()}>
          🗑️
        </span>
      </p>
      <div>
        <TextInput
          label="Title"
          name="title"
          type="text"
          value={title}
          setValue={setTitle}
          width="400px"
        />
        <TextInput
          label="Description"
          name="description"
          type="text"
          value={description}
          setValue={setDescription}
          width="400px"
          multiline={true}
        />
        <>
          <Button type="simple" onClick={() => setShowSelectImageModal(true)}>
            Select photo
          </Button>
          {selectedImage && (
            <ImagePreview
              id={selectedImage}
              alt={"img" + selectedImage}
              image={getCardThumb(selectedImage, params.name || "")}
            />
          )}
          <SelectImageModal
            isVisible={showSelectImageModal}
            selectImage={handleSelectImage}
            close={() => setShowSelectImageModal(false)}
          />
        </>
        <Spacer />
        <Button type="add" onClick={handleCreateSection}>
          Create section
        </Button>
        {sections.map((section, idx) => (
          <Fragment key={idx}>
            {idx !== 0 && <Spacer key={idx} />}
            <FormSection
              idx={idx}
              data={section}
              update={handleUpdateSection}
              deleteSection={handleDeleteSection}
            />
          </Fragment>
        ))}
        <Button type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </div>
      <Spacer />
      <div className="folder-page-uploadContainer">
        <UploadContainer url={params.name || ""} title="Images" />
      </div>
    </main>
  );
};

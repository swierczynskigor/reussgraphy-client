import React, { useState } from "react";

import { createFolder } from "@/api";
import { Button, Row, TextInput } from "@/components";
import { ModalLayout } from "@/layouts";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
}

export const NewFolderModal = ({ isVisible, close }: NewFolderModalProps) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [title, setTitle] = useState("");
  const [isVideoFolder, setIsVideoFolder] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createFolder({
      name: newFolderName,
      title,
      type: isVideoFolder ? "video" : "image",
    });
    setNewFolderName("");
    setTitle("");
    close();
  };

  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <form
            method={"POST"}
            action="/czadowyPanel/login"
            className="panel-login-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextInput
              label="New folder name"
              name="newFolderName"
              value={newFolderName}
              setValue={setNewFolderName}
              required={true}
            />
            <TextInput
              label="Title"
              name="title"
              value={title}
              setValue={setTitle}
              required={true}
            />
            <Row>
              <input
                className="checkbox"
                type="checkbox"
                name="videoFolder"
                checked={isVideoFolder}
                onChange={(e) => {
                  setIsVideoFolder(e.target.checked);
                }}
              />
              <span style={{ padding: "10px" }}>
                Czy chcesz aby ten folder był oznaczony jako folder video?
              </span>
            </Row>
            <div>
              <Button type="submit">Create folder</Button>
            </div>
          </form>
        </ModalLayout>
      ) : null}
    </>
  );
};

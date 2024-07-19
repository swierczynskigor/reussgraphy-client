import { Button, TextInput } from "@/components";
import { ModalLayout } from "@/layouts";
import React, { useState } from "react";

interface Props {
  isVisible: boolean;
  close: () => void;
}

export const AddVideoModal = (props: Props) => {
  const [title, setTitle] = useState("");
  const [content, setConent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConent("");
    setTitle("");
    close();
  };

  return (
    <>
      {props.isVisible ? (
        <ModalLayout close={props.close}>
          <form
            method={"POST"}
            className="panel-login-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextInput
              label="Video title"
              name="newFolderName"
              value={title}
              setValue={setTitle}
              required={true}
            />
            <TextInput
              label="Video content"
              name="newFolderName"
              value={content}
              setValue={setConent}
              required={true}
            />
            <div>
              <Button type="submit">Add video</Button>
            </div>
          </form>
        </ModalLayout>
      ) : null}
    </>
  );
};

import { Button, Input } from "@/src/atoms";
import { Editor } from "@/src/molecules";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Image as ImageIcon } from "react-feather";
import { useMutation } from "react-query";
import { CreatePostInput } from "@/src/types";
import { CREATE_POST } from "@/src/graphql/api/posts.graphql";
import { request } from "@/src/graphql/custom-gql-fns";

interface ICreatePostForm {
  title: string;
  body?: string;
}

export default function CreatePost() {
  const mutation = useMutation(async (createPostInput: CreatePostInput) => {
    return request(CREATE_POST, { ...createPostInput });
  });

  const { handleSubmit, control, register } = useForm<ICreatePostForm>();
  const fileRef = useRef<HTMLInputElement>(null);
  const onOpenFile = () => fileRef.current?.click();

  const [filepath, setFilepath] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>();

  const handlePreviewImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL(e.target.files![0]);

    setFilepath(url);
  };

  const onSubmit = (data: ICreatePostForm) => {
    console.log(data);
    console.log(file);

    const formData = new FormData();
    formData.append("postImg", file as Blob);

    // Mutate
    mutation.mutate(
      { ...data, file },
      {
        onSuccess(data) {
          console.log("SUCCESFUL POST", data);
        },

        onError(err) {
          console.log("UNLUCKY POST IDIOT", err);
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-2"
    >
      <div>
        <h1 className="text-lg font-semibold">Create a post</h1>
      </div>
      <div>
        <Input
          {...register("title")}
          placeholder="I wonder what the title will be..."
        />
      </div>
      <div>
        <Controller
          name="body"
          control={control}
          rules={{
            required: "Please enter task description",
          }}
          render={({ field }) => (
            <Editor
              theme="snow"
              placeholder="I wonder..."
              onChange={(text) => {
                field.onChange(text);
              }}
            />
          )}
        />
        <div>
          <input
            onChange={(e) => {
              handlePreviewImg(e);
              setFile(e.target.files![0]);
            }}
            className="hidden"
            type="file"
            ref={fileRef}
          />
          <Button type="button" outline rounded size="s" onClick={onOpenFile}>
            <ImageIcon />
          </Button>

          {filepath && (
            <div className="relative w-full mt-2 h-36">
              <Image
                src={filepath}
                layout="fill"
                className="absolute object-contain object-left"
                alt="help"
              />
            </div>
          )}
        </div>
        <div className="mt-2">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
}

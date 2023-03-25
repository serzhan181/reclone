"use client";

import { postsRequests } from "@/graphql/requests/post-requests";
import { Input } from "@/shared/form/input";
import { getTokenClient } from "@/utils/get-token-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { SelectSub } from "./select-sub";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import XIcon from "@heroicons/react/20/solid/XMarkIcon";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Editor } from "@/shared/form/editor";

const Schema = z.object({
  title: z
    .string({ required_error: "Title is required!" })
    .min(5, "Title must consist of >5 characters!"),
  body: z.string().optional(),
  subName: z
    .string({ required_error: "Choose a sub to post to!" })
    .min(3, "Choose a sub to post to!")
    .default(""),

  image: z.custom<File>((v) => v instanceof File).optional(),
});

type CreatePostType = z.infer<typeof Schema>;

const SubmitPost = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    trigger,
  } = useForm<CreatePostType>({
    resolver: zodResolver(Schema),
  });

  const token = getTokenClient();
  const router = useRouter();
  const createPost = useMutation(postsRequests.createPost, {
    onError(err) {
      console.log(err);
    },
    onSuccess() {
      router.push("/");
    },
  });

  const onSubmit = (data: CreatePostType) => {
    const formData = new FormData();
    formData.append("postImg", data.image as Blob);

    createPost.mutate({
      title: data.title,
      body: data.body,
      subName: data.subName,
      token,
      file: data.image,
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="subName"
        defaultValue=""
        render={({ field }) => (
          <SelectSub
            isError={Boolean(errors.subName?.message)}
            label={errors.subName?.message}
            onChange={field.onChange}
          />
        )}
      />
      {/* Label triggers IFF there's an error */}
      <Input
        {...register("title")}
        placeholder="Title"
        isError={Boolean(errors.title)}
        label={errors.title?.message}
        autoComplete="off"
      />
      <Controller
        control={control}
        name="body"
        render={({ field }) => (
          <Editor
            placeholder="Enter description"
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      {/* Picture */}
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <ImageInput
            name={field.name}
            onChangeFile={field.onChange}
            file={field.value}
          />
        )}
      />

      <div className="flex self-end gap-3">
        <button
          disabled={createPost.isLoading}
          className={classNames("btn btn-primary", {
            "loading btn-disabled": createPost.isLoading,
          })}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

interface ImageInputProps {
  name: string;
  // Undefined because user may want to change/delete a file.
  onChangeFile: (file: File | undefined) => void;
  file: File | undefined;
}
// eslint-disable-next-line react/display-name
const ImageInput = ({ name, onChangeFile, file }: ImageInputProps) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <div className="flex items-center justify-between p-3 border border-dashed rounded-md border-base-content/20">
      <div className="flex items-center gap-5">
        {/* Dear lord */}
        <input
          name={name}
          type="file"
          className="hidden"
          onChange={(e) => onChangeFile(e.target.files![0])}
          ref={imgRef}
        />
        {!file && (
          <span>
            <PhotoIcon className="w-8" />
          </span>
        )}
        <div className="flex flex-col gap-2 text-sm text-base-content/50">
          {file ? (
            <p>{file.name}</p>
          ) : (
            <>
              <p>Upload an image (optional)</p>
              <p>PNG, JPG, WEBP (rec: 700x430px)</p>
            </>
          )}

          {previewUrl && file && (
            <div className="relative w-24 h-24 overflow-hidden rounded-md">
              <Image
                src={previewUrl}
                alt={file?.name}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col p-2 transition-all opacity-0 hover:opacity-100 hover:bg-black/50">
                <button
                  className="self-end btn btn-xs"
                  type="button"
                  onClick={() => onChangeFile(undefined)}
                >
                  <XIcon className="w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!file && (
        <div>
          <button
            onClick={() => imgRef.current!.click()}
            type="button"
            className="btn btn-sm"
          >
            Browse
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmitPost;

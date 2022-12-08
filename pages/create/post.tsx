import { Button, Input } from "@/src/atoms";
import { Editor, Select } from "@/src/molecules";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Image as ImageIcon } from "react-feather";
import { useMutation, useQuery } from "react-query";
import { CreatePostInput, GetSubsForDropdown } from "@/src/types";
import { CREATE_POST } from "@/src/graphql/api/posts.graphql";
import { request } from "@/src/graphql/custom-gql-fns";
import { GetServerSideProps } from "next";
import { isAuthServer } from "@/src/utils/authentication";
import { useRouter } from "next/router";
import { GET_SUBS } from "@/src/graphql/api/subs.graphql";
import { useInputImg } from "@/src/hooks/useInputImg";
import { NextSeo } from "next-seo";
import { subRequests } from "@/src/graphql/requests/subs.requests";

interface ICreatePostForm {
  title: string;
  body?: string;
  subName: string;
}

export default function CreatePost() {
  const createPost = useMutation(async (createPostInput: CreatePostInput) => {
    return request<unknown>(CREATE_POST, { ...createPostInput });
  });
  // Router
  const router = useRouter();
  const subNameParam = (router.query?.sub_name as string) || "";

  // Form
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm<ICreatePostForm>();
  const fileRef = useRef<HTMLInputElement>(null);
  const onOpenFile = () => fileRef.current?.click();

  const { setFileUrl, setFile, handlePreviewImg, file, fileUrl } =
    useInputImg();

  const onSubmit = (data: ICreatePostForm) => {
    const formData = new FormData();
    formData.append("postImg", file as Blob);

    // Mutate
    createPost.mutate(
      { ...data, file },
      {
        onSuccess() {
          router.push("/");
        },

        onError(err) {
          console.log("UNLUCKY POST IDIOT", err);
        },
      }
    );
  };

  // Fetch subs
  const { data: subsData, isLoading: isSubsLoading } = useQuery<{
    subs: GetSubsForDropdown[];
  }>("subs", async () => await request(GET_SUBS));

  const { data: subDoesExist, isLoading: isSubDoesExistLoading } = useQuery(
    ["sub", "exists", subNameParam],
    async () => await subRequests.subDoesExist(subNameParam),
    {
      enabled: Boolean(router.pathname) || router.pathname !== "\\",
    }
  );

  useEffect(() => {
    if (subDoesExist) {
      setValue("subName", subDoesExist.name, { shouldValidate: true });
    }
  }, [subDoesExist, setValue]);

  return (
    <>
      <NextSeo title="Create post to reclone" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <div>
          <h1 className="text-lg font-semibold">Create a post</h1>
        </div>
        <div>
          {errors.subName && (
            <h4 className="text-sm text-red-700">{errors.subName.message}</h4>
          )}
          <Controller
            name="subName"
            control={control}
            rules={{ required: "You have to select 1 community" }}
            render={({ field }) => {
              return (
                <>
                  {!isSubDoesExistLoading && (
                    <Select
                      onSelect={(e) => {
                        field.onChange(e.name);
                      }}
                      options={isSubsLoading ? [] : subsData?.subs || []}
                      placeholder={
                        subDoesExist ? subDoesExist.title : "Select community"
                      }
                    />
                  )}
                </>
              );
            }}
          />
        </div>
        <div>
          {errors?.title && (
            <p className="mb-1 text-sm font-thin text-red-700">
              {errors.title.message}
            </p>
          )}
          <Input
            {...register("title", { required: "this is required!" })}
            placeholder="I wonder what the title will be..."
          />
        </div>
        <div>
          <h3 className="mb-1 text-xs text-gray-500">(optional)</h3>
          <Controller
            name="body"
            control={control}
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
                setFileUrl(handlePreviewImg(e));
                setFile(e.target.files![0]);
              }}
              className="hidden"
              type="file"
              ref={fileRef}
            />
            <h3 className="mb-1 text-xs text-gray-500">(optional)</h3>

            <Button
              type="button"
              outline
              rounded
              size="s"
              onClick={() => onOpenFile()}
            >
              <ImageIcon />
            </Button>

            {fileUrl && (
              <div className="relative w-full mt-2 h-36">
                <Image
                  src={fileUrl}
                  layout="fill"
                  className="absolute object-contain object-left"
                  alt="help"
                />
              </div>
            )}
          </div>
          <div className="mt-2">
            <Button
              disabled={createPost.isLoading && Boolean(errors)}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticated = await isAuthServer(ctx);

  if (!authenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

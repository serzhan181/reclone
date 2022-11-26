import { Button, Input } from "@/src/atoms";
import { CREATE_SUB } from "@/src/graphql/api/subs.graphql";
import { request } from "@/src/graphql/custom-gql-fns";
import { useInputImg } from "@/src/hooks/useInputImg";
import { CreateSubInput } from "@/src/types";
import { isAuthServer } from "@/src/utils/authentication";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { RefObject, useRef } from "react";
import { Plus, X } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";
import { NextSeo } from "next-seo";

const schema = y.object({
  name: y.string().required().max(15, "name can contain only 15 characters"),
  title: y.string().required().max(30, "30 characters max"),
  description: y.string().required().max(255, "Your description is too long!"),
});

export default function CreateSub() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fileUrl, setFileUrl, handlePreviewImg, setFile, file } =
    useInputImg();
  const {
    fileUrl: bannerFileUrl,
    setFileUrl: setBannerFileUrl,
    setFile: setBannerFile,
    file: bannerFile,
  } = useInputImg();

  const bannerImg = useRef<HTMLInputElement>(null);
  const subImg = useRef<HTMLInputElement>(null);

  const onOpenFile = (ref: RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const createSub = useMutation(
    async (createSubInput: CreateSubInput) =>
      await request(CREATE_SUB, { ...createSubInput })
  );

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("bannerImg", bannerFile as Blob);
    formData.append("subImg", file as Blob);

    createSub.mutate(
      { ...data, bannerImg: bannerFile, subImg: file },
      {
        onSuccess() {
          toast.success("Succesfully created!");
          router.push(`/r/${data.name}`);
        },
        onError() {
          toast.error("Couldnt create sub 🐞");
          router.push("/");
        },
      }
    );
  };

  return (
    <>
      <NextSeo title="Create sub" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-2 bg-white rounded-sm"
      >
        <div className="flex items-center gap-2">
          {/* subimg */}
          {fileUrl ? (
            <div className="relative w-20 h-20 border-2 rounded-full group">
              <div className="absolute z-10 flex w-full h-full transition-all bg-black rounded-full opacity-0 flex-center group-hover:opacity-50">
                <X
                  className="text-white transition-none rounded cursor-pointer hover:bg-red-900"
                  onClick={() => setFileUrl("")}
                />
              </div>
              <Image
                alt="sub img"
                src={fileUrl}
                className="absolute object-cover rounded-full"
                layout="fill"
              />
            </div>
          ) : (
            <div className="flex w-20 h-20 border border-gray-900 border-dashed rounded-full flex-center">
              <input
                type="file"
                className="hidden"
                ref={subImg}
                onChange={(e) => {
                  setFileUrl(handlePreviewImg(e));
                  setFile(e.target.files![0]);
                }}
              />
              <Plus
                className="text-gray-900 transition-all rounded cursor-pointer hover:bg-gray-400"
                onClick={() => onOpenFile(subImg)}
              />
            </div>
          )}

          <div>
            <h1 className="text-xl font-semibold">Name of you community</h1>
            <p className="mt-1 text-xs text-gray-400">
              name of you community cannot be changed. Think carefully 🐱‍👤
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div>
            <Input
              {...register("title", { required: true })}
              placeholder="title of my community"
            />
          </div>
          <div className="flex gap-1">
            <span className="p-1 font-medium bg-gray-200 rounded">r/</span>
            <Input
              {...register("name", { required: true })}
              placeholder="my awesome community"
            />
          </div>

          <div>
            <h2 className="mb-1 text-sm text-gray-800">(required)</h2>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded resize-none"
              placeholder="My awesome community is for awesome posts and stuff..."
            />
          </div>

          {/* Banner */}
          <div className="flex overflow-hidden border border-gray-900 border-dashed rounded-sm flex-center h-80">
            {bannerFileUrl ? (
              <div className="relative z-40 w-full h-full group">
                <div className="absolute z-10 justify-end w-full h-full p-2 transition-all bg-black opacity-0 group-hover:opacity-50">
                  <X
                    className="transition-all bg-white rounded-sm cursor-pointer"
                    onClick={() => setBannerFileUrl("")}
                  />
                </div>
                <Image
                  src={bannerFileUrl}
                  layout="fill"
                  className="absolute object-cover"
                  alt="banner image"
                />
              </div>
            ) : (
              <div>
                <input
                  className="hidden"
                  type="file"
                  ref={bannerImg}
                  onChange={(e) => {
                    setBannerFile(e.target.files![0]);
                    setBannerFileUrl(handlePreviewImg(e));
                  }}
                />
                <Button
                  type="button"
                  outline
                  onClick={() => onOpenFile(bannerImg)}
                >
                  <Plus />
                </Button>
                <h2 className="text-sm text-center text-gray-900">
                  add banner
                </h2>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3">
          <Button>Create</Button>
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

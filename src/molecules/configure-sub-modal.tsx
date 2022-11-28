import Image from "next/image";
import { FC, useRef } from "react";
import { Plus } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "../atoms";
import { UPDATE_SUB } from "../graphql/api/subs.graphql";
import { request } from "../graphql/custom-gql-fns";
import { useInputImg } from "../hooks/useInputImg";
import { IModal, Modal } from "./modal";

interface IConfigureSubModal extends IModal {
  subName: string;
  onSuccess?: () => void;
}

interface ConfigureSubForm {
  description?: string;
  subImg: File;
  bannerImg: File;
}

export const ConfigureSubModal: FC<IConfigureSubModal> = ({
  active,
  setActive,
  subName,
  onSuccess = () => {},
}) => {
  const { handleSubmit, control, register } = useForm<ConfigureSubForm>();
  const subImgFile = useRef<HTMLInputElement | null>(null);
  const bannerImgFile = useRef<HTMLInputElement | null>(null);

  const {
    setFileUrl: setSubUrl,
    handlePreviewImg: subPreview,
    fileUrl: subUrl,
  } = useInputImg();

  const {
    setFileUrl: setBannerUrl,
    handlePreviewImg: bannerPreview,
    fileUrl: bannerUrl,
  } = useInputImg();

  const updateSub = useMutation(
    async (update: UploadUpdates) =>
      await request(UPDATE_SUB, { name: subName, ...update })
  );

  const onSubmit = (data: ConfigureSubForm) => {
    const { bannerImg, subImg, description } = data;

    if (!bannerImg && !subImg && !description) {
      setActive(false);
      return;
    }

    const formData = new FormData();

    if (subImg) {
      formData.append("subImg", subImg as Blob);
    }

    if (bannerImg) {
      formData.append("bannerImg", bannerImg as Blob);
    }

    updateSub.mutate(
      { bannerImg, subImg, description: data.description },
      {
        onSuccess() {
          console.log("it worked");
          onSuccess();
        },
        onError(err) {
          console.log("U ARE PIECE OF SHIT");
          console.log(err);
        },
      }
    );
  };

  return (
    <Modal active={active} setActive={setActive}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Controller
            name="subImg"
            control={control}
            render={({ field }) => (
              <>
                <div
                  className="relative flex flex-center flex-grow-[2] border border-dashed cursor-pointer border-gray-900 h-[58px]"
                  onClick={() => subImgFile.current?.click()}
                >
                  {subUrl ? (
                    <Image
                      alt="fuck"
                      src={subUrl}
                      layout="fill"
                      className="object-cover"
                    />
                  ) : (
                    <Plus />
                  )}
                </div>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setSubUrl(subPreview(e));
                    field.onChange(e.target.files![0]);
                  }}
                  ref={subImgFile}
                />
              </>
            )}
          />

          <Controller
            name="bannerImg"
            control={control}
            render={({ field }) => (
              <>
                <div
                  className="flex relative flex-center border flex-grow-[4] cursor-pointer border-dashed border-gray-900 h-[58px]"
                  onClick={() => bannerImgFile.current?.click()}
                >
                  {bannerUrl ? (
                    <Image
                      alt="fuck"
                      src={bannerUrl}
                      layout="fill"
                      className="object-cover"
                    />
                  ) : (
                    <Plus />
                  )}
                </div>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setBannerUrl(bannerPreview(e));
                    field.onChange(e.target.files![0]);
                  }}
                  ref={bannerImgFile}
                />
              </>
            )}
          />
        </div>

        <div>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded resize-none"
            placeholder="Description"
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

interface UploadUpdates {
  subImg?: File;
  bannerImg?: File;
  description?: string;
}

const useUpdateSub = (subName: string) => {
  const upload = useMutation(async (uploadSubUpdates: UploadUpdates) => {
    console.log("uploadSubUpdates", uploadSubUpdates);
    return await request(UPDATE_SUB, {
      subImg: uploadSubUpdates.subImg,
      bannerImg: uploadSubUpdates.bannerImg,
      description: uploadSubUpdates.description,
      name: subName,
    });
  });

  const uploadSubUpdates = (uploadImages: UploadUpdates) => {
    return upload.mutate(uploadImages, {
      onSuccess(data) {
        console.log("success", data);
      },
      onError(err) {
        console.log("error", err);
      },
    });
  };

  return {
    updateSubFields: (update: UploadUpdates) => {
      return uploadSubUpdates(update);
    },
  };
};

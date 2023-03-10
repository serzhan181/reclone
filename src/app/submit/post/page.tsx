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

const Schema = z.object({
  title: z
    .string({ required_error: "Title is required!" })
    .min(5, "Title must consist of >5 characters!"),
  body: z.string().optional(),
  subName: z
    .string({ required_error: "Choose a sub to post to!" })
    .min(3, "Choose a sub to post to!")
    .default(""),
});

type CreatePostType = z.infer<typeof Schema>;

const SubmitPost = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
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
    createPost.mutate({
      title: data.title,
      body: data.body,
      subName: data.subName,
      token,
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="subName"
        defaultValue=""
        render={({ field }) => <SelectSub onChange={field.onChange} />}
      />
      {/* Label triggers IFF there's an error */}
      <Input
        {...register("title")}
        placeholder="Title"
        isError={Boolean(errors.title)}
        label={errors.title?.message}
        autoComplete="off"
      />
      <textarea
        {...register("body")}
        className="w-full textarea textarea-bordered"
        placeholder="Body (optional)"
      />

      <div className="flex self-end gap-3">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubmitPost;

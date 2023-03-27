"use client";

import { Dropdown } from "@/shared/ui/dropdown";
import { Option } from "@/types";
import { useRouter } from "next/navigation";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

type CreateOptions = "post" | "sub";

interface CreateDropdownOption extends Omit<Option, "value"> {
  value: CreateOptions;
}

const createDropdownOptions: CreateDropdownOption[] = [
  { id: "1", value: "post", label: "Post" },
  { id: "2", value: "sub", label: "Sub" },
];

export const CreateDropdown = () => {
  const router = useRouter();

  const handleCreatePostOrSub = (value: CreateOptions) => {
    switch (value) {
      case "post":
        router.push("/submit/post");
        break;
      case "sub":
        router.push("/create/sub");
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      options={createDropdownOptions}
      onClick={(value) => handleCreatePostOrSub(value as CreateOptions)}
      label={<PlusIcon className="w-8" />}
    />
  );
};

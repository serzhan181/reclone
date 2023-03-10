"use client";

import { subsRequests } from "@/graphql/requests/subs-requests";
import { Combobox } from "@/shared/form/combobox";
import { Option, GetSubsForDropdown } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";

// Yes maybe it is a bit of prop drilling, but trust me, it's the good way. Let me lead you through and you shall understand my intentions!
interface SelectSubProps {
  onChange: (value: string) => void;
}

export const SelectSub = ({ onChange }: SelectSubProps) => {
  const [selected, setSelected] = useState<Option | undefined>();

  const { subs, isSubsListLoading } = useGetSubsForSelect();
  return (
    <Combobox
      placeholder="Select community"
      options={subs}
      selected={selected}
      isLoading={isSubsListLoading}
      setSelected={(option) => {
        setSelected(option);
        onChange(option.value);
      }}
    />
  );
};

const useGetSubsForSelect = () => {
  const { data, isLoading } = useQuery("subs-list", subsRequests.getSubsList);

  return {
    subs: mapIntoOption(data?.subs || []),
    isSubsListLoading: isLoading,
  };
};

const mapIntoOption = (subs: GetSubsForDropdown[]): Option[] => {
  return subs.map((s) => ({ id: s.id, value: s.name, label: s.title }));
};

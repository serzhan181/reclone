import { Tab } from "@headlessui/react";
import { FC, ReactElement } from "react";

interface IContent {
  id: number;
  content: ReactElement;
}

export const Tabs: FC<{
  tabs: string[];
  onTabChange: (index: number) => void;
  contents: IContent[];
}> = ({ tabs, onTabChange, contents }) => {
  return (
    <div className="w-full mb-5">
      <Tab.Group onChange={(index) => onTabChange(index)}>
        <Tab.List as="ul" className="flex p-1 space-x-2 bg-white">
          {tabs.map((t) => (
            <Tab key={t} as="li" className="flex-grow cursor-pointer">
              {({ selected }) => (
                <p
                  className={`text-center ${
                    selected && "border-b-2 border-gray-900"
                  }`}
                >
                  {t}
                </p>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {contents.map((c) => (
            <Tab.Panel key={c.id}>{c.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

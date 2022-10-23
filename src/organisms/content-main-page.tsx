import { ContentCard } from "../molecules";

export const ContentMainPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <ContentCard
        imgSrc="https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZWRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        title="i like men"
      />

      <ContentCard
        imgSrc="https://images.unsplash.com/photo-1665994658139-ba312e2bf060?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        title="KKK meeting. where and when"
      />
    </div>
  );
};

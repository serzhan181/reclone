import { TrendingCard } from "@/src/molecules";

export const TrendingRow = () => {
  return (
    <>
      <TrendingCard
        title="Trending news"
        description="pardon me sir? how did u get that"
        imgSrc="https://images.unsplash.com/photo-1665171529051-82f39635afcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
      />
      <TrendingCard
        title="mortocycles will take the world?"
        description="i dont know what the fuck im talking about"
        imgSrc="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JjeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      />
      <TrendingCard
        title="Halloween is coming"
        description="so i want to dress up like a KKK member, is that good idea?"
        imgSrc="https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFsbG93ZWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
    </>
  );
};

import { Post } from "@/components/post";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Post
        href="/"
        shortBody="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, ea!"
        title="What does the fox say?"
        voteCount={69}
      />
      <Post
        href="/"
        shortBody="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, ea!"
        title="New next 13"
        voteCount={69}
      />
      <Post
        href="/"
        shortBody="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, ea!"
        title="Very generic title"
        voteCount={69}
      />
    </div>
  );
}

import { useRouter } from "next/router";

export default function SubPage() {
  const router = useRouter();
  const { sub } = router.query;
  return <div>this is subreddit of {sub}</div>;
}

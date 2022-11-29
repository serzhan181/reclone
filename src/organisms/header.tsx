import { Input, Button } from "@/src/atoms";
import { Search } from "react-feather";
import Link from "next/link";
import { AuthSection, Dropdown } from "@/src/molecules";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "../store/user.store";
import { qc } from "../react-query/setup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "react-query";
import { GET_SUBS } from "../graphql/api/subs.graphql";
import { request } from "../graphql/custom-gql-fns";
import { GetSubMinimal } from "../types";

export const Header = () => {
  const { user } = useUserStore();
  const auth = useAuthStore();
  const USER_OPTIONS = [
    {
      actionTitle: "logout",
      href: "/",
      onClick: () => {
        auth.logout();
        qc.invalidateQueries("posts");
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const debounceTerm = useDebounce(searchTerm, 500);

  const { data: searchedSubs, isLoading } = useQuery(
    ["sub", "searchTerm", debounceTerm],
    async () =>
      await request<{ subs: GetSubMinimal[] }>(GET_SUBS, {
        term: debounceTerm,
      }),
    {
      enabled: Boolean(debounceTerm),
    }
  );

  useEffect(() => {
    if (!debounceTerm) {
      qc.setQueryData(["sub", "searchTerm", debounceTerm], []);
    }
  }, [debounceTerm, searchTerm]);

  return (
    <div className="fixed top-0 z-50 flex w-full h-12 bg-white border-b flex-center">
      <div className="flex justify-between items-center h-full w-[90%] ">
        <div>
          <Link href="/">logo</Link>
        </div>
        <div className="relative flex gap-1 w-96">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search reclone"
          />
          {Boolean(searchedSubs?.subs?.length) && (
            <div className="absolute w-full overflow-hidden bg-white border rounded top-10">
              <ul>
                {isLoading && (
                  <li className="flex w-full flex-center">
                    <Image
                      alt="loading"
                      src="/loading-spinner.svg"
                      width={24}
                      height={24}
                    />
                  </li>
                )}

                {searchedSubs?.subs.map((s) => (
                  <Link key={s.name} href={`/r/${s.name}`}>
                    <li className="flex gap-2 p-2 border-b cursor-pointer hover:bg-gray-300">
                      {s.subImgUrl ? (
                        <Image
                          alt="subimg"
                          src={s.subImgUrl}
                          width={24}
                          height={24}
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <span className="w-6 h-6 text-center bg-gray-300 rounded-full">
                          {s.name[0].toUpperCase()}
                        </span>
                      )}
                      <p>{s.title}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          <Button size="s">
            <Search />
          </Button>
        </div>
        <div className="flex gap-3">
          {auth.authenticated && (
            <Link href="/create/sub">
              <Button outline>Create sub</Button>
            </Link>
          )}
          {auth?.authenticated ? (
            <Dropdown title={user?.username || ""} options={USER_OPTIONS} />
          ) : (
            <AuthSection />
          )}
        </div>
      </div>
    </div>
  );
};

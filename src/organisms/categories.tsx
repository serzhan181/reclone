import { accordion_data } from "@/public/constants";
import { Accordion } from "@/src/organisms";
import Link from "next/link";
import { Button } from "@/src/atoms";

export const Categories = () => {
  return (
    <Accordion options={accordion_data}>
      {(option) => (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 ml-3">
            {option.communities.map((c: string) => (
              <Link key={c} href="/">
                <p className="text-sm font-semibold cursor-pointer text-slate-800 hover:underline">
                  {c}
                </p>
              </Link>
            ))}
          </div>
          <div>
            <Button size="s" transparent uppercase rounded>
              Show more
            </Button>
          </div>
        </div>
      )}
    </Accordion>
  );
};

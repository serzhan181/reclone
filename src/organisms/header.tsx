import { Button, Input } from "@/src/atoms";
import { Search } from "react-feather";
import { Modal } from "@/src/molecules";
import { useState } from "react";

export const Header = () => {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);

  return (
    <>
      <div className="fixed top-0 flex w-full h-12 bg-white border-b flex-center">
        <div className="flex justify-between items-center h-full w-[90%] ">
          <div>logo</div>
          <div className="flex gap-1 w-96">
            <Input placeholder="search reclone" />
            <Button size="s">
              <Search />
            </Button>
          </div>
          <div className="flex gap-3">
            <Button uppercase onClick={() => setActiveLogIn(true)}>
              log in
            </Button>
            <Button
              uppercase
              outline
              rounded
              onClick={() => setActiveSignUp(true)}
            >
              sign in
            </Button>
          </div>
        </div>
      </div>

      {/* Modals for auth */}
      {/* Sign up */}
      <Modal active={activeSignUp} setActive={setActiveSignUp}>
        <div className="flex flex-col gap-3 px-6 py-9">
          <div>
            <h2 className="text-lg font-semibold">Sign up</h2>
          </div>
          <div>
            <Input placeholder="Email" />
          </div>

          <div>
            <Button full>Sign up</Button>
          </div>
          <div>
            <p>
              Already signed in?{" "}
              <a
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  setActiveSignUp(false);
                  setActiveLogIn(true);
                }}
              >
                log in
              </a>
            </p>
          </div>
        </div>
      </Modal>

      {/* Log in */}
      <Modal active={activeLogIn} setActive={setActiveLogIn}>
        <div className="flex flex-col gap-3 px-6 py-9">
          <div>
            <h2 className="text-lg font-semibold">Log in</h2>
          </div>
          <div className="flex flex-col gap-1">
            <Input placeholder="username" />
            <Input placeholder="password" />
          </div>

          <div>
            <Button full>Log in</Button>
          </div>
          <div>
            <p>
              Not signed up?{" "}
              <a
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  setActiveLogIn(false);
                  setActiveSignUp(true);
                }}
              >
                sign up
              </a>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

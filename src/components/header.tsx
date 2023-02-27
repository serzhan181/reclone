import Image from "next/image";

const SRC =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fuser-avatars-2%2F300%2F10-1024.png&f=1&nofb=1&ipt=47d99b48731f06d11b1d84cac677c01b78d5e91947ce73c81bc3be983dfb7210&ipo=images";

export const Header = () => {
  return (
    <header className="fixed top-0 flex items-center justify-between w-full h-20 px-5 rounded-b shadow-md bg-primary">
      {/* Logo */}
      <div>YOUR LOGO HERE</div>
      <div className="w-[625px]">
        <input
          type="text"
          placeholder="Search for topics"
          className="w-full input input-info"
        />
      </div>
      <div>
        <button className="avatar">
          <div className="relative rounded-full w-14">
            <Image alt="user" src={SRC} fill />
          </div>
        </button>
      </div>
    </header>
  );
};

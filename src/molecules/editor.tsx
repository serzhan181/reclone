import { FC, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

export const REACT_QUILL_EMPTY = ["<p><br></p>"];

export const Editor: FC<ReactQuillProps> = (props) => {
  return (
    <div className="w-full mb-2 bg-white rounded">
      <ReactQuill theme="snow" {...props} />
    </div>
  );
};

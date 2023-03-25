"use client";

import MdEditor from "md-editor-rt";
import xss from "xss";
import "md-editor-rt/lib/style.css";
import type {
  EditorProp as MdEditorProps,
  ToolbarNames,
} from "md-editor-rt/lib/MdEditor/type";
import { cleanStr } from "@/utils/clear-str";

const sanitizer = (html: string) => xss(html);

const toolbars: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "-",
  "revoke",
  "next",
  "=",
  "preview",
  "pageFullscreen",
];

type EditorProps = Partial<MdEditorProps> & {
  value: string;
  onChange?: (text: string) => void;
};

export const Editor = ({ value, onChange, ...props }: EditorProps) => {
  return (
    <>
      <MdEditor
        className="border rounded-md border-base-content/20 bg-base-100/10"
        preview={false}
        editorId="md-editor"
        language="en-US"
        toolbars={toolbars}
        sanitize={sanitizer}
        formatCopiedText={cleanStr}
        noUploadImg
        theme="dark"
        onChange={onChange}
        modelValue={value}
        {...props}
      />
    </>
  );
};

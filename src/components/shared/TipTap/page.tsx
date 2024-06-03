"use client";

import "./style.css";
import styles from "./page.module.css";
import MenuBar from "./MenuBar/page";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import c from "highlight.js/lib/languages/c";
import csharp from "highlight.js/lib/languages/csharp";
import { createLowlight } from "lowlight";
import Section from "@/components/shared/Content/Section/page";
import { useEffect } from "react";

interface ITipTap {
  setHTML?: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
  readOnly?: boolean;
}

export default function TipTap(props: ITipTap) {
  const lowlight = createLowlight();

  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);
  lowlight.register("c", c);
  lowlight.register("csharp", csharp);
  lowlight.register("php", php);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link,
    ],
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    editable: !props.readOnly,
    content: props.content,
  });

  useEffect(() => {
    if (props.setHTML && editor) {
      const handleUpdateText = () => {
        const html = editor.getHTML();
        props.setHTML?.(html);
      };
      editor.on("update", handleUpdateText);
      return () => {
        editor.off("update", handleUpdateText);
      };
    }
  }, [editor, props.setHTML]);

  if (!editor) {
    return null;
  }

  return (
    <Section padding="10px 10px">
      {!props.readOnly && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </Section>
  );
}

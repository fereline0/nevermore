"use client";

import "./style.css";
import styles from "./page.module.css";
import MenuBar from "./MenuBar/page";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { createLowlight } from "lowlight";
import Section from "@/components/shared/Content/Section/page";
import { useEffect } from "react";

interface ITipTap {
  setHTML: React.Dispatch<React.SetStateAction<string>>;
}

export default function TipTap(props: ITipTap) {
  const lowlight = createLowlight();

  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const handleUpdateText = () => {
        const html = editor.getHTML();
        props.setHTML(html);
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
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Section>
  );
}

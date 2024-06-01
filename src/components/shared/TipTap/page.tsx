"use client";

import "./style.css";
import styles from "./page.module.css";
import MenuBar from "./MenuBar/page";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Section from "@/components/shared/Content/Section/page";
import { useEffect } from "react";

interface ITipTap {
  setHTML: React.Dispatch<React.SetStateAction<string>>;
}

export default function TipTap(props: ITipTap) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
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

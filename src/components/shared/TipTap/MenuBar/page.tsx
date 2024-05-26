"use client";

import styles from "./page.module.css";
import { Editor } from "@tiptap/react";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import Item from "./Item/page";
import { IoCode } from "react-icons/io5";
import {
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";

interface IMenuBar {
  editor: Editor;
}

export default function MenuBar(props: IMenuBar) {
  const items = [
    {
      title: "Heading 1",
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: props.editor.isActive("heading", { level: 1 }),
      icon: <TbH1 size="1.7em" />,
    },
    {
      title: "Heading 2",
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: props.editor.isActive("heading", { level: 2 }),
      icon: <TbH2 size="1.7em" />,
    },
    {
      title: "Heading 3",
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: props.editor.isActive("heading", { level: 3 }),
      icon: <TbH3 size="1.7em" />,
    },
    {
      title: "Code",
      action: () => props.editor.chain().focus().toggleCodeBlock().run(),
      isActive: props.editor.isActive("codeBlock"),
      icon: <IoCode size="1.7em" />,
    },
    {
      title: "Left",
      action: () => props.editor.chain().focus().setTextAlign("left").run(),
      isActive: props.editor.isActive({ textAlign: "left" }),
      icon: <CiTextAlignLeft size="1.7em" />,
    },
    {
      title: "Center",
      action: () => props.editor.chain().focus().setTextAlign("center").run(),
      isActive: props.editor.isActive({ textAlign: "center" }),
      icon: <CiTextAlignCenter size="1.7em" />,
    },
    {
      title: "Right",
      action: () => props.editor.chain().focus().setTextAlign("right").run(),
      isActive: props.editor.isActive({ textAlign: "right" }),
      icon: <CiTextAlignRight size="1.7em" />,
    },
    {
      title: "Justify",
      action: () => props.editor.chain().focus().setTextAlign("justify").run(),
      isActive: props.editor.isActive({ textAlign: "justify" }),
      icon: <CiTextAlignJustify size="1.7em" />,
    },
    {
      title: "Bullet list",
      action: () => props.editor.chain().focus().toggleBulletList().run(),
      isActive: props.editor.isActive("bulletList"),
      icon: <MdOutlineFormatListBulleted size="1.7em" />,
    },
    {
      title: "Ordered list",
      action: () => props.editor.chain().focus().toggleOrderedList().run(),
      isActive: props.editor.isActive("orderedList"),
      icon: <MdOutlineFormatListNumbered size="1.7em" />,
    },
  ];

  return (
    <div className={styles.menuBar}>
      {items.map(
        (
          item: {
            title: string;
            action: React.MouseEventHandler<HTMLButtonElement>;
            isActive: boolean;
            icon: React.ReactNode;
          },
          index
        ) => (
          <Item
            key={index}
            title={item.title}
            action={item.action}
            isActive={item.isActive}
          >
            {item.icon}
          </Item>
        )
      )}
    </div>
  );
}

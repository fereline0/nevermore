"use client";

import ISection from "@/types/section.type";
import Tab from "../../../shared/Tab/page";
import styles from "./page.module.css";
import ICategory from "@/types/category.type";

interface ISectionList {
  data: ISection[];
}

export default function SectionList(props: ISectionList) {
  return (
    <ul>
      {props.data.map((section) => {
        return (
          <li key={section.id} className={styles.section}>
            {section.name}
            <ul className={styles.categoriesList}>
              {section.categories.map((category: ICategory) => {
                return (
                  <Tab name={category.name} link={`/forums/${category.id}`} />
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import ISection from "@/types/section.type";
import Tab from "./Tab/page";
import styles from "./page.module.css";
import ICategory from "@/types/category.type";

interface ISubTab {
  sections: any;
}

export default function SubTab(props: ISubTab) {
  return (
    <ul>
      {props.sections.map((section: ISection) => {
        return (
          <li className={styles.section}>
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

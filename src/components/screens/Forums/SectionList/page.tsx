"use client";

import ISection from "@/types/section.type";
import Tab from "../../../shared/Tab/page";
import ICategory from "@/types/category.type";
import MarginBottom from "@/components/shared/MarginBottom/page";

interface ISectionList {
  data: ISection[];
}

export default function SectionList(props: ISectionList) {
  return (
    <ul>
      <MarginBottom gap={10}>
        {props.data.map((section, index) => {
          return (
            <MarginBottom key={index} gap={5}>
              {section.name}
              <MarginBottom gap={5}>
                {section.categories.map((category: ICategory) => {
                  return (
                    <Tab
                      key={category.id}
                      name={category.name}
                      link={`/forums/${category.id}`}
                    />
                  );
                })}
              </MarginBottom>
            </MarginBottom>
          );
        })}
      </MarginBottom>
    </ul>
  );
}

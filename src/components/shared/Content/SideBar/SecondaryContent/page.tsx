import Link from "next/link";
import MarginBottom from "@/components/shared/MarginBottom/page";
import FitContent from "@/components/shared/FitContent/page";
import Section from "@/components/shared/Content/Section/page";

interface ISecondaryContent {
  title: string;
  link: string;
  children: React.ReactNode;
  counter?: number;
}

export default function SecondaryContent(props: ISecondaryContent) {
  return (
    <>
      {props.children != null && (
        <MarginBottom gap={5}>
          <FitContent>
            <Section padding="5px 10px">
              <Link href={props.link}>
                {props.title} <span>{props.counter}</span>
              </Link>
            </Section>
          </FitContent>
          <Section padding="10px">{props.children}</Section>
        </MarginBottom>
      )}
    </>
  );
}

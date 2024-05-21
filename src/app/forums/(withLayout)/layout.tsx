import Forums from "@/components/screens/Forums/layout";
import { getSections } from "@/services/forum";
import ISection from "@/types/section.type";

interface ILayout {
  children: React.ReactNode;
}

export default async function Layout(props: ILayout) {
  const res: {
    sections: ISection[];
    count: { articles: number; comments: number };
  } = await getSections();

  return <Forums res={res}>{props.children}</Forums>;
}

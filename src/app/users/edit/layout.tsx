import Edit from "@/components/screens/Users/Edit/layout";

interface ILayout {
  children: React.ReactNode;
}

export default async function Layout(props: ILayout) {
  return <Edit>{props.children}</Edit>;
}

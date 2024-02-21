import ICategory from "./category.type";

export default interface ISection {
  id: number;
  name: string;
  categories: ICategory[];
}

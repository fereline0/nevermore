export default interface IPagination {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pastPagesCount: number;
  futurePagesCount: number;
}

export default interface IPagination {
  total: number;
  limit: number;
  page: number;
  setPage: any;
  pastPagesCount: number;
  futurePagesCount: number;
}

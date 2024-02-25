import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import Member from "@/components/shared/Member/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import { getUsers } from "@/services/user";
import IUser from "@/types/user.type";

export const dynamic = "force-dynamic";

export default async function users({
  searchParams,
}: {
  searchParams: { q: any; page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: { users: IUser[]; count: number } = await getUsers(
    page,
    limit,
    searchParams.q
  );

  return (
    <Content>
      <Main>
        <Search />
        {res.users.map((user: IUser) => {
          return <Member member={user} detail={user.role.name} />;
        })}
        <Pagination
          total={res.count}
          limit={limit}
          pastPagesCount={2}
          futurePagesCount={4}
        />
      </Main>
    </Content>
  );
}

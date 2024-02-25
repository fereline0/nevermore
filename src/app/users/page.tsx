import Main from "@/components/shared/Content/Main/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import Member from "@/components/shared/Member/page";
import MemberInfo from "@/components/shared/MemberInfo/page";
import Pagination from "@/components/shared/Pagination/page";
import Search from "@/components/shared/Search/page";
import { getUsers } from "@/services/user";
import IUser from "@/types/user.type";
import { formatDistance } from "date-fns";

export const dynamic = "force-dynamic";

export default async function users({
  searchParams,
}: {
  searchParams: { q: any; page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const res: { newUsers: IUser[]; users: IUser[]; count: number } =
    await getUsers(page, limit, searchParams.q);

  return (
    <Content>
      <SideBar>
        <SecondaryContent title="New users" link="">
          {res.newUsers.map((user: IUser) => {
            return (
              <MemberInfo
                member={user}
                detail={formatDistance(user.createdAt, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              />
            );
          })}
        </SecondaryContent>
      </SideBar>
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

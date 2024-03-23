import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import Preview from "@/components/screens/Preview/page";
import AboutUser from "@/components/screens/AboutUser/page";
import SecondaryContent from "@/components/shared/Content/SideBar/SecondaryContent/page";
import { getUser } from "@/services/user";
import MemberInfo from "@/components/shared/MemberInfo/page";
import IUser from "@/types/user.type";
import UserComments from "@/components/screens/UserComments/page";

export const dynamic = "force-dynamic";

export default async function user({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const currentUser = await getUser(params.id, page, limit);
  const comments = currentUser.comments;

  return (
    <Content>
      <SideBar>
        <Preview user={currentUser} />
        <SecondaryContent
          title="Subscribers"
          link="/"
          counter={currentUser._count.subscribers}
        >
          {currentUser.subscribers.map((subscriber: { subscriber: IUser }) => {
            return (
              <MemberInfo
                member={subscriber.subscriber}
                detail={subscriber.subscriber.role.name}
              />
            );
          })}
        </SecondaryContent>
        <SecondaryContent
          title={"Subscribed"}
          link="/"
          counter={currentUser._count.subscribed}
        >
          {currentUser.subscribed.map((subscriber: { user: IUser }) => {
            return (
              <MemberInfo
                member={subscriber.user}
                detail={subscriber.user.role.name}
              />
            );
          })}
        </SecondaryContent>
      </SideBar>
      <Main>
        <AboutUser user={currentUser} />
        <UserComments
          total={currentUser._count.comments}
          limit={limit}
          pastPagesCount={2}
          futurePagesCount={4}
          userId={params.id}
          comments={comments}
        />
      </Main>
    </Content>
  );
}

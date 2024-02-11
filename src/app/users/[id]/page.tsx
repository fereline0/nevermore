import Content from "@/components/Content/page";
import SideBar from "@/components/Content/SideBar/page";
import Main from "@/components/Content/Main/page";
import Comments from "@/components/Comments/page";
import Preview from "@/components/Content/SideBar/Preview/page";
import AboutUser from "@/components/Content/Main/AboutUser/page";
import SecondaryContent from "@/components/Content/SideBar/SecondaryContent/page";
import { getUser } from "@/services/user";
import Member from "@/components/Member/page";
import IUser from "@/types/user.type";

export const dynamic = "force-dynamic";

export default async function currentUser({
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
        <Preview
          id={params.id}
          role={currentUser.role}
          image={currentUser.image}
        />

        <SecondaryContent
          title="Subscribers"
          link="/"
          counter={currentUser._count.subscribers}
        >
          {currentUser.subscribers.map((subscriber: { subscriber: IUser }) => {
            return (
              <Member
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
              <Member
                member={subscriber.user}
                detail={subscriber.user.role.name}
              />
            );
          })}
        </SecondaryContent>
      </SideBar>
      <Main>
        <AboutUser user={currentUser} />
        {comments.length > 0 && (
          <Comments
            total={currentUser._count.comments}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            comments={comments}
          />
        )}
      </Main>
    </Content>
  );
}

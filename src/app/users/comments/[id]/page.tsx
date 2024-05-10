import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import Comment from "@/components/shared/Comment/page";
import Actions from "@/components/screens/User/Comments/Actions/page";
import { getUserComment } from "@/services/userComment";
import Comments from "@/components/screens/User/Comments/page";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";
import { updateStatusUserNotification } from "@/services/userNotification";

export const dynamic = "force-dynamic";

export default async function comment({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const comment = await getUserComment(params.id, page, limit);
  const updateStatus = await updateStatusUserNotification(
    `/users/comments/${params.id}`
  );

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <Main>
          <Comment comment={comment}>
            <Actions comment={comment} />
          </Comment>
          <Comments
            total={comment._count.childs}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            userId={comment.userId}
            writerId={comment.writerId}
            comments={comment.childs}
            parentId={comment.id}
          />
        </Main>
      </Content>
    </Suspense>
  );
}

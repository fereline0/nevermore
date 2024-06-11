import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import Comment from "@/components/shared/Comment/page";
import Actions from "@/components/screens/Article/Comments/Actions/page";
import Comments from "@/components/screens/Article/Comments/page";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";
import { getArticleComment } from "@/services/articleComment";
import { IArticleComment } from "@/types/articleComment";

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
  const comment: IArticleComment = await getArticleComment(
    params.id,
    page,
    limit
  );

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <Main>
          <Comment comment={comment}>
            <Actions
              comment={comment}
              supervisors={comment.article.category.supervisors}
            />
          </Comment>
          <Comments
            total={comment._count.childs}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            article={comment.article}
            comments={comment.childs}
            parentId={comment.id}
          />
        </Main>
      </Content>
    </Suspense>
  );
}

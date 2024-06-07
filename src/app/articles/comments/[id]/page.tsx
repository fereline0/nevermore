import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import Comment from "@/components/shared/Comment/page";
import Actions from "@/components/screens/User/Comments/Actions/page";
import Comments from "@/components/screens/Article/Comments/page";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";
import IComment from "@/types/comment.type";
import { getArticleComment } from "@/services/articleComment";
import IArticle from "@/types/article.type";

export const dynamic = "force-dynamic";

interface IArticleComment extends IComment {
  articleId: number;
  article: IArticle;
}

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
            <Actions comment={comment} />
          </Comment>
          <Comments
            total={comment._count.childs}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            article={comment.article}
            writerId={comment.writerId}
            comments={comment.childs}
            parentId={comment.id}
          />
        </Main>
      </Content>
    </Suspense>
  );
}

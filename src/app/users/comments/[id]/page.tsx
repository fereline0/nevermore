"use client";

import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import Comment from "@/components/shared/Comment/page";
import Actions from "@/components/screens/User/Comments/Actions/page";
import Comments from "@/components/screens/User/Comments/page";
import { useState } from "react";
import Loading from "@/components/shared/Loading/page";
import { notFound } from "next/navigation";
import { getUserComment } from "@/services/userComment";
import { useSWRConfig } from "swr";

export default function comment({ params }: { params: { id: number } }) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    data: comment,
    error,
    isLoading,
    url,
  } = getUserComment(params.id, page, limit);

  const { mutate } = useSWRConfig();

  if (error) return notFound();
  if (isLoading) return <Loading />;

  return (
    <Content>
      {comment && (
        <Main>
          <Comment comment={comment}>
            <Actions comment={comment} refresh={() => mutate(url)} />
          </Comment>
          <Comments
            total={comment._count.childs}
            limit={limit}
            pastPagesCount={2}
            futurePagesCount={4}
            parentId={comment.id}
            userId={comment.userId}
            comments={comment.childs}
            page={page}
            setPage={setPage}
            refresh={() => mutate(url)}
          />
        </Main>
      )}
    </Content>
  );
}

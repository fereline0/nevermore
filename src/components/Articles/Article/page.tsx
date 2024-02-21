import Member from "@/components/Member/page";
import styles from "./page.module.css";
import Link from "next/link";
import Separator from "@/components/Articles/Separator/page";
import IArticle from "@/types/article.type";

interface Article {
  article: IArticle;
}

export default function Article(props: Article) {
  return (
    <div className={styles.article}>
      <div className={styles.aboutArticle}>
        <a href="" className={styles.title}>
          {props.article.title}
        </a>
        <div>
          <Link href={`/users/${props.article.author.id}`}>
            {props.article.author.name}
          </Link>
          <Separator />
          <span>{props.article.createdAt}</span>
        </div>
      </div>
      <div className={styles.aboutLastWriter}>
        <Member
          member={
            props.article.comments[0]
              ? props.article.comments[0].writer
              : props.article.author
          }
          detail={
            props.article.comments[0]
              ? props.article.comments[0].createdAt
              : props.article.createdAt
          }
        />
      </div>
    </div>
  );
}

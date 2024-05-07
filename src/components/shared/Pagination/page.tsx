"use client";

import classNames from "classnames/bind";
import styles from "./page.module.css";
import IPagination from "@/types/pagination.type";

export default function Pagination(props: IPagination) {
  const totalPageCount = Math.ceil(props.total / props.limit);
  const startPoint = Math.max(props.page - props.pastPagesCount, 1);
  const endPoint = Math.min(
    props.page + props.futurePagesCount,
    totalPageCount
  );

  const range = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length: length }, (_, i) => i + start);
  };

  return (
    <div>
      <ul className={styles.pagination}>
        {range(startPoint, endPoint).map((page, index) => {
          const cx = classNames.bind(styles);

          const className = cx({
            page: true,
            active: page == props.page,
          });

          return (
            <li
              key={index}
              className={className}
              onClick={() => props.setPage(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

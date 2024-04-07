"use client";

const classNames = require("classnames/bind");
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import IPagination from "@/types/pagination.type";
import { useCallback } from "react";

export default function Pagination(props: IPagination) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(props.total / props.limit);
  const point = Number(searchParams.get("page")) || 1;
  const startPoint = Math.max(point - props.pastPagesCount, 1);
  const endPoint = Math.min(point + props.futurePagesCount, totalPageCount);

  const range = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length: length }, (_, i) => i + start);
  };

  const pushSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <ul className={styles.pagination}>
        {range(startPoint, endPoint).map((page, index) => {
          const cx = classNames.bind(styles);

          const className = cx({
            page: true,
            active: page == Number(searchParams.get("page") || 1),
          });

          return (
            <li
              key={index}
              className={className}
              onClick={() =>
                router.push(`?${pushSearchParams("page", page.toString())}`)
              }
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

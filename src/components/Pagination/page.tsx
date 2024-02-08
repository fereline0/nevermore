'use client';

const classNames = require('classnames/bind');
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { IPagination } from "@/types/pagination.type"

export default function Pagination(props: IPagination)
{
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPageCount = Math.ceil(props.total / props.limit);
    const point = Number(searchParams.get("page")) || 1;
    const startPoint = Math.max(point - props.pastPagesCount, 1);
    const endPoint = Math.min(point + props.futurePagesCount, totalPageCount);


    const range = (start: number, end: number) => {
        let length = end - start + 1;
        
        return Array.from({length: length }, (_, i) => i + start);
    };

    return (
        <div>
            <ul className={styles.pagination}>
                {range(startPoint, endPoint).map((page) => {
                    const cx = classNames.bind(styles);

                    const className = cx({
                        page: true,
                        active: page == Number(searchParams.get("page") || 1),
                    });

                    return (
                        <li className={className} onClick={() => router.push(`?page=${page}`)}>{page}</li>
                    )
                })}
            </ul>
        </div>
    )
}
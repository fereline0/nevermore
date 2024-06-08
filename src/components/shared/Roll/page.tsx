"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Button from "./Button/page";

interface IRoll {
  children: React.ReactNode;
}

export default function Roll(props: IRoll) {
  const rollRef = useRef<HTMLDivElement>(null);
  const [scrollableToLeft, setScrollableToLeft] = useState(false);
  const [scrollableToRight, setScrollableToRight] = useState(false);

  const scrollLeft = () => {
    rollRef.current?.scrollBy({
      left: -rollRef.current?.clientWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rollRef.current?.scrollBy({
      left: rollRef.current?.clientWidth / 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = rollRef.current;

    if (!container) return;

    const handleScroll = () => {
      setScrollableToLeft(container.scrollLeft > 0);
      setScrollableToRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
    };

    container.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.unobserve(container);
    };
  }, []);

  return (
    <div className={styles.rollContainer}>
      <Button func={scrollLeft} visibility={scrollableToLeft} />
      <Button func={scrollRight} right={true} visibility={scrollableToRight} />
      <div className={styles.roll} ref={rollRef}>
        {props.children}
      </div>
    </div>
  );
}

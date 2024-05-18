import { IRow } from "@/types/row.type";
import styles from "./page.module.css";
import Row from "./Row/page";

interface IPairsJustified {
  data: IRow[];
}

export default function PairsJustified(props: IPairsJustified) {
  return (
    <div className={styles.pairsJustified}>
      {props.data.map((row, index) => {
        if (row.value != null)
          return (
            <Row
              key={index}
              label={row.label}
              link={row.link}
              value={row.value}
            />
          );
      })}
    </div>
  );
}

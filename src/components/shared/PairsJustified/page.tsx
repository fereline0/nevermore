import styles from "./page.module.css";
import Row from "./Row/page";
import { formatISO9075 } from "date-fns";

function toSentenceCase(text: string) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result[0].toUpperCase() + result.substring(1).toLowerCase();
}

function isValidDateTime(dateTimeString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return regex.test(dateTimeString);
}

interface IPairsJustified {
  data: any;
}

export default function PairsJustified(props: IPairsJustified) {
  return (
    <div className={styles.pairsJustified}>
      {Object.keys(props.data).map((key) => {
        if (props.data[key] != null)
          return (
            <Row
              label={toSentenceCase(key)}
              value={
                isValidDateTime(props.data[key])
                  ? formatISO9075(props.data[key])
                  : props.data[key]
              }
            />
          );
      })}
    </div>
  );
}

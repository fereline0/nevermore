import Row from "./Row/page";
import { formatISO9075 } from "date-fns";

function toSentenceCase(text: string) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result[0].toUpperCase() + result.substring(1).toLowerCase();
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

interface IPairsJustified {
  data: any;
}

export default function PairsJustified(props: IPairsJustified) {
  return (
    <div>
      {Object.keys(props.data).map((key) => {
        if (props.data[key] != null)
          return (
            <Row
              label={toSentenceCase(key)}
              value={
                isValidDate(props.data[key])
                  ? formatISO9075(props.data[key])
                  : props.data[key]
              }
            />
          );
      })}
    </div>
  );
}

import Section from "../Content/Section/page";
import styles from "./page.module.css";

interface IEmptyList {
  value: string;
}

export default function EmptyList(props: IEmptyList) {
  return (
    <Section padding="5px 10px" className={styles.emptyList}>
      <p>{props.value}</p>
    </Section>
  );
}

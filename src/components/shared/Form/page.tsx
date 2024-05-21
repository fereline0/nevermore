import { FormEvent } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/page";
import FitContent from "@/components/shared/FitContent/page";

interface IForm {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitValue: string;
  children: React.ReactNode;
}

export default function Form(props: IForm) {
  return (
    <form onSubmit={props.onSubmit} className={styles.form}>
      {props.children}
      <FitContent>
        <Button type="submit" value={props.submitValue} />
      </FitContent>
    </form>
  );
}

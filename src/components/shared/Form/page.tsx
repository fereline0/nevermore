import { FormEvent } from "react";
import styles from "./page.module.css";
import PrimaryButton from "@/components/UI/PrimaryButton/page";

interface IForm {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitValue: string;
  children: React.ReactNode;
}

export default function Form(props: IForm) {
  return (
    <form onSubmit={props.onSubmit} className={styles.form}>
      {props.children}
      <div>
        <PrimaryButton value={props.submitValue} />
      </div>
    </form>
  );
}

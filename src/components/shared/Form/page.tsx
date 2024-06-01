import { FormEvent } from "react";

interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function Form(props: IForm) {
  return <form {...props}>{props.children}</form>;
}

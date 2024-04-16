import React from "react";
import Separator from "./Separator/page";

interface ISeparated {
  children: React.ReactNode;
}

export default function Separated(props: ISeparated) {
  const childrenArray = React.Children.toArray(props.children);

  return (
    <div>
      {childrenArray.map((child, index) => (
        <div key={index}>
          {child}
          {index !== childrenArray.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}

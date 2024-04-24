import React from "react";

interface IMarginBottom extends React.HTMLAttributes<HTMLDivElement> {
  gap: number;
  children: React.ReactNode;
}

export default function MarginBottom(props: IMarginBottom) {
  return (
    <div {...props}>
      {React.Children.map(props.children, (child, index) => (
        <div
          style={{
            marginBottom:
              index !== React.Children.count(props.children) - 1
                ? `${props.gap}px`
                : "0",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

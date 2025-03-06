import classNames from "classnames";
import { FC } from "react";

type HeadingProps = {
  heading: string;
  addClasses?: string;
};

const PageHeading: FC<HeadingProps> = ({ addClasses, heading }) => {
  return (
    <h2
      className={classNames(
        "is-size-1",
        "has-text-weight-bold",
        "pb-4",
        addClasses
      )}
    >
      {heading}
    </h2>
  );
};

export default PageHeading;

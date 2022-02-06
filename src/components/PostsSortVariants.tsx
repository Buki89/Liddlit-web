import React, { FC, useCallback, useState } from "react";
import { SortVariants } from "../containers/PostsSortVariants";
import SortBadge from "./SortBadge";

type SortVariant = {
  label: SortVariants;
  icon: JSX.Element;
};

type PostsSortVariantProps = {
  sortVariants: SortVariant[];
};

const PostsSortVariant: FC<PostsSortVariantProps> = ({ sortVariants }) => {
  const [activeVariant, setActiveVariant] = useState<SortVariants>(
    SortVariants.Hot
  );

  const handleClick = useCallback((value: SortVariants) => {
    setActiveVariant(value);
  }, []);

  return (
    <>
      {sortVariants.map(({ label, icon }) => (
        <SortBadge
          key={label}
          label={label}
          icon={icon}
          onClick={handleClick}
          active={activeVariant === label}
        />
      ))}
    </>
  );
};

export default PostsSortVariant;

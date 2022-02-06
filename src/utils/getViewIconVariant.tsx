import { cloneElement, FC } from "react";
import { BsList } from "react-icons/bs";
import { HiViewList } from "react-icons/hi";
import { IconBaseProps } from "react-icons/lib";
import { MdOutlineViewStream } from "react-icons/md";
import { ViewVariant } from "../types";

export const CardIcon: FC<IconBaseProps> = (props) =>
  cloneElement<IconBaseProps>(
    <MdOutlineViewStream fontSize="1.5rem" color="#878a8c" />,
    { color: props.color }
  );

export const ClassicIcon: FC<IconBaseProps> = (props) =>
  cloneElement<IconBaseProps>(<BsList fontSize="1.5rem" color="#878a8c" />, {
    color: props.color,
  });

export const CompactIcon: FC<IconBaseProps> = (props) =>
  cloneElement<IconBaseProps>(
    <HiViewList fontSize="1.5rem" color="#878a8c" />,
    { color: props.color }
  );

export const getViewVariantIcon = (
  variant: ViewVariant
): JSX.Element | null => {
  switch (variant) {
    case ViewVariant.card:
      return <CardIcon />;
    case ViewVariant.classic:
      return <ClassicIcon />;
    case ViewVariant.compact:
      return <CompactIcon />;
    default:
      return null;
  }
};

import React, { VFC } from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import { GiChart } from "react-icons/gi";
import { MdOutlineNewReleases, MdWhatshot } from "react-icons/md";
import PostsSortVariant from "../components/PostsSortVariants";

export enum SortVariants {
  Hot = "Hot",
  New = "New",
  Top = "Top",
  Rising = "Rising",
}

const sortVariants = [
  {
    label: SortVariants.Hot,
    icon: <MdWhatshot fontSize="1.5rem" />,
  },
  {
    label: SortVariants.New,
    icon: <MdOutlineNewReleases fontSize="1.5rem" />,
  },
  {
    label: SortVariants.Top,
    icon: <BiBarChartAlt2 fontSize="1.5rem" />,
  },
  {
    label: SortVariants.Rising,
    icon: <GiChart fontSize="1.5rem" />,
  },
];

const PostsSortVariants: VFC = () => (
  <PostsSortVariant sortVariants={sortVariants} />
);

export default PostsSortVariants;

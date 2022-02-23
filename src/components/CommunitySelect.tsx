import { Select } from "@mui/material";
import { Box } from "@mui/material";
import React, { FC } from "react";
import useCommunitySelect from "../hooks";

type CommunitySelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | undefined) => void;
};

const CommunitySelect: FC<CommunitySelectProps> = ({ onChange }) => {
  const { choices, loading } = useCommunitySelect();

  return (
    <>
      {loading ? (
        <Box mb="1rem" py="0.875rem" pl="1rem">
          {/* <Progress
            size="md"
            colorScheme="messenger"
            width="14rem"
            isIndeterminate={true}
            border="1px solid #1379d3"
            borderRadius="1rem"
          /> */}
        </Box>
      ) : (
        <Select
          placeholder={
            choices.length === 0
              ? "you have no followed communities"
              : "Choose a community"
          }
          // width="15rem"
          // backgroundColor="#000"
          // fontSize="1.15rem"
          // onChange={onChange}
          disabled={!choices && !loading}
          // isLoading={true}
        >
          {!choices
            ? null
            : choices.map((community) => {
                return (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                );
              })}
        </Select>
      )}
    </>
  );
};

export default CommunitySelect;

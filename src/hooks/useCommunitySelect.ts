import React, { FC, useEffect, useState } from "react";
import {
  AllCommunitiesQuery,
  useAllCommunitiesQuery,
  useMeQuery,
} from "../generated/graphql";

type Choice = {
  id: number;
  name: string;
};

type useCommunitySelectFc = () => {
  choices: Choice[];
  loading: boolean;
};

const useCommunitySelect: useCommunitySelectFc = () => {
  const { data: meData, loading: meLoading } = useMeQuery();

  const ids = meData?.me?.follow.map((community) => community!.communityId);

  const { data, loading } = useAllCommunitiesQuery({ variables: { ids } });

  const transform = (data: AllCommunitiesQuery | undefined) => {
    const choice: Choice[] = [];
    if (data && data.allCommunities) {
      for (const community of data.allCommunities) {
        if (!community) {
          break;
        } else {
          choice.push({ id: community.id, name: community.name });
        }
      }
    }
    return choice;
  };

  return { choices: transform(data), loading: meLoading || loading };
};

export default useCommunitySelect;

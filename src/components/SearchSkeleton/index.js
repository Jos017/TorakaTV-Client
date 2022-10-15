import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const SearchSkeleton = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      backgroundColor="#242526"
      width={{ xs: "90%", md: "75%", xl: "45%" }}
      height={{ xs: "auto", md: "fit-contain" }}
      borderRadius="10px"
      overflow="hidden"
    >
      <Skeleton
        variant="rectangle"
        width={300}
        height="100%"
        sx={{ bgcolor: "#4e4f50" }}
      />
      <Stack spacing={3} padding="1rem" width="100%">
        <Skeleton
          variant="rounded"
          width="60%"
          height={32}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Stack direction="row" spacing={1}>
          <Skeleton
            variant="rounded"
            width="50px"
            height={16}
            sx={{ bgcolor: "#4e4f50" }}
          />
          <Skeleton
            variant="rounded"
            width="60px"
            height={16}
            sx={{ bgcolor: "#4e4f50" }}
          />
          <Skeleton
            variant="rounded"
            width="40px"
            height={16}
            sx={{ bgcolor: "#4e4f50" }}
          />
          <Skeleton
            variant="rounded"
            width="50px"
            height={16}
            sx={{ bgcolor: "#4e4f50" }}
          />
        </Stack>
        <Skeleton
          variant="rounded"
          width="100%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
        <Skeleton
          variant="rounded"
          width="80%"
          height={10}
          sx={{ bgcolor: "#4e4f50" }}
        />
      </Stack>
    </Stack>
  );
};

export default SearchSkeleton;

import React from "react";
import { Card, Skeleton } from "antd";

const CardSkeleton = () => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <Skeleton.Input
        active
        style={{ width: 200, marginBottom: 20, height: 20 }}
      />

      <Skeleton active paragraph={{ rows: 4 }} />
    </Card>
  );
};

export default CardSkeleton;

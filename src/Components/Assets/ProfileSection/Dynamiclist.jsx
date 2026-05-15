import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Dynamiclist = ({ scrollTarget = "scrollableDiv" }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const generateDummyData = (pageNum, limit = 10) => {
    return Array.from({ length: limit }, (_, i) => {
      const id = (pageNum - 1) * limit + i + 1;
      return {
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=User${id}`,
      };
    });
  };

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    // simulate network delay
    setTimeout(() => {
      const newItems = generateDummyData(page);
      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={data.length < 50}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>🎉 You have reached the end!</Divider>}
      scrollableTarget={scrollTarget} // ✅ Use prop here
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="#">{item.name}</a>}
              description={item.email}
            />
            <div style={{ fontWeight: 500, color: "#666" }}>
              <BiDotsHorizontalRounded />
            </div>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default Dynamiclist;

import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import { View, FlatList, ActivityIndicator, Button } from "react-native";
import { Item } from "./Item";

export const ItemList = ({ url, pageLimit }) => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(url, page);

  const handleLoadMore = () => {
    if (page < pageLimit && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          page < pageLimit && (
            <Button title="Cargar Más" onPress={handleLoadMore} />
          )
        }
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </View>
  );
};

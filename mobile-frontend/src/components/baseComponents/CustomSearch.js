import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const CustomSearch = ({ query, setQuery, customStyle }) => {
  // console.log(query);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={(text) => setQuery(text)}
      value={query}
      style={[styles.searchBar, customStyle]}
    />
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 10,
  },
});

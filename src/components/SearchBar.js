import React, { memo } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useBooks } from '../context/BookContext.js';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBooks();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
        testID="search-input"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default memo(SearchBar);
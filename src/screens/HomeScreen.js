import React, { memo, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useBooks } from '../context/BookContext';
import BookItem from '../components/BookItem';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({ navigation }) => {
  const { 
    books, 
    loading, 
    error, 
    loadMore,
    hasMore,
  } = useBooks();

  const handleBookPress = useCallback((book) => {
    navigation.navigate('BookDetail', {
      bookId: book.id,
      title: book.title,
      thumbnail: book.thumbnail,
      category: book.category,
      author: book.author,
      description: book.description,
    });
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (!item) return null;
    return (
      <BookItem
        book={item}
        onPress={() => handleBookPress(item)}
      />
    );
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#f4511e" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#f4511e" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No books found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar />
        <CategoryList />
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString() || Math.random().toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
          <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate('Filter')}
      >
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(HomeScreen);
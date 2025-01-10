import React, { memo } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useBooks } from '../context/BookContext';

const categories = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science',
  'Technology',
  'History',
  'Biography',
  'Business',
];

const CategoryList = () => {
  const { selectedCategory, setSelectedCategory } = useBooks();

  const handleCategoryPress = (category) => {
    if (category === 'All') {
      setSelectedCategory(null);
    } else if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  const isSelected = (category) => {
    if (category === 'All') {
      return selectedCategory === null;
    }
    return category === selectedCategory;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            isSelected(category) && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress(category)}
          testID={`category-${category}`}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.categoryText,
              isSelected(category) && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    height:40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedCategory: {
    backgroundColor: '#f4511e',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default memo(CategoryList);
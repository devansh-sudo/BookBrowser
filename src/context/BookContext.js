import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.jsonkeeper.com/b/2S7D');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }
  
      // Filter out any invalid book entries
      const validBooks = data.filter(book => 
        book && 
        typeof book === 'object' && 
        book.id && 
        book.title && 
        book.category
      );
  
      setBooks(validBooks);
      setFilteredBooks(validBooks);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch books: ${err.message}`);
      console.error('Error fetching books:', err);
      setBooks([]);
      setFilteredBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filterBooks = useCallback(() => {
    if (!books.length) return;
    
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(book => 
        book.category === selectedCategory
      );
    }

    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [books, searchQuery, selectedCategory]);

  useEffect(() => {
    filterBooks();
  }, [filterBooks, searchQuery, selectedCategory]);

  const getPaginatedBooks = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage]);

  const loadMore = useCallback(() => {
    if (currentPage * itemsPerPage < filteredBooks.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, filteredBooks.length]);

  const value = {
    books: getPaginatedBooks(),
    totalBooks: filteredBooks.length,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    loadMore,
    currentPage,
    hasMore: currentPage * itemsPerPage < filteredBooks.length,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
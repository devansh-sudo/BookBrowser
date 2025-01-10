# Book Browser App

A React Native mobile application that allows users to browse and filter books, featuring a modern UI and smooth user experience.

## Features

- 📚 Browse through a large collection of books
- 🔍 Search functionality to find specific books
- 🏷️ Filter books by categories
- 📱 Responsive design for both iOS and Android
- 🎨 Modern UI with smooth animations
- 📄 Detailed book information view
- 🔄 Infinite scrolling with pagination
- ⚡ Performance optimized


## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-browser.git
cd book-browser
```

2. Install dependencies:
```bash
npm install


3. Install iOS dependencies (iOS development only):
```bash
cd ios
pod install
cd ..
```

## Running the App

npm start

# In a new terminal, run the iOS app
npm run ios


### Android

# Start Metro Bundler
npm start

# In a new terminal, run the Android app
npm run android



## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── BookItem.js
│   ├── CategoryList.js
│   └── SearchBar.js
├── screens/          # Screen components
│   ├── HomeScreen.js
│   ├── BookDetailScreen.js
│   └── FilterScreen.js
├── context/         # Context API related files
│   └── BookContext.js
└── assets/         # Images, fonts, etc.
```

## Technical Details

### State Management
- Uses React Context API for global state management
- Implements efficient filtering and pagination
- Optimized re-renders using React.memo

### Navigation
- React Navigation v6 with native stack navigator
- Proper type checking for navigation props
- Smooth transitions between screens

### Performance Optimizations
- Implemented infinite scrolling with FlatList
- Image loading optimization
- Memoized components to prevent unnecessary re-renders
- Efficient search and filter implementation


### Network Issues
- Ensure proper internet connectivity
- Check if the API endpoint is accessible
- Verify API response format

### Performance Issues
- Clear Metro bundler cache
- Rebuild the app
- Check for memory leaks using React DevTools


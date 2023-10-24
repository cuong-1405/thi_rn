// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import BookForm from "./BookForm";

// const App = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const jsonValue = await AsyncStorage.getItem("@books");
//         return jsonValue != null ? setBooks(JSON.parse(jsonValue)) : null;
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     fetchBooks();
//   }, []);

//   const addBook = (newBook) => {
//     setBooks((prevBooks) => [newBook, ...prevBooks]);
//   };

//   const editBook = async (id, updatedBook) => {
//     const newBooks = books.map((book) => {
//       if (book.id === id) {
//         return updatedBook;
//       }
//       return book;
//     });
//     setBooks(newBooks);

//     try {
//       await AsyncStorage.setItem("@books", JSON.stringify(newBooks));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const deleteBook = async (id) => {
//     Alert.alert(
//       "Xóa sách",
//       "Bạn có chắc chắn muốn xóa",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "OK",
//           onPress: async () => {
//             const newBooks = books.filter((book) => book.id !== id);
//             setBooks(newBooks);

//             try {
//               await AsyncStorage.setItem("@books", JSON.stringify(newBooks));
//             } catch (e) {
//               console.error(e);
//             }
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book Manager</Text>
//       <BookForm
//         addBook={addBook}
//         editBook={editBook}
//         selectedBook={selectedBook}
//       />
//       <FlatList
//         data={books}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <Text style={styles.listText}>
//               {item.name} - {item.type}
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedBook(item);
//                 // Open form or modal to edit
//               }}
//             >
//               <Text style={styles.editButtonText}>Sửa</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => deleteBook(item.id)}>
//               <Text style={styles.deleteButtonText}>Xóa</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//     marginVertical: 20,
//     fontWeight: "bold",
//   },
//   listItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   listText: {
//     fontSize: 18,
//   },
//   editButtonText: {
//     color: "blue",
//   },
//   deleteButtonText: {
//     color: "red",
//   },
// });

// export default App;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookForm from "./BookForm";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@books");
        return jsonValue != null ? setBooks(JSON.parse(jsonValue)) : null;
      } catch (e) {
        console.error(e);
      }
    };
    fetchBooks();
  }, []);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const editBook = async (id, updatedBook) => {
    const newBooks = books.map((book) => {
      if (book.id === id) {
        return updatedBook;
      }
      return book;
    });
    setBooks(newBooks);
    try {
      await AsyncStorage.setItem("@books", JSON.stringify(newBooks));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBook = async (id) => {
    Alert.alert(
      "Xóa sách",
      "Bạn có chắc chắn muốn xóa",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const newBooks = books.filter((book) => book.id !== id);
            setBooks(newBooks);
            try {
              await AsyncStorage.setItem("@books", JSON.stringify(newBooks));
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Manager</Text>
      <BookForm
        addBook={addBook}
        editBook={editBook}
        selectedBook={selectedBook}
      />
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              {item.name} - {item.type}
            </Text>
            <TouchableOpacity onPress={() => setSelectedBook(item)}>
              <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBook(item.id)}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listText: {
    fontSize: 18,
  },
  editButtonText: {
    color: "blue",
  },
  deleteButtonText: {
    color: "red",
  },
});

export default App;

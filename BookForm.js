import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookForm = ({ addBook, editBook, selectedBook }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (selectedBook) {
      setName(selectedBook.name);
      setImage(selectedBook.image);
      setPrice(selectedBook.price);
      setType(selectedBook.type);
    }
  }, [selectedBook]);

  const handleSubmit = async () => {
    if (!name || !image || !price || !type) {
      return Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
    }

    const newBook = {
      id: selectedBook ? selectedBook.id : Math.random().toString(),
      name,
      image,
      price,
      type,
    };

    if (selectedBook) {
      editBook(selectedBook.id, newBook);
    } else {
      addBook(newBook);
    }

    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      const currentBooks = jsonValue != null ? JSON.parse(jsonValue) : [];
      const updatedBooks = [newBook, ...currentBooks];
      await AsyncStorage.setItem("@books", JSON.stringify(updatedBooks));
    } catch (e) {
      console.error(e);
    }

    setName("");
    setImage("");
    setPrice("");
    setType("");
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Image:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Type:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setType(value)}
        value={type}
        items={[
          { label: "Tiểu thuyết", value: "Tiểu thuyết" },
          { label: "Truyện tranh", value: "Truyện tranh" },
          { label: "Thơ", value: "Thơ" },
          { label: "Sách giáo khoa", value: "Sách giáo khoa" },
        ]}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default BookForm;

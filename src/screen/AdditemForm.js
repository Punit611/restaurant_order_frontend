import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { postMainData } from '../action/getMainData';

class AddItemsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      tableNumber: '',
      items: [{ item_name: "Malai Kofta", quantity: 0 },
      { item_name: "Paneer Butter Masala", quantity: 0 },
      { item_name: "Dal Makhani", quantity: 0 },
      { item_name: "Chole (Chana) Masala", quantity: 0 },
      { item_name: "Matar Paneer", quantity: 0 }
      ]

    };
  }
  handleAddItem = async () => {
    const { name, phoneNumber, tableNumber, items } = this.state;

    // Validate the inputs and triming
    if (!name.trim() || !phoneNumber.trim() || !tableNumber.trim()) {
      return;
    }

    // Prepare the order items data
    const order_items = items.map((item, index) => ({
      item_name: item.item_name,
      quantity: parseInt(item.quantity) || 0,
    }));
    console.log(order_items)
    // Call the postMainData with the new order data
    const response = await postMainData({
      name,
      phone_number: phoneNumber,
      table_id: tableNumber,
      order_items,
    });
    // console.log(response,this.props);
    this.props.navigation.navigate("OrderScreen", { refreshData: true });

  };

  render() {
    const { name, phoneNumber, tableNumber, items } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Table Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Table Number"
            value={tableNumber}
            onChangeText={(text) => this.setState({ tableNumber: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Items</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemLabel}>{item.item_name}</Text>
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity"
                value={item.quantity}
                onChangeText={(text) => {
                  const newItems = [...items];
                  newItems[index] = { ...newItems[index], quantity: text };
                  this.setState({ items: newItems });
                }}
                keyboardType="numeric"
              />
            </View>
          ))}

        </ScrollView>

        <Button title="Submit Order" onPress={this.handleAddItem} />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    height:"100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemLabel: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontSize: 16,
    color: "#000",
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default AddItemsForm;

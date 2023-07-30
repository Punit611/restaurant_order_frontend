

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
import { deleteMainData, getMainData, putMainData } from '../action/getMainData';
// import Feather from 'react-native-vector-icons/Feather';

class OrderScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadermessage: '',
            items: [],

        };
    }

    componentDidMount() {
        this.getItems();

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.route && this.props.route.params && this.props.route.params.refreshData) {
            this.getItems();
            this.props.route.params.refreshData = false;
        }

    }

    getItems = async () => {
        this.setState({ loading: true });
        const result = await getMainData();
        // console.log(result);
        this.setState({ items: result, loading: false });
    }
    handleCompleteOrder = async (data) => {
        console.log("---------handleCompleteOrder-----------", data)
        data.completed = true;
        const result = await putMainData(data);

        this.getItems();

    }
    handleDeleteOrder = async (data) => {
        console.log("---------handleDeleteOrder-----------", data)
        data.completed = true;
        const result = await deleteMainData(data);

        this.getItems();

    }

    renderItems() {
        let { items, loading } = this.state;

        console.log(items);

        if (loading == true) {
            return (<View style={{
                justifyContent: "center",
                // alignItems: "center", 
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
                color: "#1a1"
            }}>
                <Text style={{
                    alignItems: "center",
                    fontSize: 20,
                    color: "#1a1",
                    marginVertical:"50%"
                }}>{"Items are loading"}</Text>
            </View>);
        }
        return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {items && items.map((data, i) => {
                    let color = (data.completed) ? "#2b2" : "#fff";
                    return (
                        <View key={i} style={{ width: "95%", margin: 15 }}>
                            <View style={[styles.card, { backgroundColor: color }]}>
                                <View style={styles.upperView}>
                                    <Text style={styles.name}>Name: {data.name}</Text>
                                    <Text style={styles.phoneNumber}>Phone: {data.phone_number}</Text>
                                    <Text style={styles.tableId}>Table ID: {data.table_id}</Text>
                                </View>

                                <View style={styles.itemsList}>
                                    <Text style={styles.itemsHeader}>Ordered Items:</Text>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5, justifyContent: "space-evenly" }}>
                                        {data.items.map((item, index) => {
                                            const quantity = item.quantity;

                                            return (
                                                quantity > 0 ? (
                                                    <View key={index} style={styles.item}>
                                                        <Text style={styles.itemName}>{item.item_name}</Text>
                                                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                                    </View>
                                                ) : null
                                            );
                                        })}
                                    </View>
                                </View>
                                <View >
                                    {!data.completed ? (
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5, justifyContent: "space-evenly" }}>

                                            <TouchableOpacity
                                                style={[styles.item, { backgroundColor: "#2b2" }]}
                                                onPress={() => this.handleCompleteOrder(data)}

                                            >
                                                <Text style={styles.itemName}>Completed</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.item, { backgroundColor: "#b22" }]}
                                                onPress={() => this.handleDeleteOrder(data)}
                                            >
                                                <Text style={styles.itemName}>DELETE</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : (
                                        null
                                    )}
                                </View>
                            </View>
                        </View>
                    );
                })}
                <View style={{
                        borderColor: "#111",
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 5,
                        margin: 10,
                        backgroundColor: "#fff",
                        alignItems: "center", backgroundColor: "#999", margin: 10
                    }}>
                        <Text style={styles.itemsHeader}>Orders are ended</Text>
                    </View>

            </View>

        );
    }

    handleAddOrder = () => {
        console.log("Add order button pressed!", this.props);
        this.props.navigation.push("AddScreen");
    };


    render() {

        return (
            <View style={styles.container}>
                {/* <Text style={{ color: "#1aa", alignSelf: "center", fontSize: 24, margin: 10 }}>Our order's</Text> */}
                <ScrollView>
                    {this.renderItems()}


                </ScrollView>
                <View style={{ color: "#1aa", alignSelf: "center", fontSize: 30, margin: 10 }}>
                    <Button
                        title={"Add order"}
                        onPress={this.handleAddOrder}
                    />
                </View>



            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        padding: 5,
        // width: "90%",
        margin: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        // backgroundColor: "#fff",
        elevation: 10,
        alignContent: "center",
        alignItems: "center"
    },
    upperView: {
        marginBottom: 5,
        flexDirection: "row", flexWrap: "wrap", margin: 10, justifyContent: "space-evenly",

    },
    name: {
        fontSize: 18,
        fontWeight: "bold",

        alignSelf: "flex-end",
        color: "#333",
        marginHorizontal: 15,
    },
    phoneNumber: {
        fontSize: 18,
        color: "#333",
        marginHorizontal: 15,
        alignSelf: "flex-end",
    },
    tableId: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginHorizontal: 15,
    },
    itemsList: {},
    itemsHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        alignSelf: "center",
        margin: 5,
    },
    item: {
        marginBottom: 5,
        borderColor: "#111",
        // width: 100,
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        margin: 5,
        backgroundColor: "#fff"
    },
    itemName: {
        fontSize: 13,
        color: "#000",
        marginRight: 5,
        alignSelf: "center",
    },
    itemQuantity: {
        fontSize: 13,
        color: "#000",
        alignSelf: "center",
    },

});




export default OrderScreen;
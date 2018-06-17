import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableNativeFeedback, Alert } from 'react-native';

const onPress = () => {
    Alert.alert('You pressed the button!')
}

const post = (item) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <Text style={styles.item}>{item.title}</Text>
        </TouchableNativeFeedback>
    );
}

const Posts = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({item}) => post(item)}
        /> 
    );
}
export default Posts;

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        margin : 10,
        backgroundColor : "green",
        color : "#fff"
    },
});
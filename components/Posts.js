import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableNativeFeedback } from 'react-native';

const onPress = (item, navigate) => {
    navigate('PostDetails', item);
}

const post = (item, navigate) => {
    return (
        <TouchableNativeFeedback onPress={() => {onPress(item, navigate)}}>
            <Text style={styles.item}>{item.title}</Text>
        </TouchableNativeFeedback>
    );
}

const Posts = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({item}) => post(item, props.navigate)}
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
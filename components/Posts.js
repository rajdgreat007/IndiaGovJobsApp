import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const Posts = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
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
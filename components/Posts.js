import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';

const onPress = (item, navigate) => {
    navigate('PostDetails', item);
}

const post = (item, navigate) => {
    return (
        <TouchableNativeFeedback
        onPress = {() => {onPress(item, navigate)}}
        background = {TouchableNativeFeedback.SelectableBackground()}
        >
            <View style={styles.postContainer}>
                <View style={{width : '20%'}}>
                    <Image source={{uri: item.imagePath}}
                        style={styles.image} />    
                </View>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const Posts = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({item}) => post(item, props.navigate)}
            refreshing = {props.loading}
            onRefresh = {props.refetch}
            onEndReached = {props.loadMore}
        /> 
    );
}
export default Posts;

const styles = StyleSheet.create({
    postContainer : {
        flex : 1,
        flexDirection : 'row',
        margin : 10,
        justifyContent : 'space-between',
        borderWidth : 2,
        borderRadius : 5,
        borderColor : 'green'

    },
    text: {
        padding: 10,
        fontSize: 16,
        color : "#000",
        width: '80%',
        backgroundColor : 'lightgreen'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    }
    
});
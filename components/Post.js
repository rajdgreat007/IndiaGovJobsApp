import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

const Post = (props) => {
    return (
        <ScrollView>
            <Text style={styles.post}>
                {props.post.content.rendered}
            </Text>
        </ScrollView>
    );
}
export default Post;

const styles = StyleSheet.create({
    post: {
        padding: 10,
        fontSize: 18,
        margin : 10,
        backgroundColor : "green",
        color : "#fff"
    },
});
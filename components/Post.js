import React from 'react';
import { Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
//import { parseDOM } from './helpers/post-helpers';
import HTML from 'react-native-render-html';

const Post = (props) => {
    const htmlContent = props.post.content.rendered
        .replace(/display:inline;/g, '')
        .replace(/display:block;/g, '');
    return (
        <ScrollView style={styles.post}>
            <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
        </ScrollView>
    );
}
export default Post;

const styles = StyleSheet.create({
    post: {
        padding: 10
    },
});
import React from 'react';
import { Text, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
//import { parseDOM } from './helpers/post-helpers';
import HTML from 'react-native-render-html';

const tagsStyles = {
    p : {
        marginBottom : 10
    },
    li : {
        marginBottom : 5
    }

};

const Post = (props) => {
    const htmlContent = props.post.content.rendered
        .replace(/display:inline;/g, '')
        .replace(/display:block;/g, '') + '<p></p>';
    
    return (
        <ScrollView style={styles.post}>
            <HTML html={htmlContent} 
            imagesMaxWidth={Dimensions.get('window').width}
            onLinkPress = {onLinkPress}
            tagsStyles = {tagsStyles}
            textSelectable = {true}
            baseFontStyle = {{fontSize : 20}}
            />
        </ScrollView>
    );
}

const onLinkPress = (event, href, obj) => {
    Linking.openURL(href);
}
export default Post;

const styles = StyleSheet.create({
    post: {
        padding: 10,
        backgroundColor : 'lightgreen',
        margin : 10,
        borderRadius : 5,
        borderWidth : 2,
        borderColor : 'green'
    },
});
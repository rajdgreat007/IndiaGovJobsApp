import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { BannerAd } from './Ads';

const onPress = (item, navigate) => {
    navigate('PostDetails', item);
}

const post = (item, navigate, index) => {
    return (
        <View>
            {(index + 1) % 4 === 0 ? <View style={styles.postContainer}>
                <BannerAd adUnitID = "ca-app-pub-2719503145852588/5337593335" />
                {/* <BannerAd adUnitID = "ca-app-pub-3940256099942544/6300978111" /> */}
            </View> : null}
            <TouchableNativeFeedback
                onPress={() => { onPress(item, navigate) }}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={styles.postContainer}>
                    <View style={{ width: '20%' }}>
                        <Image source={{ uri: item.imagePath }}
                            style={styles.image} />
                    </View>
                    <Text style={styles.text}>{item.title.replace('&#038;', '&')}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const Posts = (props) => {
    return (
        <FlatList
            data={props.posts}
            renderItem={({ item, index }) => post(item, props.navigate, index)}
            refreshing={props.loading}
            onRefresh={props.refetch}
            onEndReached={props.loadMore}
        />
    );
}
export default Posts;

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
    },
    text: {
        padding: 10,
        fontSize: 18,
        color: "#000",
        width: '80%',
        backgroundColor: '#ccc'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    }

});
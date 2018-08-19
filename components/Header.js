import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export default Header = (props) => {
    const logoMarkup = (
        <View style={styles.logoContainer}>
            {/* <Image source={Logo} style={styles.logo}/> */}
            <Text style={styles.headerText}> India Gov. Jobs </Text>
            <Text style={styles.secText}>in every difficulty there lies an opportunity...</Text>
        </View>
    );
    const titleMarkup = <Text style={styles.title}>{props.title}</Text>;
    return (
        <View style={styles.headerContainer}>
            {props.showLogo && logoMarkup}
            {props.showTitle && titleMarkup}     
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    logoContainer : {
    },
    logo: {
        width : '100%',
        height : '95%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    secText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center'
    },
    title : {
        flex : 1,
        fontSize : 20,
        fontWeight : 'bold',
        color: '#fff'
    }
});
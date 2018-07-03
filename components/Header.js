import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Logo from '../images/igv-logo.png';

export default Header = (props) => {
    const logoMarkup = (
        <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo}/>
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
        justifyContent : 'center',
        
    },
    logoContainer : {
        borderWidth : 2,
        borderRadius : 10,
        borderColor : '#fff',
        width : '60%',
        padding : 2
    },
    logo: {
        width : '100%',
        height : '95%',
    },
    title : {
        flex : 1,
        fontSize : 20,
        fontWeight : 'bold'
    }
});
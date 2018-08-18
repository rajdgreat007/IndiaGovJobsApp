import React from 'react';
import {Alert} from 'react-native';
import {
    AdMobBanner
} from 'react-native-admob';

export const BannerAd = (props) => {
    return (
        <AdMobBanner 
            adSize = "smartBanner"
            adUnitID = {props.adUnitID}
            testDeviceID="EMULATOR"
        />
    )
};
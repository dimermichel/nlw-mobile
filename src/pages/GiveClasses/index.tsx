import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';


function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBgImage} 
                style={styles.content}
            >
                <Text style={styles.title}>
                    Wanna be a Teacher?
                </Text>

                <Text style={styles.description}>
                    To get started, please register in our web page.
                </Text>     
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    Got it!
                </Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;
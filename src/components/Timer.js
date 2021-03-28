import React, { useState } from 'react';
import CountDown from 'react-native-countdown-component';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
const Timer = (props) => {

    const end_time = props.endDate;

    const [ isPause , setPause ] = useState(true);

    return (
        <View style={styles.timerContainer}>
            <CountDown
                until={(Date.parse(end_time) - Date.now()) / 1000}
                onFinish={() => alert('finished')}
                timeLabelStyle={{ fontSize: 10 }}
                running={props.isPause}
                size={20}
            />
            {
                 console.log("isPause ",isPause)
            }
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                    setPause(!isPause)
                }}
            >
                <Text> {isPause ? "STOP" : "START"}</Text>
            </TouchableOpacity>
        </View>

    );
}
const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        color: "black",
        borderRadius: 12,
        borderWidth: 1.2,
        borderColor: "black",
        height: 50,
        marginLeft:10
    }
})

export default Timer;
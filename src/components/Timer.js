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

    const [isPause, setPause] = useState(true);
    let timeNow = Date.now();
    const [initalTime, setInitalTime] = useState((Date.parse(end_time) -timeNow) / 1000);
    return (
        <View style={styles.timerContainer}>
            <CountDown
                id={props.id.toString()}
                until={initalTime}
                onFinish={() => alert('finished')}
                timeLabelStyle={{ fontSize: 10 }}
                running={isPause}
                size={20}
            />
            {
                console.log("isPause ", isPause)
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
        marginLeft: 10
    }
})

export default Timer;
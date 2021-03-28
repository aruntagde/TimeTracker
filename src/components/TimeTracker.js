import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Timer from './Timer';
import { useMutation } from '@apollo/client';
import { DELETE_TASK } from '../GraphQL/Mutations';


const TimeTracker = ({ trackerDetails, refetch }) => {
    const navigation = useNavigation();
    const tracker = trackerDetails.item;
    // const [paused, setPause] = useState(false);
    const [delete_tasks_by_pk, { error, loading, data }] = useMutation(DELETE_TASK);


    const deleteTask = () => {
        delete_tasks_by_pk({
            variables: {
                _id: tracker.id
            }
        })
        if (!error) refetch();
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>{tracker.title}</Text>
                {/* <View style={styles.tagsContainer}>
                    {
                        tracker.tags.map((e) => {
                            return <View style={styles.tagStyle}>
                                <Text>{e.name}</Text>
                            </View>
                        })
                    }
                </View> */}
                <View >
                    {
                        (Date.parse(tracker.start_time) >= Date.now()) ? <View style={styles.yetToStart}>
                            <Text style={styles.yetToStartText}>Task Yet to Start</Text>
                        </View>
                            :
                            <Timer endDate={tracker.end_time} />
                    }
                </View>
                <View style={styles.imageContainer}>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            navigation.navigate('AddEditTask', {
                                isEdit: true,
                                editData: tracker,
                                refetch: refetch
                            })
                        }}
                    >
                        <Text>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={deleteTask}
                    >
                        <Text>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading ? <View style={[styles.containerAticity, styles.horizontal]}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#000000" />
                    </View>
                </View>
                    :
                    null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        margin: 20,
        marginTop: 20,
        marginBottom: 0,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#dbd7d7"
    },
    titleText: {
        fontSize: 28,
        fontWeight: "700"
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10
    },
    buttonStyle: {
        flex: 1,
        alignItems: "center",
        width: 10,
        padding: 10,
        color: "black",
        borderRadius: 12,
        borderWidth: 1.2,
        borderColor: "black"
    },
    containerAticity: {
        flex: 1,
        height: "100%",
        width: "100%",
        opacity: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2

    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    loadingContainer: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 10
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginBottom: 10
    },
    tagStyle: {
        backgroundColor: "#71BC78",
        margin: 2,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20
    },
    yetToStart: {
        alignSelf: "center",
        padding: 15,
        backgroundColor: "#FAB913",
        margin: 10,
        borderRadius: 10,
        height: 50
    },
    yetToStartText: {
        fontSize: 18,
        fontWeight: "700"
    }
});

export default TimeTracker;
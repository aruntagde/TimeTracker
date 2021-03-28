import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Platform
} from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK_BY_ID } from '../GraphQL/Mutations';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TagInput from 'react-native-tags-input';


const AddEditTask = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { refetch, isEdit, editData } = route.params;
    const [title, setTitle] = useState(isEdit ? editData.title : "");
    const [startDate, setStartDate] = useState(isEdit ? new Date(editData.start_time) : new Date());
    const [endDate, setEndDate] = useState(isEdit ? new Date(editData.end_time) : new Date());
    const [isDateVisible, setDateVisibility] = useState(false);
    const [mode, setMode] = useState("date");
    const [dateType, setDateType] = useState('');
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: isEdit ? tagsArrayInit(editData.tags) : []
    });

    function tagsArrayInit(arr) {
        let r = [];
        arr.forEach((e) => r.push(e.name));
        return r;
    }

    const queryMultiple = () => {
        const createTask = useMutation(CREATE_TASK);
        const updateTask = useMutation(UPDATE_TASK_BY_ID);
        return [createTask, updateTask];
    }

    const [
        [insert_tasks_one, { loading: createTaskLoading, data: createTaskData }],
        [update_tasks_by_pk, { loading: updateTaskLoading, data: updateTaskData }],
    ] = queryMultiple()


    const hideDatePicker = () => {
        setDateVisibility(false);
    };

    const handleConfirm = (date) => {
        setDateVisibility(false);
        if (dateType == "start") {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    useEffect(() => {
        if (createTaskData || updateTaskData) {
            if (Platform.OS == "android") {
                let msg = !isEdit ? "Created Successfully" : "Updated SuccessFully"
                ToastAndroid.showWithGravity(
                    msg,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
            navigation.goBack();
            refetch()
        }
    }, [createTaskData, updateTaskData])

    const createUpdateTask = () => {

        if (startDate > endDate) {
            alert("End Time should be greater than Start Time ..!!")
        } else {
            let taskTags = [];
            tags.tagsArray.forEach((e) => {
                let data = {
                    tag: {
                        data: {
                            name: e
                        }
                    }
                }
                taskTags.push(data);
            })

            if (isEdit) {
                update_tasks_by_pk({
                    variables: {
                        _id: editData.id,
                        _set: {
                            title: title,
                            start_time: startDate,
                            end_time: endDate
                        }
                    }
                })
            } else {
                insert_tasks_one({
                    variables: {
                        object: {
                            title: title,
                            start_time: startDate,
                            end_time: endDate,
                            task_tags: {
                                data: taskTags
                            }
                        }
                    }
                })

            }
        }

    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.lableText}>Title</Text>
                <TextInput
                    style={styles.inputArea}
                    onChangeText={setTitle}
                    value={title}
                />
                <View style={styles.sectionStyle}>
                    <Text style={styles.lableText}>#Tags</Text>
                    <TagInput
                        updateState={(state) => setTags(state)}
                        tags={tags}
                        label='Press space to add a tag'
                        inputContainerStyle={[styles.textInput]}
                        containerStyle={{ margin: -10 }}
                    />
                </View>

                <View style={styles.sectionStyle}>
                    <Text style={styles.lableText}>Start Date Time</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={styles.dateTimeText}
                            onPress={() => {
                                setDateType('start')
                                setMode('date')
                                setDateVisibility(true)
                            }}
                        >
                            <Text >{startDate.toDateString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dateTimeText}
                            onPress={() => {
                                setDateType('start')
                                setMode('time')
                                setDateVisibility(true)
                            }}
                        >
                            <Text >{startDate.toTimeString()}</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.sectionStyle}>
                    <Text style={styles.lableText}>End Date Time</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={styles.dateTimeText}
                            onPress={() => {
                                setDateType('end')
                                setMode('date')
                                setDateVisibility(true)
                            }}
                        >
                            <Text >{endDate.toDateString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dateTimeText}
                            onPress={() => {
                                setDateType('end')
                                setMode('time')
                                setDateVisibility(true)
                            }}
                        >
                            <Text >{endDate.toTimeString()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <DateTimePickerModal
                    isVisible={isDateVisible}
                    mode={mode}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={dateType === "start" ? startDate : endDate}
                />

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={createUpdateTask}
                >
                    <Text style={styles.createText}>{isEdit ? "UPDATE" : "CREATE"}</Text>
                </TouchableOpacity>
                {
                    (createTaskLoading || updateTaskLoading) ? <View style={[styles.container, styles.horizontal]}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#000000" />
                            <Text>Loading</Text>
                        </View>
                    </View>
                        :
                        null
                }
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 25
    },
    inputArea: {
        position: 'relative',
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 10,
        color: "black"
    },
    dateTimeText: {
        width: "48%",
        padding: 10,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5
    },
    lableText: {
        fontSize: 18
    },
    sectionStyle: {
        marginTop: 20
    },
    createButton: {
        alignSelf: "center",
        alignItems: "center",
        width: "30%",
        padding: 10,
        marginTop: 50,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 25
    },
    createText: {
        fontSize: 14,
        fontWeight: "700"
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
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5
    }
});

export default AddEditTask;
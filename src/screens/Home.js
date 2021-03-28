import React from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { LOAD_TASKS } from '../GraphQL/Querys';
import TimeTracker from '../components//TimeTracker';

const Home = () => {
    const navigation = useNavigation();
    const { loading: loadTaskLoading, data: loadTaskData, refetch } = useQuery(LOAD_TASKS);

    const _renderItem = (item) => {
        return <TimeTracker trackerDetails={item} refetch={refetch} />;
    }

    return (
        <>
            {
                loadTaskLoading ? <View style={[styles.container, styles.horizontal]}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#000000" />
                        <Text>Loading</Text>
                    </View>
                </View>
                    :
                    null
            }
            <FlatList
                data={loadTaskData ? loadTaskData.tasks : []}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                    navigation.navigate('AddEditTask', {
                        refetch: refetch
                    })
                }}
            >
                <Image source={require('../assests/images/add.png')} style={styles.image} />
            </TouchableOpacity>
        </>
    );
}


const styles = StyleSheet.create({

    imageContainer: {
        backgroundColor: "#71BC78",
        width: 70,
        height: 70,
        borderColor: "#71BC78",
        borderRadius: 35,
        borderWidth: 2,
        position: "absolute",
        bottom: 25,
        right: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 50,
        height: 50
    },
    container: {
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
    }

})

export default Home;
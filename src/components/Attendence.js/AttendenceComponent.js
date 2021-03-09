import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Animated,
    TextInput,
    FlatList,
    Easing
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import UserCirle from '../../assets/images/user-circle.png'
// icon store
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const { width, height } = screen;

const data = [

    {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Nguyễn Trọng Nghĩa1',
    success: true,
    },
    {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Nguyễn Trọng Nghĩa2',
    success: false,
    },
    {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Nguyễn Trọng Nghĩa3',
    success: true,
    },
    {
    id: '58694a0f-3da1-471f-bd96-145571e29d721',
    name: 'Nguyễn Trọng Nghĩa4',
    success: false,
    },
];

const stationList = [
    {name: 'Nguyễn Văn Cừ'},
    {name: 'Nguyễn Văn Linh'},
    {name: 'Trần Hưng Đạo'},
    {name: 'Lý Tự Trọng'},
]

const Item = ({ name, success }) => (
    <View>
        {
        success
        ?
        (<View 
            style={{ 
                borderColor: '#04B604', 
                width: width/3-25, 
                height: width/3+15,
                borderWidth: 2, 
                marginBottom: 5, 
                borderRadius: 5, 
                marginHorizontal: 2, 
            }}>
            {
                success
                &&
                <View style={{ position: 'absolute', right: 1}}>
                    <Entypo name="check" size={15} color="#04B604" />
                </View>
            }
        
            <View style={{ flex: 2/3, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={UserCirle} style={{ width: width/6*2-45  , height: width/6*2-45} }/>
            </View>
            <View style={{ flex: 1/3, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#229954', fontSize: 12, fontWeight: 'bold' }}>{name}</Text>
            </View>
        </View>)
        :
        (<View 
            style={{ 
                borderColor: '#717D7E', 
                width: width/3-25, 
                height: width/3+15,
                borderWidth: 2, 
                marginBottom: 5, 
                borderRadius: 5, 
                marginHorizontal: 2, 
            }}>
            <View style={{ flex: 2/3, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={UserCirle} style={{ width: width/6*2-45  , height: width/6*2-45} }/>
            </View>
            <View style={{ flex: 1/3, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#717D7E', fontSize: 12, fontWeight: 'bold' }}>{name}</Text>
            </View>
        </View>)
        }
    </View>
);

const AttendenceComponent = ({ navigation }) => {

    const [searchText, setSearchText] = React.useState('');

    const handleSearchText = (val) => {
        setSearchText(val)
    }

    const heightAnimListStation = useRef(new Animated.Value(0)).current;
    const maxHeightAnimListStation = stationList.length*50+30;

    let rotateValueHolder = new Animated.Value(0);

    const [openAnimStation, setOpenAnimStation] = React.useState(false)

    const getOpen = () => {
        Animated.timing(heightAnimListStation, {
            toValue: maxHeightAnimListStation,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => setOpenAnimStation(!openAnimStation));
    
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
    }

    const getClose = () => {
        Animated.timing(heightAnimListStation, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => setOpenAnimStation(!openAnimStation));
     
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();

        console.log('close');
    }

    const RotateData1 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const RotateData2 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const renderItem = ({ item }) => (
        <Item name={item.name} success={item.success} />
    );

    return (
       <View style={styles.container}>
           <View style={styles.station_selector_space}>
                <TouchableOpacity
                    onPress={ !openAnimStation ? getOpen : getClose }
                >   
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', zIndex: 9999, paddingVertical: 12 }}>
                    <FontAwesome5 name="map-marker-alt" size={24} color="#2E86C1" />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ paddingHorizontal: 15, color: '#2E86C1', fontWeight: 'bold' }}>Bến</Text>
                    </View>

                   
                        <Animated.View 
                             style={{ transform: [{ rotate: openAnimStation ? RotateData2 : RotateData1 }] }} 
                        >
                            <MaterialCommunityIcons 
                                name="menu-down-outline" 
                                size={24} 
                                color="#85C1E9" 
                            />
                        </Animated.View>
                   
  
                </View>
                <Animated.View style={{ flex: 1, height: heightAnimListStation, backgroundColor: '#fff', overflow: 'hidden'  }}>
                    {
                        stationList.map((data, index) => (
                            <TouchableOpacity>
                                <View style={{ borderWidth: 1, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <FontAwesome5 name="bus" size={24} color="black" /> */}
                                    <Text>{data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </Animated.View>
                </TouchableOpacity>
           </View>

           <View style={styles.info_station_space}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Entypo name="arrow-with-circle-right" size={34} color="#48C9B0" />
                    <Text style={{ paddingHorizontal: 10, color: '#148F77', fontWeight: 'bold', fontSize: 15}}>Bến sắp tới</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                    <View style={{ flex: 1/2 }}>
                        <Text style={{ marginBottom: 10, fontSize: 13, color: '#2E86C1'}}>Mã xe: 6</Text>
                        <Text style={{ fontSize: 13, color: '#2E86C1' }}>Biển số xe: 65A - 56789</Text>
                    </View>
                    <View style={{ flex: 1/2, flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <View style={{ width: width/9, height: width/9+15 }}>
                                <View style={{ 
                                    width: width/9, 
                                    height: width/9, 
                                    backgroundColor: '#fff', 
                                    borderRadius: 10 ,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Feather name="stop-circle" size={width/11} color="#A6ACAF" />
                                </View>
                                <Text style={{ fontSize: 9, textAlign: 'center', color:'#717D7E' }}>Kết thúc</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <View style={{ width: width/9, height: width/9+15, marginHorizontal: width/15 }}>
                                <View style={{ 
                                    width: width/9, 
                                    height: width/9, 
                                    backgroundColor: '#fff', 
                                    borderRadius: 10 ,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome name="share-square-o" size={24} size={width/12} color="#40E0D0" />
                                </View>
                                <Text style={{ fontSize: 9, textAlign: 'center', color: '#2E86C1' }}>Bỏ bến</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ScanQR")}
                        >
                            <View style={{ width: width/9, height: width/9+15 }}>
                                <View style={{ 
                                    width: width/9, 
                                    height: width/9, 
                                    backgroundColor: '#fff', 
                                    borderRadius: 10 ,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <AntDesign name="qrcode" size={width/11} color="#40E0D0" />
                                </View>
                                <Text style={{ fontSize: 9, textAlign: 'center', color: '#2E86C1' }}>Quét QR</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1 , 
                    marginVertical: 10, 
                    backgroundColor: '#fff', 
                    borderRadius: 15, 
                    paddingHorizontal: 20 
                }}>
                    <View style={{ 
                        flexDirection: 'row',
                        flex: 1, 
                        height: 50, 
                        borderBottomColor: 'gray', 
                        borderBottomWidth: 2,
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ 
                            flex: 1, 
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#2E86C1'

                        }}>
                            Lên xe (tại bến: 10/13)
                            </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, paddingVertical: 10 }}>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <MaterialCommunityIcons name="exit-to-app" size={24} color="#2E86C1" />
                                <Text style={{ color: '#2E86C1', marginHorizontal: 5, fontSize: 13 }}>Lên xe: 49/50</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="exit-to-app" size={24} color="#2E86C1" />
                                <Text style={{ color: '#2E86C1', marginHorizontal: 5, fontSize: 13 }}>Lên xe tại bến: 10/13</Text>
                            </View>
                        </View>
                        <View style={{ 
                            flexDirection: 'row', 
                            flex: 1, 
                            marginVertical: 10, 
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#A6ACAF',
                            height: 35,
                            padding: 5,
                            alignItems: 'center',
                        }}>
                            <AntDesign name="search1" size={22} color="#A6ACAF" />
                            <TextInput 
                                style={{ flex: 1, paddingHorizontal: 10 }}
                                placeholder="Tìm kiếm"
                                onChangeText = {(val) => handleSearchText(val)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        data={data}
                        numColumns={3}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    </View>
                </View>
           </View>
       </View>
    );
};

export default AttendenceComponent;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },

    station_selector_space: {
        flex: 1,
        // borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },

    info_station_space: {
        flex: 1,
        paddingVertical: 20,
        zIndex: 11
    }


})
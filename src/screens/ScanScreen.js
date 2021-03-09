import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import Modal from 'react-native-modal';
// icon store
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';
// close icon store

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const { width, height } = screen;

import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openScan = () => {
    setModalVisible(!isModalVisible);
    setScanned(false)
  }
  
  const ModalComponent = () => {
    return (
      <Modal animationType = {"slide"} transparent = {false}
        visible = {isModalVisible}  
          onRequestClose = {() => { console.log("Modal has been closed.") } 
      }>
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee3f3', position: 'absolute' }}>
            <View style={{ backgroundColor: '#fff', width: width-30, zIndex: 999999, borderRadius: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ padding: 10, fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold', color: '#1C81DF' }}>
                      Xuống xe</Text>
                </View>
                <LinearGradient 
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.5, 1]}
                    colors={['#f1c1bfed', '#69dfe3']}
                    style={{ backgroundColor: '#2980B9', justifyContent: 'center', alignItems: 'center', padding: 10 }}
                  >
                    <Text style={{ color: '#6D2EF3', fontWeight: 'bold', fontSize: 15  }}>Thẻ học sinh</Text>
                </LinearGradient>
                {/* <View style={{ backgroundColor: '#2980B9', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15  }}>Thẻ học sinh</Text>
                </View> */}
                <View style={{ padding: 15 }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '30%', height: 120, borderWidth: 1, }}>
                            {/* Image */}
                    </View>
                    <View style={{ width: '70%', paddingLeft: 15 }}>
                     
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>Họ và tên: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Trần Hữu Đan</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>Giới tính: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Nam</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>Lớp: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Lớp: 2A</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>GVCN: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>(Thầy) Thanh Phúc</Text>
                        </View>
                      </View>
                    </View>
                  </View>    
                </View>
                
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ color: '#2980B9', fontWeight: 'bold', fontSize: 18  }}>Thông tin người đón</Text>
                </View>
                <View style={{ padding: 15 }}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '30%', height: 120, borderWidth: 1, }}>
                            {/* Image */}
                    </View>
                    <View style={{ width: '70%', paddingLeft: 15 }}>
                     
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>Họ và tên: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Huỳnh Thanh Nhã</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>SĐT: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Nam</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#839192', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3}}>
                          <Text style={{ color: '#839192', fontSize: 13 }}>Mối quan hệ: </Text>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#2980B9', fontWeight: 'bold' }}>Cha</Text>
                        </View>
                      </View>

                    </View>
                  </View>    
                </View>
                <View>
                  <View style={{ flexDirection: 'row', margin: 15 }}>
                    <TouchableOpacity
                      style={{ flex: 1/2, height: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, borderRadius: 30 }}
                      onPress={openScan}
                    >
                        <LinearGradient
                          start={{ x: 0, y: 2 }}
                          end={{ x: 1, y: 1 }}
                          colors={['#408ffb', '#64cafb']}
                          style={{
                            flex: 1,
                            flexDirection: 'row', 
                            backgroundColor: 'red',
                            width: '100%', 
                            height: '100%', 
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                        <FontAwesome5 name="check" size={20} color="#1BD812" style={{ marginRight: 5 }}/>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16}}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    

                    <TouchableOpacity
                      style={{ flex: 1/2, height: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, borderRadius: 30 }}
                      onPress={openScan}
                    >
                        <LinearGradient
                          start={{ x: 0, y: 2 }}
                          end={{ x: 1, y: 1 }}
                          colors={['#408ffb', '#64cafb']}
                          style={{
                            flex: 1,
                            flexDirection: 'row', 
                            backgroundColor: 'red',
                            width: '100%', 
                            height: '100%', 
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                        <FontAwesome5 name="check" size={20} color="#EE3121" style={{ marginRight: 5 }}/>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16}}>Hủy bỏ</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
        </View>
      </Modal>
    )
  }
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(!isModalVisible);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const leftTop = {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#fff',

  };

  const leftBottom = {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#fff',
  };

  const rightTop = {
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#fff',
  };
  const rightBottom = {
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#fff',
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ModalComponent />
      <View style={styles.header}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
          <View style={styles.goBackHeader}>
              <FontAwesome5 name="angle-left" size={30} color="#6495ED"/>
          </View>
        </TouchableOpacity>
            
          <View style={styles.titleHeader}>
              <Text style={styles.titleHeader_text}>Check Out Mã QR</Text>
          </View>
            
        <TouchableOpacity
            onPress={() => navigation.navigate("Message")}
        >
          <View style={styles.RealtimeChatHeader}>
              <AntDesign name="message1" size={22} color="#6495ED" />
              <Text style={styles.RealtimeChatHeader_text}>9</Text>
          </View>
        </TouchableOpacity>
      </View>
      
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{... StyleSheet.absoluteFillObject, backgroundColor: 'blue'}}
          />
          {/* <View style={{ flex: 1, position: 'absolute', width: width/5*3+50 , height: width/5*3+50 }}>
    
          </View> */}
          <View style={{ width: width/5*3 , height: width/5*3 }}>  
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, ...leftTop}}></View>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, ...rightTop}}></View>
            </View>
            
            <View style={{ flex: 1}} />
            
            <View style={{ flex: 1, flexDirection: 'row'}}>
              <View style={{ flex: 1, ...leftBottom}}></View>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, ...rightBottom}}></View>
            </View>
          </View>
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({ 
  container : {
    flex: 1,    
  },

  header: {
      flexDirection: 'row',
      flex: 1/11,
      backgroundColor: '#fff',
      // paddingTop: 30,
      alignItems: 'center',
      paddingHorizontal: 10
  },

  goBackHeader: {
      padding: 10,
  },

  titleHeader: {
      flex: 1,
      // backgroundColor: '#000',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingRight: 5,
  },

  titleHeader_text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2980B9',
      // paddingLeft: 10,       
  },

  RealtimeChatHeader: {
      flexDirection: 'row',
      padding: 10,
      opacity: 0,
  },

  RealtimeChatHeader_text: {
      fontSize: 11,
      color: '#FFF',
      backgroundColor: '#FA0000',
      height: 15,
      width: 15,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: 20,
      position: 'absolute',
      right: 4,
      bottom: 4,
  },
})
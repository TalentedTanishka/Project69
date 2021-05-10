import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      hascamerapermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermission = async () => {
    console.log("inside")
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log('status' + status);
    this.setState({
      hascamerapermission: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanner = async ({ type, data }) => {
    this.setState({ scanned: true, scannedData: data, buttonState: 'normal' });
    console.log(data);
  };
  render() {
    // onPress was made arrow function permissions button
    const hascamerapermission = this.state.hascamerapermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    console.log(this.state)

    if (buttonState === 'clicked' && hascamerapermission) {
      console.log('if');
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style={StyleSheet.absoluteFillObject}></BarCodeScanner>
      );
    } else {
      return (
        <View style={styles.container}>
        

          <Text style={{ fontSize: 30 }}>{this.props.title}</Text>

          <Text style={{ fontSize: 20, marginTop: 200 }}>
            {hascamerapermission === true
              ? this.state.scannedData
              : '___REQUEST CAMERA PERMISSION____'}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={()=> this.getCameraPermission()}
           >
            <Text style={styles.displayText}>SCAN THE QR CODE</Text>
          </TouchableOpacity>

            <View style={{ marginTop: -400 }}>
            <Image style={{ width: 200, height: 200 }}  source={require('../assets/Barcodescanner.jpg')} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 30,
    textDecorationLine: 'underline',
  },
  scanButton: {
    backgroundColor: 'yellow',
    margin: 10,
    paddingBottom: 60,
    paddingTop: 20,
    marginTop: 1,
  },
});

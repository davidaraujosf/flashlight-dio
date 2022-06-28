import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Alert} from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

const App = () => {
  const [toggle, setToggle] = useState(false, true);
  
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);
  
  useEffect(() => {
    //Ligar/desligar flash do celular.
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener (() => {
      setToggle(oldToggle => !oldToggle)
    });
    return () => subscription.remove();
  }, []);
  
  return <View style={toggle ? style.containerLight : style.containerBlack}> 
            <TouchableOpacity onPress={handleChangeToggle}>

          <Image 
                style={toggle ? style.lightingOn : style.lightingOff}
                source={toggle ? require('./assets/icons/eco-light-on.png') : require('./assets/icons/eco-light-off.png')}
                />
          <Image 
                style={style.dioLogo}
                source={toggle ? require('./assets/icons/diome-black.png') : require('./assets/icons/diome-white.png')}
                />
        </TouchableOpacity>
  </View>;
};

export default App;

const style = StyleSheet.create({
  containerBlack: {
    flex:1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex:1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn:{
    resizeMode: "contain",
    alignSelf: "center",
    paddingBottom: 150,
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250,
  },
});

import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { getIsPaired, getReachability, sendMessage } from "react-native-watch-connectivity";

const App = () => {
  const [textInputValue, setTextInputValue] = useState("")
  const [receivedValue, setReceivedValue] = useState("Saatten gelen veri burada yer alacak")
  const [isReachable, setIsReachable] = useState(false)
  const [isPaired, setIsPaired] = useState(false)

  const [deviceOk, setDeviceOk] = useState(false)

  // Cihazın açık ve eşleştirilmiş olma durumu kontrol edilir
  const checkWatch = () => {
    getReachability()
      .then((reachable) => {
        setIsReachable(reachable)
        if (reachable)
          getIsPaired()
            .then((paired) => {
              setIsPaired(paired)
              if (paired)
                setDeviceOk(true)
            })
            .catch(err => console.warn(err))
      })
      .catch(err => console.warn(err))
  }

  // Data cihaza gönderilir
  const send2Watch = () => {
    if (deviceOk) {
      const message = {
        "message": textInputValue,
      }
      sendMessage(message, replyHandler, errorHandler);
    } else
      Alert.alert("Cihaza erişilemiyor ya da eşleştirilmemiş!")
  }

  // Opsiyonel yanıt handler
  const replyHandler = response => {
    console.warn("Saatten gelen yanıt : ", response);
  }

  // Opsiyonel hata handler
  const errorHandler = error => {
    console.warn(error)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Veri Girişi" a
        value={textInputValue}
        onChangeText={text => setTextInputValue(text)}
        style={styles.textInput} />
      <Button disabled={!deviceOk} title="Saate Gönder" onPress={() => send2Watch()} />
      <Button title="Erişimi Kontrol Et" onPress={() => checkWatch()} />

      <Text style={[styles.text, { fontWeight: "bold", marginTop: 30 }]}>Durum :</Text>
      <Text style={styles.text}>{isReachable ? "Cihaz ulaşılabilir" : "Cihaza ulaşılamıyor"}</Text>
      <Text style={styles.text}>{isPaired ? "Cihaz eşleştirilmiş" : "Cihaz eşleştirilmemiş"}</Text>

      <Text style={[styles.text, { fontWeight: "bold", marginTop: 30 }]}>Gelen Veri :</Text>
      <Text style={styles.text}>{receivedValue}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  textInput: {
    width: "80%",
    height: 30,
    borderBottomWidth: 1,
  },
  text: {
    marginTop: 20,
  }
});

export default App;

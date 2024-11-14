import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Text, View } from 'react-native';


export default function HomeScreen() {
  const [values, setValues] = useState({
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (inputName: any, text: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [inputName]: text.replace(/[^0-9]/g, ''),
    }));
  };

  const handleFocus = (inputName: any) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <View>
      <View style={styles.titleContainer}>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.textLabel}>
          Card Number
        </Text>
        <TextInput
          value={values.cardNumber}
          onChangeText={(text) => handleChange('cardNumber', text)}
          keyboardType="numeric"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'cardNumber' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('cardNumber')}
          onBlur={handleBlur}
        />
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.textLabel}>
          Card Name
        </Text>
        <TextInput
          value={values.cardName}
          onChangeText={(text) => handleChange('cardName', text)}
          keyboardType="default"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'cardName' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('cardName')}
          onBlur={handleBlur}
        />
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.textLabel}>
          Expiration Date
        </Text>
        <TextInput
          value={values.expDate}
          onChangeText={(text) => handleChange('expDate', text)}
          keyboardType="numeric"
          placeholder="Month"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'expDate' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('expDate')}
          onBlur={handleBlur}
        />
        <TextInput
          value={values.expDate}
          onChangeText={(text) => handleChange('expDate', text)}
          keyboardType="numeric"
          placeholder="Year"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'expDate' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('expDate')}
          onBlur={handleBlur}
        />
        <Text style={styles.textLabel}>
          CVV
        </Text>
        <TextInput
          value={values.cvv}
          onChangeText={(text) => handleChange('cvv', text)}
          keyboardType="numeric"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'cvv' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('cvv')}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  textLabel: {
    fontSize: 12,
    color: '#ababab',
  },
});
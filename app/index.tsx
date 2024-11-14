import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Text, View, Animated, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';

export default function HomeScreen() {
  const [values, setValues] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleChange = (inputName, text) => {
    setValues((prevValues) => ({
      ...prevValues,
      [inputName]: inputName === 'cardName' ? text : text.replace(/[^0-9]/g, ''),
    }));
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
    if (inputName === 'cvv') {
      setIsCardFlipped(true);
    }
  };

  const handleBlur = () => {
    setFocusedInput(null);
    setIsCardFlipped(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Card Preview */}
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, isCardFlipped ? styles.cardBack : styles.cardFront]}>
            {!isCardFlipped ? (
              <>
                <Text style={styles.cardNumber}>{values.cardNumber || '#### #### #### ####'}</Text>
                <Text style={styles.cardHolder}>{values.cardName || 'CARD HOLDER'}</Text>
                <Text style={styles.expiryDate}>
                  {values.expMonth || 'MM'}/{values.expYear || 'YY'}
                </Text>
              </>
            ) : (
              <Text style={styles.cvvText}>{values.cvv || '***'}</Text>
            )}
          </Animated.View>
        </View>

        {/* Form Inputs */}
        <View style={styles.stepContainer}>
          <Text style={styles.textLabel}>Card Number</Text>
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
          <Text style={styles.textLabel}>Card Name</Text>
          <TextInput
            value={values.cardName}
            onChangeText={(text) => handleChange('cardName', text)}
            style={[
              styles.textInput,
              { borderColor: focusedInput === 'cardName' ? 'blue' : '#ababab' },
            ]}
            onFocus={() => handleFocus('cardName')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.textLabel}>Expiration Date</Text>
          <View style={styles.row}>
            <TextInput
              value={values.expMonth}
              onChangeText={(text) => handleChange('expMonth', text)}
              keyboardType="numeric"
              placeholder="MM"
              style={[
                styles.textInput,
                styles.smallInput,
                { borderColor: focusedInput === 'expMonth' ? 'blue' : '#ababab' },
              ]}
              onFocus={() => handleFocus('expMonth')}
              onBlur={handleBlur}
            />
            <TextInput
              value={values.expYear}
              onChangeText={(text) => handleChange('expYear', text)}
              keyboardType="numeric"
              placeholder="YY"
              style={[
                styles.textInput,
                styles.smallInput,
                { borderColor: focusedInput === 'expYear' ? 'blue' : '#ababab' },
              ]}
              onFocus={() => handleFocus('expYear')}
              onBlur={handleBlur}
            />
          </View>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.textLabel}>CVV</Text>
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

        <Button title="Submit" onPress={() => console.log('Form submitted:', values)} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'space-between',
  },
  cardFront: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backfaceVisibility: 'hidden',
    transform: [{ rotateY: '180deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
  },
  cardHolder: {
    color: '#fff',
    fontSize: 16,
  },
  expiryDate: {
    color: '#fff',
    fontSize: 16,
  },
  cvvText: {
    color: '#fff',
    fontSize: 18,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  textLabel: {
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  smallInput: {
    flex: 1,
  },
});

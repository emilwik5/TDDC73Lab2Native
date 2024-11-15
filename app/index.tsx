import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Text, View, Animated, TouchableWithoutFeedback, Keyboard, Button, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [months] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: (i + 1).toString().padStart(2, '0'),
      value: (i + 1).toString().padStart(2, '0'),
    }))
  );
  const [years] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: (2024 + i).toString(),
      value: (2024 + i).toString(),
    }))
  );

  const formatCardNumber = (text: any) => {
    let cleanedText = text.replace(/[^0-9]/g, ''); //digits

    cleanedText = cleanedText.slice(0, 16); // max 16 digits

    return cleanedText.replace(/(\d{4})(?=\d)/g, '$1 '); //Space every 4 digits
  };

  const formatCVV = (text: any) => {
    let cleanedText = text.replace(/[^0-9]/g, ''); //digits

    return cleanedText = cleanedText.slice(0, 4); // max 4 digits
  };

  const handleChange = (inputName: any, text: any) => {
    if (inputName === 'cardNumber') {
      setValues((prevValues) => ({
        ...prevValues,
        [inputName]: formatCardNumber(text),
      }));
    }
    else if (inputName === 'cvv') {
      setValues((prevValues) => ({
        ...prevValues,
        [inputName]: formatCVV(text),
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [inputName]: text,
      }));
    }
  };

  const handleFocus = (inputName: any) => {
    setFocusedInput(inputName);
    if (inputName === 'cvv') {
      setIsCardFlipped(true);
    }
  };

  const handleBlur = () => {
    setFocusedInput(null);
    setIsCardFlipped(false);
  };

  const backgroundImage = require('../assets/images/images/14.jpeg');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Card Preview */}
        <View style={styles.cardContainer}>
          <ImageBackground
            source={backgroundImage}
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
          >
            <Animated.View style={[styles.card, isCardFlipped ? styles.cardBack : styles.cardFront]}>
              {!isCardFlipped ? (
                <>
                  <View style={styles.cardRow}>
                    <Image
                      source={require('../assets/images/images/chip.png')}
                      style={styles.cardLogo}
                      resizeMode="contain"
                    />

                  </View>
                  <Text style={styles.cardNumber}>{values.cardNumber || '#### #### #### ####'}</Text>
                  <View>
                    <View style={styles.cardRow}>
                      <Text style={styles.cardLabel}>Card Holder</Text>
                      <Text style={styles.cardLabel}>Expires</Text>
                    </View>
                    <View style={styles.cardRow}>
                      <Text style={styles.cardHolder}>{values.cardName || 'CARD HOLDER'}</Text>
                      <Text style={styles.expiryDate}>
                        {values.expMonth || 'MM'}/{values.expYear || 'YY'}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <Text style={styles.cvvText}>{values.cvv || '***'}</Text>
              )}

            </Animated.View>
          </ImageBackground>
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
          <Text style={styles.textLabel}>Card Holders</Text>
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
        <View style={styles.row}>
          <View style={styles.doubleStepContainer}>
            <Text style={styles.textLabel}>Expiration Date</Text>
            <View style={styles.row}>
              <DropDownPicker
                open={monthOpen}
                value={values.expMonth}
                items={months}
                placeholder="Month"
                setOpen={setMonthOpen}
                setValue={(callback) => handleChange('expMonth', callback(values.expMonth))}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdownStyle} // Apply the consistent height style
              />
              <DropDownPicker
                open={yearOpen}
                value={values.expYear}
                items={years}
                placeholder="Year"
                setOpen={setYearOpen}
                setValue={(callback) => handleChange('expYear', callback(values.expYear))}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdownStyle} // Apply the consistent height style
              />
            </View>
          </View>
          <View style={styles.doubleStepContainer}>
            <Text style={styles.textLabel}>CVV</Text>
            <TextInput
              value={values.cvv}
              onChangeText={(text) => handleChange('cvv', text)}
              keyboardType="numeric"
              style={[
                styles.cvvInput,
                { borderColor: focusedInput === 'cvv' ? 'blue' : '#ababab' },
              ]}
              onFocus={() => handleFocus('cvv')}
              onBlur={handleBlur}
            />
          </View>
        </View>
        <Button
          title="Submit"
          onPress={() => console.log('Form submitted:', values)}

        />

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    height: 200,
    margin: 20,
  },
  card: {
    height: '110%',
    paddingStart: 10,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  cardRow: {
    flexDirection: 'row',
    width: '90%',
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
  cardLabel: {
    color: 'grey',
  },
  cardLogo: {
    width: '20%',
    marginTop: -20,
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
  doubleStepContainer: {
    gap: 8,
    marginBottom: 24,
    width: '65%',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    height: 49,
  },
  cvvInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    height: 49,
    width: '50%',
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
  dropdownContainer: {
    marginBottom: 24,
    gap: 8,
    width: '48.5%',
    height: 49,
  },
  dropdownStyle: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ababab',
    borderRadius: 4,
    height: 49,
  },
});

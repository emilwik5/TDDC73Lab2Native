import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Text, View, Animated, TouchableWithoutFeedback, Keyboard, Button, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
export default function HomeScreen() {
  const [logoOpacity] = useState(new Animated.Value(1));
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
  const [cardLogo, setCardLogo] = useState(require('../assets/images/images/visa.png'));

  const getCardSegments = (number: string, type: string): string[] => {
    let segments = [];
    const rawNumber = number.replace(/\D/g, ''); 

    if (type === 'amex') {
      // amex
      segments = [
        rawNumber.slice(0, 4).padEnd(4, '#'),
        rawNumber.slice(4, 10).padEnd(6, '#'),
        rawNumber.slice(10, 15).padEnd(5, '#'),
      ];
    } else {
      // standard
      segments = [
        rawNumber.slice(0, 4).padEnd(4, '#'),
        rawNumber.slice(4, 8).padEnd(4, '#'),
        rawNumber.slice(8, 12).padEnd(4, '#'),
        rawNumber.slice(12, 16).padEnd(4, '#'),
      ];
    }
    return segments;
  }

  const getCardType = (number: string): string => {
    if (/^3[47]/.test(number)) return 'amex'; 
    return 'default'; 
  };

  const handleCardNumberDisplay = (number: string) => {
    const cardType = getCardType(number);
    return getCardSegments(number, cardType).join(' '); 
  };

  const displayedCardNumber = handleCardNumberDisplay(values.cardNumber);

  const getUppercaseCardName = (name: string): string => {
    return name.toUpperCase();
  };
  
  const [months] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: (i + 1).toString().padStart(2, '0'),
      value: (i + 1).toString().padStart(2, '0'),
    }))
  );
  const [years] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: (2024 + i).toString(),
      value: (24 + i).toString(),
    }))
  );

  const handleChange = (inputName: string, text: string) => {
    if (inputName === 'cardNumber') {
      const formattedNumber = text.replace(/[^0-9]/g, '').slice(0, 16); 
  
      setValues((prevValues) => ({
        ...prevValues,
        [inputName]: formattedNumber,
      }));
  
      handleBank(formattedNumber); 
    } else if (inputName === 'cvv') {
      setValues((prevValues) => ({
        ...prevValues,
        [inputName]: text.replace(/[^0-9]/g, '').slice(0, 4), 
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

  const handleBank = (inputNr: string) => {
    const firstDigits = inputNr.replace(/\s/g, '').slice(0, 4);

    Animated.timing(logoOpacity, {
      toValue: 0, 
      duration: 200, 
      useNativeDriver: true, 
    }).start(() => {
      
      if (firstDigits.startsWith('36')) {
        setCardLogo(require('../assets/images/images/dinersclub.png'));
      } else if (firstDigits.startsWith('35')) {
        setCardLogo(require('../assets/images/images/jcb.png'));
      } else if (firstDigits.startsWith('34')) {
        setCardLogo(require('../assets/images/images/amex.png'));
      } else if (firstDigits.startsWith('5')) {
        setCardLogo(require('../assets/images/images/mastercard.png'));
      } else if (firstDigits.startsWith('62')) {
        setCardLogo(require('../assets/images/images/unionpay.png'));
      } else if (firstDigits.startsWith('6')) {
        setCardLogo(require('../assets/images/images/discover.png'));
      } else if (firstDigits.startsWith('9792')) {
        setCardLogo(require('../assets/images/images/troy.png'));
      } else {
        setCardLogo(require('../assets/images/images/visa.png'));
      }

      Animated.timing(logoOpacity, {
        toValue: 1, 
        duration: 200,
        useNativeDriver: true, 
      }).start();
    });
  };

  const handleBlur = () => {
    setFocusedInput(null);
    setIsCardFlipped(false);
  };

  const backgroundImage = require('../assets/images/images/4.jpeg');

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
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
                      <Animated.Image
                        source={cardLogo}
                        style={[styles.cardLogo, {opacity: logoOpacity}]}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.cardNumber}>{displayedCardNumber}</Text>
                    <View>
                      <View style={styles.cardRow}>
                        <Text style={styles.cardLabel}>Card Holder</Text>
                        <Text style={styles.cardLabel}>Expires</Text>
                      </View>
                      <View style={styles.cardRow}>
                        <Text style={styles.cardHolder}>{values.cardName ? getUppercaseCardName(values.cardName) : 'FULL NAME'}</Text>
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

          <View style={styles.formContainer}>
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
                    style={styles.dropdownStyle}
                  />
                  <DropDownPicker
                    open={yearOpen}
                    value={values.expYear}
                    items={years}
                    placeholder="Year"
                    setOpen={setYearOpen}
                    setValue={(callback) => handleChange('expYear', callback(values.expYear))}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdownStyle}
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
        </View>
      </TouchableWithoutFeedback>
    );    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#add8e6', 
  },
  cardContainer: {
    height: 200,
    width: 300,
    margin: 20,
    position: 'absolute',
    zIndex: 1,
    right: 32,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4,
    elevation: 5, 
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
    width: 50, 
    height: 30, 
    resizeMode: 'contain', 
    alignSelf: 'flex-end', 
    marginRight: 10, 
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
  formContainer: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    padding: 20,
    paddingTop: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
    marginVertical: 20,
    marginTop: 120,
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    height: 49,
    backgroundColor: '#f9f9f9',
  },
  cvvInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    height: 49,
    width: '50%',
    backgroundColor: '#f9f9f9',
  },
  textLabel: {
    fontSize: 14,
    color: '#555',
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
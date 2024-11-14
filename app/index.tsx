import React, { useState } from 'react';
<<<<<<< Updated upstream
import { Image, StyleSheet, TextInput, Text, View, Animated, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
=======
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
>>>>>>> Stashed changes

export default function HomeScreen() {
  const [values, setValues] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
<<<<<<< Updated upstream
  const [isCardFlipped, setIsCardFlipped] = useState(false);
=======
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const minCardYear = 2024; // Starting year for the year dropdown
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
    <View>
      <View style={styles.titleContainer}></View>

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
          keyboardType="default"
          style={[
            styles.textInput,
            { borderColor: focusedInput === 'cardName' ? 'blue' : '#ababab' },
          ]}
          onFocus={() => handleFocus('cardName')}
          onBlur={handleBlur}
        />
      </View>

      {/* Row for labels */}
      <View style={styles.labelRow}>
        <Text style={styles.textLabel}>Expiration Date</Text>
        <Text style={styles.textLabel}>CVV</Text>
      </View>

      {/* Row for pickers and CVV input */}
      <View style={styles.rowContainer}>
        {/* Month Picker */}
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Month" value="" />
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <Picker.Item
              key={month}
              label={month < 10 ? '0' + month : month.toString()}
              value={month < 10 ? '0' + month : month.toString()}
            />
          ))}
        </Picker>

        {/* Year Picker */}
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Year" value="" />
          {Array.from({ length: 12 }, (_, i) => minCardYear + i).map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
          ))}
        </Picker>

        {/* CVV Input */}
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

      <Button
        title="Submit"
        onPress={() => alert('Submit Pressed')}
      />
    </View>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    marginBottom: 12,
=======
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
>>>>>>> Stashed changes
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
<<<<<<< Updated upstream
    padding: 10,
    fontSize: 16,
=======
    padding: 8,
    flex: 1,
>>>>>>> Stashed changes
  },
  textLabel: {
    fontSize: 14,
    color: '#555',
  },
<<<<<<< Updated upstream
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  smallInput: {
    flex: 1,
=======
  picker: {
    flex: 1,
    height: 50,
>>>>>>> Stashed changes
  },
});

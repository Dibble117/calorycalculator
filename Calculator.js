import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const RadioButton = ({ label, value, selected, onSelect }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    }}
    onPress={() => onSelect(value)}
  >
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: selected ? '#007bff' : '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#007bff' }} />}
    </View>
    <Text style={{ marginLeft: 10 }}>{label}</Text>
  </TouchableOpacity>
);

const CalorieCalculator = () => {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [intensity, setIntensity] = useState('1.3');
  const [calories, setCalories] = useState('');
  const [isIntensityModalVisible, setIntensityModalVisible] = useState(false);

  const calculateCalories = () => {
    if (weight === '') {
      return;
    }

    const m = parseFloat(weight);
    const k = parseFloat(intensity);

    let E = 0;

    if (gender === 'male') {
      E = (879 + 10.2 * m) * k;
    } else {
      E = (795 + 7.18 * m) * k;
    }

    setCalories(E.toFixed());
  };

  const toggleIntensityModal = () => {
    setIntensityModalVisible(!isIntensityModalVisible);
  };

  const handleIntensitySelection = (selectedIntensity) => {
    setIntensity(selectedIntensity);
    toggleIntensityModal();
  };

  return (
    <View>
        <Text>Weight:</Text>
        <View style={{ marginBottom: 10 }} />
        <TextInput
        onChangeText={text => setWeight(text)}
        style={{backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5}}
        value={weight}
        keyboardType="numeric"
        placeholder="Enter your weight"
        />
        <View style={{ marginBottom: 10 }} />

    <Text>Intensity:</Text>
    <View style={{ marginBottom: 10 }} />
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <TouchableOpacity
    onPress={toggleIntensityModal}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    }}
  >

    <Text style={{ fontSize: 16 }}>
      {intensity === '1.3' ? 'Light' :
      intensity === '1.5' ? 'Usual' :
      intensity === '1.7' ? 'Moderate' :
      intensity === '2.0' ? 'Hard' :
      intensity === '2.2' ? 'Very Hard' : 'Select Intensity'}
    </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={{ marginLeft: 5 }} />
  </TouchableOpacity>
</View>
      <View style={{ marginBottom: 10 }} />
      <Text>Gender:</Text>
      <View style={{ marginBottom: 10 }} />
      <RadioButton label="Male" value="male" selected={gender === 'male'} onSelect={setGender} />
      <RadioButton label="Female" value="female" selected={gender === 'female'} onSelect={setGender} />

      <View style={{ marginBottom: 10 }} />
      {calories !== '' && <Text>Calories: {calories}</Text>}
      <Button title="Calculate" onPress={calculateCalories} />

      <Modal visible={isIntensityModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Picker
            selectedValue={intensity}
            onValueChange={handleIntensitySelection}
          >
            <Picker.Item label="Light" value="1.3" />
            <Picker.Item label="Usual" value="1.5" />
            <Picker.Item label="Moderate" value="1.7" />
            <Picker.Item label="Hard" value="2.0" />
            <Picker.Item label="Very Hard" value="2.2" />
          </Picker>
          <Button title="Back" onPress={toggleIntensityModal} />
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalorieCalculator;
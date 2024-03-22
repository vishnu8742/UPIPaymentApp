import React, { useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import UpiPayment from 'react-native-upi-payment';
import OneUpi from 'one-react-native-upi'

export default function App() {
  const [transactionId, setTransactionId] = useState(null);
  function callBackFunction(data){
    if(data.Status == 'Success'){
      Alert.alert('Success', 'Payment Success ' + data.txnId);
      setTransactionId(data.txnId);
    }else if(data.Status == 'Failure'){
      Alert.alert('Failure', JSON.stringify(data));
    }else{
      Alert.alert('Error', JSON.stringify(data));
    }
  }

  function secondCallBackFunction(data){
    if(data.Status == 'Success'){
      Alert.alert('2 Success', 'Payment Success ' + data.txnId);
      setTransactionId(data.txnId);
    }else if(data.Status == 'Failure'){
      Alert.alert('2 Failure', JSON.stringify(data));
    }else{
      Alert.alert('2 Error', JSON.stringify(data));
    }
  }

  const config =  {
    upiId: 'q750072143@ybl',
    name: 'KATREDDY SATHYANARAYANA',
    note: 'Test payment',
    amount: '1',
    targetPackage: "",
    }
   
    const onSuccess = (data) => {
        Alert.alert('Success', 'Payment Success ' + data.txnId);
        setTransactionId(data.txnId);
    }
    const onFailure = (data) => {
      Alert.alert('Failed', 'Payment Failed ' + data.txnId);
    }

  const initiatePayment = async () => {
    try {
      const response = await UpiPayment.initializePayment({
        vpa: 'q750072143@ybl', // Replace this with your UPI ID
        payeeName: 'KATREDDY SATHYANARAYANA', // Replace this with the name of the payee
        amount: '1.00', // Amount to be paid
        transactionRef: 'txn130', // Your transaction reference ID
        transactionNote: 'Test payment#130', // Note for the transaction
      }, callBackFunction, secondCallBackFunction);
      
      // If payment is successful, you'll receive a response with transaction ID
      Alert.alert('message', 'Success');
      // setTransactionId(response.transactionId);
    } catch (error) {
      Alert.alert('Error', 'Failed.');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
      <Button title="Initiate Payment" onPress={initiatePayment} />

      <Button
          title="Pay now"
          onPress={() =>
            OneUpi.initiate(
              config,
              onSuccess,
              onFailure,
            )
          }
        />
      {transactionId && <Text>Transaction ID: {transactionId}</Text>}
    </View>
  );
}

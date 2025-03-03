import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { requestCheckout } from '../../helper_funcs';
import RoomZoom from './RoomZoom';
import './Payment.css';

function Payment () {

  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe('pk_test_51QxRTwCGr4KIB7NcBkCAmeZQSwZX5sNq0V0O4OaOdnzxnJ3xAyWRT9hOE0nKN73f6lsrQfpSM0cuIu6wTrNNbBr500rorDyi3Z');
  const { name, image, price } = useLocation().state.from;

  useEffect( () => {
      requestCheckout({name, price}).then( secret => {
        setClientSecret(secret);
      }) }, []);

  return (
    <div id="payment">
      <RoomZoom/>
      { stripePromise && clientSecret && (
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>
        <EmbeddedCheckout name={name} price={price}/>
      </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default Payment

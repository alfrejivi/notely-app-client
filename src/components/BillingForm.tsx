import React, { useState, FormEvent } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import LoaderButton from './LoaderButton';
import { injectStripe, CardElement, ReactStripeElements } from 'react-stripe-elements';
import { useFormFields } from '../libs/hooksLib';

import './BillingForm.css';

interface BillingFormProps extends ReactStripeElements.InjectedStripeProps {
    isLoading: boolean,
    onSubmit: (storage: string, stripe: { token: stripe.Token | undefined, error: stripe.Error | undefined }) => void
}

const BillingForm: React.FC<BillingFormProps> = (props) => {
    const { isLoading, onSubmit, stripe } = props;

    const [fields, handleFieldChange] = useFormFields({
        name: '',
        storage: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);

    const loading = isProcessing || isLoading;
    const validateForm = () => {
        return (
            fields.name !== '' && fields.storage !== '' && isCardComplete
        );
    }

    const handleSubmitClick = async (event: FormEvent) => {
        event.preventDefault();
        setIsProcessing(true);

        if (stripe) {
            const { token, error } = await stripe.createToken({ name: fields.name });
            setIsProcessing(false);
            onSubmit(fields.storage, { token, error });
        }

    }

    return (
        <form className="BillingForm" onSubmit={handleSubmitClick}>
            <FormGroup bsSize="large" controlId="storage">
                <ControlLabel>Storage</ControlLabel>
                <FormControl
                    min="0"
                    type="number"
                    value={fields.storage}
                    onChange={handleFieldChange}
                    placeholder="Number of notes to store"
                />
            </FormGroup>
            <hr />
            <FormGroup bsSize="large" controlId="name">
                <ControlLabel>Cardholder&apos;s name</ControlLabel>
                <FormControl
                    type="text"
                    value={fields.name}
                    onChange={handleFieldChange}
                    placeholder="Name on the card"
                />
            </FormGroup>
            <ControlLabel>Credit Card Info</ControlLabel>
            <CardElement
                className="card-field"
                onChange={e => setIsCardComplete(e.complete)}
                style={{
                    base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                }}
            />
            <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={loading}
                disabled={!validateForm()}
            >
                Purchase
          </LoaderButton>
        </form>
    );
}

export default injectStripe(BillingForm);
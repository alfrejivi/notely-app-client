import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { API } from 'aws-amplify';
import { AuthProps } from '../App';
import { StripeProvider, Elements } from 'react-stripe-elements';
import BillingForm from '../components/BillingForm';

import './Settings.css';
import config from '../config';

interface SettingsProps extends RouteComponentProps, AuthProps { }

const Settings: React.FC<SettingsProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const billUser = (details: any) => {
        return API.post('notes', '/billing', {
            body: details
        });
    }

    const handleFormSubmit = async (storage: string, stripe: { token: stripe.Token | undefined, error: stripe.Error | undefined }) => {
        const { error, token } = stripe;
        if (error) { alert(error); return; }
        setIsLoading(true);
        try {
            await billUser({
                storage,
                source: token!.id
            });

            alert("Your card has been charged successfully!");
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Settings">
            <StripeProvider apiKey={config.STRIPE_KEY!}>
                <Elements>
                    <BillingForm
                        stripe={null}
                        elements={null}
                        isLoading={isLoading}
                        onSubmit={handleFormSubmit}
                    />
                </Elements>
            </StripeProvider>
        </div>
    );
}

export default Settings;
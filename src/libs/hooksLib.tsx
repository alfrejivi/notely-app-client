import { useState, FormEvent } from 'react';
import { FormControl, Alert } from 'react-bootstrap';


function useFormFields<T>(initialState: T): [T, (event: FormEvent<FormControl>) => void] {
    const [fields, setValues] = useState(initialState);
    return [
        fields,
        (event) => {
            const target = event.target as HTMLInputElement;
            setValues({
                ...fields,
                [target.id]: target.value
            })
        }
    ];
}

export { useFormFields };

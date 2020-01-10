import { useState, FormEvent } from 'react';
import { FormControl } from 'react-bootstrap';


const useFormFields = (initialState: any): [any, (event: FormEvent<FormControl>) => void] => {
    const [fields, setValues] = useState(initialState);
    return [
        fields,
        (event) => {
            const target = event.target as HTMLTextAreaElement;
            setValues({
                ...fields,
                [target.id]: target.value
            })
        }
    ];
}

export { useFormFields };

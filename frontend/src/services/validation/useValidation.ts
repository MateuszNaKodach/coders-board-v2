import { useContext } from 'react';
import { ValidationContext } from './ValidationProvider';

export const useValidation = () => useContext(ValidationContext);

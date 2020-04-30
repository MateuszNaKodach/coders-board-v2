import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from '@typings/redux';

export const useDispatch = () => useReduxDispatch<AppDispatch>();

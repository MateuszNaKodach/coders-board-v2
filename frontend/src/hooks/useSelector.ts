import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@typings/redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

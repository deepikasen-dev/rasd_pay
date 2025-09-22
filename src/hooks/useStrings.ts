// src/hooks/useStrings.ts
import { useSelector } from 'react-redux';
import strings from '../utils/strings';
import { RootState } from '../redux/store';

export const useStrings = () => {
    const languageId = useSelector( ( state: RootState ) => state.language.id );

    // This forces re-render when Redux language changes
    return strings;
};

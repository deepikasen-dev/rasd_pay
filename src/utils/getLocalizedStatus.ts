import strings from "./strings";

export const getLocalizedStatus = ( status: string ) => {
    switch ( status.toLowerCase() ) {
        case 'approved':
            return strings.approved;
        case 'pending':
            return strings.pending;
        case 'rejected':
            return strings.rejected;
        default:
            return status; // fallback if unknown
    }
};

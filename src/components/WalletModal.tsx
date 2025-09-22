/**
 * @file src/components/WalletModal.tsx
 * @description Reusable modal component for displaying wallet summary.
 * @lastUpdated 2025-09-22T11:30:00.000Z
 */

import React from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import { hp, wp } from '../utils/globalUse';
import colors from '../utils/colors';
import SvgImages from '../utils/svgImages';
import strings from '../utils/strings';

interface WalletModalProps {
    visible: boolean;
    onClose: () => void;
    funds: {
        funds_received?: string;
        funds_spent?: string;
        remaining_balance?: string;
    } | null;
}

const WalletModal: React.FC<WalletModalProps> = ( { visible, onClose, funds } ) => {
    return (
        <Modal
            visible={ visible }
            animationType="slide"
            transparent={ true }
            onRequestClose={ onClose }
        >
            <View style={ styles.modalOverlay }>
                <View style={ styles.modalContent }>
                    <Text style={ styles.modalTitle }>{ strings.walletSummary }</Text>

                    {/* Row 1 */ }
                    <View style={ styles.summaryCard }>
                        <View>
                            <Text style={ styles.summaryLabel }>{ strings.fundReceived }</Text>
                            <Text style={ styles.summaryAmount }>
                                ${ funds?.funds_received || '0.00' }
                            </Text>
                        </View>
                        <SvgImages.CircleArrowDownSVG />
                    </View>

                    {/* Row 2 */ }
                    <View style={ styles.summaryCard }>
                        <View>
                            <Text style={ styles.summaryLabel }>{ strings.fundSpent }</Text>
                            <Text style={ styles.summaryAmount }>
                                ${ funds?.funds_spent || '0.00' }
                            </Text>
                        </View>
                        <SvgImages.CircleArrowUpSVG />
                    </View>

                    {/* Row 3 */ }
                    <View style={ styles.summaryCard }>
                        <View>
                            <Text style={ styles.summaryLabel }>{ strings.remainingBalance }</Text>
                            <Text style={ styles.summaryAmount }>
                                ${ funds?.remaining_balance || '0.00' }
                            </Text>
                        </View>
                        <SvgImages.BalanceSVG />
                    </View>

                    {/* Close Button */ }
                    <Pressable style={ styles.closeButton } onPress={ onClose }>
                        <Text style={ styles.closeText }>{strings.close}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create( {
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        height: hp( 60 ),
    },
    modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
    summaryCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: hp( 3 ),
        paddingVertical: hp( 1 ),
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryLabel: { fontSize: 14, color: '#475569', marginVertical: hp( 0.5 ) },
    summaryAmount: {
        fontSize: wp( 5 ),
        fontWeight: '700',
        color: '#000000',
        marginVertical: hp( 0.5 ),
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeText: { color: colors.primaryText, fontWeight: '600' },
} );

export default WalletModal;

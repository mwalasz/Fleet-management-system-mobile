import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';

const ButtonModalSection = ({
    summary,
    acceptAction,
    hideModal: cancelAction,
    isError,
    isSent,
    isSending,
    isSuccess,
}) => {
    const StatusIcon = () => {
        if (isSuccess) {
            return <Icon name="check-circle" />;
        } else if (isError) {
            return <Icon name="exclamation-circle" />;
        }
    };

    if (summary) {
        return (
            <View style={styles.container}>
                <Button
                    title={
                        (isSuccess && 'Gotowe') ||
                        (isError && 'Błąd') ||
                        'Zapisz'
                    }
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={StatusIcon()}
                    containerStyle={styles.multiButtons}
                    loading={isSending}
                    disabled={isError || isSent}
                    onPress={acceptAction}
                />
                <Button
                    title={'Anuluj'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={<Icon name="times-circle" />}
                    containerStyle={styles.multiButtons}
                    buttonStyle={{ backgroundColor: '#E80000' }}
                    onPress={cancelAction}
                />
            </View>
        );
    } else {
        return (
            <Button
                title={'Gotowe'}
                titleStyle={{ marginRight: 10 }}
                iconRight
                icon={<Icon name="check-circle" />}
                containerStyle={styles.singleButton}
                onPress={cancelAction}
            />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    multiButtons: {
        padding: 5,
        width: 130,
    },
    singleButton: {
        alignSelf: 'stretch',
    },
});

const mapStateToProps = (state) => {
    return {
        isSent: state.postReducer.isSent,
        isError: state.postReducer.isError,
        isSending: state.postReducer.isSending,
        isSuccess: state.postReducer.isSuccess,
    };
};

export default connect(mapStateToProps)(ButtonModalSection);

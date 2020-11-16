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
                    title={(isSuccess && 'Powrót') || 'Anuluj'}
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                    icon={
                        <Icon
                            name={isSuccess ? 'chevron-right' : 'times-circle'}
                        />
                    }
                    containerStyle={styles.multiButtons}
                    buttonStyle={{
                        backgroundColor: isSuccess ? '#2196F3' : '#E80000',
                    }}
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
        isSent: state.post.isSent,
        isError: state.post.isError,
        isSending: state.post.isSending,
        isSuccess: state.post.isSuccess,
    };
};

export default connect(mapStateToProps)(ButtonModalSection);

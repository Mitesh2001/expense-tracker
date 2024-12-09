import React, { ComponentProps, FC } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface InputProps {
    label: string;
    textInputConfig: ComponentProps<typeof TextInput>;
    style?: StyleProp<ViewStyle>
}

const Input: FC<InputProps> = ({ label, style, textInputConfig }) => {

    const inputStyles = [styles.input, textInputConfig.multiline && styles.inputMultiline]

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
        borderRadius: 6
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    }
})

export default Input;

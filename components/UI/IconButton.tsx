import React, { ComponentProps, FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

interface IconButtonProps {
    icon: ComponentProps<typeof Ionicons>['name'];
    color: ComponentProps<typeof Ionicons>['color'];
    size: ComponentProps<typeof Ionicons>['size'];
    onPress: () => void
}

const IconButton: FC<IconButtonProps> = ({ icon, color, size, onPress }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} color={color} size={size} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})

export default IconButton;

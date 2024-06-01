import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import { auth } from 'utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthFlowSchema from 'utils/AuthFlowSchema';
import { setItem } from '~/store/storage';
import { router } from 'expo-router';

interface AuthFlowState {
    email: string,
    password: string
}

const AuthSignIn = () => {

    const handleSignUp = async (values: AuthFlowState) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log('User signed in successfully:', userCredential.user);

            // Store user info
            await storeUserInfo(userCredential.user);

            router.navigate('(dashboard)');

        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const storeUserInfo = async (user: any) => {
        try {
            setItem('@user_id', user.uid);
            setItem('@user_email', user.email);
            setItem('@email_verified', JSON.stringify(user.emailVerified));
            setItem('@access_token', user.stsTokenManager.accessToken);
            setItem('@refresh_token', user.stsTokenManager.refreshToken);
            setItem('@token_expiration', JSON.stringify(user.stsTokenManager.expirationTime));
        } catch (error) {
            console.error('Error storing user info:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.header}>Sign In</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={AuthFlowSchema}
                    onSubmit={values => handleSignUp(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#aaa"
                            />
                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                                autoCapitalize="none"
                                placeholderTextColor="#aaa"
                            />
                            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthSignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6200EE',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

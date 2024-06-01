import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import { auth } from 'utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthFlowSchema from 'utils/AuthFlowSchema'
import { setItem, getItem } from '~/store/storage';

interface AuthFlowState {
    email: string,
    password: string
}

const AuthFlow = () => {
    const handleSignUp = async (values: AuthFlowState) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('User signed up successfully:', userCredential.user);

            // Store user info
            await storeUserInfo(userCredential.user);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    // Use MKVV storage because it is really fast... 
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
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>
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
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <Button title="Sign Up" onPress={handleSubmit as any} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default AuthFlow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 12,
    },
});

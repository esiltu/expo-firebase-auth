import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import { auth } from 'utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthFlowSchema from 'utils/AuthFlowSchema'
import { setItem } from '~/store/storage';
import { router } from 'expo-router';


interface AuthFlowState {
    email: string,
    password: string
}

const AuthSignUp = () => {

    const handleSignUp = async (values: AuthFlowState) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('User signed up successfully:', userCredential.user);

            router.navigate('/sign-in')

        } catch (error) {
            console.error('Error signing up:', error);
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

export default AuthSignUp;

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

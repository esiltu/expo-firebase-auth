import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Button, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { auth } from 'utils/firebase';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import AuthFlowSchema from 'utils/AuthFlowSchema';
import { setItem } from '~/store/storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';


interface AuthFlowState {
    email: string,
    password: string
}

const AuthSignIn = () => {

    const { t } = i18n;

    const handleSignUp = async (values: AuthFlowState, resetForm: any) => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log('User signed in successfully:', userCredential.user);

            await storeUserInfo(userCredential.user);

            Toast.show({
                type: 'success',
                text1: `${t('SignIn-Success.login-success')}`,
                text2: `${t('SignIn-Success.login-success-second')}`,
                position: 'top',
            });

            router.navigate('(dashboard)');

            resetForm();

        } catch (error) {

            Toast.show({
                type: 'error',
                text1: `${t('SignIn-Failed.login-failed')}`,
                text2: `${t('SignIn-Failed.login-failed-second')}`,
                position: 'top',
            });

            console.log("Something went wrong?", error)

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

    const goToSignUpPageBtn = () => {
        try {
            router.navigate('/sign-up')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.header}>{t('SignIn-Form.form-title')}</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={AuthFlowSchema}
                        onSubmit={(values, { resetForm }) => handleSignUp(values, resetForm)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, resetForm, values, errors, touched }) => (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('SignIn-Form.form-input-email')}
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
                                    placeholder={t('SignIn-Form.form-input-password')}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    placeholderTextColor="#aaa"
                                />
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                <Button onPress={handleSubmit as any} title={t('SignIn-Form.form-button-title')} />
                                <Button onPress={goToSignUpPageBtn as any} title='Geen account? Registreer nu nog!' />
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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

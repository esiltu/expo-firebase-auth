import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik, } from 'formik';
import { auth } from 'utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthFlowSchema from 'utils/AuthFlowSchema'
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';


interface AuthFlowState {
    email: string,
    password: string
}

const AuthSignUp = () => {

    const { t } = i18n;

    const handleSignUp = async (values: AuthFlowState, resetForm: any) => {
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('User signed up successfully:', userCredential.user);

            router.navigate('/sign-in');

            Toast.show({
                type: 'success',
                text1: `${t('SignUp-Success.register-success')}`,
                text2: `${t('SignUp-Success.register-success-second')}`,
                position: 'top',
            });

            resetForm();

        } catch (error) {

            Toast.show({
                type: 'error',
                text1: `${t('SignUp-Failed.register-registration-failed')}`,
                text2: `${t('SignUp-Failed.register-registration-failed-second')}`,
                position: 'top',
            });

            console.error('Error signing up:', error);
        }
    };


    const goToSignInPageBtn = () => {
        try {
            router.navigate('/sign-in')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t("SignIn-Form.form-title")}</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={AuthFlowSchema}
                onSubmit={(values, { resetForm }) => handleSignUp(values, resetForm)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={t('SignIn-Form.form-input-email')}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
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
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <Button title={t('SignUp-Success.btn-text')} onPress={handleSubmit as any} />
                        <Button title="Heb je al een account? Log in" onPress={goToSignInPageBtn as any} />
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

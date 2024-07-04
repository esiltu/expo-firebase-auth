import * as Yup from 'yup';

import i18n from '~/hooks/useTranslation';

const { t } = i18n;

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email(t('Form-Validation.email-invalid')).required(t('Form-Validation.required')),
    password: Yup.string().min(6, t('Form-Validation.password-invalid')).required(t('Form-Validation.required')),
});


export default SignUpSchema
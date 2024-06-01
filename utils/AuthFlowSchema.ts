import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short!').required('Required'),
});


export default { SignUpSchema }
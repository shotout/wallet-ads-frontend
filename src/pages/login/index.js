import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { setAuthorizationCookie } from '../../helpers/auth';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import { requestLogin } from '../../utils/requests';
import DefaultButton from '../../components/default-button';
import Iconify from '../../components/Iconify';
import Page from "../../components/Page";
import useStyles from "./styles";
import AuthFooter from '../../components/auth-footer';
import { routes } from '../../helpers/routes';
const appIcon = '/assets/wallet_ads_logo.png'

const defaultErrorState = {
    email: null,
    password: null,
    errorValidation: null
}

export default function Login() {
    const styles = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        isLoading: false
    });
    const [errorMessage, setErrorMessage] = useState(defaultErrorState)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };


    const handleSubmit = async () => {
        try {
            setErrorMessage({
                email: null,
                password: null,
                errorValidation: null
            })
            setValues({ ...values, isLoading: true })
            const body = {
                email: values.email,
                password: values.password
            }
            const res = await requestLogin(body)
            setAuthorizationCookie(res)
            window.location.href = '/'
            // setValues({ ...values, isLoading: false })
        } catch (err) {
            if (err.data) {
                if (err.data.errors) {
                    setErrorMessage(responseValidatorObj(err.data.errors))
                }
                if(err.data.message && !err.data.errors){
                    setErrorMessage({
                        email: null,
                        password: null,
                        errorValidation: err.data.message
                    })
                }
            }
            setValues({ ...values, isLoading: false })
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function renderHeader() {
        return (
            <div className={styles.ctnHeader}>
                <img src={appIcon} alt="wallet-ads" />
            </div>
        )
    }

    function renderForgotPassword() {
        return (
            <div className={styles.ctnForgotPassword}>
                <span>Forgot Password</span>
            </div>
        )
    }

    function renderDirectRegister() {
        return (
            <div className={styles.ctnDirectRegister}>
                <span>New here?</span>
                <div>
                    <Link href={routes.register}>
                        Create an account now
                    </Link>
                </div>
            </div>
        )
    }

    function renderRedBox(){
        if(errorMessage.errorValidation){
            return (
                <div className={styles.ctnRedBox}>
                    <Typography variant="body1" color="#fff" textAlign={"center"}>
                        {errorMessage.errorValidation}
                    </Typography>
                </div>
            )
        }
        return null
    }

    function renderInput() {
        return (
            <div className={styles.ctnInput}>
                <div className={styles.ctnTitle}>
                    <Typography variant="h4" fontWeight={"800"} textAlign={"center"}>
                        Login
                    </Typography>
                </div>
                {renderRedBox()}
                <div className={styles.ctnForm}>
                    <div className={styles.inputWrapper}>
                        <TextField
                            value={values.email}
                            onChange={handleChange('email')}
                            fullWidth
                            error={errorMessage.email}
                            helperText={errorMessage.email}
                            placeholder="Email" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <TextField
                            fullWidth
                            placeholder="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            error={errorMessage.password}
                            helperText={errorMessage.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                            {values.showPassword ? (
                                                <Iconify icon="eva:eye-fill" width={24} height={24} />
                                            ) : (
                                                <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    {renderForgotPassword()}
                </div>
                <DefaultButton onClick={handleSubmit} isLoading={values.isLoading} label={"Login"} />
                {renderDirectRegister()}
            </div>
        )
    }

    return (
        <Page title="Login">
        <meta name="description" content="Login to your WALLETADS account now!" />
            <div className={styles.ctnRoot}>
                {renderHeader()}
                {renderInput()}
                <AuthFooter />
            </div>
        </Page>
    )
}
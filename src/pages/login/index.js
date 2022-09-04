import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Layout from '../../layouts';
import DefaultButton from '../../components/default-button';
import Iconify from '../../components/Iconify';
import Page from "../../components/Page";
import useStyles from "./styles";
const appIcon = '/assets/wallet_ads_logo.png'


Login.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default function Login(){
    const styles = useStyles()
    const [values, setValues] = useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function renderHeader(){
        return (
            <div className={styles.ctnHeader}>
                <img src={appIcon} alt="wallet-ads" />
            </div>
        )
    }

    function renderForgotPassword(){
        return (
            <div className={styles.ctnForgotPassword}>
                <span>Forgot Password</span>
            </div>
        )
    }

    function renderDirectRegister(){
        return (
            <div className={styles.ctnDirectRegister}>
                <span>New here?</span>
                <div>
                    <span>Create an account now</span>
                </div>
            </div>
        )
    }

    function renderInput(){
        return (
            <div className={styles.ctnInput}>
                <div className={styles.ctnTitle}>
                    <Typography variant="h4" textAlign={"center"}>
                        Login
                    </Typography>
                </div>
                <div className={styles.ctnForm}>
                    <div className={styles.inputWrapper}>
                        <TextField size='small' fullWidth label="Email" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                size='small'
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {values.showPassword ? (
                                        <Iconify icon="eva:eye-fill" width={24} height={24} />
                                    ) : (
                                        <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                                    )}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    {renderForgotPassword()}
                </div>
                    <DefaultButton label={"Login"} />
                {renderDirectRegister()}
            </div>
        )
    }

    return (
        <Page title="Login">
            <div className={styles.ctnRoot}>
                {renderHeader()}
                {renderInput()}
            </div>
        </Page>
    )
}
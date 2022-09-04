import { Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import DefaultButton from '../../components/default-button';
import Page from "../../components/Page";
import useStyles from "./styles";
const appIcon = '/assets/wallet_ads_logo.png'

export default function Register(){
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

    function renderDirect(){
        return (
            <div className={styles.ctnDirectRegister}>
                <span>Already have an account?</span>
                <div>
                    <span>Login</span>
                </div>
            </div>
        )
    }

    function renderInput(){
        return (
            <div className={styles.ctnInput}>
                <div className={styles.ctnTitle}>
                    <Typography variant="h4" textAlign={"center"}>
                        Create an account
                    </Typography>
                </div>
                <div className={styles.ctnForm}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Company Name" />
                            </div> 
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Tax ID" />
                            </div> 
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="First Name" />
                            </div> 
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Last Name" />
                            </div> 
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Street" />
                            </div> 
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <div className={styles.inputWrapper}>
                                        <TextField size='small' fullWidth label="Post Code" />
                                    </div> 
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className={styles.inputWrapper}>
                                        <TextField size='small' fullWidth label="City" />
                                    </div> 
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Email address" />
                            </div> 
                        </Grid>
                        
                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Telephone" />
                            </div> 
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Create Password" />
                            </div> 
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div className={styles.inputWrapper}>
                                <TextField size='small' fullWidth label="Confrim Password" />
                            </div> 
                        </Grid>
                    </Grid>
                </div>
                <DefaultButton ctnBtnStyle={styles.btnStyle} label={"Create account"} />
                {renderDirect()}
            </div>
        )
    }

    return (
        <Page title="Register">
            <div className={styles.ctnRoot}>
                {renderHeader()}
                {renderInput()}
            </div>
        </Page>
    )
}
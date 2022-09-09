import { Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import DefaultButton from '../../../components/default-button';
import AvatarPicker from '../../../components/avatar-picker';
import HeaderUser from "../../../components/header-user"
import Page from "../../../components/Page"
import useStyles from './styles'
import Layout from '../../../layouts';
import Iconify from '../../../components/Iconify';
import { getUserData, setAuthorizationCookie } from '../../../helpers/auth';
import responseValidatorObj from '../../../helpers/responseValidatorObj';
import { handleUpdateProfile } from '../../../utils/requests';
import AuthFooter from '../../../components/auth-footer';


SettingUser.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const defaultState = {
    company_name:"",
    tax_id:"",
    first_name:"",
    last_name:"",
    street:"",
    post_code:"",
    city:"",
    phone:"",
    email:"",
    password:"",
    password_confirmation:"",
}

export default function SettingUser({ userData }){
    const styles = useStyles()
    const [avatarSource, setAvatarSource] = useState(null)
    const [values, setValues] = useState(userData.data);
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(defaultState)


    const handleChangePicture = (acceptedFiles) => {
        const file = acceptedFiles[0]
        setAvatarSource(Object.assign(file, {
            preview: URL.createObjectURL(file),
        }))
    }

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    const handleSubmit = async() => {
        try{
            setLoading(true)
            const form = new FormData()
            form.append('company_name', values.company_name)
            form.append('tax_id', values.tax_id)
            form.append('first_name', values.first_name)
            form.append('last_name', values.last_name)
            form.append('street', values.street)
            form.append('post_code', values.post_code)
            form.append('city', values.city)
            form.append('phone', values.phone)
            form.append('email', values.email)
            {values.password && form.append('password', values.password)}
            {values.password_confirmation && form.append('password_confirmation', values.password_confirmation)}
            {avatarSource && form.append('photo', avatarSource)}
            form.append('_method', 'PATCH')
            const res = await handleUpdateProfile(form)
            setAuthorizationCookie({
                ...userData,
                data: res.data
            })
            setLoading(false)
        }catch(err){
            console.log("Check err:", err)
            if(err.data){
                if(err.data.errors){
                    setErrorMessage(responseValidatorObj(err.data.errors))
                }
            }
            setLoading(false)
        }
    }

    function renderTitle(){
        return (
            <div className={styles.ctnTitle}>
                <Typography variant="h6">
                    Edit Profile
                </Typography>
            </div>
        )
    }

    function renderProfilePicture(){
        return (
            <div className={styles.ctnProfilePicture}>
                <AvatarPicker onRemove={() => {setAvatarSource(null)}} avatarSource={avatarSource === null ? null : typeof avatarSource === 'string' ? avatarSource : avatarSource.preview || null} onDrop={handleChangePicture} />
                <DefaultButton ctnBtnStyle={styles.btnSave} label={"Save Changes"} isLoading={isLoading} onClick={handleSubmit} />
            </div>
        )
    }

    function renderForm(){
        return(
            <div className={styles.ctnForm}>
                <Grid container spacing={6}>
                    <Grid item md={9} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Company Name</InputLabel>
                                    <TextField
                                        value={values.company_name}
                                        onChange={handleChange('company_name')}
                                        error={errorMessage.company_name}
                                        helperText={errorMessage.company_name}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Tax ID</InputLabel>
                                    <TextField
                                        value={values.tax_id}
                                        onChange={handleChange('tax_id')}
                                        error={errorMessage.tax_id}
                                        helperText={errorMessage.tax_id}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>First Name</InputLabel>
                                    <TextField
                                        value={values.first_name}
                                        onChange={handleChange('first_name')}
                                        error={errorMessage.first_name}
                                        helperText={errorMessage.first_name}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Last Name</InputLabel>
                                    <TextField
                                        value={values.last_name}
                                        onChange={handleChange('last_name')}
                                        error={errorMessage.last_name}
                                        helperText={errorMessage.last_name}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Street</InputLabel>
                                    <TextField
                                        value={values.street}
                                        onChange={handleChange('street')}
                                        error={errorMessage.street}
                                        helperText={errorMessage.street}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={6} xs={12}>
                                        <div className={styles.inputWrapper}>
                                            <InputLabel shrink>Post Code</InputLabel>
                                            <TextField
                                                value={values.post_code}
                                                onChange={handleChange('post_code')}
                                                error={errorMessage.post_code}
                                                helperText={errorMessage.post_code}
                                                size='small'
                                                fullWidth />
                                        </div> 
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className={styles.inputWrapper}>
                                            <InputLabel shrink>City</InputLabel>
                                            <TextField
                                                value={values.city}
                                                onChange={handleChange('city')}
                                                error={errorMessage.city}
                                                helperText={errorMessage.city}
                                                size='small'
                                                fullWidth />
                                        </div> 
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Email address</InputLabel>
                                    <TextField
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        error={errorMessage.email}
                                        helperText={errorMessage.email}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>
                            
                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Telephone</InputLabel>
                                    <TextField
                                        value={values.phone}
                                        onChange={handleChange('phone')}
                                        error={errorMessage.phone}
                                        helperText={errorMessage.phone}
                                        size='small'
                                        fullWidth />
                                </div> 
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Create Password</InputLabel>
                                    <TextField
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        error={errorMessage.password}
                                        helperText={errorMessage.password}
                                        size='small'
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? (
                                                        <Iconify icon="eva:eye-fill" width={24} height={24} />
                                                    ) : (
                                                        <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                                                    )}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }} />
                                </div> 
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <div className={styles.inputWrapper}>
                                    <InputLabel shrink>Confirm Password</InputLabel>
                                    <TextField
                                        value={values.password_confirmation}
                                        onChange={handleChange('password_confirmation')}
                                        error={errorMessage.password_confirmation}
                                        helperText={errorMessage.password_confirmation}
                                        size='small'
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? (
                                                        <Iconify icon="eva:eye-fill" width={24} height={24} />
                                                    ) : (
                                                        <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                                                    )}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }} />
                                </div> 
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        {renderProfilePicture()}
                    </Grid>
                </Grid>
            </div>
        )
    }


    function renderContent(){
        return (
            <div className={styles.ctnContent}>
                <div className={styles.ctnCard}>
                    {renderTitle()}
                    {renderForm()}
                </div>
            </div>
        )
    }

    return(
        <Page title="Edit Profile">
          <div className={styles.ctnRoot}>
            <div className={styles.ctnWrapper}>
                <HeaderUser />
                {renderContent()}
            </div>
            <AuthFooter />
        </div>
        </Page>
    )
}

export async function getServerSideProps(context) {
    const userData = getUserData(context)
    if(!userData){
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            }
        }
    }
    return {
      props: {
        userData
      }, // will be passed to the page component as props
    }
}
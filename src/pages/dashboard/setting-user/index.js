import { Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import DefaultButton from '../../../components/default-button';
import AvatarPicker from '../../../components/avatar-picker';
import HeaderUser from "../../../components/header-user"
import Page from "../../../components/Page"
import useStyles from './styles'

export default function SettingUser(){
    const styles = useStyles()
    const [avatarSource, setAvatarSource] = useState(null)

    const handleChangePicture = (acceptedFiles) => {
        const file = acceptedFiles[0]
        setAvatarSource(Object.assign(file, {
            preview: URL.createObjectURL(file),
        }))
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
                <DefaultButton label={"Save Changes"} />
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
        </div>
        </Page>
    )
}
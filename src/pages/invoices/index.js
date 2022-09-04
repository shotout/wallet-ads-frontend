import { Grid, Typography } from '@mui/material';
import HeaderUser from "../../components/header-user"
import Page from "../../components/Page"
import useStyles from './styles'

export default function SettingUser(){
    const styles = useStyles()

    function renderTitle(){
        return (
            <div className={styles.ctnTitle}>
                <Typography variant="h6">
                    Edit Profile
                </Typography>
            </div>
        )
    }


    function renderContent(){
        return (
            <div className={styles.ctnContent}>
                <div className={styles.ctnCard}>
                    {renderTitle()}
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
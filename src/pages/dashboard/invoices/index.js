import { Grid, Typography } from '@mui/material';
import SvgIconStyle from '../../../components/SvgIconStyle';
import HeaderUser from "../../../components/header-user"
import Page from "../../../components/Page"
import useStyles from './styles'
import { Fragment } from 'react';
import Layout from '../../../layouts';
import { getUserData } from '../../../helpers/auth';

const downloadIcon = '/assets/svg/download.svg'

Invoice.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Invoice(){
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

    function renderListTitle(){
        return (
            <Grid container spacing={4}>
                <Grid item md={2.4} sm={12}>
                    <Typography variant="body1" fontWeight={"500"}>
                        Invoice Date
                    </Typography>
                </Grid>
                <Grid item md={2.4} sm={12}>
                    <Typography variant="body1" fontWeight={"500"}>
                        Invoice
                    </Typography>
                </Grid>
                <Grid item md={2.4} sm={12}>
                    <Typography variant="body1" fontWeight={"500"}>
                        Payment Method
                    </Typography>
                </Grid>
                <Grid item md={2.4} sm={12}>
                    <Typography variant="body1" fontWeight={"500"}>
                        Amount billed
                    </Typography>
                </Grid>
                <Grid item md={2.4} sm={12}>
                    <Typography variant="body1" fontWeight={"500"}>
                        Status
                    </Typography>
                </Grid>
        </Grid>
        )
    }

    function renderListItem(){
        return (
            <div className={styles.ctnItem}>
                <Grid container spacing={4}>
                    {['Unpaid', 'Paid'].map(item => (
                        <Fragment key={item}>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    10.08.2022
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    Invoice X55A
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    Credit Card
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    USD500
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <div className={styles.ctnStatusItem}>
                                    <div className={styles.leftStatusItem}>
                                        <div className={`${styles.ctnStatusDot} ${item === 'Paid' ? styles.greenBg : {}}`} />
                                        <Typography variant="body1">
                                            {item}
                                        </Typography>
                                    </div>
                                    <div className={styles.ctnDownload}>
                                        <SvgIconStyle src={downloadIcon} sx={{ width: 1, height: 1, bgcolor: '#7589FA' }} />
                                    </div>
                                </div>
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </div>
        )
    }


    function renderContent(){
        return (
            <div className={styles.ctnContent}>
                <div className={styles.ctnCard}>
                    {renderTitle()}
                    {renderListTitle()}
                    {renderListItem()}
                </div>
            </div>
        )
    }

    return(
        <Page title="Invoice">
          <div className={styles.ctnRoot}>
            <div className={styles.ctnWrapper}>
                <HeaderUser />
                {renderContent()}
            </div>
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
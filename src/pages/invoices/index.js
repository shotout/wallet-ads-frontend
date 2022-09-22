import { Grid, Typography } from '@mui/material';
import SvgIconStyle from '../../components/SvgIconStyle';
import HeaderUser from "../../components/header-user"
import Page from "../../components/Page"
import useStyles from './styles'
import { Fragment } from 'react';
import Layout from '../../layouts';
import { getUserData } from '../../helpers/auth';
import { getInvoicesList } from '../../utils/requests';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { BACKEND_URL } from '../../helpers/constants';
import { reformatCurrency } from '../../helpers/currency';
import moment from 'moment';

const downloadIcon = '/assets/svg/download.svg'

Invoice.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Invoice({ content }){
    const styles = useStyles()

    function renderTitle(){
        return (
            <div className={styles.ctnTitle}>
                <Typography variant="h6">
                    Invoices
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
        if(content.length === 0){
            return (
                <div className={styles.ctnItem}>
                    <Typography variant='h4' color="#B3B3B3" marginY={4} textAlign={"center"}>
                    No invoices available
                    </Typography>
                </div>
            )
        }
        return (
            <div className={styles.ctnItem}>
                <Grid container spacing={4}>
                    {content.map(item => (
                        <Fragment key={item.id.toString()}>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    {moment(item.invoice_date).format('YYYY.MM.DD')}
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    {item.invoice_number}
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                {item.payment_method}
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <Typography variant="body1">
                                    {`USD${reformatCurrency(item.amount)}`}
                                </Typography>
                            </Grid>
                            <Grid item md={2.4} sm={12}>
                                <div className={styles.ctnStatusItem}>
                                    <div className={styles.leftStatusItem}>
                                        <div className={`${styles.ctnStatusDot} ${item.payment_status === 1 ? styles.greenBg : {}}`} />
                                        <Typography variant="body1">
                                            {item.payment_status ? 'Paid' : 'Unpaid'}
                                        </Typography>
                                    </div>
                                    <div className={styles.ctnDownload}>
                                        <Link href={`${BACKEND_URL}${item.invoice_url}`}>
                                            <a target={"_blank"}>
                                                <SvgIconStyle src={downloadIcon} sx={{ width: 1, height: 1, bgcolor: item.payment_status ? '#71CE62' : '#E83155' }} />
                                            </a>
                                        </Link>
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
        <Page title="Invoices" description="Find your WALLETADS invoices.">
          <div className={styles.ctnRoot}>
            <div className={styles.ctnWrapper}>
                <HeaderUser />
                {renderContent()}
            </div>
        </div>
        </Page>
    )
}


Invoice.propTypes = {
    content: PropTypes.array,
};

Invoice.defaultProps = {
    content: [],
};

export async function getServerSideProps(context) {
    const userData = getUserData(context)
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    if(isMobile){
      return {
          redirect: {
              permanent: false,
              destination: `/forbidden`
          }
      }
    }

    const res = await getInvoicesList(context)
    console.log("Check invoices:", res)
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
        userData,
        content: res.data || []
      }, // will be passed to the page component as props
    }
}
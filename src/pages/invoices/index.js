import { Box, Grid, Popover, Typography } from '@mui/material';
import SvgIconStyle from '../../components/SvgIconStyle';
import HeaderUser from "../../components/header-user"
import Page from "../../components/Page"
import useStyles from './styles'
import { Fragment, useState } from 'react';
import Layout from '../../layouts';
import { getUserData } from '../../helpers/auth';
import { getInvoicesList } from '../../utils/requests';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { BACKEND_URL } from '../../helpers/constants';
import { reformatCurrency } from '../../helpers/currency';
import moment from 'moment';
import { dateToUnix } from '../../helpers/dateHelper';

const downloadIcon = '/assets/svg/download.svg'
const iconShort = '/assets/short_icon.png'

Invoice.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Invoice({ content }){
    const [listContent, setContent] = useState({
        sortItem: 'a-z',
        content: content || []
    })
    const styles = useStyles()
    const [hover, setHover] = useState(null);
    const [activePopover, setActivePopover] = useState(null);

    const handleShort = () => {
        if(listContent.sortItem === 'a-z'){
            setContent({
                sortItem: 'z-a',
                content: listContent.content.sort((a, b) => dateToUnix(b.invoice_date) - dateToUnix(a.invoice_date))
            })
        }
        if(listContent.sortItem === 'z-a'){
            setContent({
                sortItem: 'a-z',
                content: listContent.content.sort((a, b) => dateToUnix(a.invoice_date) - dateToUnix(b.invoice_date))
            })
        }
    }
   
    const handleHoverClose = () => {
        setHover(null);
    };


  function renderPopover(type, content){
    return(
        <Popover
          id={type}
          open={Boolean(hover) && activePopover === type}
          anchorEl={hover}
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
          }}
          transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
          }}
          onClose={handleHoverClose}
          disableRestoreFocus
          sx={{
          pointerEvents: 'none',
          }}
          className={styles.ctnPopover}
      >
          <Box sx={{ p: 2, maxWidth: 260 }}>
              <Typography variant="body2" sx={{ color: '#fff' }} textAlign="center">
                  {content || ''}
              </Typography>
          </Box>
      </Popover>
    )
  }

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
                <Grid item md={2} sm={12} display="flex" alignItems="center">
                    <Typography variant="body1" fontWeight={"bold"} onClick={handleShort} sx={{ cursor: 'pointer'}}>
                        Invoice Date
                    </Typography>
                    <div className={styles.ctnIconShort} onClick={handleShort}>
                        <img src={iconShort} alt="ic-short" />
                    </div>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Invoice
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Campaign Name
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Payment Method
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Amount billed
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="body1" fontWeight={"bold"}>
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
                    {listContent.content.map(item => (
                        <Fragment key={item.id.toString()}>
                            <Grid item md={2} sm={12}>
                                <Typography variant="body1">
                                    {moment(item.invoice_date).format('DD/MM/YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item md={2} sm={12}>
                                <Typography variant="body1">
                                    {item.invoice_number}
                                </Typography>
                            </Grid>
                            <Grid item md={2} sm={12}>
                                <Typography variant="body1" className={styles.txtCampaignName}>
                                    {item.campaign_name}
                                    {/* Lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum */}
                                </Typography>
                            </Grid>
                            <Grid item md={2} sm={12}>
                                <Typography variant="body1">
                                {item.payment_method}
                                </Typography>
                            </Grid>
                            <Grid item md={2} sm={12}>
                                <Typography variant="body1">
                                    {`USD${reformatCurrency(item.amount)}`}
                                </Typography>
                            </Grid>
                            <Grid item md={2} sm={12}>
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
                                                <SvgIconStyle src={downloadIcon} sx={{ width: 1, height: 1, bgcolor: '#7589FA' }} />
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
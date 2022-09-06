import { Typography } from '@mui/material'
import Link from 'next/link'
import useStyles from './styles'

export default function AuthFooter(){
    const styles = useStyles()

    return (
        <div className={styles.ctnRoot}>
            <div className={styles.ctnLink}>
                <Link href="#">
                    Imprint
                </Link>
                <Link href="#">
                    Terms of use
                </Link>
            </div>
            <div className={styles.ctnCopyright}>
                <Typography variant='body1' fontSize={15} color="#fff" fontWeight={"bold"}>
                    ©2022 Wallet Ads 
                </Typography>
            </div>
        </div>
    )
}
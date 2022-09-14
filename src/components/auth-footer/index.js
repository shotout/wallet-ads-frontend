import { Typography } from '@mui/material'
import Link from 'next/link'
import useStyles from './styles'

export default function AuthFooter(){
    const styles = useStyles()

    return (
        <div className={styles.ctnRoot}>
            <div className={styles.ctnLink}>
                <Link href="https://www.walletads.io/impressum">
                    <a target={"_blank"}>
                        Imprint
                    </a>
                </Link>
                <Link href="#">
                    <a target={"_blank"}>
                        Terms and Conditions / AGB
                    </a>
                </Link>
                <Link href="#">
                    <a target={"_blank"}>
                        Privacy
                    </a>
                </Link>
                <Link href="#">
                    <a target={"_blank"}>
                        Cookie Policy
                    </a>
                </Link>
            </div>
            <div className={styles.ctnCopyright}>
                <Typography variant='body1' fontSize={15} color="#fff" fontWeight={"800"}>
                    ©2022 WALLETADS 
                </Typography>
            </div>
        </div>
    )
}
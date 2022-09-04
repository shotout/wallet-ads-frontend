import useStyles from './styles'

export default function DefaultButton({ label, ctnBtnStyle = '' }){
    const styles = useStyles()
    return (
        <div className={`${styles.ctnBtn} ${ctnBtnStyle}`}>
            <span>{label}</span>
        </div>
    )
}
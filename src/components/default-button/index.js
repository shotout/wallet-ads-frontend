import { CircularProgress } from '@material-ui/core';
import useStyles from './styles'

export default function DefaultButton({ label, ctnBtnStyle = '', isLoading, onClick = () => {} }){
    const styles = useStyles()

    const handlePress = () => {
        if(!isLoading){
            if(typeof onClick === 'function') onClick()
        }
    }

    function renderContent(){
        if(isLoading){
            return (
                <CircularProgress className={styles.circularStyle} size={24} />
            )
        }
        return (
            <span>{label}</span>
        )
    }

    return (
        <div onClick={handlePress} className={`${styles.ctnBtn} ${ctnBtnStyle}`}>
            {renderContent()}
        </div>
    )
}
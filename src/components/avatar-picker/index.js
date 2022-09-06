import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import useStyles from './styles'

const avatarDummy = '/assets/avatar_dummy.png'
const deleteIcon = '/assets/delete_icon.png'
const editIcon = '/assets/edit_icon.png'

export default function AvatarPicker({ avatarSource, onRemove = () => {}, ...other }){
    const styles = useStyles()

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, } = useDropzone({
      multiple: false,
      ...other,
    });

    function renderImage(){
        return (
            <div className={styles.ctnAvatar} {...getRootProps()}>
                <img src={avatarSource || avatarDummy} alt="avatar" />
            </div>
        )
    }
    
    function renderOption(){
        return (
            <div className={styles.ctnOption}>
                <div {...getRootProps()}>
                    <img src={editIcon} alt="edit" />
                </div>
                {avatarSource && (
                    <div onClick={onRemove}>
                        <img src={deleteIcon} alt="delete" />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={styles.ctnRoot}>
            <Typography variant="body1" textAlign={"center"}>
                Profile picture
            </Typography>
            {renderImage()}
            {renderOption()}
        </div>
    )
}
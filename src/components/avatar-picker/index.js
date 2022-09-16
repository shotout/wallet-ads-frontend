import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { BACKEND_URL } from '../../helpers/constants';
import useStyles from './styles'

const avatarDummy = '/assets/avatar_dummy.png'
const deleteIcon = '/assets/delete_icon.png'
const editIcon = '/assets/edit_icon.png'

export default function AvatarPicker({ initialPhoto, avatarSource, onRemove = () => {}, ...other }){
    const styles = useStyles()

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, } = useDropzone({
      multiple: false,
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
      },
      ...other,
    });

    function renderAvatar(){
        if(avatarSource){
            return (
                <img src={avatarSource} alt="avatar" />
            )
        }
        if(initialPhoto){
            return (
                <img src={`${BACKEND_URL}/${initialPhoto}`} alt="avatar" />
            )
        }
        return <img src={avatarDummy} alt="avatar" />
    }

    function renderImage(){
        return (
            <div className={styles.ctnAvatar} {...getRootProps()}>
                <input {...getInputProps()} />
                {renderAvatar()}
            </div>
        )
    }
    
    function renderOption(){
        return (
            <div className={styles.ctnOption}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={editIcon} alt="edit" />
                </div>
                {(avatarSource || initialPhoto) && (
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
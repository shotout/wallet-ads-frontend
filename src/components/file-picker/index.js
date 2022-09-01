import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';
import { useDropzone } from 'react-dropzone';

const deleteIcon = '/assets/delete_red.png'
const editIcon = '/assets/edit_red.png'
const fileIcon = '/assets/file_red.png'

export default function FilePicker({ label, file,typeScreen, onDelete, ...other }){
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
      multiple: false,
      ...other,
    });
    const styles = useStyles()

    function renderContent(){
        if(file && typeScreen === 'logo'){
            return (
                <div className={styles.ctnRowLogo}>
                    <div className={styles.leftRow}>
                        <img className={styles.logoImg} src={fileIcon} alt="logo" />
                        <div className={styles.ctnDesc}>
                        {file.name && (
                            <Typography variant="body1">
                                {file.name}
                            </Typography>
                        )}
                        </div>
                    </div>
                    <div className={styles.ctnLogoRight}>
                        <div className={styles.ctnIcon} {...getRootProps()}>
                            <img src={editIcon} alt="edit" />
                        </div>
                        <div className={styles.ctnIcon} onClick={onDelete}>
                            <img src={deleteIcon} alt="delete" />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.centerizedItem}>
                <div className={styles.btnPicker} {...getRootProps()}>
                    <Typography variant="subtitle1" color={'#fff'}>
                        {label}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.ctnBanner}>
            {renderContent()}
        </div>
    )
}
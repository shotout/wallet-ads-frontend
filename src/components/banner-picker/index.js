import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';
import { useDropzone } from 'react-dropzone';

const whiteCameraIcon = '/assets/camera_icon.png';
const deleteIcon = '/assets/delete_icon.png';
const editIcon = '/assets/edit_icon.png';
const fileIcon = '/assets/file_red.png';

export default function BannerPicker({ label, file, typeScreen, callbackError, onDelete, acceptAllFile, ...other }) {
  const handleReject = (params) => {
    if (typeof other.onDrop === 'function') {
      if (other.maxFileSize) {
        if (params[0].size < other.maxFileSize) {
          other.onDrop(params);
        } else {
          if (typeof callbackError === 'function') {
            callbackError();
          }
        }
      } else {
        other.onDrop(params);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    //   maxSize: 1000000,
    accept: acceptAllFile
      ? {}
      : {
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg'],
          'image/jpg': ['.jpg'],
        },
    ...other,
    onDrop: handleReject,
  });
  const styles = useStyles();

  function isImage() {
    console.log('file name', file);
    if (!file.name) {
      const fileName = file;

      console.log(typeof fileName == 'string' && fileName.includes('png'));
      if (
        (typeof fileName == 'string' && fileName.includes('jpg')) ||
        (typeof fileName == 'string' && fileName.includes('png')) ||
        (typeof fileName == 'string' && fileName.includes('jpeg')) ||
        (typeof fileName == 'string' && fileName.includes('gif'))
      ) {
        return true;
      }
    }
    return true;
  }

  function renderLeftContent() {
    console.log('LOGO', file);
    if (isImage()) {
      return (
        <div className={styles.leftRow}>
          <img
            className={styles.logoImg}
            src={file === null ? null : typeof file === 'string' ? file : file.preview || null}
            alt="logo"
          />
          <div className={styles.ctnDesc}>{file.imageProps?.name && <Typography variant="body1" fontSize={18} fontWeight={600}>{file.imageProps?.name}</Typography>}</div>
        </div>
      );
    }
    return (
      <div className={styles.leftRow}>
        <img className={styles.logoFile} src={fileIcon} alt="logo" />
        <div className={styles.ctnDesc}>{file.name && <Typography variant="body1">{file.name}</Typography>}</div>
      </div>
    );
  }

  function renderContent() {
    if (file && typeScreen === 'logo') {
      return (
        <div className={styles.ctnRowLogo}>
          {renderLeftContent()}
          <div className={styles.ctnLogoRight}>
            <div className={styles.ctnIcon} {...getRootProps()}>
              <input {...getInputProps()} />
              <img src={editIcon} alt="edit" />
            </div>
            <div className={styles.ctnIcon} onClick={onDelete}>
              <img src={deleteIcon} alt="delete" />
            </div>
          </div>
        </div>
      );
    }
    if (file && typeScreen === 'banner-collection') {
      return (
        <div className={styles.ctnBannerContent}>
          <div className={styles.bannerItem}>
            <img
              src={file === null ? null : typeof file === 'string' ? file : file.preview || null}
              alt="banner-source"
            />
            <div className={styles.bannerOptionWrapper}>
              <div className={styles.ctnIcon} {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={editIcon} alt="edit" />
              </div>
              <div className={styles.ctnIcon} onClick={onDelete}>
                <img src={deleteIcon} alt="delete" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.btnPicker} {...getRootProps()}>
        <input {...getInputProps()} />
        <img src={whiteCameraIcon} alt="camera" />
        <Typography variant="subtitle1" color={'#fff'}>
          {label}
        </Typography>
      </div>
    );
  }

  return <div className={styles.ctnBanner}>{renderContent()}</div>;
}

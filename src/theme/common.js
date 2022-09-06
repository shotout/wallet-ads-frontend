import { makeStyles } from '@material-ui/core/styles';

export const useTextAlign = makeStyles({
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  }
});

export const useFloat = makeStyles({
  floatLeft: {
    float: 'left'
  },
  floatRight: {
    float: 'right'
  },
});

export const useAspectRatio = makeStyles(theme => ({
  oneByOne: {
    width: '100% !important',
    height: '0 !important',
    paddingBottom: '100% !important',
    position: 'relative',
    overflow: 'hidden'
  },
  sixtyByNine: {
    width: '100% !important',
    height: '0 !important',
    paddingBottom: '56.25% !important',
    position: 'relative',
    overflow: 'hidden'
  },
  twentyOneByNine: {
    width: '100% !important',
    height: '0 !important',
    paddingBottom: '42.86% !important',
    position: 'relative',
    overflow: 'hidden'
  },
  bannerArticle: {
    width: '100% !important',
    height: '0 !important',
    paddingBottom: '25% !important',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '42.85% !important'
    }
  }
}));

export const usePagination = makeStyles(theme => ({
  active: {},
  pagination: {
    zIndex: 220,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: '-125px'
    },
    '& ul': {
      position: 'absolute',
      display: 'block',
      width: '100%',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      textAlign: 'center',
      bottom: 0,
      '& li': {
        position: 'relative',
        display: 'inline-block',
        width: 15,
        height: 15,
        margin: '0 5px',
        padding: 0,
        background: theme.palette.secondary.main,
        borderRadius: 15,
        transition: 'all 0.5s ease-out',
        '&$active': {
          width: 40,
        },
        '&:hover': {
          opacity: 0.5
        },
        '& button': {
          opacity: 0,
          cursor: 'pointer',
          padding: 0,
          width: '100%',
        }
      },
    }
  }
}));

export const useText = makeStyles(theme => ({
  title: {
    fontWeight: '800',
    fontSize: 48,
    lineHeight: '68px',
    [theme.breakpoints.down('md')]: {
      fontSize: 38,
      lineHeight: '60px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 27,
      lineHeight: '44px'
    },
  },
  miniTitle: {
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 42,
    lineHeight: '54px',
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
      lineHeight: '60px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '30px',
      textAlign: 'center',
      margin: '0 auto'
    },
  },
  centerTitle: {
    fontWeight: '800',
    fontSize: '32px',
    lineHeight: '72px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 38,
      lineHeight: '60px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 28,
      lineHeight: '44px'
    },
  },
  title2: {
    fontSize: 36,
    lineHeight: '56px',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
      lineHeight: '48px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      lineHeight: '36px',
    }
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 28,
    lineHeight: '44px',
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '36px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 17,
      lineHeight: '28px',
    },
  },
  subtitle2: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 22,
    lineHeight: '32px',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
      lineHeight: '32px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  paragraph: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    lineHeight: '24px'
  },
  caption: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    lineHeight: '24px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
  bodyText: {
    fontSize: '16px',
    '& br': {
      // display: 'block'
    },
    '& p': {
      fontSize: '18px',
      lineHeight: '28px',
      color: theme.palette.primary.black,
      // margin: '0 !important',
      '& span[style="font-size: 22px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '10px',
        '& strong': {
          fontSize: '24px !important',
          [theme.breakpoints.down('sm')]: {
            fontSize: '20px !important'
          }
        },
        '& +img': {
          marginTop: '14px'
        }
      },
      '& span[style="font-size: 16px;"]': {
        [theme.breakpoints.up('md')]: {
          fontSize: '22px !important',
          lineHeight: '38px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '17px !important',
          lineHeight: '30px !important'
        }
      },
      '& span[style="font-size: 24px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '10px',
        '& +img': {
          marginTop: '14px'
        }
      },
      '& span[style="font-size: 20px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '10px',
        '& +img': {
          marginTop: '14px'
        }
      },
      '& span[style="font-size: 28px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '10px',
        '& +img': {
          marginTop: '14px'
        }
      }
    },
    '& article': {
      fontSize: '18px',
      lineHeight: '28px',
      color: theme.palette.primary.black,
    },
    '& h3': {
      color: theme.palette.primary.black,
      fontWeight: 600,
    },
    '& strong': {
      color: theme.palette.primary.black,
      fontWeight: 700,
      lineHeight: '28px'
    },
    '& ul': {
      fontSize: '18px',
      lineHeight: '28px',
      color: theme.palette.primary.black,
      '& strong': {
        color: theme.palette.primary.black,
        fontWeight: 600,
      },
      marginTop: '12px',
    },
    '& ol': {
      fontSize: '16px',
      lineHeight: '28px',
      color: theme.palette.primary.black,
      '& strong': {
        color: theme.palette.primary.black,
        fontWeight: 600,
      }
    },
    '& img': {
      width: '100% !important',
      maxWidth: '100%',
      borderRadius: '12px',
      marginTop: '18px',
      marginBottom: '13px',
      '& +span[style="font-size: 22px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '24px !important',
      },
      '& +span[style="font-size: 24px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '24px !important',
      },
      '& +span[style="font-size: 28px;"]': {
        display: 'inline-block',
        marginBottom: '12px',
        marginTop: '24px !important',
      }
    }
  }
}));

export const useHidden = makeStyles(theme => ({
  lgDown: {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  mdDown: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  smDown: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  xsDown: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  lgUp: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  mdUp: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  smUp: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

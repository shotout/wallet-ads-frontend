import { Popover, Typography, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Iconify from '../Iconify';
import useStyles from './styles';
import { calculateAirdropPerUser, getAudiencePrice } from '../../helpers/calculator';
import SvgIconStyle from '../SvgIconStyle';
import CurrencyInput from 'react-currency-input-field';
import { normalizeCurrency } from '../../helpers/currency';
import { shortString } from '../../helpers/shortString';

const triangleIcon = '/assets/triangle.png';
const pricetagIcon = '/assets/pricetag_icon.png';
const headerCard = '/assets/svg/header_card.svg';
const editIcon = '/assets/svg/pencil.svg';
const deleteIcon = '/assets/svg/delete.svg';
const pencilIcon = '/assets/pencil.png';

export default function CardAudience({
  isErrorAudienceNull,
  isError,
  showArrow,
  label,
  selectedPage,
  isSomeAudienceActive,
  data = undefined,
  onPressCard,
  isEdit,
  onAdd,
  onChangeBudget = () => {},
  onRemove,
  readOnly,
  errorAds,
  index,
  errorAdsBeforeSubmit,
}) {
  React.useEffect(() => {});

  const styles = useStyles();
  const inputEl = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isErr, setIsErr] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkiferr = () => {
    if (data.budgetAds < 500) {
      setIsErr(true);
    } else {
      setIsErr(false);
    }
  };

  useEffect(() => {
    console.log(isErrorAudienceNull);
    checkiferr();
    // if (data.selectedCategory) {
    //   setTimeout(() => {
    //     if (inputEl.current && inputEl.current.focus) {
    //       inputEl.current.focus();
    //     }
    //   }, 100);
    // }
  }, []);

  const onLink = () => {
    window.location.href = '#card-ads';
  };

  function renderPopover() {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
        >
          <div className={styles.ctnBox}>
            <div
              className={styles.ctnIcon}
              onClick={() => {
                onPressCard();
                handleClose();
              }}
            >
              <SvgIconStyle src={editIcon} sx={{ width: 1, height: 1, bgcolor: '#fff', marginBottom: 1 }} />
            </div>
            <div
              className={styles.ctnIcon}
              onClick={() => {
                handleClose();
                onRemove();
              }}
            >
              <SvgIconStyle src={deleteIcon} sx={{ width: 1, height: 1, bgcolor: '#fff', marginBottom: 1 }} />
            </div>
          </div>
        </Popover>
      </div>
    );
  }

  function renderBalancedTargeting() {
    const target = data.balancedTargeting;
    return (
      <div className={styles.descFilledWrapper}>
        {isEdit && (
          <Typography variant="span" fontWeight={'bold'} textAlign={'center'} marginBottom={1}>
            Balanced Targeting
          </Typography>
        )}
        {target.cryptoCurrency && (
          <Typography className={styles.txtCurrency} variant="span" textAlign={'center'} marginBottom={0.2}>
            {`+ Cryptocurrencies: ${target.cryptoCurrency.join(', ')}`}
          </Typography>
        )}
        {(target.year || target.months || target.day) && (
          <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
            {`+ Account age: ${target.year ? `${target.year} Year ` : ''}${
              target.months ? `- ${target.months} Months ` : ''
            }${target.day ? `- ${target.day} Day` : ''}`}
          </Typography>
        )}
        {target.airdropReceived && (
          <Typography variant="span" textAlign={'center'} paragraph>
            {`+ Airdrops Received: ${target.airdropReceived}`}
          </Typography>
        )}
      </div>
    );
  }

  function renderDetailTargeting() {
    const detail = data.detailTargeting || data.detail_target;
    if (detail && (detail.transactionAmount || detail.tradingVolume || detail.availableCredit || detail.creatorName)) {
      return (
        <div className={styles.descFilledWrapper}>
          {isEdit && (
            <Typography variant="span" fontWeight={'bold'} textAlign={'center'} marginBottom={1}>
              Detail Targeting
            </Typography>
          )}
          {detail.transactionAmount && (
            <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
              {`+ Amount of transactions: ${detail.transactionAmount}`}
            </Typography>
          )}
          {detail.tradingVolume && (
            <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
              {`+ Trading volume: ${detail.tradingVolume}`}
            </Typography>
          )}
          {detail.availableCredit && (
            <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
              {`+ Available credit in wallet: ${detail.availableCredit}`}
            </Typography>
          )}
          {detail.creatorName && (
            <Typography variant="span" textAlign={'center'} paragraph>
              {`+ Nft purchases: ${detail.creatorName}`}
            </Typography>
          )}
        </div>
      );
    }
  }

  function renderPrice() {
    if (readOnly) {
      return (
        <div className={`${styles.readOnlyInputPriceWrapper}`}>
          <Typography variant="body1" textAlign={'center'} fontWeight="bold">
            Budget:
          </Typography>
          <div className={`${styles.readOnlyPriceInput}`}>
            <Typography textAlign={'center'} fontWeight={800} fontSize={'1.5rem'} color={'#7089FF'}>
              USD{normalizeCurrency(Number(data.budgetAds))}
            </Typography>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${styles.inputPriceWrapper}`}>
          {data.budgetAds < 500 && isErr ? (
            <Box
              sx={{
                position: 'absolute',
                borderRadius: 1,
                padding: 1,
                bottom: '55%',
                zIndex: 50,
                backgroundColor: '#FFD8DF',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#ad4061' }}
                textAlign="justify"
                fontFamily={'Public Sans, sans-serif'}
              >
                Please enter a minimum budget of USD500.
              </Typography>
            </Box>
          ) : null}
          <Typography variant="body1" textAlign={'center'} fontWeight="bold" color={'#7089FF'}>
            Budget:
          </Typography>
          <div
            className={`${styles.ctnPriceInput} ${
              data.budgetAds === '' || data.budgetAds < 500 ? styles.redBorder : ''
            }`}
          >
            <span>USD</span>
            <CurrencyInput
              name="currencyInput"
              id="currencyInput"
              value={data.budgetAds}
              placeholder=""
              ref={inputEl}
              onChange={onChangeBudget}
              onBlur={() => checkiferr()}
              onFocus={() => setIsErr(false)}
              allowDecimals={false}
              allowNegativeValue={false}
              disableAbbreviations
              fixedDecimalLength={0}
              groupSeparator=","
              decimalSeparator="."
              maxLength={5}
              min={100}
              className={data.budgetAds === '' || data.budgetAds < 500 ? styles.redBorder : ''}
            />
            <img
              src={pencilIcon}
              className={styles.ctnPencilIcon}
              onClick={() => {
                inputEl.current.focus();
                inputEl.current.setSelectionRange(0, 0);
              }}
            />
          </div>
        </div>
      );
    }
  }

  function renderContent() {
    if (data.selectedCategory === 'detail-targeting') {
      return (
        <div className={styles.ctnDescAudience}>
          <div className={styles.ctnAudienceWrapper}>
            {renderBalancedTargeting()}
            {renderDetailTargeting()}
          </div>
          {renderPrice()}
          {!isEdit && (
            <Typography variant="span" textAlign={'center'} paragraph>
              {`USD${getAudiencePrice(data)} per sendout `}
            </Typography>
          )}
          {!isEdit && (
            <div className={styles.ctnAmount}>
              <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                {`${normalizeCurrency(calculateAirdropPerUser(data))} users`}
              </Typography>
              <Typography variant="span" textAlign={'center'} paragraph>
                In this audience will receive airdrops
              </Typography>
            </div>
          )}
        </div>
      );
    }
    if (data.selectedCategory === 'optimized' || data.selectedCategory === 'upload') {
      const fileTypeData = {
        'text/csv': 'csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'file/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/vnd.ms-excel': '.xls',
        'file/vnd.ms-excel': '.xls',
      };
      return (
        <div className={styles.ctnDescAudience}>
          {data.audienceFile ? (
            <div className={styles.ctnDefaultContentWrapper2} sytle={{ paddingTop: 15, margin: 10 }}>
              <Typography
                variant="body1"
                className={styles.desctTitle}
                fontWeight="800"
                color="#000"
                textAlign={'center'}
              >
                <b>+</b>
                Your own audience:
              </Typography>
              <Typography variant="span" textAlign={'center'}>
                {shortString(
                  data.audienceFile.original_name ?? data.audienceFile.path,
                  18,
                  fileTypeData[data.audienceFile?.type]
                )}
                {/* {data.audienceFile.original_name ?? data.audienceFile.path} */}
              </Typography>
            </div>
          ) : (
            <div className={styles.ctnDefaultContentWrapper}>
              <Typography
                variant="body1"
                className={styles.desctTitle}
                fontWeight="800"
                color="#000"
                textAlign={'center'}
              >
                <b>+</b>
                Optimized Targeting:
              </Typography>
              <Typography variant="span" textAlign={'center'}>
                The audience consists of a broad mix of users, optimized by our algorithm.
              </Typography>
            </div>
          )}

          {renderPrice()}
          {!isEdit && (
            <Typography variant="span" textAlign={'center'} paragraph>
              {`USD${getAudiencePrice(data)} per airdrop `}
            </Typography>
          )}
          {!isEdit && (
            <div className={styles.ctnAmount}>
              <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                {`${normalizeCurrency(calculateAirdropPerUser(data))} users`}
              </Typography>
              <Typography variant="span" textAlign={'center'} paragraph>
                In this audience will receive airdrops
              </Typography>
              {errorAds == true && errorAdsBeforeSubmit ? (
                <div id="requiredCard" onClick={onLink} className={styles.ctnError} style={{ cursor: 'pointer' }}>
                  <Typography variant="span" textAlign={'center'} paragraph>
                    Please assign at least 1 ad to this audience or delete this audience.
                  </Typography>
                </div>
              ) : null}
            </div>
          )}
        </div>
      );
    }
    if (data.selectedCategory === 'upload') {
      const fileTypeData = {
        'text/csv': 'csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'file/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/vnd.ms-excel': '.xls',
        'file/vnd.ms-excel': '.xls',
      };

      return (
        <div className={styles.ctnDescAudience}>
          <div className={styles.ctnDefaultContentWrapper}>
            <Typography
              variant="body1"
              className={styles.desctTitle}
              fontWeight="800"
              color="#000"
              textAlign={'center'}
              marginBottom={2}
            >
              <b>+</b>
              Your own audience:
            </Typography>
            <Typography ariant="span" textAlign={'center'}>
              Your audience:
            </Typography>
            {/* {data.audienceFile.originalName} */}
            {data.audienceFile.original_name ? (
              <Typography variant="span" textAlign={'center'} marginBottom={1.4}>
                {shortString(data.audienceFile.original_name, 18, fileTypeData[data.audienceFile?.type] ?? '')}
              </Typography>
            ) : (
              <Typography variant="span" textAlign={'center'} marginBottom={1.4}>
                {shortString(data.audienceFile.name, 18, fileTypeData[data.audienceFile?.type] ?? '')}
              </Typography>
            )}
          </div>
          {renderPrice()}
          {!isEdit && (
            <Typography variant="span" textAlign={'center'} paragraph>
              {`USD${getAudiencePrice(data)} per airdrop `}
            </Typography>
          )}
          {!isEdit && (
            <div className={styles.ctnAmount}>
              <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                {`${normalizeCurrency(calculateAirdropPerUser(data))} users`}
              </Typography>
              <Typography variant="span" textAlign={'center'} paragraph>
                In this audience will receive airdrops
              </Typography>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className={styles.ctnEmptyAudience}>
        <Iconify icon={'ant-design:plus-circle-outlined'} color="#C9D3D8" width={80} height={80} />
        <Typography variant="h5" textAlign={'center'} marginTop={1} color="#C9D3D8">
          Create audience
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.ctnAudience}>
      <div
        className={`${styles.cardAudience} ${!data.selectedCategory ? styles.ctnCursor : ''} ${
          data.budgetAds === '' && data.selectedCategory !== null ? styles.ctnRedBorder : ''
        }
        ${data.budgetAds < 500 && data.selectedCategory !== null ? styles.ctnRedBorder : ''}
        ${
          isErrorAudienceNull ||
          (data.selectedCategory === 'optimized' && errorAds && errorAdsBeforeSubmit) ||
          (data.selectedCategory === 'upload' && errorAds && errorAdsBeforeSubmit)
            ? styles.ctnRedBorder
            : ''
        }`}
        onClick={() => {
          if (!data.selectedCategory) {
            if (typeof onPressCard === 'function') onPressCard();
          }
        }}
      >
        <div
          className={`${styles.headerAudience} ${
            data.budgetAds === '' && data.selectedCategory !== null ? styles.borderTopError : ''
          }
          ${data.budgetAds < 500 && data.selectedCategory !== null ? styles.borderTopError : ''}
          ${
            isErrorAudienceNull ||
            (data.selectedCategory === 'optimized' && errorAds && errorAdsBeforeSubmit) ||
            (data.selectedCategory === 'upload' && errorAds && errorAdsBeforeSubmit)
              ? styles.borderTopError
              : ''
          }
          `}
        >
          <div className={styles.ctnWrapper}>
            <SvgIconStyle
              src={headerCard}
              sx={{ width: 1, height: 1, bgcolor: !selectedPage && isSomeAudienceActive ? '#757474' : '#7589FA' }}
            />
          </div>
          <Typography variant="h5" textAlign={'center'} color={'#fff'}>
            {label}
          </Typography>
        </div>
        {renderContent()}

        {isEdit && (
          <>
            <div className={styles.ctnSectionSummary}>
              <div className={styles.ctnPriceTag}>
                <img src={pricetagIcon} alt="pricetag" />
                <Typography variant="body2" fontWeight={'bold'} color="#7089FF">
                  {`USD${getAudiencePrice(data)} per airdrop`}
                </Typography>
              </div>
            </div>
            <div className={styles.btnAddAudience} onClick={onAdd}>
              <Typography variant="body1" fontWeight={'bold'} color="#fff" textAlign={'center'}>
                Add audience
              </Typography>
            </div>
          </>
        )}
        {showArrow && (
          <div className={styles.ctnArrow}>
            <img src={triangleIcon} alt="arrow" />
          </div>
        )}
        {readOnly
          ? ''
          : data.selectedCategory && (
              <div className={styles.ctnEdit} onClick={handleClick}>
                <Iconify icon={'bi:three-dots-vertical'} color="#000" width={'100%'} height={'100%'} />
              </div>
            )}
        {renderPopover()}
      </div>
    </div>
  );
}

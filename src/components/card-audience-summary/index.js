import { Typography, Popover, Box } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import _ from 'lodash';
import { calculateAirdropPerUser, getAudiencePrice } from '../../helpers/calculator';
import SvgIconStyle from '../SvgIconStyle';

const triangleIcon = '/assets/triangle.png';
const pricetagIcon = '/assets/pricetag_icon.png';
const headerCard = '/assets/svg/header_card.svg';

export default function CardAudienceSummary({
  selectedAudience,
  label,
  selectedPage,
  isSomeAudienceActive,
  data = undefined,
  onPressCard,
  isEdit,
  onAdd,
  onChangeBudget = () => {},
  isDisable,
}) {
  const styles = useStyles();
  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };
  const handleHoverClose = () => {
    setHover(null);
  };

  function renderBalancedTargeting() {
    const target = data.balancedTargeting;
    return (
      <div className={styles.descFilledWrapper}>
        <Typography variant="span" fontWeight={'bold'} textAlign={'center'} marginBottom={1}>
          Detail Targeting
        </Typography>
        {target.cryptoCurrency && (
          <div className={styles.ctnRowItem}>
            <Typography variant="span" marginRight={0.5} color="#8C65CC">
              +
            </Typography>
            <div>
              <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                {`Cryptocurrencies used:`}
              </Typography>
              <Typography
                onMouseEnter={handleHoverOpen}
                onMouseLeave={handleHoverClose}
                className={styles.txtUnderline}
                variant="span"
                textAlign={'center'}
                color="#6A7B8A"
                marginBottom={0.2}
              >
                Show chosen cryptocurrencies
              </Typography>
              <Popover
                id="mouse-over-popover"
                open={Boolean(hover)}
                anchorEl={hover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                onClose={handleHoverClose}
                disableRestoreFocus
                sx={{
                  pointerEvents: 'none',
                }}
                className={styles.ctnPopover}
              >
                <Box sx={{ p: 2, width: 220 }}>
                  {target.cryptoCurrency.map((item) => {
                    if (item === 'Select...') {
                      return null;
                    }
                    return (
                      <Typography key={item} variant="body2" sx={{ color: '#fff' }} textAlign="center">
                        {item}
                      </Typography>
                    );
                  })}
                </Box>
              </Popover>
            </div>
          </div>
        )}
        {(target.year || target.months || target.day) && (
          <div className={styles.ctnRowItem}>
            <Typography variant="span" color="#8C65CC">
              +
            </Typography>
            <div>
              <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                Account Age:
              </Typography>
              <Typography variant="span" textAlign={'center'} color="#6A7B8A" marginBottom={0.2}>
                {`${target.year ? `${target.year} Year` : ''}${target.months ? ` - ${target.months} Months` : ''}${
                  target.day ? ` - ${target.day} Day` : ''
                }`}
              </Typography>
            </div>
          </div>
        )}
        {target.airdropReceived && (
          <div className={styles.ctnRowItem}>
            <Typography variant="span" color="#8C65CC">
              +
            </Typography>
            <div>
              <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                Airdrops Received:
              </Typography>
              <Typography variant="span" textAlign={'center'} color="#6A7B8A" marginBottom={0.2}>
                {target.airdropReceived}
              </Typography>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderDetailTargeting() {
    const detail = data.detailTargeting;
    if (detail && (detail.transactionAmount || detail.tradingVolume || detail.availableCredit || detail.creatorName)) {
      return (
        <div className={styles.descFilledWrapper}>
          {detail.transactionAmount && (
            <div className={styles.ctnRowItem}>
              <Typography variant="span" color="#6A7B8A">
                +
              </Typography>
              <div>
                <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                  Amount of transactions
                </Typography>
                <Typography variant="span" fontWeight={'500'} textAlign={'center'} color="#6A7B8A" marginBottom={0.2}>
                  {detail.transactionAmount}
                </Typography>
              </div>
            </div>
          )}
          {detail.tradingVolume && (
            <div className={styles.ctnRowItem}>
              <Typography variant="span" color="#8C65CC">
                +
              </Typography>
              <div>
                <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                  Trading volume:
                </Typography>
                <Typography variant="span" fontWeight={'500'} textAlign={'center'} color="#6A7B8A" marginBottom={0.2}>
                  {detail.tradingVolume}
                </Typography>
              </div>
            </div>
          )}
          {detail.availableCredit && (
            <div className={styles.ctnRowItem}>
              <Typography variant="span" color="#8C65CC">
                +
              </Typography>
              <div>
                <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                  Available credit in wallet:
                </Typography>
                <Typography variant="span" fontWeight={'500'} textAlign={'center'} color="#6A7B8A" marginBottom={0.2}>
                  {detail.availableCredit}
                </Typography>
              </div>
            </div>
          )}
          {detail.creatorName && (
            <div className={styles.ctnRowItem}>
              <Typography variant="span" color="#8C65CC">
                +
              </Typography>
              <div>
                <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                  Creator name:
                </Typography>
                <Typography
                  className={styles.txtUnderline}
                  variant="span"
                  textAlign={'center'}
                  color="#6A7B8A"
                  marginBottom={0.2}
                >
                  Show chosen creators
                </Typography>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  function renderPrice() {
    if (isEdit) {
      return (
        <div className={styles.ctnPriceInput}>
          <span>USD</span>
          <input name="budget" maxLength={5} value={`${data.budgetAds}`} onChange={onChangeBudget} type="text" />
        </div>
      );
    }
    return (
      <div className={styles.ctnPrice}>
        <Typography variant="h5" textAlign={'center'}>
          USD{data.budgetAds}
        </Typography>
      </div>
    );
  }

  function renderContent() {
    const target = data.selectedCategory;
    if (target === 'detail-targeting') {
      return (
        <div className={styles.ctnDescAudience}>
          {renderBalancedTargeting()}
          {renderDetailTargeting()}
          {/* {renderPrice()} */}
          {!isEdit && (
            <Typography variant="span" textAlign={'center'} paragraph>
              {`USD${getAudiencePrice(data)} per airdrop `}
            </Typography>
          )}
          {!isEdit && (
            <div className={styles.ctnAmount}>
              <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                {`${calculateAirdropPerUser(data)} users`}
              </Typography>
              <Typography variant="span" textAlign={'center'} paragraph>
                In this audience will receive airdrops
              </Typography>
            </div>
          )}
        </div>
      );
    }
    if (target === 'upload') {
      return (
        <div className={styles.ctnDescAudience}>
          <div className={styles.ctnRowItem}>
            <div>
              <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
                <Typography variant="span" color="#AD4061">
                  {`+ `}
                </Typography>
                Your Own Audience
              </Typography>
              {data.audienceFile && (
                <Typography variant="span" textAlign={'center'} color="#6A7B8A" marginTop={1}>
                  {data.audienceFile.name}
                </Typography>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.ctnDescAudience}>
        <div className={styles.ctnRowItem}>
          <div>
            <Typography variant="span" textAlign={'center'} marginBottom={0.1}>
              <Typography variant="span" color="#90B272">
                {`+ `}
              </Typography>
              Optimized Targeting
            </Typography>
            <Typography variant="span" textAlign={'center'} color="#6A7B8A" marginX={0.2}>
              The audience consists of a broad mix of users, optimized by our algorithm.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ctnAudience}>
      <div className={styles.cardAudience} Summary onClick={onPressCard}>
        <div className={styles.headerAudience}>
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
        <div className={styles.ctnContentSummary}>{renderContent()}</div>

        <div className={styles.ctnSectionSummary}>
          <div className={styles.ctnPriceTag}>
            <img src={pricetagIcon} alt="pricetag" />
            <Typography variant="body2" fontWeight={'bold'} textAlign="center" color="#7089FF">
              {`USD${getAudiencePrice(data)} per sendout`}
            </Typography>
          </div>
        </div>
        <a
          className={`${styles.btnAddAudience} ${isDisable ? styles.disableBtn : ''}`}
          onClick={() => {
            if (!isDisable) {
              onAdd();
            }
          }}
          href={isDisable ? undefined : `#card-audience-${selectedAudience}`}
        >
          <Typography variant="body1" fontWeight={'bold'} color="#fff" textAlign={'center'}>
            Add audience
          </Typography>
        </a>
        {selectedPage && (
          <div className={styles.ctnArrow}>
            <img src={triangleIcon} alt="arrow" />
          </div>
        )}
      </div>
    </div>
  );
}

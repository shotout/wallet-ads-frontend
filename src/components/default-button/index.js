import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';

export default function DefaultButton({
  label,
  ctnBtnStyle = '',
  isLoading,
  onClick = () => {},
  eventName,
  disabled,
  id,
}) {
  const styles = useStyles();

  const handlePress = () => {
    if (!isLoading) {
      if (typeof onClick === 'function') {
        if (window && window._paq) {
          window._paq.push(['trackEvent', 'Button Clicked', eventName, eventName]);
        }
        onClick();
      }
    }
  };

  function renderContent() {
    if (isLoading) {
      return <CircularProgress className={styles.circularStyle} size={24} />;
    }
    return <span>{label}</span>;
  }

  return (
    <button onClick={handlePress} className={`${styles.ctnBtn} ${ctnBtnStyle} `} disabled={disabled} id={id}>
      {renderContent()}
    </button>
  );
}

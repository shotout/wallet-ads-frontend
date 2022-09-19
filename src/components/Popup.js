import CookieConsent, { Cookies } from 'react-cookie-consent';

const Popup = () => {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Accept!!"
        cookieName="myAwesomeCookieName2"
        // style={{ background: '#E4E6FA' }}
        style={{ background: 'linear-gradient(90deg, #E691F3 17.5%, #7089FF 82.5%)' }}
        buttonStyle={{
          // background: 'blue',
          // background: 'linear-gradient(to left, orange , yellow, green, cyan, blue, violet)',
          color: '#4e503b',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
        {/* <span style={{ fontSize: '10px' }}>This bit of text is smaller :O</span> */}
      </CookieConsent>
    </div>
  );
};

export default Popup;

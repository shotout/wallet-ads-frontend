import CookieConsent, { Cookies } from 'react-cookie-consent';

const Popup = () => {
  return (
    <div>
      <CookieConsent
        location="bottom"
        // enableDeclineButton
        buttonText="Accept"
        declineButtonText="Cookie Settings"
        cookieName="cookies"
        style={{ background: 'black' }}
        buttonStyle={{
          background: 'white',
          color: '#4e503b',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
        expires={150}
      >
        We use cookies and similar technologies to enable services and functionality on our site and to understand your
        interaction with our service By clicking on accept, you agree to our use of such technologies for marketing and
        analytic.{' '}
        <span>
          <a href="/cookies" style={{ color: 'white' }}>
            See Privacy Policy
          </a>
        </span>
        <span>
          {/* <button buttonText>First child button</button> */}
          {/* <button>second child button</button> */}
        </span>
      </CookieConsent>
    </div>
  );
};

export default Popup;

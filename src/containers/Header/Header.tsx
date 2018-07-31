import * as React from 'react';
import * as st from './Header.scss';

const Header = () => {
  return (
    <div className={st.headerContainer}>
      <div>
        <div className={st.title}>PHARMEASY</div>
        {/* <div className={st.subtitle}>Khayal rakhe apno ka</div> */}
      </div>
      <div>
        <img src="https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/bot-icon.png" alt="PE"/>
      </div>
    </div>
  )};

  export default Header;
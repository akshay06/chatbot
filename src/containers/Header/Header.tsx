import * as React from 'react';
import * as st from './Header.scss';

const Header = () => {
  return (
    <div className={st.headerContainer}>
      <div>
        <div className={st.title}>PHARMEASY</div>
        <div className={st.subtitle}>Khayal rakhe apno ka</div>
      </div>
      <div>
        <img src="https://image.ibb.co/mq0NPo/Screen_Shot_2018_06_22_at_1_13_28_AM.png" alt="PE"/>
      </div>
    </div>
  )};

  export default Header;
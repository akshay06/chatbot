import * as React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as bs from '../../styles/Bootstrap.scss'
import * as cm from '../../styles/common.scss'
import * as st from './Header.scss'
import Login from '../AuthModal/Login'
import { open_auth_modal } from '../../actions/AuthAction'
import MenuRight from '../MenuRight/MenuRight'

type Props = {
  dispatch: any,
}

declare let window: any
const menu = [{
  itm: 'open letters',
  url: '/open-letters',
}, {
  itm: 'narrations',
  url: '/narrations',
}, {
  itm: 'most loved',
  url: '/most-loved',
}, {
  itm: 'trending',
  url: '/trending',
}, {
  itm: 'poetry',
  url: '/poetry',
}, {
  itm: 'flashfilms',
  url: '/flashfilms',
}, {
  itm: 'testimonials',
  url: 'testimonials',
}, {
  itm: 'contact us',
  url: 'contact-us',
}]

class Header extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  render() {
    return <>
      <Login />
      <div className={st.header}>
        <div style={{ position: 'relative' }}>
          <img id='hambu' tabIndex={-1} className={st.hamb} src="https://thepaperlesspostcards.files.wordpress.com/2017/05/dailyhunt.png" alt="sidebar button" />
          <div id='menu' className={cm.menuWrap} tabIndex={-2}>
            <div className={cm.menu}>
              <div className={[bs.visibleXs, st.btnTop].join(' ')}>
                <MenuRight />
                <hr style={{ borderColor: '#e3e4e6', margin: '30px auto' }} />
              </div>
              {menu.map(m => <a key={m.url} href={m.url}>{m.itm}</a>)}
            </div>
          </div>
          <a href="/">
            <img className={st.logo} src="https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2016/11/papreless-postcards-logo-website_1.png" alt="logo" />
          </a>
          <div className={[bs.hiddenXs, st.menuRight].join(' ')}>
            <MenuRight />
          </div>
        </div>
      </div>
    </>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

const mapStateToProps = (state, ownProps: any) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

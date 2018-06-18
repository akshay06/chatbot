import * as React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as bs from '../../styles/Bootstrap.scss'
import * as cm from '../../styles/common.scss'
import * as st from './Footer.scss'

type Props = {
  dispatch: any,
}

declare let window: any

class Footer extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const social = [{
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYRJREFUSA1jnDt3bvu/f/+KGRgYWIGYmuA3ExNTLxONDAc5lBVkNhOIQU1no5nFyoImQBKXkZHxK1DDVSC+A8TM////5wbS1kAsCMRgQLYFwPCdDzSwJCUl5R3MMBA9Z86cXUBxV5gYuRZsSU5OToIZgo8GxQHJgJmZuZxYTYyzZ8/+T6xiqLrvwGDhAYb/PxB/0aJFcj9//twCZGoCxUDxwAhVB6ZIDiKgIfdhhoNMABruDaR0QWyg4SAKBZATRH+QTQBGNjsyH51NjgXoZuDlE2UBMEh2ACNWDIQ5OTkdkE3k5eWdCZMD0UC5N8jyxMbBr6SkpNfIGmHssLCw70A2CDNs3ryZ68WLFyIwORBNlA+QNeBjv379WgFdnlgfiANzKCi1MACD4VNiYuJhmEHAZKr469cvLRD/79+/RjBxGE2UBcDkZw7UAErrIEMuASl9EBsEfv/+7Q+U74fwMEmqBhGm8VSOg1ELsIUAQTG6RPJvgs4gXwGoZcHUC9RPC0vAzRYAaAttqS3cg1oAAAAASUVORK5CYII=',
      url: 'https://www.facebook.com/paperlesspostcards/'
    }, {
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAnxJREFUOBGllD1oU1EUx5uXJn1KbaBD02KmBLd2CEZbl9K4OJQ6KIpIIJCPxUEFySA46FAs3apu+VKRDgHRgoOBijooCDqIgiJaBGliERVMFvG9PH/30du+XF7Trwsn55z/+Z+Pm3vf9XSxLMvysCxhb2XB14rF4gW4J5ER/CXyn+q6fjWRSPwRNUql0ij+F49wCoXCjKZpi6lUalH4nVa5XNZN06xSdFzl0WQJbJ7YMexmJpM5qgkSwGmSFvL5/ITwOy1419yKixzwMHIFU2fgOQY/ZTcAGET2Io/Zeg6SxIHWV6VS8eNdXEfcLaY/0Gq17lLnvV0IYHmV2kNgls4vaHRETW82m8MkiSYdF5zf1BzPZrMfugUT4AEq58gao9FL/rJ3bDWPPAsGg5/q9XrAwdnQhD+fTqffCoLdgG4zNDmLv1/JGqHRDaSrVquZcL4r8Y3cXzKgkSRu0m2aLCCmDKganhdMHUClSX9FGhpFybUGkXOrRWRsx5o6H2WyPOSbEtitZuBGJBJ5JevYDTiQewAVCe5SP4nH44asIXdg8dWdoXsO+SqDO9S3nHni4OwVCoWCGNNIP7LPBrf/84a7f9mZZu9AAARWmP415pCTsA275fV6L6n8tQYiwOGcp8kdlbQVn49rlsfyucq1X1MV5Kk4DDbFdRMT7VHjLn41Go1OxWKxf2qsbQeOoI49iWxanB0/DAQCx92Ki3oeph1me308BwP4B5FJJo+K4CbrL3nXw+HwtPNaqjndPp+vbhhGlqIpgr0qwcU3mPoReI7v57NLvA1aOwPe+t5Go3GC6ATNDqGH0H0U+4FeRn9DV/1+//1kMvmzrUoH5z9T2/p+rprFPAAAAABJRU5ErkJggg==',
      url: 'https://twitter.com/brandpaperless'
    }, {
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA0NJREFUSA21lj1MU1EUx3nvtdAyGGOCoiEkLQMDGhfj4CRxdoQBSBNbcJHEuJDIYlyIcZZF2pI0oAlMjg4GZzcSHRigCSGKkhjSgZaPtv7+l3vLCxSiRG5yes49H/97z7nnvluvJTQKhcLVvb29DKoHUALqqNfrMXgA+VB41JhUPc+rwLegIvSptbU1l0qlfiGb4TlhZmbmEfIbqN3pzsl3iBsfGxubVbxZwILnjcLzVthVAfrGfJMMKkEQHOzv72vHZjD3fN/3qtVqBD9l2IlfH5SCeq1bWot4Ksvu7q7SaydoNplMPu7v7z+wTv/ElpaWImtra29rtZqqsdPW1paI2Jq3s5OV84Jns9lnAA4Vi8WXwlhdXb2nTIStg9OBtqgsZ+18YWEhmJub6xJJVowGQCrzK/gddv5CGMIyRrAjCAlNUKrmJwaAl8rl8lSpVBoG5LIcKpXKNuc2H4/HJ4kr5XK5edTDyOJhrIQW6JCSsXnIjn5J/S7gi2i6AW8Y7EJPsD3EZyCTyaTRZVjAOMF/WucOH4O6QKmqnxtDO0dnwFFu0DlDsVjshkiydJAWXpSvAxcApSqLC1ttFkFoUStK6YbKgtwNbeBzO51O/3Y2+Ht2/pG4ZflY33FnFxaLaBooA3MXwn2uQwR02HgEwcTo6GgY3OBIB9CEJvINHzzgrp7+8etvgmmv6yxsDjQajX42yiY/ziZfxTgXLqBb4MT3xfn8N940Az5YP0h7W6tQuvunreZs8lWM86N0puya+xhNOqTbWGxwcLBK2qanSfc1B3rFBTsunWyay1cxzqbvlJVr6iB1T1QfLucgrkukPkdUKy7n8/kJV3Pt3IJ3YV+Xr2LcCGFVlYHpf7i5D85pZGSkhG6A+TrURdA7bvB3kWTpZJOPfJEbgwzimghbZdFjodF5yI5+acUv7O4WmmmczZnIauVp2eRzFHEokfE1q9tSWYpQEmUf/IM1NJjd3Th9/tS1og40XPOGsxUslmZFj8N6jmKKXa309PTcPOuLehyo2VxvAp/rr2D2gjnp6w3FcUcKPRZyaBb4Nzr34AhLmMI27XShT6bb2YU++m6R0/62UEvdF3d5jDs6VHW9Xmf+bfkDXjLgldLQGSIAAAAASUVORK5CYII=',
      url: 'https://www.instagram.com/paperless_postcards/'
    }, {
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAYAAADHeGwwAAAAAXNSR0IArs4c6QAAAbtJREFUOBGtlcFKAlEUhpvRSYJGAi1aBLpw0dLIRYto0zu4CiGlhe3atGjRG0TtCiJEoVdwFfgEQrtWai5MKG2hQjnTjH1HAsWRcRIvHM655/zn/+9c7p2rLDEKhcKGaZpng8FgFwspiqLjV/EBymIacz9exWTY1H7wJtan1mfew3fxbaysadp1KpV6V3K53JplWc8UI9K5qIHIq8/n21Ft2z5ZNLksEs6ocIvA4aJWPckj3CqfEp0sTJnLXs8zIiqfEprVqarqFXbEYqqzsBP1sJwKfSLpmPKpdiaTeYzH49sIZRF6c4CmJ3TZouXpNWc2kUiYCN0Fg8EYQuf0fjpRo4xwyxYpo5S3KJlMfum6fkvvg1uHcPtRwXsXKRaLgWazme10OheQr7sJCLcfcgOQ3FbXUSqV/NVq9bjRaFwC3HIF/xWFW65/F3MVYCX7lUrlhYaYF+IxTFcEWlh4LOkIIT5wJL0lWnJM696wc6Hqckyf5mr10CTcKmf6HmzNA/6/kJpwD+9APp8PGYZxiuIe+72Jl/dgBT98D4g12DXmPmKcYjG3iA1ieQ++8T1yXeI2vsyv+iadTn/8Ao0LuLGjSgPxAAAAAElFTkSuQmCC',
      url: 'https://www.youtube.com/channel/UCG_Ne17NKKIfKI8GQ06fURA'
    }]

    const news = [{
      url: 'https://yourstory.com/2017/04/paperless-postcards-startup/',
      img: 'https://thepaperlesspostcards.files.wordpress.com/2016/11/ys1.jpg',
    }, {
      url: 'https://www.thequint.com/lifestyle/life/paperless-postcards-and-the-business-of-conversations',
      img: 'https://i1.wp.com/thepaperlesspostcards.com/wp-content/uploads/2017/12/thequint.png',
    }, {
      url: 'http://www.yosuccess.com/interviews/bistriti-poddar-paperless-postcards/',
      img: 'https://i1.wp.com/thepaperlesspostcards.com/wp-content/uploads/2017/12/yosuccee-2.png',
    }, {
      url: 'http://m.dailyhunt.in/news/india/english/yourstory-epaper-yourstory/how+paperless+postcards+uses+non+fiction+content+to+build+conversations-newsid-66644216',
      img: 'https://thepaperlesspostcards.files.wordpress.com/2017/05/dailyhunt.png',
    }, {
      url: 'http://iwilindia.com/success-story/bistriti-poddar-founder-of-paperless-postcards/',
      img: 'https://i1.wp.com/thepaperlesspostcards.com/wp-content/uploads/2017/12/iwil222_f2.jpg',
    }, {
      url: '#',
      img: 'https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2018/02/radiocity3.png?resize=110%2C100&#038;ssl=1" width="110" height="100" data-recalc-dims="1" />',
    }, {
      url: 'https://timesofindia.indiatimes.com/city/mumbai/a-chance-to-show-sacrifice-of-martyrs-is-not-forgotten/articleshow/60716385.cms',
      img: 'https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2017/12/toi_f2.png',
    }, {
      url: 'http://www.newindianexpress.com/cities/kochi/2018/jan/21/thriving-on-daily-conversations-1760628.html?utm_source=Media&utm_medium=Homepage',
      img: 'https://i2.wp.com/thepaperlesspostcards.com/wp-content/uploads/2018/02/The-new-Indian-Express8.jpg',
    }]

    return <div className={st.footer}>
      <div className={[bs.container, cm.noPdXs].join(' ')}>


        <div className={[st.footerCol, bs.colXs12, bs.colSm4].join(' ')}>

          <div className={st.title}>Contact Us</div>
          <div className={st.subTitle}>
            Write For Us<br />
            Submit fan entries at:<br />
            <div className={st.email}>fanpaperlesspostcards@gmail.com</div>
          </div>
          <div className={st.subTitle}>
            Collaborate With Us<br />
            Mail us at:<br />
            <div className={st.email}>alliances@thepaperlesspostcards.com</div>
          </div>
          <div className={st.social}>
            {social.map(i => <a key={i.url} href={i.url}><img src={i.img} /></a>)}
          </div>
        </div>
        <div className={[st.footerCol, bs.colXs12, bs.colSm4].join(' ')}>
          <div className={st.title}>Media Coverage</div>
          <div className={st.newsWrap}>
            {news.map(n => <a key={n.url} className={st.news} href={n.url}><img src={n.img} /></a>)}
          </div>
        </div>
        <div className={[st.footerCol, bs.colXs12, bs.colSm4].join(' ')}>
          <div className={st.title}>Subscribe to us</div>
          <div className={st.subTitle}>Join 2,000,000 Fellow Readers. Receive Our Latest Updates In Your Inbox Before Everyone Else</div>
          <form className={st.subscribe}>
            <input className={st.txtEmail} placeholder='Email ID' />
            <input className={st.txtSubmit} type="submit" value='SUBSCRIBE' />
          </form>
        </div>
        <div className={[st.footerCol, bs.colXs12, st.copyright].join(' ')}>© 2018 Paperless Postcards</div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)

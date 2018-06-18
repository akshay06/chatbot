import * as React from 'react'
import Swiper from 'react-id-swiper';
import * as st from './Slider.scss';
import * as cmn from '../../styles/common.scss';
import { icon_next, icon_previous } from '../../styles/icon.scss';
import Button from '../Button/Button';

type Props = {
  navigation: any
}
const defaultProps = {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.sliderButtonNext',
    prevEl: '.sliderButtonPrev'
  },
  renderNextButton: () => ( <Button type="iconOnly" className={["sliderButtonNext", st.nextIcon, icon_next].join(' ')}> </Button> ),
  renderPrevButton: () => ( <Button type="iconOnly" className={["sliderButtonPrev", st.prevIcon, icon_previous].join(' ')}> </Button> ),
  lazy: true,
  autoplay: false,
  zoom: false
}

export default class Slider extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      ...props
    } = this.props;
    const config = {...defaultProps, ...props};
    return (
      <Swiper {...config}>
        {children}
      </Swiper>
    );
  }
}

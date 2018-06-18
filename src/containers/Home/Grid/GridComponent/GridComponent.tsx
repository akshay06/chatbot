import * as React from 'react'
import {homeIndexes} from '../../../../utils';
import { trackEvent } from '../../../../lib/pixels';
import * as bs from '../../../../styles/Bootstrap.scss';

const GridComponent = (props) => {
  const {elem, index} = props;
  let style = {
    Atag: {
      'display': 'inline-block',
      'width': '100%',
      'position': 'relative' as 'relative'
    },
    contentDiv: {
      'maxWidth': (elem[homeIndexes.BoxMaxWidth] ? `${elem[homeIndexes.BoxMaxWidth]}px` : 'auto'),
      'textAlign': (elem[homeIndexes.textAlign] ? `${elem[homeIndexes.textAlign]}` : 'left')as 'left',
      'top': (elem[homeIndexes.BoxPosTop] ? `${elem[homeIndexes.BoxPosTop]}%` : ''),
      'left': (elem[homeIndexes.BoxPosLeft] ? `${elem[homeIndexes.BoxPosLeft]}%` : ''),
      'cursor': (elem[homeIndexes.link]) ? 'pointer' : 'default',
      'transform': 'translate(-50%, -50%)',
      'position': 'absolute' as 'absolute',
      'wordBreak': 'break-all' as 'break-all'
    },
    headingStyle: {
      'color': (elem[homeIndexes.headingColor] ? `${elem[homeIndexes.headingColor]}` : '#000'),
      'position': 'relative' as 'relative',
      'fontSize': (elem[homeIndexes.headingSize] ? `${elem[homeIndexes.headingSize]}px` : '14px')
    },
    subHeadingStyle: {
      'color': (elem[homeIndexes.subHeadingColor] ? `${elem[homeIndexes.subHeadingColor]}` : '#000'),
      'position': 'relative' as 'relative',
      'fontSize': (elem[homeIndexes.subHeadingSize] ? `${elem[homeIndexes.subHeadingSize]}px` : '14px')
    },
    btnStyle: {
      'color': (elem[homeIndexes.btnColor] ? `${elem[homeIndexes.btnColor]}` : '#000'),
      'fontSize': (elem[homeIndexes.btnSize] ? `${elem[homeIndexes.btnSize]}px` : '14px'),
      'border': (elem[homeIndexes.btnBorder] ? `${elem[homeIndexes.btnBorder]}` : '1px solid'),
      'background': (elem[homeIndexes.btnBackground] ? `${elem[homeIndexes.btnBackground]}` : 'black'),
      'padding': '8px 10px'
    }
  }
  return (
    <a key={index} style={{ ...style.Atag }} onClick={() => { trackEvent(elem[homeIndexes.category], elem[homeIndexes.action], elem[homeIndexes.label], elem[homeIndexes.gaValue]);}} href={elem[homeIndexes.link]}>
      <img title={elem[homeIndexes.imgTitle]} alt={elem[homeIndexes.imgAlt]} style={{ width: '100%' }} src={elem[homeIndexes.image]}/>
      <div style={{ ...style.contentDiv }}>
        { elem[homeIndexes.heading] && 
          <div style={{ ...style.headingStyle }} dangerouslySetInnerHTML={{ __html: elem[homeIndexes.heading] }}></div>
        }
        { elem[homeIndexes.subHeading] &&
          <div style={{ ...style.subHeadingStyle }} dangerouslySetInnerHTML={{ __html: elem[homeIndexes.subHeading] }}></div> 
        }
        { elem[homeIndexes.buttonText] && <button
          style={{ ...style.btnStyle }} dangerouslySetInnerHTML={{ __html: elem[homeIndexes.buttonText] }}></button>
        }
      </div>
    </a>
  );
};

export default GridComponent;
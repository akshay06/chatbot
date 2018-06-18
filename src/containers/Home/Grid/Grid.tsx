import * as React from 'react'
import {homeIndexes} from '../../../utils';
import { trackEvent } from '../../../lib/pixels';
import * as bs from '../../../styles/Bootstrap.scss';
import * as cmn from '../../../styles/common.scss';
import GridComponent from './GridComponent/GridComponent';

const getGridType = (grid_type, index) => {
  let classes = [];
  switch (grid_type) {
    case 'grid-4-8':
      if (index === 0) {
        classes = [bs.colSm4]
      } else {
        classes = [bs.colSm8]
      }      
      break;
    case 'grid-8-4':
      if (index === 0) {
        classes = [bs.colSm8]
      } else {
        classes = [bs.colSm4]
      }      
      break;
  
    default:
      break;
  }
  classes.push(cmn.noPd)
  return classes.join(' ');
};

const Grid = (props) => {
  const {elem: {grid, data: gridData}, index} = props;
  return (
    <div key={index} className={[bs.row, cmn.noMg].join(' ')}>
    {gridData.map((elem, childIndex) =>
      <div key={childIndex} className={getGridType(grid, childIndex)}>
        {GridComponent({elem, childIndex})}
      </div>
    )}

    </div>
  );
};

export default Grid;
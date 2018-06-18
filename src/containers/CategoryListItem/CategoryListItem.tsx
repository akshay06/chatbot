import * as React from 'react';
import * as cmn from '../../styles/common.scss';
import * as bs from '../../styles/Bootstrap.scss';
import * as st from './CategoryListItem.scss';
import Button from '../../sharedComponents/Button/Button';

const CategoryListItem = ({article: { url, image, title, subTitle }}) => {
  // console.log('called', props);
  return (
    <div className={bs.colSm4}>
      <a className={st.aticleWrapper} href={url}>
        <img className={st.aticleImg} src={image} alt="Article Image"/>
        <div className={st.title}>{title}</div>
        <div className={st.subTitle}>{subTitle}</div>
        <Button type="primaryRed">Read More</Button>
      </a>
    </div>
  )}
  export default CategoryListItem;
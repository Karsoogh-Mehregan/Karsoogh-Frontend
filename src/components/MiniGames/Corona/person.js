import Konva from 'konva';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image, Group } from 'react-konva';
import useImage from 'use-image';

const normalURL = 'http://s6.uplod.ir/i/01009/06izcdyx5i4f.png';
const redURL = 'http://s6.uplod.ir/i/01009/zxm8lz2s3l1o.png';
const greenURL = 'http://s6.uplod.ir/i/01009/7r7v57xmqt7i.png';

const PersonImage = ({ isSelected, imageType, ...rest }) => {
  let imageURL = normalURL;
  if (imageType === 'red') {
    imageURL = redURL;
  } else if (imageType === 'green') {
    imageURL = greenURL;
  }
  const [image] = useImage(imageURL);
  return <Image shadowBlur={isSelected ? 1 : 8} {...rest} image={image} />;
};

function Person({ id, x, y, name, patience, isSelected, selectPerson, unselectPerson, imageType }) {
  const [scale, setScale] = useState(1);

  useEffect(
    () => {
      // const isMobile = window.innerWidth <= 800;
      if (isSelected) {
        setScale(0.5);
      } else {
        setScale(0.4);
      }
    }
    , [isSelected, scale])

  const handleClick = () => {
    if (isSelected) {
      unselectPerson(id);
    } else {
      selectPerson(id);
    }
  }

  return (
    <Group draggable onDblTap={handleClick} onClick={handleClick} offsetX={40} offsetY={120} x={x} y={y} scaleX={scale} scaleY={scale}>
      <Text text={patience} height={30} width={80} fontSize={30} verticalAlign='center' align='center' />
      <Text text='صبر' height={20} width={80} y={25} fontSize={20} verticalAlign='center' align='center' />
      <PersonImage width={80} height={160} y={50} isSelected={isSelected} imageType={imageType} />
      <Text text={name} width={300} height={30} x={-110} fontSize={25} y={220} verticalAlign='center' align='center' />
      {/* <Text text={info} width={100} height={30} fontSize={15} y={290} verticalAlign='center' align='center' /> */}
    </Group>
  )
}

export default Person;

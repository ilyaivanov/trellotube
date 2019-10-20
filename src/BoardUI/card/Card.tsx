import React from "react";
import './Card.css';

interface Props {
  text: string;
  imageUrl: string;
}

const Card = ({ text }: Props) => (
  <div className="row-item">
    <span>{text}</span>
    <div className="absolute-fill row-item-cross-container">
      <span className="row-item-cross">x</span>
    </div>
  </div>
);

export default Card;

import BusinessCard from './BusinessCard';
import { cards } from '../data/cards';
import './BusinessCardList.css';

function BusinessCardList() {
  return (
    <div className="business-card-list">
      {cards.map((card, index) => (
        <BusinessCard key={index} {...card} />
      ))}
    </div>
  );
}

export default BusinessCardList;
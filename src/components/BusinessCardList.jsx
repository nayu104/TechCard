import BusinessCard from './BusinessCard';
import './BusinessCardList.css';

function BusinessCardList({ cards }) {
  return (
    <div className="business-card-list">
      {cards.map((card, index) => (
        <BusinessCard key={index} {...card} />
      ))}
    </div>
  );
}

export default BusinessCardList;


/*
function BusinessCardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map(card => (
        <BusinessCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default BusinessCardList;
*/
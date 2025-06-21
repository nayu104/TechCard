import BusinessCard from './BusinessCard';
import './BusinessCardList.css';

function BusinessCardList({ cards, deleteFriend }) {
  return (
    <div className="business-card-list">
      {cards.map((card, index) => (
        <div key={index} style={{position:'relative'}}>
          <BusinessCard {...card} showQRCode={false} />
          {deleteFriend && card.uid && (
            <button
              style={{position:'absolute', top:8, right:8, zIndex:10, background:'#ff6600', color:'#fff', border:'none', borderRadius:4, padding:'0.3em 0.7em', cursor:'pointer'}}
              onClick={() => deleteFriend(card.uid)}
            >削除</button>
          )}
        </div>
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
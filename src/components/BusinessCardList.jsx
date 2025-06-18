import BusinessCard from './BusinessCard'; // この行はあなたのプロジェクトにあるなら残してください
// import { cards } from '../data/cards'; // 親からpropsで受け取るため、この行は不要なので削除またはコメントアウト

function BusinessCardList({ cards }) {
  // 受け取った cards データが存在しない場合は、空の配列として扱う
  const cardsToDisplay = cards || [];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '1rem', // 適度な余白
    }}>
      {cardsToDisplay.length === 0 ? (
        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>該当する名刺が見つかりません。</p>
      ) : (
        cardsToDisplay.map((card, index) => ( // props から受け取った cards を使用
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#fff'
          }}>
            <img src={card.avatar} alt={card.name} style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '10px'
            }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px',color:'#333' }}>{card.name}</h2>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '5px' }}>
              GitHub: <a href={card.github} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>{card.github}</a>
            </p>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>スキル: {card.skills.join(', ')}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BusinessCardList;
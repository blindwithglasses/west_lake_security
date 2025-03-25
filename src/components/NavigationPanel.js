// 融合恒脑路径优化算法
const NavigationPanel = ({ onRouteSelect }) => {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    window.hengnao.getSecurePOIs()
      .then(data => setPois(data.filter(p => p.securityLevel >= 3)));
  }, []);

  return (
    <div className="navigation-container">
      {pois.map(poi => (
        <div key={poi.id} className="poi-card">
          <h3>{poi.name}</h3>
          <button onClick={() => onRouteSelect(poi.coordinates)}>
            智能导航
          </button>
          <p>{window.hengnao.analyzeSecurity(poi)}</p>
        </div>
      ))}
    </div>
  );
};
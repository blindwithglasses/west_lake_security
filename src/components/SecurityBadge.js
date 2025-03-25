// 使用恒脑安全引擎进行实时验证
const SecurityBadge = ({ level }) => {
  useEffect(() => {
    const validationInterval = setInterval(() => {
      window.hengnao.verifySessionIntegrity()
        .catch(() => window.location.reload());
    }, 300000);  // 每5分钟验证会话完整性

    return () => clearInterval(validationInterval);
  }, []);

  return <div className={`security-badge level-${level}`} />;
};
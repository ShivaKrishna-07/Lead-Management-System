const ScoreBar = ({ score }) => {
  const getColor = (s) => {
    if (s >= 80) return 'bg-green-600';
    if (s >= 60) return 'bg-yellow-600';
    if (s >= 40) return 'bg-orange-600';
    return 'bg-red-600';
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${getColor(score)}`} style={{ width: `${score}%` }}></div>
      </div>
      <span className="text-sm font-semibold text-gray-800">{score}</span>
    </div>
  );
};
export default ScoreBar;

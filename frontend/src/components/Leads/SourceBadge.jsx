const SourceBadge = ({ source }) => {
  const labels = { facebook_ads: 'Facebook Ads', google_ads: 'Google Ads' };
  return (
    <span className="px-2 py-1 rounded-lg text-xs font-semibold border bg-gray-100 text-gray-800">
      {labels[source] || (source?.charAt(0).toUpperCase() + source?.slice(1))}
    </span>
  );
};
export default SourceBadge;

import './AnnouncementCard.css';

const AnnouncementCard = ({ author, date, title, content }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {author[0]}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{author}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
  </div>
);

export default AnnouncementCard;
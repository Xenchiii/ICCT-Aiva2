interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Notifications({ notifications }: { notifications: Notification[] }) {
  // simple stateless list
  return (
    <div>
      {notifications.map(n => (
        <div key={n.id} className="p-2 border-b">
          <p className="text-sm">{n.message}</p>
        </div>
      ))}
    </div>
  );
}

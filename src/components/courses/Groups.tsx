const Groups = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <h3 className="font-bold text-lg mb-4">My Project Group</h3>
    <div className="flex -space-x-2">
      {[1,2,3].map(i => (
        <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold">
          S{i}
        </div>
      ))}
      <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
        +2
      </div>
    </div>
    <button className="mt-4 w-full border border-primary text-primary py-2 rounded-lg text-sm font-bold">View Group Space</button>
  </div>
);

export default Groups;
"use client";

import { useState, useEffect } from "react";
import { Bell, AlertCircle } from "lucide-react";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetchAnnouncements();

    const channel = supabase
      .channel('public:announcements')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, (payload) => {
        setAnnouncements(prev => [payload.new, ...prev].slice(0, 5));
        setUnread(prev => prev + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) {
      setAnnouncements(data);
      // Dummy logic: assume if there are any, 1 is unread on load
      setUnread(data.length > 0 ? 1 : 0);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => { setIsOpen(!isOpen); setUnread(0); }}
        className="relative neu-flat rounded-full p-3 transition-transform hover:scale-105"
      >
        <Bell className="h-4 w-4 text-[#1a1a1a]" />
        {unread > 0 && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-[#ff6b00] rounded-full border-2 border-[#ffffff] animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-80 bg-white/90 backdrop-blur-xl border border-[#d1d9e6] rounded-3xl shadow-xl p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">Festival Alerts</h3>
            <span className="bg-siri-gradient text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Live</span>
          </div>
          
          <div className="space-y-3">
            {announcements.length === 0 ? (
              <p className="text-xs text-[#666666] font-bold text-center py-4">No new alerts.</p>
            ) : (
              announcements.map((ann, i) => (
                <div key={ann.id || i} className="bg-[#ffffff] p-3 rounded-2xl flex items-start space-x-3">
                  <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${ann.priority === 'high' ? 'text-[#ff3b30]' : 'text-[#ff6b00]'}`} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[#1a1a1a]">{ann.title}</h4>
                    <p className="text-[10px] text-[#666666] mt-1 font-semibold">{ann.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

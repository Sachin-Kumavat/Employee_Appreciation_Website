import { useState, useEffect } from 'react';
import { Filter, FileText, ThumbsUp } from 'lucide-react';
import { FeedItem } from '../components/feed/FeedItem';
import { StatusBadge } from '../components/ui/StatusBadge';
import apiRequest from '../utils/ApiService';
import Cookies from 'js-cookie';

interface FeedPageProps {
  darkMode?: boolean;
}

interface Achievement {
  id: number;
  type: "achievement";
  title: string;
  description: string;
  image_url?: string;
  status: string;
  achievement_date: string;
  createdAt: string;
  Employee: {
    id: number;
    name: string;
    avatar_url: string;
  };
  reactions: any[];
  comments: any[];
}

interface Appreciation {
  id: number;
  type: "peer_appreciation";
  message: string;
  image_url?: string;
  status: string;
  sender: {
    id: number;
    name: string;
    avatar_url: string;
  };
  receiver_names: string[];
  reactions: any[];
  comments: any[];
}

export function FeedPage({ darkMode }: FeedPageProps) {
  const [filter, setFilter] = useState<'all' | 'achievements' | 'peer'>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [appreciations, setAppreciations] = useState<Appreciation[]>([]);
  const [loading, setLoading] = useState(true);

  // Reactions state per post
  const [reactionsMap, setReactionsMap] = useState<{ [id: number]: { liked: boolean; clapped: boolean; like: number; clap: number } }>({});

  const email = Cookies.get("userEmail");
  const empId = Cookies.get("empId");

  const fetchFeed = async () => {
    if (!email) return;
    try {
      setLoading(true);
      const res = await apiRequest({ method: 'POST', url: '/spotlight/all' });
      if (res.data?.success && Array.isArray(res.data.data)) {
        const achievementsData = res.data.data.filter((item: any) => item.type === 'achievement');
        const appreciationData = res.data.data.filter((item: any) => item.type === 'peer_appreciation');

        setAchievements(achievementsData);
        setAppreciations(appreciationData);

        // Initialize reactions map
        const initialReactions: any = {};
        [...achievementsData, ...appreciationData].forEach(item => {
          initialReactions[item.id] = {
            liked: false,
            clapped: false,
            like: item.reactions?.length || 0,
            clap: item.reactions?.length || 0,
          };
        });
        console.log("initialReactions---->",initialReactions)
        setReactionsMap(initialReactions);
      }
    } catch (err) {
      console.error('Failed to fetch feed:', err);
      alert('Failed to load feed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [email]);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

  const filteredAchievements = filter === 'all' || filter === 'achievements' ? achievements : [];
  const filteredAppreciations = filter === 'all' || filter === 'peer' ? appreciations : [];

  // Optimistic reaction update
  const handleLike = (id: number) => {
    setReactionsMap(prev => {
      const prevReaction = prev[id] || { liked: false, clapped: false, like: 0, clap: 0 };
      const liked = !prevReaction.liked;
      return { ...prev, [id]: { ...prevReaction, liked, like: liked ? prevReaction.like + 1 : Math.max(prevReaction.like - 1, 0) } };
    });

    // Call API
    apiRequest({ method: 'POST', url: '/reaction/add', data: { type: 'like', module_id: id, module: 'spotlight', user_id: Number(empId) } }).catch(err => console.log(err));
  };

  const handleClap = (id: number) => {
    setReactionsMap(prev => {
      const prevReaction = prev[id] || { liked: false, clapped: false, like: 0, clap: 0 };
      const clapped = !prevReaction.clapped;
      return { ...prev, [id]: { ...prevReaction, clapped, clap: clapped ? prevReaction.clap + 1 : Math.max(prevReaction.clap - 1, 0) } };
    });

    // Call API
    apiRequest({ method: 'POST', url: '/reaction/add', data: { type: 'clap', module_id: id, module: 'spotlight', user_id: Number(empId) } }).catch(err => console.log(err));
  };

  console.log("filter--->",filter)
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>Spotlight Feed</h1>
        <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mt-1`}>
          Celebrate your colleagues and their achievements
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={`${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border rounded-xl p-4`}>
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          {['all', 'achievements', 'peer'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {f === 'all' ? 'All Posts' : f === 'achievements' ? 'Achievements' : 'Peer Appreciation'}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-neutral-600">Loading feed...</p>}

      {/* Achievements */}
      {!loading && filteredAchievements.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAchievements.map(achievement => {
            const reactions = reactionsMap[achievement.id] || { like: 0, clap: 0, liked: false, clapped: false };
            return (
              <div key={achievement.id} className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <img src={achievement.Employee.avatar_url} alt={achievement.Employee.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-neutral-900 mb-1 line-clamp-2">{achievement.title}</h3>
                      <p className="text-sm text-neutral-600">{achievement.Employee.name}</p>
                    </div>
                  </div>
                  <StatusBadge status={achievement.status} />
                </div>

                <p className="text-neutral-700 mb-4 line-clamp-3">{achievement.description}</p>

                {achievement.image_url && (
                  <div className="mb-4">
                    <div className="relative h-32 bg-neutral-100 rounded-lg overflow-hidden">
                      {achievement.image_url.endsWith('.pdf') ? (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="w-8 h-8 text-neutral-400" />
                        </div>
                      ) : (
                        <img src={achievement.image_url} alt="Proof" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm text-neutral-600">
                  <span>{formatDate(achievement.achievement_date || achievement.createdAt)}</span>
                  <div className="flex gap-4">
                    <button onClick={() => handleLike(achievement.id)} className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 rounded-lg">
                      <ThumbsUp className="w-4 h-4" /> {reactions.like}
                    </button>
                    <button onClick={() => handleClap(achievement.id)} className="flex items-center gap-1 px-2 py-1 text-sm bg-green-100 rounded-lg">
                      👏 {reactions.clap}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Peer appreciations remain same */}
      {!loading && filteredAppreciations.length > 0 && (
        <div className="space-y-4 mt-6">
          {filteredAppreciations.map(appreciation => {
            const reactions = reactionsMap[appreciation.id] || { like: 0, clap: 0, liked: false, clapped: false };
            return (
              <div key={appreciation.id} className={`${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border rounded-xl overflow-hidden`}>
                <FeedItem appreciation={appreciation} darkMode={darkMode} />
                {/* <div className="flex gap-4 px-4 py-2"> */}
                  {/* <button onClick={() => handleLike(appreciation.id)} className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 rounded-lg">
                    <ThumbsUp className="w-4 h-4" /> {reactions.like}
                  </button>
                  <button onClick={() => handleClap(appreciation.id)} className="flex items-center gap-1 px-2 py-1 text-sm bg-green-100 rounded-lg">
                    👏 {reactions.clap}
                  </button> */}
                {/* </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

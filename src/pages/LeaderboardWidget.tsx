import { Trophy } from 'lucide-react';

interface Contributor {
  name: string;
  avatar: string;
  recognitions: number;
}

interface LeaderboardWidgetProps {
  darkMode?: boolean;
  navigateTo: (page: any) => void;
  contributors: Contributor[]; // <-- DATA NOW COMING FROM PROPS
}

export default function LeaderboardWidget({
  darkMode,
  navigateTo,
  contributors
}: LeaderboardWidgetProps) {
  return (
    <div
      className={`${
        darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"
      } border rounded-xl p-6 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={darkMode ? "text-white" : "text-neutral-900"}>
          Top Contributors
        </h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>

      {/* Horizontal scroll container */}
      <div
        className="flex gap-4 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hide scrollbar for Chrome/Safari */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {contributors.map((contributor) => (
          <div
            key={contributor.name}
            onClick={() => navigateTo("profile")}
            className={`flex flex-col items-center min-w-[200px] p-4 rounded-lg cursor-pointer transition-colors
              ${
                darkMode
                  ? "bg-neutral-700 hover:bg-neutral-600"
                  : "bg-neutral-50 hover:bg-neutral-100"
              }
            `}
          >
            {/* Smaller Image */}
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-12 h-12 rounded-full mb-2 object-cover"
            />

            <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-neutral-900"}`}>
              {contributor.name}
            </p>

            <p className={`text-xs ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}>
              {contributor.recognitions} recognitions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

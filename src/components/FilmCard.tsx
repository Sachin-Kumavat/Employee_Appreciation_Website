import { Film } from '../types/film';
import { Clock, MapPin, Star, Film as FilmIcon } from 'lucide-react';

interface FilmCardProps {
  film: Film;
  isFavorite: boolean;
  onToggleFavorite: (filmId: string) => void;
}

export function FilmCard({ film, isFavorite, onToggleFavorite }: FilmCardProps) {
  const formatTime = (timeSlot: string) => {
    const date = new Date(timeSlot);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-neutral-900 mb-1">{film.title}</h3>
            <p className="text-neutral-600">{film.director}</p>
          </div>
          <button
            onClick={() => onToggleFavorite(film.id)}
            className="ml-2 p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? 'fill-amber-500 text-amber-500' : 'text-neutral-400'
              }`}
            />
          </button>
        </div>

        <p className="text-neutral-700 mb-4 line-clamp-3">{film.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-neutral-600">
            <Clock className="w-4 h-4" />
            <span>{formatTime(film.timeSlot)} • {formatDuration(film.duration)}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="w-4 h-4" />
            <span>{film.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <FilmIcon className="w-4 h-4" />
            <span>{film.genre}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-neutral-500">{film.country}</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickAppreciateProps {
  darkMode?: boolean;
}

export function QuickAppreciate({ darkMode }: QuickAppreciateProps) {
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setShowSuccess(true);
    setMessage('');
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className={`${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border rounded-xl p-6 shadow-sm h-full`}>
      <h3 className={`${darkMode ? 'text-white' : 'text-neutral-900'} mb-4`}>
        Quick Appreciate
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mb-2`}>
            Send a quick appreciation
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something nice about a colleague..."
            className={`w-full px-3 py-2.5 border ${
              darkMode 
                ? 'border-neutral-700 bg-neutral-700 text-white placeholder-neutral-400' 
                : 'border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`p-2 rounded-lg ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
            } transition-colors`}
          >
            <Smile className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          icon={<Send className="w-4 h-4" />}
          disabled={!message.trim()}
        >
          Send Appreciation
        </Button>

        {showSuccess && (
          <div className="p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            ✓ Appreciation sent successfully!
          </div>
        )}
      </form>
    </div>
  );
}

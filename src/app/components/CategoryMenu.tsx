import { 
  Newspaper, 
  Zap, 
  Building2, 
  Trophy, 
  Film, 
  Cpu, 
  GraduationCap, 
  AlertTriangle,
  Heart
} from 'lucide-react';
import type { Category } from '@/app/types/news';

interface CategoryMenuProps {
  isVisible: boolean;
  selectedCategory: string;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { name: 'All News', icon: Newspaper, color: '#212121' },
  { name: 'Breaking', icon: Zap, color: '#FFC107' },
  { name: 'Politics', icon: Building2, color: '#D32F2F' },
  { name: 'Cinema', icon: Film, color: '#E91E63' },
  { name: 'Business', icon: Building2, color: '#4CAF50' },
  { name: 'Sports', icon: Trophy, color: '#FF9800' },
  { name: 'Technology', icon: Cpu, color: '#2196F3' },
  { name: 'Education', icon: GraduationCap, color: '#9C27B0' },
  { name: 'Crime', icon: AlertTriangle, color: '#F44336' },
  { name: 'Health', icon: Heart, color: '#00BCD4' },
] as const;

export function CategoryMenu({ isVisible, selectedCategory, onCategoryChange }: CategoryMenuProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[6vh] left-0 right-0 z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-xl px-4 py-3 mx-4 rounded-2xl shadow-2xl border border-white/20">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name as Category)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-white text-[#212121] shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon 
                  className="w-4 h-4" 
                  style={{ color: isSelected ? category.color : 'currentColor' }}
                />
                <span className="text-sm font-semibold whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

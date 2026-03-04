import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const categories = [
  { id: "all", name: "All News", emoji: "📰" },
  { id: "breaking", name: "Breaking", emoji: "⚡" },
  { id: "politics", name: "Politics", emoji: "🏛️" },
  { id: "health", name: "Health", emoji: "🏥" },
];

const moreCategories = [
  { id: "business", name: "Business", emoji: "💼" },
  { id: "sports", name: "Sports", emoji: "⚽" },
  { id: "entertainment", name: "Cinema", emoji: "🎬" },
  { id: "technology", name: "Technology", emoji: "💻" },
  { id: "education", name: "Education", emoji: "📚" },
  { id: "crime", name: "Crime", emoji: "🚨" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const isMoreCategorySelected = moreCategories.some(cat => cat.id === selectedCategory);
  const selectedMoreCategory = moreCategories.find(cat => cat.id === selectedCategory);

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 p-4 pb-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="mr-1">{category.emoji}</span>
            {category.name}
          </Badge>
        ))}
        
        {/* More Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              variant={isMoreCategorySelected ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap transition-all ${
                isMoreCategorySelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
            >
              <span className="mr-1">{isMoreCategorySelected ? selectedMoreCategory?.emoji : "➕"}</span>
              {isMoreCategorySelected ? selectedMoreCategory?.name : "More"}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {moreCategories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={selectedCategory === category.id ? "bg-primary/10" : ""}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ScrollArea>
  );
}
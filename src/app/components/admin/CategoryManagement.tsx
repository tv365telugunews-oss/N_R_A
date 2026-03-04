import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff, Palette } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  priority: number;
  enabled: boolean;
  newsCount: number;
}

const mockCategories: Category[] = [
  { id: '1', name: 'Politics', icon: '🏛️', color: '#D32F2F', priority: 1, enabled: true, newsCount: 234 },
  { id: '2', name: 'Business', icon: '💼', color: '#1976D2', priority: 2, enabled: true, newsCount: 189 },
  { id: '3', name: 'Sports', icon: '⚽', color: '#388E3C', priority: 3, enabled: true, newsCount: 156 },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#E91E63', priority: 4, enabled: true, newsCount: 142 },
  { id: '5', name: 'Technology', icon: '💻', color: '#7B1FA2', priority: 5, enabled: true, newsCount: 98 },
  { id: '6', name: 'Health', icon: '🏥', color: '#00796B', priority: 6, enabled: true, newsCount: 87 },
  { id: '7', name: 'Education', icon: '📚', color: '#F57C00', priority: 7, enabled: true, newsCount: 65 },
  { id: '8', name: 'Crime', icon: '🚨', color: '#C62828', priority: 8, enabled: true, newsCount: 54 },
];

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '📰',
    color: '#D32F2F'
  });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      icon: newCategory.icon,
      color: newCategory.color,
      priority: categories.length + 1,
      enabled: true,
      newsCount: 0
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', icon: '📰', color: '#D32F2F' });
    setIsAddingNew(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleToggleEnabled = (id: string) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Category Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize and manage news categories
          </p>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Categories</p>
          <p className="text-3xl font-bold text-[#D32F2F] mt-1">{categories.length}</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {categories.filter(c => c.enabled).length}
          </p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Disabled</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">
            {categories.filter(c => !c.enabled).length}
          </p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total News</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {categories.reduce((sum, c) => sum + c.newsCount, 0)}
          </p>
        </Card>
      </div>

      {/* Add New Category Form */}
      {isAddingNew && (
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Add New Category</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Category Name
              </label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Icon (Emoji)
              </label>
              <Input
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                placeholder="📰"
                maxLength={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  placeholder="#D32F2F"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAddCategory} className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
              Add Category
            </Button>
            <Button onClick={() => setIsAddingNew(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Categories List */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">All Categories</h3>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                category.enabled 
                  ? 'bg-white dark:bg-[#2A2A2A] border-gray-200 dark:border-gray-700' 
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-800 opacity-60'
              }`}
            >
              {/* Drag Handle */}
              <button className="cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
                <GripVertical size={20} className="text-gray-400" />
              </button>

              {/* Icon & Color */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: category.color + '20' }}
              >
                {category.icon}
              </div>

              {/* Category Info */}
              {editingId === category.id ? (
                <div className="flex-1 flex gap-3">
                  <Input
                    defaultValue={category.name}
                    onBlur={(e) => handleUpdateCategory(category.id, { name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    defaultValue={category.icon}
                    onBlur={(e) => handleUpdateCategory(category.id, { icon: e.target.value })}
                    className="w-20"
                    maxLength={2}
                  />
                  <Input
                    type="color"
                    defaultValue={category.color}
                    onChange={(e) => handleUpdateCategory(category.id, { color: e.target.value })}
                    className="w-20"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#212121] dark:text-white">{category.name}</h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: category.color + '20', color: category.color }}
                    >
                      Priority {category.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {category.newsCount} articles
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleEnabled(category.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    category.enabled
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={category.enabled ? 'Disable' : 'Enable'}
                >
                  {category.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => setEditingId(editingId === category.id ? null : category.id)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

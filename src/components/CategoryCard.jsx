import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Flame, Heart, TrendingDown } from 'lucide-react';

const iconMap = {
  Dumbbell,
  Zap,
  Flame,
  Heart,
  TrendingDown
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || Dumbbell;

  return (
    <Link 
      to={`/categoria/${category.name.toLowerCase()}`}
      className="group flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm hover:shadow-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 h-full"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="font-poppins font-semibold text-lg mb-2 text-foreground">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {category.description}
      </p>
      <span className="mt-auto text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
        Ver Produtos &rarr;
      </span>
    </Link>
  );
}
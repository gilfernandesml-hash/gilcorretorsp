
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <Card className="overflow-hidden bg-card text-card-foreground hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {post.category}
        </Badge>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
        <Link to={`/blog/${post.slug || post.id}`} className="text-accent font-semibold text-sm hover:underline mt-auto inline-flex items-center">
          Ler Mais →
        </Link>
      </CardContent>
    </Card>
  );
}

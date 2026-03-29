
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TestimonialCard({ name, text, image, rating = 5 }) {
  return (
    <Card className="h-full bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex text-accent mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-muted-foreground italic mb-6 flex-grow">"{text}"</p>
        <div className="flex items-center gap-4 mt-auto">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold text-foreground text-sm">{name}</h4>
            <p className="text-xs text-muted-foreground">Cliente</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

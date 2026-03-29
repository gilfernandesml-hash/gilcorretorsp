
import React from 'react';

export default function StepCard({ icon: Icon, step, title, description }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-primary/20 text-primary mb-6 relative">
        <Icon className="w-8 h-8" />
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

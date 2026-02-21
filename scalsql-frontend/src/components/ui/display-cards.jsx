import { cn } from '../../lib/utils';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

function DisplayCard({
  className,
  icon,
  title = 'Featured',
  description = 'Discover amazing content',
  date = 'Just now',
  iconClassName = 'text-purple-500',
  titleClassName = 'text-purple-400',
}) {
  return (
    <div
      className={cn(
        'relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 transition-all duration-700',
        'after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#050507] after:to-transparent after:content-[""]',
        'hover:border-white/20 hover:bg-white/10',
        '[&>*]:flex [&>*]:items-center [&>*]:gap-2',
        className
      )}
    >
      <div>
        <span className={cn('relative inline-flex rounded-full bg-primary/10 border border-primary/20 p-1.5', iconClassName)}>
          {icon}
        </span>
        <p className={cn('text-lg font-semibold', titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-base text-gray-200">{description}</p>
      <p className="text-gray-500 text-sm font-mono">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      icon: <AlertTriangle className="size-4 text-red-400" />,
      title: 'SQL Barriers',
      description: 'Days of waiting for ad-hoc queries',
      date: 'Business slowdown',
      iconClassName: 'text-red-500',
      titleClassName: 'text-red-400',
      className:
        '[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[""] before:bg-background/50 before:bg-blend-overlay grayscale-[80%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0',
    },
    {
      icon: <Clock className="size-4 text-yellow-300" />,
      title: 'IT Bottlenecks',
      description: 'Engineers stuck on repetitive tasks',
      date: 'Engineering drag',
      iconClassName: 'text-yellow-500',
      titleClassName: 'text-yellow-400',
      className:
        '[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[""] before:bg-background/50 before:bg-blend-overlay grayscale-[80%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0',
    },
    {
      icon: <TrendingUp className="size-4 text-blue-300" />,
      title: 'Scaling Issues',
      description: 'Poorly written SQL spikes AWS bills',
      date: 'Cloud cost risk',
      iconClassName: 'text-blue-500',
      titleClassName: 'text-blue-400',
      className: '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

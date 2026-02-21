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
  animationDelay = '0s',
}) {
  return (
    <div
      style={{ animationDelay }}
      className={cn(
        // Base size & shape
        'relative flex h-44 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl',
        // Border & background
        'border border-white/10 bg-white/5 backdrop-blur-md',
        // Padding layout
        'px-6 py-5',
        // Children flex
        '[&>*]:flex [&>*]:items-center [&>*]:gap-3',
        // Hover border/bg
        'hover:border-white/25 hover:bg-white/10',
        // Shadow
        'shadow-[0_4px_32px_rgba(0,0,0,0.4)]',
        // Animate float rotation
        'animate-card-float',
        className
      )}
    >
      <div>
        <span className={cn('relative inline-flex rounded-full bg-primary/10 border border-primary/20 p-2', iconClassName)}>
          {icon}
        </span>
        <p className={cn('text-xl font-bold tracking-wide', titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-base text-gray-200">{description}</p>
      <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      icon: <AlertTriangle className="size-5 text-red-400" />,
      title: 'SQL Barriers',
      description: 'Days of waiting for ad-hoc queries',
      date: '⚠ Business Slowdown',
      iconClassName: 'text-red-500',
      titleClassName: 'text-red-400',
      animationDelay: '0s',
      className: [
        '[grid-area:stack]',
        'hover:-translate-y-14',
        // Greyed overlay
        'before:absolute before:inset-0 before:rounded-2xl before:bg-background/60 before:content-[""]',
        'before:transition-opacity before:duration-500',
        'hover:before:opacity-0',
        'grayscale-[70%] hover:grayscale-0 transition-all duration-500',
      ].join(' '),
    },
    {
      icon: <Clock className="size-5 text-yellow-300" />,
      title: 'IT Bottlenecks',
      description: 'Engineers stuck on repetitive tasks',
      date: '⏳ Engineering Drag',
      iconClassName: 'text-yellow-500',
      titleClassName: 'text-yellow-400',
      animationDelay: '0.4s',
      className: [
        '[grid-area:stack]',
        'translate-x-28 translate-y-16',
        'hover:-translate-y-2 hover:translate-x-28',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-background/50 before:content-[""]',
        'before:transition-opacity before:duration-500',
        'hover:before:opacity-0',
        'grayscale-[70%] hover:grayscale-0 transition-all duration-500',
      ].join(' '),
    },
    {
      icon: <TrendingUp className="size-5 text-blue-300" />,
      title: 'Scaling Issues',
      description: 'Poorly written SQL spikes AWS bills',
      date: '📈 Cloud Cost Risk',
      iconClassName: 'text-blue-500',
      titleClassName: 'text-blue-400',
      animationDelay: '0.8s',
      className: [
        '[grid-area:stack]',
        'translate-x-56 translate-y-32',
        'hover:translate-y-20 hover:translate-x-56',
        'transition-all duration-500',
      ].join(' '),
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center pb-40 pr-56">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

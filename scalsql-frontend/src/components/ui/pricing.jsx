import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const frequencies = ['monthly', 'yearly'];

function BorderTrail({ className, size = 60, style }) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn('absolute aspect-square bg-primary', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      />
    </div>
  );
}

function PricingFrequencyToggle({ frequency, setFrequency }) {
  return (
    <div className="mx-auto flex w-fit rounded-full border border-white/10 bg-white/5 p-1">
      {frequencies.map((freq) => (
        <button
          key={freq}
          onClick={() => setFrequency(freq)}
          className="relative px-5 py-1.5 text-sm capitalize text-gray-300"
        >
          <span className="relative z-10">{freq}</span>
          {frequency === freq && (
            <motion.span
              layoutId="frequency"
              transition={{ type: 'spring', duration: 0.4 }}
              className="absolute inset-0 z-0 rounded-full bg-primary/20 border border-primary/30"
            />
          )}
        </button>
      ))}
    </div>
  );
}

function PricingCard({ plan, frequency = 'monthly' }) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-md transition-all duration-300 hover:border-white/20',
        plan.highlighted && 'border-primary/40 hover:border-primary/60 scale-[1.02]',
      )}
    >
      {plan.highlighted && (
        <BorderTrail
          style={{
            boxShadow:
              '0px 0px 60px 30px rgb(168 85 247 / 50%), 0 0 100px 60px rgb(168 85 247 / 20%)',
          }}
          size={100}
        />
      )}

      {/* Header */}
      <div
        className={cn(
          'rounded-t-2xl border-b border-white/5 p-6',
          plan.highlighted ? 'bg-primary/5' : 'bg-white/[0.02]',
        )}
      >
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {plan.highlighted && (
            <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Star className="h-3 w-3 fill-current" />
              Popular
            </span>
          )}
          {frequency === 'yearly' && (
            <span className="flex items-center gap-1 rounded-full bg-green-500/20 border border-green-500/30 px-2.5 py-0.5 text-xs font-semibold text-green-400">
              {Math.round(
                ((plan.price.monthly * 12 - plan.price.yearly) /
                  plan.price.monthly /
                  12) *
                  100,
              )}
              % off
            </span>
          )}
        </div>

        <div className="text-lg font-bold text-white">{plan.name}</div>
        <p className="text-sm text-gray-500 mt-1">{plan.info}</p>
        <h3 className="mt-4 flex items-end gap-1">
          <span className="text-4xl font-bold text-white">${plan.price[frequency]}</span>
          <span className="text-gray-500 text-sm pb-1">
            {plan.name !== 'Free'
              ? '/' + (frequency === 'monthly' ? 'mo' : 'yr')
              : ''}
          </span>
        </h3>
      </div>

      {/* Features */}
      <div
        className={cn(
          'space-y-3.5 px-6 py-6 text-sm flex-1',
          plan.highlighted && 'bg-primary/[0.02]',
        )}
      >
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p
                    className={cn(
                      'text-gray-400',
                      feature.tooltip && 'cursor-help border-b border-dashed border-gray-600',
                    )}
                  >
                    {feature.text}
                  </p>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className={cn(
          'mt-auto w-full border-t border-white/5 p-4',
          plan.highlighted && 'bg-primary/[0.03]',
        )}
      >
        <Button
          className="w-full"
          variant={plan.highlighted ? 'default' : 'outline'}
          asChild
        >
          <Link to={plan.btn.href}>{plan.btn.text}</Link>
        </Button>
      </div>
    </div>
  );
}

export function PricingSection({ plans, heading, description, className }) {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center space-y-8 p-4',
        className,
      )}
    >
      <div className="mx-auto max-w-xl space-y-3 text-center">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
          Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {heading}
        </h2>
        {description && (
          <p className="text-gray-400 text-base">
            {description}
          </p>
        )}
      </div>
      <PricingFrequencyToggle
        frequency={frequency}
        setFrequency={setFrequency}
      />
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 items-start">
        {plans.map((plan) => (
          <PricingCard plan={plan} key={plan.name} frequency={frequency} />
        ))}
      </div>
    </div>
  );
}

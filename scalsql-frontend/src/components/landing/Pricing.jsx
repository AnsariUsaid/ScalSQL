import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individual developers and small test databases.',
    features: ['Up to 100 queries/month', 'Basic AI Model', '1 Database Connection', 'Community Support'],
    buttonText: 'Start for Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For analytics teams requiring regular insights and higher volume.',
    features: ['Unlimited queries', 'Advanced AI Model (Schema Aware)', '10 Database Connections', 'Priority Email Support', 'Export to CSV/Excel'],
    buttonText: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For institutions needing security, auditing, and custom integrations.',
    features: ['Dedicated VPC Deployment', 'Custom Data Policies', 'SSO & Advanced RBAC', '24/7 Phone Support', 'Self-Hosted Option'],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-textMain sm:text-4xl">Transparent SaaS Pricing</h2>
          <p className="mt-4 text-xl text-textMuted">Scale dynamically with your data needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`rounded-2xl p-8 flex flex-col ${
                tier.highlighted
                  ? 'bg-surfaceHighlight border-2 border-primary shadow-2xl shadow-primary/20 relative'
                  : 'glass-panel'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-textMain">{tier.name}</h3>
              <p className="mt-4 font-black text-5xl text-textMain">
                {tier.price} <span className="text-lg font-medium text-textMuted tracking-normal">{tier.price !== 'Custom' && '/mo'}</span>
              </p>
              <p className="mt-4 text-textMuted min-h-[48px]">{tier.description}</p>
              
              <ul className="mt-8 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-textMain">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/register"
                className={`mt-8 block w-full py-3 px-4 rounded-lg text-center font-bold transition-all ${
                  tier.highlighted
                    ? 'bg-primary text-white hover:bg-primaryHover'
                    : 'bg-surface text-textMain hover:bg-surfaceHighlight border border-border'
                }`}
              >
                {tier.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Zap, LayoutDashboard, Users, Activity } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered SQL Generation',
    description: 'Transform complex natural language queries into optimized, executable SQL statements instantly.',
    icon: Zap,
  },
  {
    name: 'Secure Execution Layer',
    description: 'Enterprise-grade security with strict query validation, sanitization, and read-only execution constraints.',
    icon: Shield,
  },
  {
    name: 'Auto-Scaling Infrastructure',
    description: 'Built on AWS cloud-native architecture. Handles thousands of concurrent queries without breaking a sweat.',
    icon: Activity,
  },
  {
    name: 'Multi-Tenant SaaS',
    description: 'Isolated environments for different organizations, hospitals, or university departments.',
    icon: Database,
  },
  {
    name: 'Role-Based Access Control',
    description: 'Granular permissions. Give admins full control while restricting analysts to view-only access.',
    icon: Users,
  },
  {
    name: 'Comprehensive Dashboard',
    description: 'Monitor API usage, query history, and system status in real-time through an intuitive interface.',
    icon: LayoutDashboard,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-surface/50 border-y border-border" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-textMain sm:text-4xl">
            Everything you need for secure AI querying
          </p>
          <p className="mt-4 text-xl text-textMuted">
            ScalSQL is designed beyond standalone AI tools, providing a complete ecosystem for institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-textMain mb-3">{feature.name}</h3>
              <p className="text-textMuted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

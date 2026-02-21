import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Connect Database',
    description: 'Securely link your MySQL or PostgreSQL database via RDS credentials.',
  },
  {
    number: '02',
    title: 'Ask in English',
    description: 'Type your data questions naturally. "Show me all sales from last month."',
  },
  {
    number: '03',
    title: 'AI Generates SQL',
    description: 'Our LLM engine validates schema and generates the exact SQL query instantly.',
  },
  {
    number: '04',
    title: 'Get Results',
    description: 'Execute safely and view results in datagrid, or export to CSV/Excel.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-textMain sm:text-4xl">How ScalSQL Works</h2>
          <p className="mt-4 text-xl text-textMuted">Four simple steps from question to insight.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="w-24 h-24 mx-auto bg-surface border-2 border-border rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-textMain mb-2">{step.title}</h3>
                <p className="text-textMuted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

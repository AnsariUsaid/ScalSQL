import React from 'react';
import { motion } from 'framer-motion';
import { Lock, FileKey, ShieldAlert, ActivitySquare } from 'lucide-react';

const secFeatures = [
  { name: 'Encrypted Connections', icon: Lock },
  { name: 'Role-Based Control', icon: FileKey },
  { name: 'Query Validation', icon: ShieldAlert },
  { name: 'Logging & Audit', icon: ActivitySquare },
];

const Security = () => {
  return (
    <section className="py-24 bg-surfaceHighlight/30" id="security">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-textMain sm:text-4xl mb-6">
              Bank-Grade Security for Your Data
            </h2>
            <p className="text-xl text-textMuted mb-8">
              We understand that database access is sensitive. ScalSQL acts as a secure intermediary layer, ensuring AI-generated queries are safe before execution.
            </p>
            <ul className="space-y-4">
              {secFeatures.map((feature) => (
                <li key={feature.name} className="flex items-center text-lg text-textMain">
                  <feature.icon className="h-6 w-6 text-green-500 mr-4" />
                  {feature.name}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 lg:mt-0 glass-panel p-8 rounded-2xl relative overflow-hidden"
          >
            {/* Simple mock code block to look premium */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-sm text-textMuted overflow-x-auto">
              <code>
                <span className="text-purple-400">INFO</span> [System Audit Log]{'\n'}
                <span className="text-blue-400">User:</span> analyst@hospital.org{'\n'}
                <span className="text-green-500">Action:</span> Query Execution Validated{'\n'}
                <span className="text-yellow-400">Policy Check:</span> Passed (Read-Only)
              </code>
            </pre>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;

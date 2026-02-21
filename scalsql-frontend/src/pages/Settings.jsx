import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, CreditCard, Building, ShieldCheck, Copy, Check } from 'lucide-react';

const Settings = () => {
   const [copied, setCopied] = useState(false);
   const apiKey = "sk_prod_a7b93f28d8441c9c0b11...";
   
   const copyKey = () => {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SettingsIcon className="w-6 h-6 text-primary" />
          Organization Settings
        </h1>
        <p className="text-textMuted mt-1">Manage your account, billing, and API keys.</p>
      </div>

      <div className="space-y-8">
         {/* Profile Section */}
         <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
               <Building className="w-5 h-5 text-textMuted" /> Organization Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div>
                 <label className="text-sm font-medium text-textMuted mb-1 block">Organization Name</label>
                 <input type="text" className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="Acme Hospital Corp" />
               </div>
               <div>
                 <label className="text-sm font-medium text-textMuted mb-1 block">Admin Contact</label>
                 <input type="email" className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="admin@acme.org" />
               </div>
               <div className="md:col-span-2 flex justify-end">
                  <button className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-colors">Save Changes</button>
               </div>
            </div>
         </div>

         {/* API Keys */}
         <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
               <Key className="w-5 h-5 text-textMuted" /> API Key Management
            </h2>
            <p className="text-sm text-textMuted mb-4">Use this key to access ScalSQL headless via our REST API. Do not share publicly.</p>
            
            <div className="flex gap-4 items-center">
               <div className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg font-mono text-sm tracking-widest text-textMuted select-all">
                  {apiKey}
               </div>
               <button onClick={copyKey} className="flex items-center gap-2 px-4 py-3 bg-surfaceHighlight hover:bg-surface border border-border rounded-lg text-sm font-medium transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
               </button>
               <button className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-colors">
                  Revoke
               </button>
            </div>
         </div>

         {/* Subscription & Billing */}
         <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
               <CreditCard className="w-5 h-5 text-textMuted" /> Subscription Plan
            </h2>
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                     <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <div className="font-bold text-lg">Enterprise SaaS Plan</div>
                     <div className="text-sm text-textMuted">Unlimited queries, 10 DB connections.</div>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-black">$499<span className="text-sm text-textMuted font-medium">/mo</span></div>
               </div>
            </div>
            
            <button className="w-full py-3 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surfaceHighlight transition-colors">
               Manage Billing (Stripe)
            </button>
         </div>
      </div>
    </div>
  );
};

export default Settings;

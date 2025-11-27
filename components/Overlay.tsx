import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Mail, Phone, Linkedin, Globe, ChevronRight } from 'lucide-react';
import { SectionType } from '../types';
import { EXPERIENCE_DATA, PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA } from '../constants';

interface OverlayProps {
  section: SectionType;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
};

const Card: React.FC<{ children: React.ReactNode; title: string; onClose: () => void }> = ({ children, title, onClose }) => (
  <motion.div
    variants={overlayVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="fixed inset-0 z-50 flex items-center justify-center md:justify-end md:pr-12 p-4 pointer-events-none"
  >
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-slate-300 space-y-8">
        {children}
      </div>
    </div>
  </motion.div>
);

export const Overlay: React.FC<OverlayProps> = ({ section, onClose }) => {
  return (
    <AnimatePresence>
      {section === 'experience' && (
        <Card title="Experience" onClose={onClose}>
          <div className="space-y-8">
            {EXPERIENCE_DATA.map((job) => (
              <div key={job.id} className="relative pl-6 border-l-2 border-blue-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                <div className="flex justify-between items-center text-sm text-blue-400 mb-3 mt-1">
                  <span className="font-bold">{job.company}</span>
                  <span>{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.details.map((detail, idx) => (
                    <li key={idx} className="text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-slate-500 rounded-full flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 pt-6 border-t border-slate-700">
               <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
               <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                 <div className="text-white font-medium">{PERSONAL_INFO.education.degree}</div>
                 <div className="text-blue-400 text-sm mt-1">{PERSONAL_INFO.education.school} • {PERSONAL_INFO.education.period}</div>
               </div>
            </div>
          </div>
        </Card>
      )}

      {section === 'projects' && (
        <Card title="Projects" onClose={onClose}>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS_DATA.map((project) => (
              <div key={project.id} className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-xs font-mono text-slate-400 mb-3 bg-slate-900/50 inline-block px-2 py-1 rounded">
                  {project.tech}
                </p>
                {project.description && <p className="text-sm text-slate-300">{project.description}</p>}
                <div className="mt-3 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  View Details <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {section === 'skills' && (
        <Card title="Technical Skills" onClose={onClose}>
          <div className="space-y-8">
            {SKILLS_DATA.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  {idx === 0 && <span className="text-blue-400">{'</>'}</span>}
                  {idx === 1 && <span className="text-purple-400">{'{ }'}</span>}
                  {idx === 2 && <span className="text-green-400">{'✓'}</span>}
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {section === 'contact' && (
        <Card title="Contact Me" onClose={onClose}>
          <div className="space-y-6">
            <p className="text-lg text-slate-300">
              Feel free to reach out for collaborations or opportunities.
            </p>
            <div className="space-y-4">
               <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all group">
                 <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                   <Mail size={24} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400">Email</div>
                   <div className="text-white font-medium break-all">{PERSONAL_INFO.contact.email}</div>
                 </div>
               </a>

               <a href={`tel:${PERSONAL_INFO.contact.phone.replace(/-/g, '')}`} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-green-600/20 hover:border-green-500/50 border border-transparent transition-all group">
                 <div className="p-3 bg-green-500/20 text-green-400 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                   <Phone size={24} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400">Phone</div>
                   <div className="text-white font-medium">{PERSONAL_INFO.contact.phone}</div>
                 </div>
               </a>

               <a href={`https://${PERSONAL_INFO.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-blue-700/20 hover:border-blue-600/50 border border-transparent transition-all group">
                 <div className="p-3 bg-blue-700/20 text-blue-500 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <Linkedin size={24} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400">LinkedIn</div>
                   <div className="text-white font-medium">{PERSONAL_INFO.contact.linkedin}</div>
                 </div>
               </a>

               <a href={`https://${PERSONAL_INFO.contact.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-purple-600/20 hover:border-purple-500/50 border border-transparent transition-all group">
                 <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                   <Globe size={24} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400">Portfolio</div>
                   <div className="text-white font-medium">{PERSONAL_INFO.contact.portfolio}</div>
                 </div>
               </a>
            </div>
          </div>
        </Card>
      )}
    </AnimatePresence>
  );
};
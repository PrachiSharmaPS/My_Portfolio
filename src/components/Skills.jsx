import React from 'react';

export default function Skills() {
  const categories = [
    {
      title: "AI & Automation",
      skills: ["AI Agent Development", "Workflow Automation (n8n)", "Vapi", "ElevenLabs", "Prompt Engineering", "Conversational AI", "LLM Integrations", "Lovable"]
    },
    {
      title: "Backend & Frontend",
      skills: ["Node.js", "Express.js", "JavaScript", "Python","REST APIs", "React.js", "Tailwind CSS", "Redux", "GSAP Animations", "OAuth2 / JWT"]
    },
    {
      title: "Database & Tools",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS (EC2, S3, Athena)", "Docker", "Postman", "Git / GitHub", "Claude Code / Cursor"]
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold border-b border-slate-800 pb-4 mb-8 text-slate-200">Technical Expertise</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-slate-600 transition">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-900 text-slate-300 text-sm rounded-md border border-slate-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
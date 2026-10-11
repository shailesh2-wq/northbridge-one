import React from 'react';
import { ArrowRight, Lightbulb, Target, Compass, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-blue-900 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Product Management Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 mt-2">
            NorthBridge One: Case Study
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connecting fragmented operational data into actionable educational context.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg prose-blue">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 text-sm text-yellow-800 not-prose">
          <strong>Note:</strong> This case study is based on simulated stakeholder discovery and secondary research. It is a portfolio prototype designed to demonstrate product management and UX reasoning. No real interviews were conducted.
        </div>

        <h2>1. Context & Stakeholders</h2>
        <p>
          NorthBridge International School (simulated) is a mid-sized K-12 institution. Like many modern schools, it suffers from severe "tool sprawl."
        </p>
        <ul>
          <li><strong>Teachers</strong> spend excessive time on administrative data entry rather than teaching.</li>
          <li><strong>Principals</strong> lack real-time visibility into systemic school issues until they become crises.</li>
          <li><strong>Parents</strong> receive disjointed updates across multiple apps (LMS, email, payment portals).</li>
        </ul>

        <h2>2. Problem Discovery</h2>
        <p>Current workflows are fragmented. A student might be marked late in the attendance system, score poorly on a math quiz in the LMS, and have a behavioral incident logged in a spreadsheet. <strong>Because these systems don't talk to each other, nobody sees the complete picture until a parent-teacher conference months later.</strong></p>
        
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 not-prose mb-8">
          <h4 className="font-bold text-slate-900 mb-2">The Core Problem Statement</h4>
          <p className="text-slate-700">"Educational institutions lack a unified operational context that helps staff identify, understand, and act on student and school-level issues without manually connecting information across disconnected workflows."</p>
        </div>

        <h2>3. Product Hypothesis & MVP Strategy</h2>
        <p>
          <strong>Hypothesis:</strong> If we connect existing educational signals into a unified operational context, staff will identify issues earlier, reducing administrative coordination effort and enabling faster interventions.
        </p>
        <p>
          For the MVP, we explicitly chose <strong>not</strong> to build a monolithic ERP. Instead, we built a thin "Context & Attention Layer" that sits conceptually on top of existing data.
        </p>
        
        <h3>MVP Scope</h3>
        <ul>
          <li><strong>Role-Based Attention Center</strong> (surfacing actionable signals)</li>
          <li><strong>Student 360</strong> (unified context: attendance, grades, behavior, timeline)</li>
          <li><strong>Intervention Workflows</strong> (assigning and tracking follow-up actions)</li>
        </ul>

        <h2>4. Key Product Decisions</h2>
        <div className="overflow-x-auto not-prose mb-8">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Decision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reasoning</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trade-off</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium">Build around "Signals", not modules</td>
                <td className="px-6 py-4">Modules fragment attention. A feed of prioritized action items forces proactive intervention.</td>
                <td className="px-6 py-4">Users accustomed to traditional navigation may have a learning curve.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Student 360 as core entity</td>
                <td className="px-6 py-4">Student context is the most frequent cross-functional information need.</td>
                <td className="px-6 py-4">Requires complex backend data aggregation across multiple domains.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Explainable signals</td>
                <td className="px-6 py-4">Users must trust the system. Black-box "AI" alerts are ignored in education.</td>
                <td className="px-6 py-4">Requires building a transparent rule engine rather than pure ML.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>5. Success Metrics</h2>
        <p>If deployed in reality, we would measure success through:</p>
        <ul>
          <li><strong>Primary:</strong> Time-to-identify and act on priority issues (e.g., from 14 days to 48 hours).</li>
          <li><strong>Supporting:</strong> Follow-up completion rate (accountability metric).</li>
          <li><strong>Supporting:</strong> Teacher administrative hours saved per week.</li>
        </ul>
        <p><em>Status: Validation not yet conducted.</em></p>

        <h2>6. Future Roadmap</h2>
        <p>
          Post-MVP, the platform would evolve from purely reactive/aggregating to predictive capabilities:
        </p>
        <ol>
          <li><strong>Phase 2:</strong> Advanced scheduling and resource optimization.</li>
          <li><strong>Phase 3:</strong> Predictive cohort analytics and automated state reporting.</li>
          <li><strong>Phase 4:</strong> Parent-teacher communication hub integration.</li>
        </ol>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center not-prose pb-12">
          <Link to="/" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            Return to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

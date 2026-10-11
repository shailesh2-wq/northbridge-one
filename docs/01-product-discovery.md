# Product Discovery — NorthBridge One

> [!NOTE]
> Based on secondary research and simulated stakeholder discovery. No real interviews were conducted. This is a portfolio prototype.

## 1. Institution Context
**NorthBridge International School, Singapore**
- **Type**: K-12 International School
- **Population**: ~1200 students, ~150 staff
- **Curriculum**: IB (International Baccalaureate)
- **Environment**: A mid-size international school operating in a highly competitive educational landscape. The school prides itself on holistic education, but operationally, it struggles with the complexity of managing academic, pastoral, and administrative data across multiple siloed systems. High expectations from parents and rigorous accreditation standards add pressure to staff and leadership.

## 2. Stakeholder Map

| Stakeholder | Role Description | Primary Goals | Key Pain Points | Key Workflows | Information Needs | Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Principal** | Strategic leader of the school | Ensure academic excellence, Maintain school reputation, Oversee operations, Manage budget | Lack of unified visibility, Delayed awareness of critical issues, Inefficient reporting | Strategic planning, Issue resolution, Board reporting, Performance reviews | Aggregated performance data, School-wide health metrics, Critical incident alerts | Vice-Principals, Academic Coordinators, Admin Staff |
| **Vice-Principals** | Oversees specific sections (e.g., Middle School) | Manage daily operations, Support teachers, Handle escalated student issues | Fragmented student data, High administrative burden, Coordinating across departments | Disciplinary interventions, Parent meetings, Curriculum oversight | Section-wide attendance/behavior, Escalated student records | Teachers, Counsellors, Principal |
| **Teachers** | Delivers curriculum and pastoral care | Maximize teaching time, Support student growth, Communicate with parents | Too much time on admin tasks, Multiple systems for attendance/grades/behavior, Missing context on student issues | Daily attendance, Lesson planning, Grading, Parent communication | Individual student academic history, Learning support needs, Real-time behavioral context | Academic Coordinators, IT, Admin |
| **Academic Coordinators** | Manages curriculum delivery and departmental alignment | Ensure curriculum standards, Support teacher development, Analyze cohort performance | Data extraction from disparate systems, Tracking interventions | Curriculum planning, Assessment moderation, Intervention tracking | Cohort performance trends, Intervention outcomes | Teachers, Vice-Principals |
| **Admin Staff** | Manages daily logistics and records | Maintain accurate records, Coordinate events, Handle inquiries | Repetitive manual data entry, Chasing staff for information | Attendance reconciliation, Event planning, Record management | Accurate student data, Staff schedules | Everyone |
| **Finance Staff** | Manages budget, billing, and payroll | Ensure timely fee collection, Maintain financial health | Manual follow-ups for unpaid fees, Reconciling data with student records | Invoicing, Payment processing, Budget reporting | Enrollment status, Fee schedules | Admin Staff, Parents |
| **IT Staff** | Manages technology infrastructure | Ensure system uptime, Support users, Manage data security | Managing too many disparate platforms, High volume of support tickets | System maintenance, User provisioning, Helpdesk | System usage stats, Integration requirements | All Staff |
| **Counsellors** | Provides emotional and psychological support | Support student well-being, Provide timely interventions | Lack of visibility into academic/behavioral warning signs, Confidentiality management | Counselling sessions, Crisis intervention, Wellbeing monitoring | Academic/attendance trends, Behavioral reports | Teachers, Parents, Vice-Principals |
| **Parents** | Guardians of students | Support child's education, Stay informed, Manage payments | Fragmented communication channels, Lack of timely updates on progress | Reviewing reports, Paying fees, Communicating with teachers | Child's academic progress, Attendance, Upcoming events/fees | Teachers, Admin, Finance |
| **Students** | Primary learners | Achieve academic success, Participate in school life, Manage assignments | Juggling multiple platforms for assignments, Lack of clarity on expectations | Completing coursework, Checking schedules, Extracurriculars | Assignment deadlines, Grades, Schedules | Teachers, Parents |

## 3. Current-State Workflows

1. **Daily Attendance Workflow**
   - **Steps**: Teacher takes attendance on paper or in LMS -> Admin staff manually enters into SIS -> Admin chases teachers for missing registers -> SMS sent to parents of absent students.
   - **Tools**: Paper/Spreadsheet, LMS, SIS (Student Information System), SMS Gateway.
   - **Pain Points**: Double entry, delays in identifying truancy, high administrative overhead.
   - **Information Gaps**: Teachers don't immediately know if an absence is excused or a pattern.

2. **Student Issue Identification Workflow**
   - **Steps**: Teacher notices declining grades -> Checks LMS -> Asks other teachers via email -> Emails counsellor -> Counsellor checks separate behavior log -> Meeting scheduled.
   - **Tools**: LMS, Email, Behavior System, Calendar.
   - **Pain Points**: Slow process, relies on individual initiative, crucial warning signs are missed because data is siloed.
   - **Information Gaps**: No single view combining grades, attendance, and behavior.

3. **Parent Communication Workflow**
   - **Steps**: Parent needs an update -> Emails teacher -> Teacher searches SIS, LMS, and personal notes -> Teacher compiles email response -> Parent replies with finance query -> Teacher forwards to Finance.
   - **Tools**: Email, SIS, LMS, Personal Notes.
   - **Pain Points**: Inefficient, fragmented history of communication, frustrating for parents.
   - **Information Gaps**: No centralized log of all communications with a family.

4. **Academic Performance Monitoring**
   - **Steps**: End of term -> Teachers enter grades in LMS -> IT exports to CSV -> Academic Coordinator merges with historical data in Excel -> Reports generated -> Sent to parents.
   - **Tools**: LMS, Excel, Reporting Tool.
   - **Pain Points**: Highly manual, prone to errors, retrospective rather than proactive.
   - **Information Gaps**: Real-time performance trends are invisible during the term.

5. **Fee Collection and Follow-up**
   - **Steps**: Finance generates invoices in Accounting software -> Emails to parents -> Finance checks bank statements manually -> Finance emails Admin to check enrollment status -> Finance emails parents for overdue fees.
   - **Tools**: Accounting Software, Email, Bank Portal, SIS.
   - **Pain Points**: Disconnected from student enrollment data, manual reconciliation, awkward parent interactions.
   - **Information Gaps**: Finance doesn't know if a family is dealing with personal issues known to the counsellor.

6. **Intervention/Support Workflow**
   - **Steps**: Student identified for learning support -> Plan created in a Word doc -> Emailed to relevant teachers -> Teachers try to remember accommodations -> Review meeting scheduled 3 months later.
   - **Tools**: Word, Email, Calendar.
   - **Pain Points**: Poor follow-through, lack of accountability, plans get lost in inboxes.
   - **Information Gaps**: Hard to track if interventions are actually being applied and if they are working.

## 4. Pain Points Synthesis
- **Information Fragmentation**: Data lives in silos (LMS, SIS, Email, Excel), requiring manual effort to assemble a complete picture.
- **Manual Coordination Overhead**: Significant time is wasted chasing colleagues for updates, information, or actions.
- **Delayed Issue Identification**: Because signals (attendance drops, grade slips) are isolated, holistic problems are only identified after they become severe.
- **Communication Gaps**: Parents and staff suffer from disjointed messaging, leading to confusion and frustration.
- **Lack of Operational Visibility**: Leadership cannot easily gauge the real-time health of the school or specific cohorts.
- **Administrative Burden on Teachers**: Teachers spend too much time on data entry and tracking, detracting from teaching.
- **Accountability Gaps in Follow-ups**: Interventions and tasks often fall through the cracks due to a lack of centralized tracking.

## 5. Patterns & Insights
The core pattern across all workflows is the friction of context-switching and data aggregation.

**Key Insight**:
> "The fundamental problem is not the lack of software tools — schools have many tools. The problem is that these tools don't share context. Critical information about a student exists in 5-7 different places, and no single person can see the complete picture without manually connecting it."

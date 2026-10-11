# Success Metrics — NorthBridge One

> [!NOTE]
> Based on secondary research and simulated stakeholder discovery. No real interviews were conducted. This is a portfolio prototype.

## 1. Primary Metrics
These metrics define the core success of the MVP in solving the stated problem.

| Metric | Description | Baseline | Target (6 mos) | Actual | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Time to Intervention** | Average days between a negative signal appearing and an intervention being logged. | 14 days | < 3 days | TBD | Not yet validated |
| **Teacher Admin Time** | Hours spent per week by teachers on administrative data gathering/entry. | 8 hours/wk | < 4 hours/wk | TBD | Not yet validated |
| **Intervention Closure Rate**| Percentage of logged interventions marked as 'Resolved' or followed up within 7 days. | ~20% (est) | > 80% | TBD | Not yet validated |
| **Parent Engagement Score** | Percentage of parents who log in to the platform at least weekly. | 35% | > 70% | TBD | Not yet validated |
| **Data Silo Reduction** | Number of separate applications a teacher must open to get full student context. | 4-5 apps | 1 app | TBD | Not yet validated |
| **System Adoption Rate** | Percentage of active teaching and admin staff using the platform daily. | 0% | > 90% | TBD | Not yet validated |

## 2. Secondary Metrics
These metrics monitor system health and secondary benefits.

| Metric | Description | Target |
| :--- | :--- | :--- |
| **Missing Registers (Daily)** | Average number of attendance registers missing by 10 AM. | < 2% |
| **Support Tickets** | Number of IT support tickets related to finding student information. | 50% reduction |
| **Task Completion Time** | Average time spent in the platform per session (shorter is better, implies efficiency). | < 5 mins |
| **Message Response Time** | Average time for staff to reply to parent messages. | < 24 hours |

## 3. Leading Indicators
What signals tell us early on that the product is working?
- High Daily Active Users (DAU) / Monthly Active Users (MAU) ratio among staff.
- High volume of clicks on "Attention Signals" leading to the "Student 360" profile.
- Steady increase in the number of interventions logged in the system during the first month.
- Decrease in internal emails asking for context on specific students.

## 4. Lagging Indicators
What outcomes confirm it worked long-term?
- Improved overall student attendance rates over a semester.
- Reduction in severe disciplinary incidents (due to early intervention).
- Higher scores in annual teacher satisfaction surveys regarding workload.
- Higher scores in annual parent satisfaction surveys regarding communication.

## 5. Measurement Plan
- **Platform Analytics**: Use integrated product analytics (e.g., Mixpanel/Amplitude) to track DAU, screen views, time-in-app, and feature usage (e.g., clicking signals, logging interventions).
- **Database Queries**: Track intervention closure rates, time to intervention, and message response times via SQL queries on production data.
- **Surveys**: Conduct baseline surveys before launch and follow-up surveys at 3 and 6 months to measure self-reported admin time and satisfaction.

## 6. Status
> [!WARNING]
> All metrics are currently marked as "Not yet validated — Portfolio prototype". Baseline numbers are simulated estimates based on industry norms for the purpose of this demonstration.

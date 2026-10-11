# Problem Prioritization — NorthBridge One

> [!NOTE]
> Based on secondary research and simulated stakeholder discovery. No real interviews were conducted. This is a portfolio prototype.

## 1. Candidate Problems
- **PROBLEM A**: Teachers spend excessive time on repetitive administrative tasks (attendance, basic reporting, data entry).
- **PROBLEM B**: Student information is fragmented across departments and systems (academic, pastoral, medical, financial).
- **PROBLEM C**: Parents receive information through disconnected channels (emails, different portals, paper slips).
- **PROBLEM D**: School leadership lacks timely visibility into operational issues (staffing gaps, broad attendance trends, critical incidents).
- **PROBLEM E**: When a student shows signs of difficulty, relevant signals are distributed across attendance, academic, behavioral, and communication systems with no unified view.

## 2. Evaluation Framework
We evaluate problems based on the following criteria (scored 1-5, where 5 is highest impact/most frequent/most feasible):

*   **User Impact**: How much does this affect daily work?
*   **Frequency**: How often does this problem occur?
*   **Severity**: How serious are the consequences of not solving it?
*   **Stakeholders Affected**: How many different roles experience this?
*   **Institutional Impact**: Does this directly affect the school's core mission (student outcomes)?
*   **Strategic Importance**: How central is this to the school's strategic goals?
*   **Feasibility**: Can we meaningfully address this in a Minimum Viable Product (MVP)?

## 3. Scoring Matrix

| Problem | User Impact (x2) | Frequency (x1) | Severity (x2) | Stakeholders Affected (x1) | Inst. Impact (x2) | Strat. Importance (x1) | Feasibility (x1) | Total Raw |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **A (Admin Time)** | 5 | 5 | 2 | 2 | 2 | 3 | 4 | 23 |
| **B (Fragmented Data)** | 4 | 4 | 3 | 5 | 3 | 4 | 3 | 26 |
| **C (Parent Comms)** | 3 | 4 | 3 | 3 | 3 | 4 | 4 | 24 |
| **D (Leadership Vis)**| 3 | 3 | 4 | 2 | 4 | 5 | 3 | 24 |
| **E (Distributed Signals)**| 5 | 4 | 5 | 5 | 5 | 5 | 3 | 32 |

## 4. Opportunity Score
We apply weights to the criteria to calculate an Opportunity Score.
*Formula: (User Impact \* 2) + (Frequency \* 1) + (Severity \* 2) + (Stakeholders Affected \* 1) + (Institutional Impact \* 2) + (Strategic Importance \* 1) + (Feasibility \* 1)*

*   **Problem A Score**: (5\*2) + (5\*1) + (2\*2) + (2\*1) + (2\*2) + (3\*1) + (4\*1) = 10 + 5 + 4 + 2 + 4 + 3 + 4 = **32**
*   **Problem B Score**: (4\*2) + (4\*1) + (3\*2) + (5\*1) + (3\*2) + (4\*1) + (3\*1) = 8 + 4 + 6 + 5 + 6 + 4 + 3 = **36**
*   **Problem C Score**: (3\*2) + (4\*1) + (3\*2) + (3\*1) + (3\*2) + (4\*1) + (4\*1) = 6 + 4 + 6 + 3 + 6 + 4 + 4 = **33**
*   **Problem D Score**: (3\*2) + (3\*1) + (4\*2) + (2\*1) + (4\*2) + (5\*1) + (3\*1) = 6 + 3 + 8 + 2 + 8 + 5 + 3 = **35**
*   **Problem E Score**: (5\*2) + (4\*1) + (5\*2) + (5\*1) + (5\*2) + (5\*1) + (3\*1) = 10 + 4 + 10 + 5 + 10 + 5 + 3 = **47**

**Results:**
1.  **Problem E**: 47
2.  **Problem B**: 36
3.  **Problem D**: 35
4.  **Problem C**: 33
5.  **Problem A**: 32

## 5. Selected Problem
**We have selected Problem E.**

Why? Problem E scores highest because it represents the most critical failure point in a school's ecosystem. While Problem A is annoying, it rarely causes direct harm to a student's trajectory. Problem E, however, directly impacts student outcomes. If a student is failing math, skipping P.E., and getting into fights, but those three signals are held by three different people in three different systems, the student falls through the cracks.

Furthermore, Problem E encompasses the core data architecture challenges of Problem B (fragmented data) and provides the foundation to solve Problem D (leadership visibility). By building a system that unifies student signals for timely intervention, we inherently build a platform that connects fragmented data and surfaces operational insights.

## 6. The "Why This?" Answer
**Why did we build THIS and not just a generic ERP?**
A generic ERP focuses on digitizing records and streamlining transactions (e.g., paying a fee, recording a grade). NorthBridge One focuses on *context and action*. We aren't building a better database to store a grade; we are building an intelligence layer that connects a dropping grade to a recent absence pattern, surfaces that specific connection to the right teacher, and provides a workflow to intervene. We built this to transform data into actionable educational context.

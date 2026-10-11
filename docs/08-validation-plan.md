# Validation Plan — NorthBridge One

> [!NOTE]
> Based on secondary research and simulated stakeholder discovery. No real interviews were conducted. This is a portfolio prototype.
> **Status:** Validation not yet conducted — this is the methodology we would use.

## 1. Hypothesis to Test
**Product Hypothesis:** "We believe that connecting important educational signals into a unified operational context will help staff identify issues earlier, reduce administrative coordination effort, and enable faster, more informed interventions."

## 2. Test Methodology
**Task-Based Usability Testing (Moderated)**
We will conduct 1-on-1 moderated testing sessions using a high-fidelity interactive prototype (e.g., Figma). We will observe users attempting to complete realistic tasks and ask them to "think aloud."

## 3. Test Scenarios
**Scenario 1: Context Gathering (Teacher)**
*   **Prompt:** "You notice your student, Alex, seems disengaged today. You want to see if anything else is going on with him before you talk to him. Find his full context."
*   **Expected Path:** Dashboard -> Search or click Alex -> View Student 360 -> Note recent absences and behavior log.

**Scenario 2: Actioning a Signal (Teacher)**
*   **Prompt:** "You log in and see a warning signal for a student. Investigate the warning and document that you are handling it."
*   **Expected Path:** Dashboard -> Click Attention Signal -> Review context -> Click 'Log Intervention' -> Fill form -> Save.

**Scenario 3: Task Management (Counsellor/Admin)**
*   **Prompt:** "You need to see if any teachers have assigned you follow-up tasks today. Find your tasks and mark the top one as 'In Progress'."
*   **Expected Path:** Dashboard -> Action Center -> Select Task -> Update Status.

**Scenario 4: Operational Visibility (Principal)**
*   **Prompt:** "You want to check the overall attendance for Grade 8 today to see if there's an unusual drop."
*   **Expected Path:** Leadership Dashboard -> View total attendance -> Click breakdown -> Select Grade 8.

**Scenario 5: Parent Communication (Parent)**
*   **Prompt:** "You want to check if you have any messages from your child's teachers and review their attendance for the week."
*   **Expected Path:** Parent App Home -> Messages -> Read message -> Back to Home -> Activity Feed/Attendance tab.

## 4. Measurements
During the testing sessions, we will measure:
- **Time on Task (Time to identify issue):** How long does it take the user to find the necessary context compared to their current methods?
- **Screens Visited:** Are users taking efficient paths or getting lost?
- **Task Completion Rate:** What percentage of users can complete the scenario without assistance?
- **Error Rate:** How many misclicks or incorrect assumptions occur?
- **Perceived Usefulness (SUS):** Administer a brief System Usability Scale survey post-test to gauge subjective satisfaction.

## 5. Comparison
To prove the value proposition, we will explicitly ask users at the end of the session to compare the prototype experience to their current real-world workflows:
*   "How would you complete Scenario 1 today?"
*   "How much time would that typically take?"
*   "How does this prototype compare to your current process?"

## 6. Sample Size & Recruitment
*What would a real validation look like?*
We would aim for **12-15 participants** across different roles to achieve qualitative significance:
- 5 Teachers (mix of tech-savvy and tech-hesitant)
- 3 Administrative Staff
- 2 Principals/Vice-Principals
- 2 Counsellors
- 3 Parents

## 7. Success Criteria
What would validate/invalidate the hypothesis?

**Validated if:**
- 80%+ task completion rate without major hints.
- Users explicitly state the Student 360 view saves them time compared to current methods.
- Users intuitively understand the concept of "Attention Signals."
- SUS score > 75.

**Invalidated if:**
- Users ignore the Attention Signals or find them confusing/overwhelming.
- Users struggle to understand how to log an intervention.
- Users state they would still prefer their current spreadsheets/emails for tracking issues.

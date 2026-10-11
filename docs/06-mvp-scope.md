# MVP Scope — NorthBridge One

> [!NOTE]
> Based on secondary research and simulated stakeholder discovery. No real interviews were conducted. This is a portfolio prototype.

## 1. In Scope (Phase 1 MVP Features)
1. **Unified Authentication (SSO)**: Single sign-on for all user roles.
2. **Role-Based Dashboards**: Customized home views for Teacher, Principal, Admin, and Parent.
3. **Student 360 Profile**: A centralized view of a student combining basic info, attendance, recent grades, and behavior history.
4. **Attention Signals Engine (Basic)**: Rule-based alerts for dropping attendance or missing grades.
5. **Action Center**: A task management system for tracking interventions and follow-ups.
6. **Intervention Logging**: A structured form to record actions taken to support a student.
7. **Unified Messaging**: In-app communication between staff and parents.
8. **Daily Attendance Module**: Fast, simple interface for teachers to record attendance.
9. **Basic Cohort View**: Aggregated metrics for specific grades or classes.
10. **Parent Mobile-Responsive View**: Optimized web app for parents to access information on phones.
11. **Core SIS Integration**: One-way sync from existing legacy systems to populate NorthBridge One.
12. **Activity Feed**: Chronological log of events related to a student.

## 2. Out of Scope (Phase 2-4)
- **Advanced Predictive Analytics (AI/ML)**: Predicting student failure before signs appear.
- **Complex Timetable Management**: Automated scheduling and resource allocation.
- **Finance and Billing Module**: Handling complex invoicing and payments natively.
- **Custom Report Builder**: Drag-and-drop custom analytics generation.
- **Native iOS/Android Apps**: Initially launching as a responsive web application.

## 3. User Stories (Selection)
**Role: Teacher**
- As a Teacher, I want to see a list of students requiring attention on my dashboard, so that I know who needs immediate support.
- As a Teacher, I want to view a student's full behavioral and academic history in one place, so that I have context before raising a concern.
- As a Teacher, I want to log an intervention and assign a task to a counsellor, so that I can ensure follow-up occurs.
- As a Teacher, I want to record daily attendance in under 3 clicks, so that I save time.
- As a Teacher, I want to message a parent directly from the student's profile, so that communication is contextual and recorded.

**Role: Principal**
- As a Principal, I want to see a summary of school-wide attendance trends, so that I can monitor operational health.
- As a Principal, I want to view all open interventions, so that I can ensure no student falls through the cracks.
- As a Principal, I want to quickly navigate to any student's 360 profile, so that I can understand escalated issues.

**Role: Parent**
- As a Parent, I want to receive notifications when a teacher messages me, so that I don't miss important updates.
- As a Parent, I want to view my child's daily schedule and attendance, so that I know where they are.
- As a Parent, I want to see a feed of recent academic results, so that I can track progress.

**Role: Admin**
- As an Admin, I want to see a dashboard of missing attendance registers, so that I can follow up efficiently.
- As an Admin, I want to send automated reminders to staff, so that I save time on manual emails.

## 4. Acceptance Criteria (Top 10 Stories)

**Story 1: Teacher views Attention Signals**
- **AC1**: Dashboard must display a distinct section for "Attention Needed".
- **AC2**: Signals must clearly state the student name and the reason for the signal (e.g., "3 unexcused absences").
- **AC3**: Clicking a signal must route directly to that Student's 360 Profile.
- **AC4**: Once an intervention is logged, the signal must be marked as 'addressed'.

**Story 2: User views Student 360 Profile**
- **AC1**: Profile must display basic demographics (name, grade, photo, medical alerts).
- **AC2**: Profile must display a unified chronological timeline of recent events (grades, attendance marks, behavior logs).
- **AC3**: Data must load in under 2 seconds.

**Story 3: Teacher logs an Intervention**
- **AC1**: User can access the "Log Intervention" form from the Student 360 profile.
- **AC2**: Form must require: Category, Description, and Action Taken.
- **AC3**: User must be able to optionally assign a follow-up task to another staff member.
- **AC4**: Saved interventions must appear in the student's timeline and the assignee's Action Center.

**Story 4: Teacher takes daily attendance**
- **AC1**: Interface displays a roster of students for the current period.
- **AC2**: Default state for all students is "Present".
- **AC3**: Teacher can toggle a student to "Absent" or "Late" with a single click.
- **AC4**: Submission updates the central database immediately.

**Story 5: Principal views school-wide attendance**
- **AC1**: Leadership dashboard displays a top-level percentage for today's whole-school attendance.
- **AC2**: Metric includes a comparison to the previous day (e.g., "+2%").
- **AC3**: Clicking the metric opens a breakdown by grade level.

**Story 6: Parent receives message notification**
- **AC1**: When a staff member sends a message, an email and in-app notification are triggered.
- **AC2**: Notification includes the sender's name and a link to view the message in the app.

**Story 7: Admin views missing registers**
- **AC1**: Admin dashboard displays a widget listing all teachers who have not submitted attendance for the current period.
- **AC2**: List updates in real-time as registers are submitted.

**Story 8: Admin sends automated reminder**
- **AC1**: Next to a missing register on the dashboard, there is a "Send Reminder" button.
- **AC2**: Clicking the button triggers an in-app notification to the specific teacher.
- **AC3**: Button provides feedback (e.g., changes to "Sent") to prevent duplicate clicks.

**Story 9: Parent views child's feed**
- **AC1**: Parent home screen defaults to an "Activity Feed".
- **AC2**: Feed includes attendance updates, newly published grades, and behavioral notices.
- **AC3**: Feed is sorted chronologically, newest first.

**Story 10: Staff manage Action Center tasks**
- **AC1**: Action Center displays a list of tasks assigned to the user.
- **AC2**: User can mark a task as "In Progress" or "Completed".
- **AC3**: Completed tasks are removed from the active view but retained in history.

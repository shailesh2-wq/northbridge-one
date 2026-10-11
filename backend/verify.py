import json
import urllib.request
import sys

def fetch(url):
    try:
        return json.loads(urllib.request.urlopen(url, timeout=10).read())
    except Exception as e:
        return f"ERROR: {e}"

print("=" * 60)
print("VERIFICATION 1: Student data consistency")
print("=" * 60)
d1 = fetch('http://localhost:8000/api/students')
d2 = fetch('http://localhost:8000/api/students')
if isinstance(d1, str) or isinstance(d2, str):
    print(f"  FAIL: {d1 if isinstance(d1, str) else d2}")
else:
    same = all(
        a['attendanceRate'] == b['attendanceRate'] and a.get('gpa') == b.get('gpa')
        for a, b in zip(d1, d2)
    )
    print(f"  Two calls return same data: {same}")
    for s in d1[:5]:
        print(f"  {s['first_name']} {s['last_name']}: att={s['attendanceRate']}% gpa={s.get('gpa')} signals={s.get('recentSignals', 0)}")

print("\n" + "=" * 60)
print("VERIFICATION 2: Teacher dashboard counts")
print("=" * 60)
td = fetch('http://localhost:8000/api/dashboard/teacher?teacher_id=3')
if isinstance(td, str):
    print(f"  FAIL: {td}")
else:
    print(f"  students_requiring_attention: {td.get('students_requiring_attention')}")
    print(f"  pending_assignments_count: {td.get('pending_assignments_count')}")
    print(f"  unread_messages_count: {td.get('unread_messages_count')}")
    print(f"  action_items_count: {td.get('action_items_count')}")
    print(f"  assigned_interventions: {len(td.get('assigned_interventions', []))}")

print("\n" + "=" * 60)
print("VERIFICATION 3: Parent dashboard unread messages")
print("=" * 60)
pd = fetch('http://localhost:8000/api/dashboard/parent/1')
if isinstance(pd, str):
    print(f"  FAIL: {pd}")
else:
    print(f"  unread_messages_count: {pd.get('unread_messages_count')}")
    print(f"  attendance_today: {pd.get('attendance_today')}")
    print(f"  fee_status: {pd.get('fee_status')}")

print("\n" + "=" * 60)
print("VERIFICATION 4: Finance dashboard")
print("=" * 60)
fd = fetch('http://localhost:8000/api/dashboard/finance')
if isinstance(fd, str):
    print(f"  FAIL: {fd}")
else:
    print(f"  outstanding_fees_total: ${fd.get('outstanding_fees_total', 0):,.0f}")
    print(f"  overdue_count: {fd.get('overdue_count')}")
    print(f"  pending_count: {fd.get('pending_count')}")
    print(f"  total_outstanding_accounts: {fd.get('total_outstanding_accounts')}")
    print(f"  collection_rate: {fd.get('collection_rate', 0)*100:.0f}%")

print("\n" + "=" * 60)
print("VERIFICATION 5: Signals")
print("=" * 60)
signals = fetch('http://localhost:8000/api/signals')
if isinstance(signals, str):
    print(f"  FAIL: {signals}")
else:
    for s in signals:
        print(f"  [{s.get('severity')}] {s.get('signal_type')}: {s.get('title')} entity={s.get('entity_type')}")

print("\n" + "=" * 60)
print("VERIFICATION 6: Interventions")
print("=" * 60)
invs = fetch('http://localhost:8000/api/interventions')
if isinstance(invs, str):
    print(f"  FAIL: {invs}")
else:
    for i in invs:
        print(f"  [{i.get('status')}] {i.get('title')} assigned_to={i.get('assigned_to')} follow_up={i.get('follow_up_required')}")

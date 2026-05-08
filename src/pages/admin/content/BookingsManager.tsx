import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@animaapp/playground-react-sdk';
import AdminShell from '../components/AdminShell';
import { Modal, Field, inputCls, textareaCls, FlashBanner, DeleteConfirmModal } from '../components/AdminUI';

type BookingRecord = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  course: string;
  preferredDate: Date | string;
  notes?: string;
  numberOfAttendees?: string;
  trainingLocation?: string;
  requestType?: string;
  contacted?: string;
  scheduled?: string;
  paid?: string;
  completed?: string;
  adminNotes?: string;
  createdAt?: Date | string;
};

type CrmField = 'contacted' | 'scheduled' | 'paid' | 'completed';

function formatDate(d: Date | string | undefined) {
  if (!d) return '—';
  const date = new Date(d);
  return isNaN(date.getTime()) ? String(d) : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function toInputDate(d: Date | string | undefined): string {
  if (!d) return '';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
}

function CrmYesNo({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const isYes = value === 'yes';
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <div className="flex rounded-lg overflow-hidden border border-slate-600">
        <button type="button" onClick={() => onChange('yes')}
          className={`flex-1 py-2 text-sm font-medium transition ${isYes ? 'bg-green-700 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
          Yes
        </button>
        <button type="button" onClick={() => onChange('no')}
          className={`flex-1 py-2 text-sm font-medium transition ${!isYes ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
          No
        </button>
      </div>
    </div>
  );
}

type EditForm = {
  fullName: string;
  email: string;
  phone: string;
  requestType: string;
  course: string;
  preferredDate: string;
  numberOfAttendees: string;
  trainingLocation: string;
  notes: string;
  contacted: string;
  scheduled: string;
  paid: string;
  completed: string;
  adminNotes: string;
};

const BLANK_FORM: EditForm = {
  fullName: '', email: '', phone: '', requestType: 'individual',
  course: '', preferredDate: '', numberOfAttendees: '', trainingLocation: '',
  notes: '', contacted: 'no', scheduled: 'no', paid: 'no', completed: 'no', adminNotes: '',
};

const FILTER_TABS: { key: 'all' | 'notContacted' | 'notScheduled' | 'notPaid' | 'notCompleted'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'notContacted', label: 'Not Contacted' },
  { key: 'notScheduled', label: 'Not Scheduled' },
  { key: 'notPaid', label: 'Not Paid' },
  { key: 'notCompleted', label: 'Not Completed' },
];

function CrmDot({ value }: { value?: string }) {
  const on = value === 'yes';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${on ? 'bg-green-900/40 text-green-300 border-green-700/60' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-green-400' : 'bg-slate-500'}`} />
      {on ? 'Yes' : 'No'}
    </span>
  );
}

export default function BookingsManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem('sasstac_admin_id');
  if (!adminId) { navigate('/admin'); return null; }

  const { data: bookings, isPending } = useQuery('Booking', { orderBy: { createdAt: 'desc' } });
  const { update, remove, isPending: saving } = useMutation('Booking');

  const [editTarget, setEditTarget] = useState<BookingRecord | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ ...BLANK_FORM });
  const [deleteTarget, setDeleteTarget] = useState<BookingRecord | null>(null);
  const [flash, setFlash] = useState('');
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [filter, setFilter] = useState<'all' | 'notContacted' | 'notScheduled' | 'notPaid' | 'notCompleted'>('all');

  const showFlash = (msg: string, type: 'success' | 'error' = 'success') => {
    setFlash(msg); setFlashType(type); setTimeout(() => setFlash(''), 3500);
  };

  const openEdit = (b: BookingRecord) => {
    setEditTarget(b);
    setEditForm({
      fullName: b.fullName ?? '',
      email: b.email ?? '',
      phone: b.phone ?? '',
      requestType: b.requestType ?? 'individual',
      course: b.course ?? '',
      preferredDate: toInputDate(b.preferredDate),
      numberOfAttendees: b.numberOfAttendees ?? '',
      trainingLocation: b.trainingLocation ?? '',
      notes: b.notes ?? '',
      contacted: b.contacted ?? 'no',
      scheduled: b.scheduled ?? 'no',
      paid: b.paid ?? 'no',
      completed: b.completed ?? 'no',
      adminNotes: b.adminNotes ?? '',
    });
  };

  const ef = (key: keyof EditForm, val: string) => setEditForm(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!editTarget) return;
    try {
      await update(editTarget.id, {
        fullName: editForm.fullName,
        email: editForm.email,
        phone: editForm.phone,
        requestType: editForm.requestType,
        course: editForm.course,
        preferredDate: editForm.preferredDate ? new Date(editForm.preferredDate) : undefined,
        numberOfAttendees: editForm.numberOfAttendees,
        trainingLocation: editForm.trainingLocation,
        notes: editForm.notes,
        contacted: editForm.contacted,
        scheduled: editForm.scheduled,
        paid: editForm.paid,
        completed: editForm.completed,
        adminNotes: editForm.adminNotes,
      });
      setEditTarget(null);
      showFlash('Booking saved.');
    } catch { showFlash('Save failed.', 'error'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { await remove(deleteTarget.id); setDeleteTarget(null); setEditTarget(null); showFlash('Booking deleted.'); }
    catch { showFlash('Delete failed.', 'error'); }
  };

  const allBookings = (bookings ?? []) as BookingRecord[];

  const filterCount = (key: typeof filter) => {
    if (key === 'all') return allBookings.length;
    if (key === 'notContacted') return allBookings.filter(b => b.contacted !== 'yes').length;
    if (key === 'notScheduled') return allBookings.filter(b => b.scheduled !== 'yes').length;
    if (key === 'notPaid') return allBookings.filter(b => b.paid !== 'yes').length;
    if (key === 'notCompleted') return allBookings.filter(b => b.completed !== 'yes').length;
    return 0;
  };

  const filtered = allBookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'notContacted') return b.contacted !== 'yes';
    if (filter === 'notScheduled') return b.scheduled !== 'yes';
    if (filter === 'notPaid') return b.paid !== 'yes';
    if (filter === 'notCompleted') return b.completed !== 'yes';
    return true;
  });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Bookings</h2>
            <p className="text-slate-400 text-sm mt-0.5">View and manage incoming booking requests</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-700 border border-slate-600 px-3 py-1.5 rounded-full">{allBookings.length} total</span>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTER_TABS.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === tab.key ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white border border-slate-600'}`}>
              {tab.label} ({filterCount(tab.key)})
            </button>
          ))}
        </div>

        <FlashBanner msg={flash} type={flashType} />

        {isPending ? <div className="text-slate-400 text-sm py-8 text-center">Loading…</div> : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Course</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Attendees</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Contacted</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Scheduled</th>
                  <th className="px-4 py-3 text-left hidden xl:table-cell">Paid</th>
                  <th className="px-4 py-3 text-left hidden xl:table-cell">Completed</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{b.fullName}</div>
                      <div className="text-slate-500 text-xs">{b.email}</div>
                      {b.requestType === 'group' && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/40 mt-0.5">Group</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300 hidden sm:table-cell text-xs max-w-[180px]" style={{ wordBreak: 'break-word' }}>{b.course}</td>
                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">{formatDate(b.preferredDate)}</td>
                    <td className="px-4 py-3 text-slate-400 hidden lg:table-cell text-xs">{b.numberOfAttendees || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><CrmDot value={b.contacted} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><CrmDot value={b.scheduled} /></td>
                    <td className="px-4 py-3 hidden xl:table-cell"><CrmDot value={b.paid} /></td>
                    <td className="px-4 py-3 hidden xl:table-cell"><CrmDot value={b.completed} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(b)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 transition">
                          Edit
                        </button>
                        <button onClick={() => setDeleteTarget(b)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-900/60 hover:bg-red-700 text-red-300 hover:text-white border border-red-700/50 transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-500 text-sm">No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {editTarget && (
          <Modal title="Edit Booking" onClose={() => setEditTarget(null)} wide>
            <div className="space-y-5">
              {/* Customer Information */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Customer Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <input className={inputCls} value={editForm.fullName} onChange={e => ef('fullName', e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input className={inputCls} type="email" value={editForm.email} onChange={e => ef('email', e.target.value)} />
                  </Field>
                  <Field label="Phone">
                    <input className={inputCls} value={editForm.phone} onChange={e => ef('phone', e.target.value)} />
                  </Field>
                  <Field label="Request Type">
                    <select className={inputCls} value={editForm.requestType} onChange={e => ef('requestType', e.target.value)}>
                      <option value="individual">Individual</option>
                      <option value="group">Group</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Booking Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Course">
                    <input className={inputCls} value={editForm.course} onChange={e => ef('course', e.target.value)} />
                  </Field>
                  <Field label="Preferred Date">
                    <input className={inputCls} type="date" value={editForm.preferredDate} onChange={e => ef('preferredDate', e.target.value)} />
                  </Field>
                  <Field label="Number of Attendees">
                    <input className={inputCls} value={editForm.numberOfAttendees} onChange={e => ef('numberOfAttendees', e.target.value)} placeholder="e.g. 5-12" />
                  </Field>
                  <Field label="Training Location">
                    <input className={inputCls} value={editForm.trainingLocation} onChange={e => ef('trainingLocation', e.target.value)} placeholder="e.g. Client Location" />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Customer Notes">
                    <textarea className={textareaCls} value={editForm.notes} onChange={e => ef('notes', e.target.value)} style={{ minHeight: 80 }} />
                  </Field>
                </div>
              </div>

              {/* Status Tracking */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Status Tracking</p>
                <div className="grid grid-cols-2 gap-4">
                  <CrmYesNo label="Contacted" value={editForm.contacted} onChange={v => ef('contacted', v)} />
                  <CrmYesNo label="Scheduled" value={editForm.scheduled} onChange={v => ef('scheduled', v)} />
                  <CrmYesNo label="Paid" value={editForm.paid} onChange={v => ef('paid', v)} />
                  <CrmYesNo label="Completed" value={editForm.completed} onChange={v => ef('completed', v)} />
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Admin Notes</p>
                <Field label="Internal Notes">
                  <textarea className={textareaCls} value={editForm.adminNotes} onChange={e => ef('adminNotes', e.target.value)} placeholder="Add any internal notes about this booking…" style={{ minHeight: 80 }} />
                </Field>
                <p className="text-xs text-slate-500 mt-1.5">These notes are only visible to admins and are never shown to the customer.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditTarget(null)} className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition">
                  {saving ? 'Saving…' : 'Save Booking'}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {deleteTarget && <DeleteConfirmModal name={deleteTarget.fullName} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={saving} />}
      </div>
    </AdminShell>
  );
}

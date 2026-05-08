import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@animaapp/playground-react-sdk';
import bcrypt from 'bcryptjs';
import AdminShell from './components/AdminShell';
import { Modal, Field, inputCls, FlashBanner, DeleteConfirmModal, StatusBadge } from './components/AdminUI';
import { generatePassword } from '@/utils/passwordGenerator';

type AdminRecord = {
  id: string;
  fullName: string;
  username: string;
  passwordHash: string;
  isMain?: number;
  switch?: number;
  order?: number;
};

const BLANK: Omit<AdminRecord, 'id' | 'passwordHash'> & { newPassword: string } = {
  fullName: '',
  username: '',
  newPassword: '',
  isMain: 0,
  switch: 1,
  order: 0,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem('sasstac_admin_id');

  useEffect(() => {
    if (!adminId) navigate('/admin');
  }, [adminId]);

  const { data: admins, isPending } = useQuery('Admin', { orderBy: { order: 'asc' } });
  const { create, update, remove, isPending: saving } = useMutation('Admin');
  const { query: lazyQuery } = useLazyQuery('Admin');

  const [modal, setModal] = useState<'add' | 'edit' | 'pw' | null>(null);
  const [form, setForm] = useState({ ...BLANK });
  const [editId, setEditId] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<AdminRecord | null>(null);
  const [flash, setFlash] = useState('');
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [pwValue, setPwValue] = useState('');
  const [pwGenerated, setPwGenerated] = useState('');

  const showFlash = (msg: string, type: 'success' | 'error' = 'success') => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(''), 3500);
  };

  const openAdd = () => {
    setForm({ ...BLANK });
    setModal('add');
  };

  const openEdit = (a: AdminRecord) => {
    setForm({ fullName: a.fullName, username: a.username, newPassword: '', isMain: a.isMain ?? 0, switch: a.switch ?? 1, order: a.order ?? 0 });
    setEditId(a.id);
    setModal('edit');
  };

  const openPw = (a: AdminRecord) => {
    setEditId(a.id);
    setPwValue('');
    setPwGenerated('');
    setModal('pw');
  };

  const handleSaveAdd = async () => {
    if (!form.fullName.trim() || !form.username.trim() || !form.newPassword.trim()) {
      showFlash('Full name, username, and password are required.', 'error'); return;
    }
    try {
      const hash = await bcrypt.hash(form.newPassword, 12);
      await create({ fullName: form.fullName.trim(), username: form.username.trim(), passwordHash: hash, isMain: form.isMain, switch: form.switch, order: form.order });
      setModal(null);
      showFlash('Administrator created successfully.');
    } catch { showFlash('Failed to create administrator.', 'error'); }
  };

  const handleSaveEdit = async () => {
    if (!form.fullName.trim() || !form.username.trim()) {
      showFlash('Full name and username are required.', 'error'); return;
    }
    try {
      const patch: any = { fullName: form.fullName.trim(), username: form.username.trim(), isMain: form.isMain, switch: form.switch, order: form.order };
      if (form.newPassword.trim()) patch.passwordHash = await bcrypt.hash(form.newPassword.trim(), 12);
      await update(editId, patch);
      setModal(null);
      showFlash('Administrator updated successfully.');
    } catch { showFlash('Failed to update administrator.', 'error'); }
  };

  const handleResetPw = async () => {
    const pw = pwValue.trim() || pwGenerated;
    if (!pw) { showFlash('Enter or generate a password first.', 'error'); return; }
    try {
      const hash = await bcrypt.hash(pw, 12);
      await update(editId, { passwordHash: hash });
      setModal(null);
      showFlash('Password reset successfully.');
    } catch { showFlash('Failed to reset password.', 'error'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
      showFlash('Administrator deleted.');
    } catch { showFlash('Failed to delete administrator.', 'error'); }
  };

  const genPw = () => { const p = generatePassword(16); setPwGenerated(p); setPwValue(p); };

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Administrators</h2>
            <p className="text-slate-400 text-sm mt-0.5">Manage admin accounts</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Admin
          </button>
        </div>

        <FlashBanner msg={flash} type={flashType} />

        {isPending ? (
          <div className="text-slate-400 text-sm py-8 text-center">Loading…</div>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Username</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(admins ?? []).map((a: any) => (
                  <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                    <td className="px-4 py-3 text-white font-medium">{a.fullName}</td>
                    <td className="px-4 py-3 text-slate-300 hidden sm:table-cell font-mono text-xs">{a.username}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {a.isMain === 1
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-600/20 text-amber-400 border border-amber-700/40">Main Admin</span>
                        : <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-400 border border-slate-600">Sub-Admin</span>}
                    </td>
                    <td className="px-4 py-3"><StatusBadge on={a.switch === 1} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openPw(a)} title="Reset Password" className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                        </button>
                        <button onClick={() => openEdit(a)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => setDeleteTarget(a)} title="Delete" className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(admins ?? []).length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">No administrators found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Modal */}
        {modal === 'add' && (
          <Modal title="Add Administrator" onClose={() => setModal(null)}>
            <div className="space-y-4">
              <Field label="Full Name"><input className={inputCls} value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Jane Smith" /></Field>
              <Field label="Username"><input className={inputCls} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="jsmith_admin" /></Field>
              <Field label="Password">
                <div className="flex gap-2">
                  <input className={inputCls} type="text" value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))} placeholder="Set a strong password" />
                  <button type="button" onClick={() => { const p = generatePassword(16); setForm(f => ({ ...f, newPassword: p })); }} className="shrink-0 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white border border-slate-600 text-xs transition">Gen</button>
                </div>
              </Field>
              <Field label="Role">
                <select className={inputCls} value={form.isMain} onChange={e => setForm(f => ({ ...f, isMain: Number(e.target.value) }))}>
                  <option value={0}>Sub-Admin</option>
                  <option value={1}>Main Admin</option>
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={form.switch} onChange={e => setForm(f => ({ ...f, switch: Number(e.target.value) }))}>
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
              </Field>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600">Cancel</button>
                <button onClick={handleSaveAdd} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition">{saving ? 'Saving…' : 'Create'}</button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Modal */}
        {modal === 'edit' && (
          <Modal title="Edit Administrator" onClose={() => setModal(null)}>
            <div className="space-y-4">
              <Field label="Full Name"><input className={inputCls} value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} /></Field>
              <Field label="Username"><input className={inputCls} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} /></Field>
              <Field label="New Password (leave blank to keep current)" hint="Only fill this if you want to change the password.">
                <input className={inputCls} type="text" value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))} placeholder="Leave blank to keep current" />
              </Field>
              <Field label="Role">
                <select className={inputCls} value={form.isMain} onChange={e => setForm(f => ({ ...f, isMain: Number(e.target.value) }))}>
                  <option value={0}>Sub-Admin</option>
                  <option value={1}>Main Admin</option>
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={form.switch} onChange={e => setForm(f => ({ ...f, switch: Number(e.target.value) }))}>
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
              </Field>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600">Cancel</button>
                <button onClick={handleSaveEdit} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition">{saving ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </div>
          </Modal>
        )}

        {/* Reset Password Modal */}
        {modal === 'pw' && (
          <Modal title="Reset Password" onClose={() => setModal(null)}>
            <div className="space-y-4">
              <Field label="New Password">
                <div className="flex gap-2">
                  <input className={inputCls} type="text" value={pwValue} onChange={e => setPwValue(e.target.value)} placeholder="Type or generate a password" />
                  <button type="button" onClick={genPw} className="shrink-0 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white border border-slate-600 text-xs transition">Gen</button>
                </div>
                {pwGenerated && <p className="text-xs text-amber-400 mt-1 font-mono break-all">Generated: {pwGenerated}</p>}
              </Field>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600">Cancel</button>
                <button onClick={handleResetPw} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition">{saving ? 'Saving…' : 'Reset Password'}</button>
              </div>
            </div>
          </Modal>
        )}

        {deleteTarget && (
          <DeleteConfirmModal name={deleteTarget.fullName} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={saving} />
        )}
      </div>
    </AdminShell>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@animaapp/playground-react-sdk";
import AdminShell from "../components/AdminShell";
import {
  FlashBanner,
  DeleteConfirmModal,
  StatusBadge,
  inputCls,
} from "../components/AdminUI";

type CourseCategory = {
  id: string;
  name: string;
  switch?: number;
  order?: number;
  createdAt?: Date;
};

const BLANK = { name: "", switch: 1, order: 1 };

export default function CourseCategoriesManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("sasstac_admin_id");

  useEffect(() => {
    if (!adminId) navigate("/admin");
  }, [adminId, navigate]);

  const { data: categories, isPending } = useQuery("CourseCategory", {
    orderBy: { order: "asc" },
  });
  const {
    create,
    update,
    remove,
    isPending: saving,
  } = useMutation("CourseCategory");

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState({ ...BLANK });
  const [editId, setEditId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CourseCategory | null>(null);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  const showFlash = (msg: string, type: "success" | "error" = "success") => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(""), 3500);
  };

  const sorted = [...(categories ?? [])].sort(
    (a: CourseCategory, b: CourseCategory) => (a.order ?? 0) - (b.order ?? 0),
  );

  const openAdd = () => {
    const nextOrder = sorted.length
      ? Math.max(...sorted.map((c: CourseCategory) => c.order ?? 0)) + 1
      : 1;
    setForm({ ...BLANK, order: nextOrder });
    setModal("add");
  };

  const openEdit = (c: CourseCategory) => {
    setForm({ name: c.name, switch: c.switch ?? 1, order: c.order ?? 0 });
    setEditId(c.id);
    setModal("edit");
  };

  const handleSaveAdd = async () => {
    if (!form.name.trim()) {
      showFlash("Category name is required.", "error");
      return;
    }
    try {
      await create({
        name: form.name.trim(),
        switch: form.switch,
        order: form.order,
      });
      setModal(null);
      showFlash("Category created.");
    } catch {
      showFlash("Failed to create category.", "error");
    }
  };

  const handleSaveEdit = async () => {
    if (!form.name.trim()) {
      showFlash("Category name is required.", "error");
      return;
    }
    try {
      await update(editId, {
        name: form.name.trim(),
        switch: form.switch,
        order: form.order,
      });
      setModal(null);
      showFlash("Category updated.");
    } catch {
      showFlash("Failed to update category.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
      showFlash("Category deleted.");
    } catch {
      showFlash("Failed to delete category.", "error");
    }
  };

  const swapOrder = async (idx: number, dir: "up" | "down") => {
    const other = dir === "up" ? idx - 1 : idx + 1;
    if (other < 0 || other >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[other];
    await update(a.id, { order: b.order ?? 0 });
    await update(b.id, { order: a.order ?? 0 });
  };

  const formatDate = (d?: Date) => {
    if (!d) return "—";
    const dt = new Date(d);
    return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
  };

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Course Categories</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-sm leading-relaxed">
              Manage the filter tabs shown on the Courses section. Categories
              are also available in the{" "}
              <span className="text-amber-400">Course editor</span>.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex flex-col items-center justify-center gap-0.5 px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition shrink-0 ml-6"
          >
            <span className="text-xl leading-none">+</span>
            <span className="text-sm leading-tight">
              Add
              <br />
              Category
            </span>
          </button>
        </div>

        <FlashBanner msg={flash} type={flashType} />

        {isPending ? (
          <div className="text-slate-400 text-sm py-8 text-center">
            Loading…
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left w-24">Order</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left w-32">Visible</th>
                  <th className="px-4 py-3 text-left w-28">Created</th>
                  <th className="px-4 py-3 text-right w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c: CourseCategory, idx: number) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/20 transition"
                  >
                    {/* Order */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono text-sm w-4 text-center">
                          {c.order ?? 0}
                        </span>
                        <div className="flex flex-col">
                          <button
                            disabled={idx === 0 || saving}
                            onClick={() => swapOrder(idx, "up")}
                            className="text-slate-500 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] leading-none"
                          >
                            ▲
                          </button>
                          <button
                            disabled={idx === sorted.length - 1 || saving}
                            onClick={() => swapOrder(idx, "down")}
                            className="text-slate-500 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] leading-none"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-4 py-3 text-white font-semibold">
                      {c.name}
                    </td>
                    {/* Visible badge */}
                    <td className="px-4 py-3">
                      <StatusBadge on={c.switch === 1} />
                    </td>
                    {/* Created date */}
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {formatDate(c.createdAt)}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-600 hover:bg-slate-500 text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-700 hover:bg-red-600 text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No categories yet. Click{" "}
                      <span className="text-amber-400 font-medium">
                        Add Category
                      </span>{" "}
                      to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Add / Edit Modal ── */}
        {(modal === "add" || modal === "edit") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setModal(null)}
            />
            <div className="relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm p-6">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white text-lg font-bold">
                  {modal === "add" ? "Add Category" : "Edit Category"}
                </h3>
                <button
                  onClick={() => setModal(null)}
                  className="text-slate-400 hover:text-white transition text-xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Visible toggle + Order stepper */}
              <div className="flex items-center justify-between mb-5">
                {/* Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, switch: f.switch === 1 ? 0 : 1 }))
                  }
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${form.switch === 1 ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-slate-700 text-slate-400 border border-slate-600"}`}
                >
                  <span
                    className={`w-8 h-4 rounded-full relative transition-colors ${form.switch === 1 ? "bg-amber-500" : "bg-slate-600"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${form.switch === 1 ? "left-[18px]" : "left-0.5"}`}
                    />
                  </span>
                  <span>
                    Visible: {form.switch === 1 ? "Visible" : "Hidden"}
                  </span>
                </button>

                {/* Order stepper */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Order:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        order: Math.max(0, (f.order ?? 1) - 1),
                      }))
                    }
                    className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm flex items-center justify-center transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-white font-semibold text-sm">
                    {form.order ?? 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, order: (f.order ?? 0) + 1 }))
                    }
                    className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Category Name */}
              <div className="mb-5">
                <label className="block text-slate-300 text-sm font-semibold mb-1">
                  Category Name
                </label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. First Aid"
                />
                <p className="text-slate-500 text-xs mt-1">
                  Shown as a filter tab on the Courses section of the site.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={modal === "add" ? handleSaveAdd : handleSaveEdit}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition"
                >
                  {saving ? "Saving…" : "Save Category"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            name={deleteTarget.name}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            loading={saving}
          />
        )}
      </div>
    </AdminShell>
  );
}

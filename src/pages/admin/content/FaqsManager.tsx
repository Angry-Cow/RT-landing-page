import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useLazyQuery,
} from "@animaapp/playground-react-sdk";
import AdminShell from "../components/AdminShell";
import {
  Modal,
  Field,
  inputCls,
  textareaCls,
  Toggle,
  FlashBanner,
  DeleteConfirmModal,
  StatusBadge,
  OrderInput,
} from "../components/AdminUI";

type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  link?: string;
  linkText?: string;
  switch?: number;
  order?: number;
};

const BLANK: Omit<FaqRecord, "id"> = {
  question: "",
  answer: "",
  link: "",
  linkText: "",
  switch: 1,
  order: 0,
};

function FaqPreview({ form }: { form: Omit<FaqRecord, "id"> }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Open item — mirrors the live FaqItem opened state exactly */}
      <div className="border-b border-slate-200 bg-sky-50/60 transition-colors duration-200">
        {/* Button row — px-6 py-5, text-base font-semibold */}
        <div className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
          <span className="text-base font-semibold leading-snug text-sky-900">
            {form.question || (
              <span className="text-slate-400 italic font-normal text-sm">
                Question text…
              </span>
            )}
          </span>
          {/* Icon — bg-sky-900 rotate-45 (open state) */}
          <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-sky-900 rotate-45">
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        {/* Answer body — px-6 pb-5 text-sm text-slate-600 leading-relaxed */}
        <div className="px-6 pb-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            {form.answer || (
              <span className="text-slate-400 italic">Answer text…</span>
            )}
          </p>
          {form.link && (
            <span className="text-amber-600 text-sm font-semibold mt-1 block">
              {form.linkText || form.link}
            </span>
          )}
        </div>
      </div>
      {/* Closed item sample — second row to show the accordion context */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 bg-white hover:bg-slate-50 border-b border-slate-200 transition-colors">
        <span className="text-base font-semibold text-slate-800 opacity-30">
          Another question…
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-slate-100">
          <svg
            className="w-3.5 h-3.5 text-slate-400"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      {/* Third closed row for shape context */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 bg-white hover:bg-slate-50 transition-colors">
        <span className="text-base font-semibold text-slate-800 opacity-20">
          Another question…
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-slate-100">
          <svg
            className="w-3.5 h-3.5 text-slate-400"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function FaqsManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("sasstac_admin_id");

  useEffect(() => {
    if (!adminId) navigate("/admin");
  }, [adminId]);

  const { data: faqs, isPending } = useQuery("Faq", {
    orderBy: { order: "asc" },
  });
  const { create, update, remove, isPending: saving } = useMutation("Faq");
  const { query: lazyFaqs } = useLazyQuery("Faq");

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState({ ...BLANK });
  const [editId, setEditId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<FaqRecord | null>(null);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  const showFlash = (msg: string, type: "success" | "error" = "success") => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(""), 3500);
  };

  const openAdd = () => {
    setForm({ ...BLANK });
    setModal("add");
  };
  const openEdit = (faq: FaqRecord) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      link: faq.link ?? "",
      linkText: faq.linkText ?? "",
      switch: faq.switch ?? 1,
      order: faq.order ?? 0,
    });
    setEditId(faq.id);
    setModal("edit");
  };

  const handleSave = async (isEdit: boolean) => {
    if (!form.question.trim() || !form.answer.trim()) {
      showFlash("Question and answer are required.", "error");
      return;
    }
    try {
      const newOrder = form.order ?? 0;
      const allSorted = [...(faqs ?? [])].sort(
        (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
      );

      if (isEdit) {
        const oldOrder =
          allSorted.find((f: any) => f.id === editId)?.order ?? newOrder;

        if (oldOrder !== newOrder) {
          const movingDown = newOrder < oldOrder;
          const neighbours = allSorted.filter((f: any) => {
            if (f.id === editId) return false;
            const o = f.order ?? 0;
            if (movingDown) return o >= newOrder && o < oldOrder;
            return o > oldOrder && o <= newOrder;
          });
          for (const nb of neighbours) {
            const shifted = movingDown
              ? (nb.order ?? 0) + 1
              : (nb.order ?? 0) - 1;
            await update(nb.id, { order: shifted });
          }
        }
        await update(editId, { ...form, order: newOrder });
      } else {
        const neighbours = allSorted.filter(
          (f: any) => (f.order ?? 0) >= newOrder,
        );
        for (const nb of neighbours) {
          await update(nb.id, { order: (nb.order ?? 0) + 1 });
        }
        await create({ ...form, order: newOrder });
      }

      showFlash(isEdit ? "FAQ updated." : "FAQ created.");
      setModal(null);
    } catch {
      showFlash("Save failed.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
      showFlash("FAQ deleted.");
    } catch {
      showFlash("Delete failed.", "error");
    }
  };

  const handleSwap = async (idA: string, idB: string) => {
    const sorted = [...(faqs ?? [])].sort(
      (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
    );
    const recA = sorted.find((f: any) => f.id === idA);
    const recB = sorted.find((f: any) => f.id === idB);
    if (!recA || !recB) return;
    try {
      await update(idA, { order: recB.order ?? 0 });
      await update(idB, { order: recA.order ?? 0 });
    } catch {
      showFlash("Reorder failed.", "error");
    }
  };

  const f = (key: keyof typeof form, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">FAQs</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage frequently asked questions
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add FAQ
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
                  <th className="px-3 py-3 text-center w-16">Order</th>
                  <th className="px-4 py-3 text-left">Question</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Answer
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const sorted = [...(faqs ?? [])].sort(
                    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
                  );
                  return sorted.map((faq: any, idx: number) => {
                    const prev = sorted[idx - 1] as any | undefined;
                    const next = sorted[idx + 1] as any | undefined;
                    return (
                      <tr
                        key={faq.id}
                        className="border-b border-slate-700/50 hover:bg-slate-700/20 transition"
                      >
                        <td className="px-3 py-3 text-center">
                          <div className="flex flex-row items-center justify-center gap-1.5">
                            <span className="text-slate-300 font-mono text-xs tabular-nums w-5 text-right">
                              {faq.order ?? 0}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={!prev || saving}
                                onClick={() =>
                                  prev && handleSwap(faq.id, prev.id)
                                }
                                title="Move up"
                                className="text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed leading-none p-0.5 rounded transition hover:bg-slate-700"
                              >
                                ▲
                              </button>
                              <button
                                disabled={!next || saving}
                                onClick={() =>
                                  next && handleSwap(faq.id, next.id)
                                }
                                title="Move down"
                                className="text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed leading-none p-0.5 rounded transition hover:bg-slate-700"
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white font-medium max-w-xs truncate">
                          {faq.question}
                        </td>
                        <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs max-w-xs truncate">
                          {faq.answer?.substring(0, 80)}
                          {faq.answer?.length > 80 ? "…" : ""}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge on={faq.switch === 1} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(faq)}
                              title="Edit"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(faq)}
                              title="Delete"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })()}
                {(faqs ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No FAQs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {(modal === "add" || modal === "edit") && (
          <Modal
            title={modal === "add" ? "Add FAQ" : "Edit FAQ"}
            onClose={() => setModal(null)}
            wide
          >
            <div className="flex flex-col gap-6">
              {/* Live Preview — full-width above form to reflect the real accordion shape */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Live Preview
                </p>
                <FaqPreview form={form} />
              </div>
              <div className="border-t border-slate-700" />
              {/* Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Toggle
                    value={form.switch ?? 1}
                    onChange={(v) => f("switch", v)}
                    label="Visibility"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-300">Order:</span>
                    <OrderInput
                      value={form.order ?? 0}
                      onChange={(v) => f("order", v)}
                    />
                  </div>
                </div>
                <Field label="Question">
                  <input
                    className={inputCls}
                    value={form.question}
                    onChange={(e) => f("question", e.target.value)}
                    placeholder="What will I learn in this course?"
                  />
                </Field>
                <Field label="Answer">
                  <textarea
                    className={textareaCls}
                    value={form.answer}
                    onChange={(e) => f("answer", e.target.value)}
                    style={{ minHeight: 120 }}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Link URL (optional)">
                    <input
                      className={inputCls}
                      value={form.link ?? ""}
                      onChange={(e) => f("link", e.target.value)}
                      placeholder="https://…"
                    />
                  </Field>
                  <Field label="Link Text (optional)">
                    <input
                      className={inputCls}
                      value={form.linkText ?? ""}
                      onChange={(e) => f("linkText", e.target.value)}
                      placeholder="Learn more"
                    />
                  </Field>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(modal === "edit")}
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition"
                  >
                    {saving
                      ? "Saving…"
                      : modal === "edit"
                        ? "Save FAQ"
                        : "Add FAQ"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            name={deleteTarget.question}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            loading={saving}
          />
        )}
      </div>
    </AdminShell>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@animaapp/playground-react-sdk";
// Note: OfferingsManager is update-only (no create/delete); reorder logic uses the already-loaded courses list
import AdminShell from "../components/AdminShell";
import {
  Modal,
  Field,
  inputCls,
  Toggle,
  FlashBanner,
  StatusBadge,
  OrderInput,
} from "../components/AdminUI";

type CourseRecord = {
  id: string;
  title: string;
  groupPrice: string;
  groupPriceNote?: string;
  privatePrice?: string;
  privatePriceNote?: string;
  duration: string;
  button1Text?: string;
  button2Text?: string;
  switch?: number;
  order?: number;
};

function OfferingPreview({ form }: { form: Omit<CourseRecord, "id"> }) {
  return (
    <div className="space-y-3">
      {/* Full-width card — same shape as the live CourseInvestmentItem row */}
      <div className="items-center flex justify-between border border-gray-100 bg-white p-6 rounded-2xl shadow-sm w-full">
        <div className="min-w-0 pr-6">
          <h4 className="text-xl font-bold leading-7 mb-1 text-gray-900">
            {form.title || (
              <span className="text-gray-400 italic text-base font-normal">
                Course Title
              </span>
            )}
          </h4>
          <p className="text-gray-500 text-sm leading-5">
            {form.duration || (
              <span className="italic text-gray-300">
                Duration / scheduling note…
              </span>
            )}
          </p>
        </div>
        <div className="text-right shrink-0">
          {/* Private price row */}
          {form.privatePrice && (
            <p className="text-sky-900 font-bold text-sm mb-2">
              {form.privatePrice}
              {form.privatePriceNote && (
                <span className="text-xs font-normal text-gray-500 ml-1">
                  {form.privatePriceNote}
                </span>
              )}
            </p>
          )}
          {/* Group price row */}
          <p className="text-sky-900 font-bold text-sm">
            {form.groupPrice || <span className="text-gray-300">—</span>}
            {form.groupPriceNote && (
              <span className="text-xs font-normal text-gray-500 ml-1">
                {form.groupPriceNote}
              </span>
            )}
          </p>
          <span className="text-amber-600 text-[10.8px] font-bold tracking-[0.6px] leading-4 uppercase mt-1 block">
            {form.button1Text || "Contact Now"}
          </span>
          <span className="text-sky-700 text-[10.8px] font-semibold tracking-[0.5px] leading-4 uppercase mt-1 block">
            {form.button2Text || "Group Rate"}
          </span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
          Primary CTA
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-600"></span>
          Secondary CTA
        </span>
      </div>
    </div>
  );
}

export default function OfferingsManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("sasstac_admin_id");

  useEffect(() => {
    if (!adminId) navigate("/admin");
  }, [adminId]);

  const { data: courses, isPending } = useQuery("Course", {
    orderBy: { order: "asc" },
  });
  const { update, isPending: saving } = useMutation("Course");

  const [modal, setModal] = useState<"edit" | null>(null);
  const [form, setForm] = useState<Omit<CourseRecord, "id">>({
    title: "",
    groupPrice: "",
    groupPriceNote: "",
    privatePrice: "",
    privatePriceNote: "",
    duration: "",
    button1Text: "Contact Now",
    button2Text: "Group Rate",
    switch: 1,
    order: 0,
  });
  const [editId, setEditId] = useState("");
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  const showFlash = (msg: string, type: "success" | "error" = "success") => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(""), 3500);
  };

  const openEdit = (c: CourseRecord) => {
    setForm({
      title: c.title,
      groupPrice: c.groupPrice,
      groupPriceNote: c.groupPriceNote ?? "",
      privatePrice: c.privatePrice ?? "",
      privatePriceNote: c.privatePriceNote ?? "",
      duration: c.duration,
      button1Text: c.button1Text ?? "Contact Now",
      button2Text: c.button2Text ?? "Group Rate",
      switch: c.switch ?? 1,
      order: c.order ?? 0,
    });
    setEditId(c.id);
    setModal("edit");
  };

  const handleSave = async () => {
    try {
      const newOrder = form.order ?? 0;
      const allSorted = [...(courses ?? [])].sort(
        (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
      );
      const oldOrder =
        allSorted.find((c: any) => c.id === editId)?.order ?? newOrder;

      if (oldOrder !== newOrder) {
        const movingDown = newOrder < oldOrder;
        const neighbours = allSorted.filter((c: any) => {
          if (c.id === editId) return false;
          const o = c.order ?? 0;
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

      await update(editId, {
        groupPrice: form.groupPrice,
        groupPriceNote: form.groupPriceNote,
        privatePrice: form.privatePrice,
        privatePriceNote: form.privatePriceNote,
        duration: form.duration,
        button1Text: form.button1Text,
        button2Text: form.button2Text,
        switch: form.switch,
        order: newOrder,
      });
      showFlash("Investment fields updated.");
      setModal(null);
    } catch {
      showFlash("Save failed.", "error");
    }
  };

  const handleSwap = async (idA: string, idB: string) => {
    const sorted = [...(courses ?? [])].sort(
      (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
    );
    const recA = sorted.find((c: any) => c.id === idA);
    const recB = sorted.find((c: any) => c.id === idB);
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Offerings</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage course investment list — pricing, duration &amp; CTA
              buttons
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-sky-900/30 border border-sky-700/40 rounded-xl px-4 py-3 mb-5 text-sm text-sky-300">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0 text-sky-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Title and category edits must be made in{" "}
            <Link
              to="/admin/content/courses"
              className="underline font-semibold text-amber-400 hover:text-amber-300"
            >
              Courses Manager
            </Link>
            . This view manages investment-list fields only (price, duration,
            CTA buttons).
          </span>
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
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">
                    Buttons
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const sorted = [...(courses ?? [])].sort(
                    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
                  );
                  return sorted.map((c: any, idx: number) => {
                    const prev = sorted[idx - 1] as any | undefined;
                    const next = sorted[idx + 1] as any | undefined;
                    return (
                      <tr
                        key={c.id}
                        className="border-b border-slate-700/50 hover:bg-slate-700/20 transition"
                      >
                        <td className="px-3 py-3 text-center">
                          <div className="flex flex-row items-center justify-center gap-1.5">
                            <span className="text-slate-300 font-mono text-xs tabular-nums w-5 text-right">
                              {c.order ?? 0}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={!prev || saving}
                                onClick={() =>
                                  prev && handleSwap(c.id, prev.id)
                                }
                                title="Move up"
                                className="text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed leading-none p-0.5 rounded transition hover:bg-slate-700"
                              >
                                ▲
                              </button>
                              <button
                                disabled={!next || saving}
                                onClick={() =>
                                  next && handleSwap(c.id, next.id)
                                }
                                title="Move down"
                                className="text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed leading-none p-0.5 rounded transition hover:bg-slate-700"
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white font-medium">
                          {c.title}
                        </td>
                        <td className="px-4 py-3 text-slate-300 hidden sm:table-cell">
                          {c.groupPrice}
                          {c.groupPriceNote ? (
                            <span className="text-slate-500 text-xs ml-1">
                              {c.groupPriceNote}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">
                          {c.duration}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-900/30 border border-amber-700/30 rounded px-2 py-0.5 w-fit">
                              {c.button1Text || "Contact Now"}
                            </span>
                            <span className="inline-block text-xs font-semibold text-slate-300 bg-slate-700/50 border border-slate-600/30 rounded px-2 py-0.5 w-fit">
                              {c.button2Text || "Group Rate"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge on={c.switch === 1} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openEdit(c)}
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
                        </td>
                      </tr>
                    );
                  });
                })()}
                {(courses ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {modal === "edit" && (
          <Modal
            title="Edit Investment Fields"
            onClose={() => setModal(null)}
            veryWide
          >
            <div className="flex flex-col gap-6">
              {/* Live Preview — full-width above the form so it reflects the real wide row shape */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Live Preview
                </p>
                <OfferingPreview form={form} />
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
                {/* Read-only title */}
                <Field label="Title (read-only — edit in Courses Manager)">
                  <div className="text-sm text-slate-300 bg-slate-700/50 border border-slate-600/40 rounded-lg px-4 py-2.5 cursor-not-allowed select-none">
                    {form.title}
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Group Price">
                    <input
                      className={inputCls}
                      value={form.groupPrice}
                      onChange={(e) => f("groupPrice", e.target.value)}
                      placeholder="$125"
                    />
                  </Field>
                  <Field label="Group Price Note">
                    <input
                      className={inputCls}
                      value={form.groupPriceNote ?? ""}
                      onChange={(e) => f("groupPriceNote", e.target.value)}
                      placeholder="per person"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Private Price">
                    <input
                      className={inputCls}
                      value={form.privatePrice ?? ""}
                      onChange={(e) => f("privatePrice", e.target.value)}
                      placeholder="$250"
                    />
                  </Field>
                  <Field label="Private Price Note">
                    <input
                      className={inputCls}
                      value={form.privatePriceNote ?? ""}
                      onChange={(e) => f("privatePriceNote", e.target.value)}
                      placeholder="1-on-1"
                    />
                  </Field>
                </div>
                <Field label="Duration">
                  <input
                    className={inputCls}
                    value={form.duration}
                    onChange={(e) => f("duration", e.target.value)}
                    placeholder="4 Hours • Contact us to arrange a class"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Investment CTA (Primary)">
                    <input
                      className={inputCls}
                      value={form.button1Text ?? "Contact Now"}
                      onChange={(e) => f("button1Text", e.target.value)}
                      placeholder="Contact Now"
                    />
                  </Field>
                  <Field label="Investment CTA (Secondary)">
                    <input
                      className={inputCls}
                      value={form.button2Text ?? "Group Rate"}
                      onChange={(e) => f("button2Text", e.target.value)}
                      placeholder="Group Rate"
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
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition"
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AdminShell>
  );
}

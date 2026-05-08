import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@animaapp/playground-react-sdk";
import AdminShell from "../components/AdminShell";
import {
  Modal,
  Field,
  inputCls,
  textareaCls,
  Toggle,
  DraggableChipList,
  FlashBanner,
  DeleteConfirmModal,
  StatusBadge,
  OrderInput,
} from "../components/AdminUI";
import { ICON_12 } from "@/assets";

type CourseRecord = {
  id: string;
  title: string;
  category: string;
  groupPrice: string;
  groupPriceNote?: string;
  privatePrice?: string;
  privatePriceNote?: string;
  duration: string;
  description: string;
  features: string;
  buttonText: string;
  button1Text?: string;
  button2Text?: string;
  switch?: number;
  order?: number;
};

const BLANK: Omit<CourseRecord, "id"> = {
  title: "",
  category: "First Aid",
  groupPrice: "",
  groupPriceNote: "",
  privatePrice: "",
  privatePriceNote: "",
  duration: "",
  description: "",
  features: "",
  buttonText: "Contact Us Now To Schedule",
  button1Text: "Contact Now",
  button2Text: "Group Rate",
  switch: 1,
  order: 0,
};

/** Splits a saved features string into the chips array */
function parseFeatures(raw: string): string[] {
  return raw
    ? raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

/** Serialises chips back to the comma-separated DB string */
function serializeFeatures(chips: string[]): string {
  return chips.join(",");
}

function CoursePreview({
  form,
  chips,
}: {
  form: Omit<CourseRecord, "id">;
  chips: string[];
}) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col shadow-sm">
      <h4 className="text-sky-900 text-xl font-bold leading-7 mb-4">
        {form.title || (
          <span className="text-gray-300 italic text-base font-normal">
            Course Title
          </span>
        )}
      </h4>
      {/* Private price row */}
      {form.privatePrice && (
        <div className="items-baseline flex gap-x-1 mb-3">
          <span className="text-4xl font-bold text-gray-900 font-inter leading-[40px]">
            {form.privatePrice}
          </span>
          {form.privatePriceNote && (
            <span className="text-gray-500 text-sm ml-1">
              {form.privatePriceNote}
            </span>
          )}
        </div>
      )}
      {/* Group price row */}
      <div className="items-baseline flex gap-x-1 mb-8">
        <span className="text-4xl font-bold text-gray-900 font-inter leading-[40px]">
          {form.groupPrice || (
            <span className="text-gray-300 text-2xl italic font-normal">
              $0
            </span>
          )}
        </span>
        {form.groupPriceNote && (
          <span className="text-gray-500 text-sm ml-1">
            {form.groupPriceNote}
          </span>
        )}
      </div>
      <ul className="list-none pl-0 mb-10 grow">
        {chips.length > 0 ? (
          chips.map((chip, i) => (
            <li
              key={i}
              className={`text-sm items-center flex gap-x-3 leading-5${i > 0 ? " mt-4" : ""}`}
            >
              <img
                src={ICON_12}
                alt=""
                className="h-[18px] w-[18px] shrink-0"
              />
              <span>{chip}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-300 text-xs italic">
            Features will appear here…
          </li>
        )}
      </ul>
      <div className="text-gray-500 text-sm italic bg-gray-50 border border-gray-100 leading-[22.75px] mb-6 p-4 rounded-xl">
        {form.description || (
          <span className="text-gray-300">Description appears here…</span>
        )}
      </div>
      <button className="text-sky-900 font-bold bg-slate-50 block text-center w-full px-0 py-4 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors">
        {form.buttonText || "Contact Us Now To Schedule"}
      </button>
    </div>
  );
}

export default function CoursesManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("sasstac_admin_id");

  useEffect(() => {
    if (!adminId) navigate("/admin");
  }, [adminId]);

  const { data: courses, isPending } = useQuery("Course", {
    orderBy: { order: "asc" },
  });
  const { data: dbCategories } = useQuery("CourseCategory", {
    orderBy: { order: "asc" },
  });
  const { create, update, remove, isPending: saving } = useMutation("Course");

  // Live category names from DB; fall back to legacy defaults while loading
  const categoryOptions: string[] =
    dbCategories && dbCategories.length > 0
      ? (dbCategories as any[])
          .filter((cat) => (cat.switch ?? 1) !== 0)
          .map((cat) => cat.name as string)
      : ["First Aid", "Personal Defense", "Personal Awareness"];

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState({ ...BLANK });
  const [chips, setChips] = useState<string[]>([]);
  const [editId, setEditId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CourseRecord | null>(null);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  const showFlash = (msg: string, type: "success" | "error" = "success") => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(""), 3500);
  };

  const openAdd = () => {
    setForm({ ...BLANK, category: categoryOptions[0] ?? "First Aid" });
    setChips([]);
    setModal("add");
  };

  const openEdit = (c: CourseRecord) => {
    // If the stored category no longer exists in the live list, default to the first available
    const resolvedCategory =
      categoryOptions.length > 0 && categoryOptions.includes(c.category)
        ? c.category
        : (categoryOptions[0] ?? "");
    setForm({
      title: c.title,
      category: resolvedCategory,
      groupPrice: c.groupPrice,
      groupPriceNote: c.groupPriceNote ?? "",
      privatePrice: c.privatePrice ?? "",
      privatePriceNote: c.privatePriceNote ?? "",
      duration: c.duration,
      description: c.description,
      features: c.features,
      buttonText: c.buttonText,
      button1Text: c.button1Text ?? "Contact Now",
      button2Text: c.button2Text ?? "Group Rate",
      switch: c.switch ?? 1,
      order: c.order ?? 0,
    });
    setChips(parseFeatures(c.features));
    setEditId(c.id);
    setModal("edit");
  };

  const handleSave = async (isEdit: boolean) => {
    if (!form.title.trim()) {
      showFlash("Title is required.", "error");
      return;
    }
    const data = {
      ...form,
      features: serializeFeatures(chips),
    };
    try {
      const newOrder = form.order ?? 0;
      const allSorted = [...(courses ?? [])].sort(
        (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
      );

      if (isEdit) {
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
        await update(editId, { ...data, order: newOrder });
      } else {
        const neighbours = allSorted.filter(
          (c: any) => (c.order ?? 0) >= newOrder,
        );
        for (const nb of neighbours) {
          await update(nb.id, { order: (nb.order ?? 0) + 1 });
        }
        await create({ ...data, order: newOrder });
      }

      showFlash(isEdit ? "Course updated." : "Course created.");
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
      showFlash("Course deleted.");
    } catch {
      showFlash("Delete failed.", "error");
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Courses</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage course catalog
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
            Add Course
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
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Group Price
                  </th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Private Price
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
                        <td className="px-4 py-3 hidden sm:table-cell text-xs">
                          {(() => {
                            const isStale =
                              categoryOptions.length > 0 &&
                              !categoryOptions.includes(c.category);
                            return isStale ? (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900/40 border border-red-600/40 text-red-400 font-medium"
                                title={`"${c.category}" no longer exists in Categories`}
                              >
                                <svg
                                  className="w-3 h-3 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                  />
                                </svg>
                                {c.category}
                              </span>
                            ) : (
                              <span className="text-slate-300">
                                {c.category}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-3 text-slate-300 hidden md:table-cell">
                          {c.groupPrice}
                          {c.groupPriceNote ? (
                            <span className="text-slate-500 text-xs ml-1">
                              {c.groupPriceNote}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-slate-300 hidden md:table-cell">
                          {c.privatePrice ? (
                            <>
                              {c.privatePrice}
                              {c.privatePriceNote ? (
                                <span className="text-slate-500 text-xs ml-1">
                                  {c.privatePriceNote}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge on={c.switch === 1} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
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
                            <button
                              onClick={() => setDeleteTarget(c)}
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
                {(courses ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No courses yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {(modal === "add" || modal === "edit") && (
          <Modal
            title={modal === "add" ? "Add Course" : "Edit Course"}
            onClose={() => setModal(null)}
            wide
          >
            <div className="flex gap-6">
              {/* Form */}
              <div className="flex-1 min-w-0 space-y-4">
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
                <Field label="Course Title">
                  <input
                    className={inputCls}
                    value={form.title}
                    onChange={(e) => f("title", e.target.value)}
                    placeholder="Stop The Bleed"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category">
                    <select
                      className={inputCls}
                      value={form.category}
                      onChange={(e) => f("category", e.target.value)}
                    >
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Duration">
                    <input
                      className={inputCls}
                      value={form.duration}
                      onChange={(e) => f("duration", e.target.value)}
                      placeholder="4 Hours • Next: Contact Us"
                    />
                  </Field>
                </div>
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
                <Field
                  label="Features"
                  hint="Drag rows to reorder. Type a feature and press Enter to add."
                >
                  <DraggableChipList
                    chips={chips}
                    onChange={setChips}
                    placeholder="Add a feature and press Enter…"
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    className={textareaCls}
                    value={form.description}
                    onChange={(e) => f("description", e.target.value)}
                    placeholder="Brief summary of the course…"
                  />
                </Field>
                <Field label="Button Text (Course Card)">
                  <input
                    className={inputCls}
                    value={form.buttonText}
                    onChange={(e) => f("buttonText", e.target.value)}
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
                    onClick={() => handleSave(modal === "edit")}
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white text-sm font-semibold transition"
                  >
                    {saving
                      ? "Saving…"
                      : modal === "edit"
                        ? "Save Course"
                        : "Add Course"}
                  </button>
                </div>
              </div>
              {/* Live Preview */}
              <div className="w-64 shrink-0 hidden lg:block">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Live Preview
                </p>
                <CoursePreview form={form} chips={chips} />
              </div>
            </div>
          </Modal>
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            name={deleteTarget.title}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            loading={saving}
          />
        )}
      </div>
    </AdminShell>
  );
}

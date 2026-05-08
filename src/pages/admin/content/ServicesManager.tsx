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
  ChipInput,
  ImagePicker,
  FlashBanner,
  DeleteConfirmModal,
  StatusBadge,
  OrderInput,
} from "../components/AdminUI";
import {
  ICON_6,
  ICON_7,
  ICON_8,
  ICON_9,
  ICON_10,
  ICON_11,
  ICON_12,
  ICON_14,
  ICON_15,
  SERVICE_IMG_FIRST_AID,
  SERVICE_IMG_AWARENESS,
  SERVICE_IMG_PROTECTION,
  SERVICE_IMG_TOLR,
} from "@/assets";

// Maps stored asset-key strings → real URLs so the preview renders correctly
const ASSET_MAP: Record<string, string> = {
  ICON_6,
  ICON_7,
  ICON_8,
  ICON_9,
  ICON_10,
  ICON_11,
  ICON_12,
  ICON_14,
  ICON_15,
  SERVICE_IMG_FIRST_AID,
  SERVICE_IMG_AWARENESS,
  SERVICE_IMG_PROTECTION,
  SERVICE_IMG_TOLR,
};
const resolveAsset = (val: string) => ASSET_MAP[val] ?? val;

type ServiceRecord = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
  cardImageSrc: string;
  cardImageAlt: string;
  listItems: string;
  switch?: number;
  order?: number;
};

const BLANK: Omit<ServiceRecord, "id"> = {
  title: "",
  description: "",
  iconSrc: "",
  cardImageSrc: "",
  cardImageAlt: "",
  listItems: "",
  switch: 1,
  order: 0,
};

function ServicePreview({
  form,
  chips,
}: {
  form: Omit<ServiceRecord, "id">;
  chips: string[];
}) {
  return (
    <div className="flex flex-col">
      {/* Content card — mirrors ServiceCard exactly: bg-slate-50 p-8 rounded-3xl */}
      <div className="bg-slate-50 border border-gray-100 p-8 rounded-3xl h-full">
        {/* Icon box — h-16 w-16 rounded-2xl, inner img h-8 w-8 */}
        <div className="items-center bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] flex h-16 justify-center w-16 mb-6 rounded-2xl">
          {form.iconSrc ? (
            <img
              src={resolveAsset(form.iconSrc)}
              alt="icon"
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-8 w-8 rounded bg-slate-200" />
          )}
        </div>
        {/* Title — text-2xl font-bold leading-8 */}
        <h3 className="text-2xl font-bold leading-8 mb-4 font-inter">
          {form.title || (
            <span className="text-gray-300 italic text-base font-normal">
              Service Title
            </span>
          )}
        </h3>
        {/* Description — leading-[26px] */}
        <p className="text-gray-500 leading-[26px] mb-6">
          {form.description || (
            <span className="italic text-gray-300">Description…</span>
          )}
        </p>
        {/* List items — text-sm font-medium, mt-3 between items, amber dot */}
        <ul className="list-none pl-0 mb-8">
          {chips.length > 0 ? (
            chips.map((item, i) => (
              <li
                key={i}
                className={`text-sm font-medium items-center flex gap-x-2 leading-5${i > 0 ? " mt-3" : ""}`}
              >
                <div className="bg-amber-600 h-1.5 w-1.5 rounded-full shrink-0" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-300 text-xs italic">
              List items appear here…
            </li>
          )}
        </ul>
        {/* "Learn More" CTA */}
        <div className="items-center flex gap-x-2 text-sky-900 font-bold">
          <span>Learn More</span>
          <img src={ICON_7} alt="" className="h-[18px] w-[18px]" />
        </div>
      </div>
      {/* Card image — mt-6 rounded-3xl, full-width, no height cap */}
      {form.cardImageSrc ? (
        <div className="shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.1)_0px_4px_6px_-4px] overflow-hidden mt-6 rounded-3xl">
          <img
            src={form.cardImageSrc}
            alt={form.cardImageAlt || "preview"}
            className="w-full object-cover"
          />
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-slate-700/30 border border-slate-600/30 h-36 flex items-center justify-center">
          <span className="text-slate-500 text-xs italic">
            Card image appears here
          </span>
        </div>
      )}
    </div>
  );
}

export default function ServicesManager() {
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("sasstac_admin_id");

  useEffect(() => {
    if (!adminId) navigate("/admin");
  }, [adminId]);

  const { data: services, isPending } = useQuery("Service", {
    orderBy: { order: "asc" },
  });
  const { create, update, remove, isPending: saving } = useMutation("Service");

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState({ ...BLANK });
  const [chips, setChips] = useState<string[]>([]);
  const [editId, setEditId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ServiceRecord | null>(null);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  const showFlash = (msg: string, type: "success" | "error" = "success") => {
    setFlash(msg);
    setFlashType(type);
    setTimeout(() => setFlash(""), 3500);
  };

  const openAdd = () => {
    setForm({ ...BLANK });
    setChips([]);
    setModal("add");
  };
  const openEdit = (s: ServiceRecord) => {
    setForm({
      title: s.title,
      description: s.description,
      iconSrc: s.iconSrc,
      cardImageSrc: s.cardImageSrc,
      cardImageAlt: s.cardImageAlt,
      listItems: s.listItems,
      switch: s.switch ?? 1,
      order: s.order ?? 0,
    });
    const parseListItems = (raw: string): string[] => {
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed))
          return parsed.map((x: any) => String(x).trim()).filter(Boolean);
      } catch {}
      // fallback: strip any leading [ and trailing ] then split by comma
      return raw
        .replace(/^\[/, "")
        .replace(/\]$/, "")
        .split(",")
        .map((x) => x.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    };
    setChips(parseListItems(s.listItems));
    setEditId(s.id);
    setModal("edit");
  };

  const handleSave = async (isEdit: boolean) => {
    if (!form.title.trim()) {
      showFlash("Title is required.", "error");
      return;
    }
    const data = { ...form, listItems: chips.join(", ") };
    try {
      const newOrder = form.order ?? 0;
      const allSorted = [...(services ?? [])].sort(
        (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
      );

      if (isEdit) {
        const oldOrder =
          allSorted.find((s: any) => s.id === editId)?.order ?? newOrder;

        if (oldOrder !== newOrder) {
          const movingDown = newOrder < oldOrder;
          const neighbours = allSorted.filter((s: any) => {
            if (s.id === editId) return false;
            const o = s.order ?? 0;
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
          (s: any) => (s.order ?? 0) >= newOrder,
        );
        for (const nb of neighbours) {
          await update(nb.id, { order: (nb.order ?? 0) + 1 });
        }
        await create({ ...data, order: newOrder });
      }

      showFlash(isEdit ? "Service updated." : "Service created.");
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
      showFlash("Service deleted.");
    } catch {
      showFlash("Delete failed.", "error");
    }
  };

  const handleSwap = async (idA: string, idB: string) => {
    const sorted = [...(services ?? [])].sort(
      (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
    );
    const recA = sorted.find((s: any) => s.id === idA);
    const recB = sorted.find((s: any) => s.id === idB);
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
            <h2 className="text-2xl font-bold text-white">Services</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage service categories
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
            Add Service
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
                    Description
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const sorted = [...(services ?? [])].sort(
                    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0),
                  );
                  return sorted.map((s: any, idx: number) => {
                    const prev = sorted[idx - 1] as any | undefined;
                    const next = sorted[idx + 1] as any | undefined;
                    return (
                      <tr
                        key={s.id}
                        className="border-b border-slate-700/50 hover:bg-slate-700/20 transition"
                      >
                        <td className="px-3 py-3 text-center">
                          <div className="flex flex-row items-center justify-center gap-1.5">
                            <span className="text-slate-300 font-mono text-xs tabular-nums w-5 text-right">
                              {s.order ?? 0}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={!prev || saving}
                                onClick={() =>
                                  prev && handleSwap(s.id, prev.id)
                                }
                                title="Move up"
                                className="text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed leading-none p-0.5 rounded transition hover:bg-slate-700"
                              >
                                ▲
                              </button>
                              <button
                                disabled={!next || saving}
                                onClick={() =>
                                  next && handleSwap(s.id, next.id)
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
                          {s.title}
                        </td>
                        <td className="px-4 py-3 text-slate-400 hidden sm:table-cell text-xs truncate max-w-xs">
                          {s.description?.substring(0, 80)}
                          {s.description?.length > 80 ? "…" : ""}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge on={s.switch === 1} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(s)}
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
                              onClick={() => setDeleteTarget(s)}
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
                {(services ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No services yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {(modal === "add" || modal === "edit") && (
          <Modal
            title={modal === "add" ? "Add Service" : "Edit Service"}
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
                <Field label="Title">
                  <input
                    className={inputCls}
                    value={form.title}
                    onChange={(e) => f("title", e.target.value)}
                    placeholder="Personal Protection Training"
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    className={textareaCls}
                    value={form.description}
                    onChange={(e) => f("description", e.target.value)}
                  />
                </Field>
                <ImagePicker
                  label="Card Image"
                  value={form.cardImageSrc}
                  onChange={(v) => f("cardImageSrc", v)}
                />
                <Field label="Card Image Alt Text">
                  <input
                    className={inputCls}
                    value={form.cardImageAlt}
                    onChange={(e) => f("cardImageAlt", e.target.value)}
                  />
                </Field>
                <Field label="Icon URL">
                  <input
                    className={inputCls}
                    value={form.iconSrc}
                    onChange={(e) => f("iconSrc", e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
                <Field label="List Items" hint="Press Enter after each item">
                  <ChipInput
                    chips={chips}
                    onChange={setChips}
                    placeholder="Add a list item…"
                  />
                </Field>
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
                        ? "Save Service"
                        : "Add Service"}
                  </button>
                </div>
              </div>
              {/* Live Preview — card is ~1/3 grid column on site; w-64 reflects that portrait proportion */}
              <div className="w-64 shrink-0 hidden lg:block">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Live Preview
                </p>
                <ServicePreview form={form} chips={chips} />
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

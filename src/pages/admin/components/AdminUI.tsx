import React, { useState, useRef } from "react";

export function Modal({
  title,
  onClose,
  children,
  wide = false,
  veryWide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
  veryWide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full ${veryWide ? "max-w-5xl" : wide ? "max-w-3xl" : "max-w-lg"} my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full px-3 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition text-sm";
export const textareaCls = inputCls + " resize-y min-h-[80px]";

export function Toggle({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}) {
  const on = value === 1;
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(on ? 0 : 1)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${on ? "bg-amber-600" : "bg-slate-600"}`}
        role="switch"
        aria-checked={on}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
      {label && (
        <span className="text-sm text-slate-300">
          {label}:{" "}
          <span className={on ? "text-green-400" : "text-slate-500"}>
            {on ? "Visible" : "Hidden"}
          </span>
        </span>
      )}
    </div>
  );
}

export function ChipInput({
  chips,
  onChange,
  placeholder = "Type and press Enter…",
}: {
  chips: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const addChip = () => {
    const val = input.trim();
    if (val && !chips.includes(val)) onChange([...chips, val]);
    setInput("");
  };
  const removeChip = (idx: number) =>
    onChange(chips.filter((_, i) => i !== idx));
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip();
    } else if (e.key === "Backspace" && !input && chips.length > 0)
      onChange(chips.slice(0, -1));
  };
  return (
    <div
      className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-700 border border-slate-600 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition min-h-[44px] cursor-text"
      onClick={() => ref.current?.focus()}
    >
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-600/20 border border-amber-700/50 text-amber-300 text-xs font-medium"
        >
          {chip}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeChip(i);
            }}
            className="text-amber-400 hover:text-white transition ml-0.5"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={addChip}
        placeholder={chips.length === 0 ? placeholder : ""}
        className="bg-transparent text-white text-sm placeholder-slate-400 focus:outline-none flex-1 min-w-[120px] py-0.5 px-1"
      />
    </div>
  );
}

export function DraggableChipList({
  chips,
  onChange,
  placeholder = "Add a feature…",
}: {
  chips: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const dragIdx = useRef<number | null>(null);

  const addChip = () => {
    const val = input.trim();
    if (val) onChange([...chips, val]);
    setInput("");
  };

  const removeChip = (idx: number) =>
    onChange(chips.filter((_, i) => i !== idx));

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip();
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    dragIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragIdx.current === null || dragIdx.current === idx) return;
    const reordered = [...chips];
    const [moved] = reordered.splice(dragIdx.current, 1);
    reordered.splice(idx, 0, moved);
    dragIdx.current = idx;
    onChange(reordered);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragIdx.current = null;
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
  };

  return (
    <div className="space-y-1">
      {chips.length === 0 && (
        <p className="text-xs text-slate-500 italic px-1 py-1">
          No features yet — add one below.
        </p>
      )}
      {chips.map((chip, i) => (
        <div
          key={`${chip}-${i}`}
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-700 border border-slate-600 hover:border-amber-600/50 cursor-grab active:cursor-grabbing active:opacity-60 group select-none transition"
        >
          {/* Grip handle */}
          <span
            className="text-slate-500 group-hover:text-slate-300 transition text-base leading-none shrink-0"
            title="Drag to reorder"
          >
            ⠿
          </span>
          <span className="flex-1 text-sm text-white truncate">{chip}</span>
          <button
            type="button"
            onClick={() => removeChip(i)}
            className="text-slate-500 hover:text-red-400 transition shrink-0 p-0.5 rounded"
            title="Remove"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      {/* Add row */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition text-sm"
        />
        <button
          type="button"
          onClick={addChip}
          className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition shrink-0"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export function ImagePicker({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [sizeWarning, setSizeWarning] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSizeWarning("");
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSizeWarning(
        "Large image — consider resizing before upload for best performance.",
      );
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onChange(dataUrl);
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="flex gap-3 items-start">
        <div className="w-24 h-20 rounded-lg bg-slate-700 border border-slate-600 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-8 h-8 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="img-upload"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-sm text-slate-300 hover:text-white transition disabled:opacity-50"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            {uploading ? "Processing…" : "Upload Image"}
          </button>
          <p className="text-xs text-slate-500 mt-1.5">
            Or paste an image URL below:
          </p>
          <input
            type="text"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className={inputCls + " mt-1"}
          />
          {value.startsWith("data:") && (
            <p className="text-xs text-green-400 mt-1">
              ✓ Image loaded — will be saved with the record.
            </p>
          )}
          {sizeWarning && (
            <p className="text-xs text-amber-400 mt-1">⚠ {sizeWarning}</p>
          )}
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export function OrderInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 hover:text-white flex items-center justify-center transition text-sm"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 text-center px-2 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 hover:text-white flex items-center justify-center transition text-sm"
      >
        +
      </button>
    </div>
  );
}

export function StatusBadge({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${on ? "bg-green-900/40 text-green-300 border-green-700/60" : "bg-slate-700 text-slate-400 border-slate-600"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${on ? "bg-green-400" : "bg-slate-500"}`}
      />
      {on ? "Visible" : "Hidden"}
    </span>
  );
}

export function FlashBanner({
  msg,
  type = "success",
}: {
  msg: string;
  type?: "success" | "error";
}) {
  if (!msg) return null;
  const cls =
    type === "success"
      ? "bg-green-900/40 border-green-700 text-green-300"
      : "bg-red-900/40 border-red-700 text-red-300";
  const icon =
    type === "success" ? (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    );
  return (
    <div
      className={`flex items-center gap-2 border rounded-lg px-4 py-3 text-sm mb-4 ${cls}`}
    >
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        {icon}
      </svg>
      {msg}
    </div>
  );
}

export function DeleteConfirmModal({
  name,
  onCancel,
  onConfirm,
  loading,
}: {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p className="text-slate-300 text-sm mb-6">
        Are you sure you want to delete{" "}
        <span className="text-white font-semibold">{name}</span>? This cannot be
        undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition border border-slate-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold transition"
        >
          {loading ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </Modal>
  );
}

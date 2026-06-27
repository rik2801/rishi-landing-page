"use client";

import { useEffect, useState } from "react";

export const PALETTES = [
  {
    id: "default",
    bg: "#ffffff",
    fg: "#000000",
    muted: "#6b6b6b",
    border: "#e0e0e0",
    swatch: ["#ffffff", "#000000"],
  },
  {
    id: "midnight",
    bg: "#111111",
    fg: "#e8e8e6",
    muted: "#8a8a8a",
    border: "#2a2a2a",
    swatch: ["#111111", "#e8e8e6"],
  },
] as const;

const STORAGE_PALETTE = "palette";
const STORAGE_CUSTOM = "paletteCustom";
export const CUSTOM_PALETTE_ID = "custom" as const;

export function productEvolutionCardTextColor(bg: string): string {
  const hex = bg.replace(/^#/, "").toLowerCase();
  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (expanded === "ffffff") return "#111111";
  return bg.startsWith("#") ? bg : `#${bg}`;
}

function applyProductEvolutionCardText(bg: string) {
  document.documentElement.style.setProperty(
    "--product-evolution-card-text",
    productEvolutionCardTextColor(bg),
  );
}

function applyColors(bg: string, fg: string) {
  const s = document.documentElement.style;
  s.setProperty("--bg", bg);
  s.setProperty("--fg", fg);
  s.setProperty("--fg-muted", fg + "80");
  s.setProperty("--border-color", fg + "20");
  applyProductEvolutionCardText(bg);
}

function applyPalette(id: string) {
  const palette = PALETTES.find((p) => p.id === id) ?? PALETTES[0];
  const s = document.documentElement.style;
  s.setProperty("--bg", palette.bg);
  s.setProperty("--fg", palette.fg);
  s.setProperty("--fg-muted", palette.muted);
  s.setProperty("--border-color", palette.border);
  applyProductEvolutionCardText(palette.bg);
}

/** Ring around editable swatches: black on light BG, white on dark BG (e.g. black). */
function editableSwatchRingColor(backgroundHex: string): "#000000" | "#ffffff" {
  const hex = backgroundHex.replace(/^#/, "");
  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (expanded.length !== 6) return "#000000";
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.4 ? "#ffffff" : "#000000";
}

type PickerSession = { bg: string; fg: string; activeId: string };

export function PaletteSwitcher() {
  const [active, setActive] = useState("default");
  const [liveBg, setLiveBg] = useState("#ffffff");
  const [liveFg, setLiveFg] = useState("#000000");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSession, setPickerSession] = useState<PickerSession | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let resolved = localStorage.getItem(STORAGE_PALETTE) || "default";
    if (resolved === CUSTOM_PALETTE_ID) {
      try {
        const raw = localStorage.getItem(STORAGE_CUSTOM);
        if (raw) {
          const c = JSON.parse(raw) as { bg?: string; fg?: string };
          if (c.bg && c.fg) {
            setActive(CUSTOM_PALETTE_ID);
            setLiveBg(c.bg);
            setLiveFg(c.fg);
            applyColors(c.bg, c.fg);
            setMounted(true);
            return;
          }
        }
      } catch {
        /* invalid stored custom */
      }
      localStorage.removeItem(STORAGE_CUSTOM);
      localStorage.setItem(STORAGE_PALETTE, "default");
      resolved = "default";
    }
    if (!PALETTES.some((pl) => pl.id === resolved)) {
      localStorage.setItem(STORAGE_PALETTE, "default");
      resolved = "default";
    }
    setActive(resolved);
    const p = PALETTES.find((pl) => pl.id === resolved) ?? PALETTES[0];
    setLiveBg(p.bg);
    setLiveFg(p.fg);
    applyPalette(resolved);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="palette-switcher-placeholder" />;
  }

  function select(id: string) {
    setActive(id);
    setPickerOpen(false);
    setPickerSession(null);
    applyPalette(id);
    localStorage.setItem(STORAGE_PALETTE, id);
    localStorage.removeItem(STORAGE_CUSTOM);
    const p = PALETTES.find((pl) => pl.id === id) ?? PALETTES[0];
    setLiveBg(p.bg);
    setLiveFg(p.fg);
  }

  function togglePicker() {
    if (pickerOpen) {
      setPickerOpen(false);
      setPickerSession(null);
      return;
    }
    setPickerSession({ bg: liveBg, fg: liveFg, activeId: active });
    setPickerOpen(true);
  }

  function saveCustom() {
    const payload = JSON.stringify({ bg: liveBg, fg: liveFg });
    localStorage.setItem(STORAGE_PALETTE, CUSTOM_PALETTE_ID);
    localStorage.setItem(STORAGE_CUSTOM, payload);
    applyColors(liveBg, liveFg);
    setActive(CUSTOM_PALETTE_ID);
    setPickerOpen(false);
    setPickerSession(null);
  }

  function cancelEdit() {
    if (pickerSession) {
      const { bg, fg, activeId } = pickerSession;
      setLiveBg(bg);
      setLiveFg(fg);
      if (activeId === CUSTOM_PALETTE_ID) {
        applyColors(bg, fg);
      } else {
        applyPalette(activeId);
      }
      setActive(activeId);
    }
    setPickerOpen(false);
    setPickerSession(null);
  }

  function onBgChange(val: string) {
    setLiveBg(val);
    setLiveFg((fg) => {
      applyColors(val, fg);
      return fg;
    });
  }

  function onFgChange(val: string) {
    setLiveFg(val);
    setLiveBg((bg) => {
      applyColors(bg, val);
      return bg;
    });
  }

  const editRing = editableSwatchRingColor(liveBg);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="palette-switcher">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            onClick={() => select(p.id)}
            aria-label={`${p.id} palette`}
            className="palette-swatch"
            style={{
              background: `linear-gradient(135deg, ${p.swatch[0]} 0%, ${p.swatch[1]} 100%)`,
              boxShadow:
                active === p.id
                  ? "inset 0 0 0 1px rgba(128,128,128,0.2), 0 0 0 2px var(--bg), 0 0 0 3.5px var(--fg)"
                  : "inset 0 0 0 1px rgba(128,128,128,0.2)",
            }}
          />
        ))}

        <button
          onClick={togglePicker}
          aria-label="Toggle color picker"
          className="palette-swatch"
          style={{
            background: "none",
            border: "1.5px dashed var(--fg)",
            opacity: pickerOpen || active === CUSTOM_PALETTE_ID ? 1 : 0.4,
            fontSize: 12,
            lineHeight: "18px",
            textAlign: "center",
            color: "var(--fg)",
            boxShadow:
              active === CUSTOM_PALETTE_ID && !pickerOpen
                ? "inset 0 0 0 1px rgba(128,128,128,0.2), 0 0 0 2px var(--bg), 0 0 0 3.5px var(--fg)"
                : undefined,
          }}
        >
          ✎
        </button>
      </div>

      <div
        className={`color-picker-expand${pickerOpen ? " color-picker-expand--open" : ""}`}
        aria-hidden={!pickerOpen}
        {...(!pickerOpen ? { inert: true as const } : {})}
      >
        <div className="color-picker-expand-inner">
          <div className="color-picker-row">
            <label className="color-picker-label">
              <input
                type="color"
                value={liveBg}
                onChange={(e) => onBgChange(e.target.value)}
                className="color-picker-input color-picker-input--edit"
                style={{ boxShadow: `0 0 0 2px ${editRing}` }}
              />
              <span className="color-picker-hex">{liveBg.toUpperCase()}</span>
              <span className="color-picker-tag">BG</span>
            </label>
            <label className="color-picker-label">
              <input
                type="color"
                value={liveFg}
                onChange={(e) => onFgChange(e.target.value)}
                className="color-picker-input color-picker-input--edit"
                style={{ boxShadow: `0 0 0 2px ${editRing}` }}
              />
              <span className="color-picker-hex">{liveFg.toUpperCase()}</span>
              <span className="color-picker-tag">FG</span>
            </label>
            <div className="color-picker-actions">
              <button
                type="button"
                className="color-picker-action-btn"
                onClick={saveCustom}
                aria-label="Save custom colors"
                title="Save"
              >
                ✓
              </button>
              <button
                type="button"
                className="color-picker-action-btn"
                onClick={cancelEdit}
                aria-label="Cancel editing"
                title="Cancel — undo changes this session"
              >
                ✕
              </button>
              <button
                type="button"
                className="color-picker-action-btn"
                onClick={() => select("default")}
                aria-label="Reset to site default colors"
                title="Reset to default (white & black) — clears saved custom palette"
              >
                ↺
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

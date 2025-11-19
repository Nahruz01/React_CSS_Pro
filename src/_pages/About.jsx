// src/_pages/About.jsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../_styles/About.css";

import CustomLink from "../_component/CustomLink";
import { Route } from "react-router-dom";

export default function About() {
  const { t } = useTranslation();

  // Basic state just for typing input (no logic)
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [lines, setLines] = useState(["", "", "", ""]);

  const tagOptions = ["wisdom", "love", "spiritual", "humor"];

  return (
    <div className="pantun-container">
      <h3>{t("Pantun Pen (UI Only)")}</h3>

      {/* Page Layout */}
      <div className="pantun-layout">

        {/* LEFT SIDE (80%) */}
        <div className="center-card">
          <h2>{t("Pantun Submission")}</h2>

          {/* Title */}
          <input
            type="text"
            placeholder={t("title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Tag Select */}
          <select value={tags} onChange={(e) => setTags(e.target.value)}>
            <option value="">{t("select_tag")}</option>
            {tagOptions.map((key) => (
              <option key={key} value={key}>{t(key)}</option>
            ))}
          </select>

          {/* Lines */}
          {lines.map((line, i) => (
            <input
              key={i}
              type="text"
              placeholder={`${t("line")} ${i + 1}`}
              value={line}
              onChange={(e) => {
                const copy = [...lines];
                copy[i] = e.target.value;
                setLines(copy);
              }}
            />
          ))}

          {/* Fake Button */}
          <button className="submit-button" onClick={() => alert("UI Only — No Function")}>
            {t("Rate")}
          </button>

          {/* Preview Card */}
          <div className="preview-card">
            <h3>{title || t("Pantun Preview")}</h3>
            <p>{tags ? t(tags) : t("tags preview")}</p>

            {lines.map((line, i) => (
              <p key={i}>{line || t("line preview", { number: i + 1 })}</p>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (20%) */}
        <div className="sidebar-card">
          <nav className="nav">
            <ul>
              <CustomLink to="/PantunPen/Rater">Rater</CustomLink>
              <CustomLink to="/PantunPen/Rhymer">Rhymer</CustomLink>
              <CustomLink to="/PantunPen/Class">Class</CustomLink>
            </ul>
          </nav>


          <h3>{t("pantun_rules")}</h3>
          <p>Stanza: —</p>
          <p>Rhyme: —</p>
          <p>Moral: —</p>

          <hr />

          <p>Syllable Count:</p>
          <p>Line 1: —</p>
          <p>Line 2: —</p>
          <p>Line 3: —</p>
          <p>Line 4: —</p>

          <h3>{t("Pantun Rating")}</h3>
          <p>{t("Rating")}: ☆☆☆☆☆</p>
          <p>Score: —</p>
        </div>
      </div>
    </div>
  );
}

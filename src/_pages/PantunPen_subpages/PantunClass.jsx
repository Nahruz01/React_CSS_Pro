import { useState } from "react";
import "../../_styles/PantunClass.css";

const peluasaanCiriPantun = [
  "- Skima rima di tengah dan/ atau di hujung baris adalah berjajar berselangan: ab;ab, dan ada juga aa;aa.",
  "- Struktur pantun ada dua unit: pembayang (kiasan) dan maksud (inti persoalan).",
  "- Pembayang berkisar tentang gambaran alam dan maksud berkisar tentang sifat/sikap manusia.",
  "- Setiap rangkap memiliki kesatuan idea.",
  "- Diksi merujuk kepada lambang yang sesuai dengan norma, nilai dan tanggapan masyarakat setempat.",
  "- Pantun yang baik mempunyai hubungan atau tautan idea dan wacana antara unit pembayang dan unit maksud."
];

export default function PantunRhymer() {
  const [open, setOpen] = useState(true);

  return (
    <div className="PantunClass_Card">
      <button
        className="PantunClass_Header"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        <div>
          <h2>Konsep Pantun</h2>
          <p className="PantunClass_Subtitle">
            Asas, struktur dan ciri utama pantun Melayu
          </p>
        </div>
        <span className={`Chevron ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="PantunClass_Content">
          <p className="PantunClass_Intro">
            <strong>Pantun</strong> ialah sejenis puisi Melayu tradisional yang
            menyampaikan pelbagai perasaan.
          </p>

          <section className="PantunClass_Section">
            <h3>Asas Penulisan Pantun</h3>
            <ul className="PantunClass_List">
              <li>Pemilihan kata (diksi)</li>
              <li>Pemendekan ayat</li>
              <li>Pembatasan suku kata (8–12)</li>
              <li>Pemerihalan alam sekeliling (pembayang)</li>
              <li>Penyataan maksud secara santun</li>
            </ul>
          </section>

          <section className="PantunClass_Section">
            <h3>Peluasaan Ciri Pantun</h3>
            <ul className="PantunClass_List Emphasis">
              {peluasaanCiriPantun.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <footer className="PantunClass_Footer">
            <span>Sumber rujukan:</span>
            <a
              href="https://pantun.melaka.gov.my/kaedah-penulisan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gerbang Pantun Melaka
            </a>
          </footer>
        </div>
      )}
    </div>
  );
}


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
  return (
  <div className="ClassFrame">
    <h2>Konsep Pantun</h2>

    <p><strong>Pantun</strong> ialah sejenis puisi Melayu tradisional yang menyampaikan pelbagai perasaan.</p>

    <div className="GuideFrame">
    <ul>
      <li>- Pemilihan kata (diksi)</li>
      <li>- Pemendekan ayat</li>
      <li>- Pembatasan suku kata (8-12)</li>
      <li>- Pemerihalan alam sekeliling (pembayang)</li>
      <li>- Penyataan maksud secara santun</li>
    </ul>
    </div>

    
    <h2>Peluasaan Ciri Pantun</h2>
    <div className="GuideFrame">
    <ul className="PantunFeatures">
      {peluasaanCiriPantun.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    </div>
    <p>
      Sumber rujukan penuh:
      <a href="https://pantun.melaka.gov.my/kaedah-penulisan" target="_blank" rel="noopener noreferrer">
        Gerbang Pantun Melaka
      </a>
    </p>
  </div>

  );
}
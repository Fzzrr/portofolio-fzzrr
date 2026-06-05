# Portfolio Website — Panduan Project

Website portofolio programmer. Tujuan utama: tampil **profesional, minimalis, cepat, dan accessible**. Biarkan karya bicara sendiri.

## Tech Stack

- **Next.js** dengan **App Router** (`app/` directory)
- **TypeScript** (mode strict — selalu definisikan tipe untuk props & data)
- **Tailwind CSS** (tidak ada file CSS terpisah kecuali diminta)
- **Framer Motion** untuk animasi (hanya jika sudah terinstall)

## Perintah

Sesuaikan dengan package manager yang dipakai (npm / pnpm / yarn / bun):

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`

**Sebelum menganggap tugas selesai, jalankan lint dan type check, lalu perbaiki errornya.**

## Struktur Direktori

```
app/                  # Routes (App Router)
  layout.tsx          # Root layout, metadata, font, tema
  page.tsx            # Halaman utama
components/           # Komponen reusable (PascalCase)
  ui/                 # Komponen UI kecil (Button, Badge, dst)
  sections/           # Section halaman (Hero, About, Projects, dst)
lib/                  # Helper, util, data statis
public/               # Aset statis (gambar, ikon)
types/                # Tipe TypeScript bersama
```

## Konvensi Kode

- **Komponen**: functional component + React hooks. Tulis `interface` untuk props di atas komponen, gunakan destructuring pada parameter, `export default` di bawah.
- **Gambar**: selalu `next/image`, jangan `<img>`.
- **Navigasi internal**: selalu `next/link`, jangan `<a>`.
- **Styling**: Tailwind class saja, hindari inline style.
- **Penamaan**: komponen `PascalCase`, util/hook `camelCase`, folder `kebab-case`.
- **Komentar**: tambahkan komentar singkat hanya jika komponen tidak self-explanatory.

Pola komponen:

```tsx
interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
}

// Kartu project untuk section Portfolio
export default function ProjectCard({
  title,
  description,
  techStack,
  liveUrl,
  repoUrl,
}: ProjectCardProps) {
  // ...
}
```

## Prinsip Desain

- **Minimalis tapi berkesan** — hindari clutter.
- **Dark mode by default** — desain utama dark, light sebagai alternatif lewat `dark:` variant Tailwind.
- **Mobile-first** — mulai dari base, tambahkan `sm:`, `md:`, `lg:` bertahap.
- **Tipografi bersih** — heading besar & bold, body readable, `font-mono` untuk kode/nama teknologi.
- **Satu warna aksen** yang dipakai konsisten (mis. `indigo`, `violet`, atau `emerald`).

## Section Portofolio

Prioritaskan komponen ini saat membuat halaman/section:

- **Hero** — nama, tagline singkat, CTA (kontak / lihat project)
- **About** — foto, bio singkat, filosofi sebagai developer
- **Skills** — badge/icon, dikelompokkan (Frontend, Backend, Tools)
- **Projects** — kartu: judul, deskripsi, tech stack, link repo & live demo
- **Experience** — timeline/list riwayat kerja & pendidikan
- **Contact** — email, GitHub, LinkedIn, form kontak (opsional)

## Animasi & Interaksi

- Pakai Tailwind `transition`, `hover:`, `focus:` untuk interaksi ringan.
- Scroll reveal: pakai class `animate-` atau Framer Motion (jika terinstall).
- Animasi mendukung UX, jangan berlebihan.
- Semua tombol & link wajib punya state `hover` dan `focus-visible` yang jelas.

## Aksesibilitas

- Selalu isi `alt` pada gambar.
- Pakai semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Tambahkan `aria-label` pada button icon-only.
- Kontras warna minimal WCAG AA.

## Performa

- Manfaatkan optimisasi Next.js Image untuk semua gambar.
- `dynamic import` untuk komponen besar/berat.
- Hindari inline style; gunakan Tailwind class.

## Jangan

- Jangan pakai `<img>` atau `<a>` untuk aset/navigasi internal.
- Jangan buat file CSS terpisah kecuali diminta.
- Jangan inline style.
- Jangan tambah dependensi besar tanpa alasan jelas.
# Spesifikasi Implementasi UI Voxera Interactive Services

Dokumen ini berisi panduan lengkap untuk mengimplementasikan antarmuka layanan interaktif Voxera berdasarkan desain yang telah disetujui.

## 1. Konsep Utama
Antarmuka menggunakan pola **Single Page Interactive App** di mana konten utama berubah secara dinamis berdasarkan tab layanan yang dipilih tanpa memuat ulang halaman (re-rendering DOM atau state-based visibility).

## 2. Sistem Desain (Voxera Corporate Core)
- **Warna Utama:** `#0047bb` (Corporate Blue) untuk tombol primer dan status aktif.
- **Warna Latar:** Surface `#f7f9fb`, Container `#ffffff`.
- **Tipografi:** Font Sans-serif (Inter/Roboto).
  - Headings: Bold, Navy (#001a41).
  - Body: Regular, Gray-700.
- **Komponen UI:** 
  - Border Radius: 4px (Round Four).
  - Shadow: Soft elevation pada container aktif.

## 3. Struktur Komponen

### A. Navigation Bar (TopAppBar)
- **Logo:** "Voxera" (Bold, Primary Color).
- **Menu Navigasi:** Home, About Us, Services (Active), Contact Us.
- **Actions:** Button "Client Portal" (Outline) dan "Contact Us" (Filled).

### B. Dynamic Service Tabs
Sistem navigasi horizontal dengan 5 opsi. Setiap tab memiliki:
1. **Icon:** Representasi visual layanan.
2. **Label:** Judul Layanan (misal: "Validation").
3. **Sub-label:** Deskripsi singkat fungsionalitas.
4. **Active State:** Border biru tebal, teks bold, background sedikit lebih terang.

### C. Konten Dinamis (Service Panels)

#### 1. Panel: Document Validation Service
- **Input:** Dua slot upload file ("Upload Document 1" & "2").
- **Options:** Checkbox "My document is a scanned image".
- **Feedback:** Real-time word count display.
- **CTA:** Tombol "Validate Now" (Full Width).

#### 2. Panel: Document Generation Service
- **Input:** Textarea besar untuk "Document Description (Prompt)".
- **Placeholder:** Contoh perintah seperti "Create a simple employment contract...".
- **CTA:** Tombol "Generate Document".

#### 3. Panel: Document Translation Service
- **Dropdowns:** "From Language" dan "To Language".
- **Upload:** Slot file utama dan "Context File" (Opsional).
- **CTA:** Tombol "Translate Now".

#### 4. Panel: Sworn Translation Request
- **Dropdowns:** Pemilihan bahasa legal.
- **Cost Calculator:** Tombol "Calculate Estimated Cost".
- **Summary:** Menampilkan "Total Pages", "Est. Completion", dan "Total Cost".
- **Options:** Checkbox "Hard Copy Shipping".
- **CTA:** Tombol "Submit Request".

#### 5. Panel: Interpreter Services
- **Info Box:** Penjelasan "Simultaneous" vs "Consecutive" interpretation.
- **Form:** 
  - Required Language (Dropdown).
  - Start Date / Event Date (Date Picker).
  - Duration (Text Input).
- **CTA:** Tombol hijau "Contact Our Team via WhatsApp".

### D. Footer (Corporate Identity)
- **Info Perusahaan:** VOXERA - Smart Language & Document Solutions.
- **Quick Links:** Home, About Us, Services, Contact Us.
- **Address (PT PéMad):**
  PT PéMad International Transearch
  Ruko Trimukti Square, Jl. Kaliurang Km. 10
  Telp: (0274) 7377040
  Jam Operasional: Buka hingga 16.00 WIB.

## 4. Logika Interaksi (Logic Prompt)
"Saat pengguna mengklik kartu layanan di bagian atas, sembunyikan panel layanan yang aktif saat ini dan tampilkan panel yang sesuai dengan kartu yang diklik. Perbarui state visual kartu (border dan shadow) agar pengguna tahu layanan mana yang sedang aktif. Pastikan transisi antar konten halus (fade-in)."

## 5. Instruksi Pengembangan (Technical Prompt)
"Implementasikan desain ini menggunakan Tailwind CSS untuk styling dan Vanilla JS untuk manajemen state tab. Gunakan grid layout 5 kolom untuk header tab pada desktop dan flex-column pada mobile. Pastikan semua input form memiliki state hover dan focus yang jelas sesuai palet warna biru korporat."

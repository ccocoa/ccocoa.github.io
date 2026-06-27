export const tasks = [
  {
    id: "xss-1",
    title: "Cross-Site Scripting (XSS) Fundamentals",
    materi: `<h3>Apa itu XSS?</h3>
<p>Cross-Site Scripting (XSS) adalah kerentanan keamanan web di mana penyerang menyuntikkan skrip berbahaya ke dalam konten yang disajikan kepada pengguna lain.</p>

<h3>Jenis-jenis XSS:</h3>
<ul>
  <li><strong>Stored XSS:</strong> Skrip disimpan secara permanen di server.</li>
  <li><strong>Reflected XSS:</strong> Skrip dipantulkan kembali dari server.</li>
  <li><strong>DOM-based XSS:</strong> Kerentanan terjadi sepenuhnya di sisi klien.</li>
</ul>

<h3>Contoh Payload:</h3>
<pre><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
<pre><code>&lt;img src=x onerror=alert(1)&gt;</code></pre>

<h3>Mitigasi:</h3>
<ul>
  <li>Selalu lakukan <strong>Output Encoding</strong>.</li>
  <li>Gunakan <strong>Content Security Policy (CSP)</strong>.</li>
  <li>Hindari penggunaan fungsi berbahaya seperti <code>innerHTML</code>.</li>
</ul>`,
    eksperimen: "Coba suntikkan payload &lt;script&gt;alert(document.domain)&lt;/script&gt; ke dalam input yang rentan.",
    playground: "Test your payload here...",
    flag: "CTF{xss_is_everywhere}"
  }
];

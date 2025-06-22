document.addEventListener('DOMContentLoaded', () => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbwVqQ7djLWAn0TCcKiaCer73LWv92LZxZ9te3kJshe626Gxp8MbyzuzSogCcYq2Ye050Q/exec";
  const form = document.forms['servistakip'];
  const modal = document.getElementById('uyariModal');
  const mesaj = document.getElementById('uyariMesaji');

  form.addEventListener('submit', e => {
    e.preventDefault();

    modal.style.display = 'flex';
    mesaj.style.color = '#2196f3';
    mesaj.textContent = 'Veri gönderiliyor, lütfen bekleyin...';

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      mesaj.textContent = "Form başarıyla gönderildi!";
      mesaj.style.color = '#4caf50';

      // Mobil cihaz kontrolü
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        const telefon = "905531112233"; // varsayılan numara veya teknik yetkiliye göre değiştirilebilir
        const metin = `Yeni Form Kaydı:
Gemi: ${form['Gemi Adı'].value}
Mevki: ${form['Mevki'].value}
İş: ${form['İş Tanımı'].value}
Durum: ${form['Durum'].value}`;
        const smsLink = `sms:${telefon}?body=${encodeURIComponent(metin)}`;
        window.location.href = smsLink;
      }

      setTimeout(() => window.location.reload(), 1200);
    })
    .catch(error => {
      mesaj.textContent = "Gönderim sırasında bir hata oluştu.";
      mesaj.style.color = '#f44336';
      console.error('Hata:', error.message);
    });
  });
});

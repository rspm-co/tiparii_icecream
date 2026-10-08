function initialiseForm() {
  const form = document.getElementById('franchiseForm');
  const status = document.getElementById('formStatus');
  const captcha = form.querySelector('.captcha');
  let captchaReady = false;

  const loadCaptcha = async () => {
    captchaReady = false;
    captcha.innerHTML = '<span class="captcha-loading"><i class="fa-solid fa-shield-halved"></i> Loading verification…</span>';
    try {
      const response = await fetch('api/captcha.php', { cache: 'no-store', headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error();
      captcha.innerHTML = `<label class="captcha-question"><span><i class="fa-solid fa-shield-halved"></i> Quick verification: <b>${result.question}</b></span><input name="captcha_answer" inputmode="numeric" autocomplete="off" required placeholder="Answer"></label>`;
      captchaReady = true;
    } catch {
      captcha.innerHTML = '<span class="captcha-error">Verification could not load. Please refresh the page and try again.</span>';
    }
  };
  loadCaptcha();
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!captchaReady) { status.textContent = 'Please wait for the verification question to load.'; status.className = 'form-status error'; return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const mobile = form.elements.mobile.value.replace(/\D/g, '');
    if (mobile.length !== 10) { status.textContent = 'Please enter a valid 10-digit mobile number.'; status.className = 'form-status error'; return; }
    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Submitting your enquiry…';
    status.className = 'form-status';
    try {
      const formData = new FormData(form);
      formData.append('brand', 'tiparii');
      const response = await fetch('api/submit-lead.php', { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to submit your enquiry.');
      status.textContent = 'Thank you — your franchise enquiry has been received. Our team will contact you shortly.';
      status.className = 'form-status success';
      form.reset();
      loadCaptcha();
    } catch (error) {
      status.textContent = error.message || 'Unable to submit your enquiry. Please call us directly.';
      status.className = 'form-status error';
    } finally {
      submitButton.disabled = false;
    }
  });
}

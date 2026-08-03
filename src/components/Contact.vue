<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import { Notyf } from "notyf";

  const notyf = new Notyf();

  const name = ref("");
  const email = ref("");
  const message = ref("");

  const isLoading = ref(false);

  const WEB3FORMS_ACCESS_KEY = "680dd147-0de9-4144-8aaf-27d7e099e450";
  const SUBJECT = "User sent a message through the Website (Github Pages) Contact Form";

  const SITE_KEY = "6Ld6F3MtAAAAANHMXSeegp4yUURUUuuqXMfaskR5";

  const recaptchaContainer = ref(null);
  const recaptchaWidgetId = ref(null);
  const recaptchaToken = ref("");

  let checkInterval = null;

  function onRecaptchaSuccess(token) {
    recaptchaToken.value = token;
  }

  function onRecaptchaExpired() {
    recaptchaToken.value = "";
  }

  function renderRecaptcha() {
    if (!window.grecaptcha || !window.grecaptcha.render) return;

    if (recaptchaWidgetId.value === null && recaptchaContainer.value) {
      recaptchaWidgetId.value = window.grecaptcha.render(
        recaptchaContainer.value,
        {
          sitekey: SITE_KEY,
          callback: onRecaptchaSuccess,
          "expired-callback": onRecaptchaExpired,
        }
      );
    }
  }

  function resetRecaptcha() {
    if (
      window.grecaptcha &&
      recaptchaWidgetId.value !== null
    ) {
      window.grecaptcha.reset(recaptchaWidgetId.value);
      recaptchaToken.value = "";
    }
  }

  const handleSubmit = async () => {
    if (!recaptchaToken.value) {
      notyf.error("Please complete the reCAPTCHA.");
      return;
    }

    isLoading.value = true;

    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: SUBJECT,
      name: name.value,
      email: email.value,
      message: message.value,
      "g-recaptcha-response": recaptchaToken.value,
    };

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        name.value = "";
        email.value = "";
        message.value = "";

        resetRecaptcha();

        openSuccessModal();
      } else {
        notyf.error(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      notyf.error("An error occurred while sending.");
    } finally {
      isLoading.value = false;
    }
  };

  const openSuccessModal = () => {
    const modal = document.getElementById("modalDiv");

    if (modal && window.bootstrap) {
      new window.bootstrap.Modal(modal).show();
    } else {
      handleModalConfirm();
    }
  };

  const handleModalConfirm = () => {
    notyf.success("Thank you for submitting!");
  };

  onMounted(() => {
    if (
      !document.querySelector(
        'script[src*="recaptcha/api.js"]'
      )
    ) {
      const script = document.createElement("script");

      script.src =
        "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);
    }

    checkInterval = setInterval(() => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render
      ) {
        renderRecaptcha();
        clearInterval(checkInterval);
      }
    }, 100);
  });

  onBeforeUnmount(() => {
    if (checkInterval) {
      clearInterval(checkInterval);
    }
  });
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-layout">
      <div class="contact-map-col">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d220165.81259794882!2d120.99868986529657!3d14.577907223365868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1782286306659!5m2!1sen!2sph"
          class="contact-map"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          title="Map showing Metro Manila, Philippines"
        ></iframe>
      </div>
      <div class="contact-form-col">
        <div class="contact-inner">
          <h2 class="contact-title">Contact Me</h2>
          <p class="contact-subtitle">
            Send a message using the form below. I will get back to you as soon as I can.
          </p>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="contact-field">
              <label for="name" class="contact-label">Name</label>
              <input type="text" v-model="name" class="contact-input" id="name" placeholder="Name" required />
            </div>
            <div class="contact-field">
              <label for="email" class="contact-label">Email Address</label>
              <input
                type="email"
                v-model="email"
                class="contact-input"
                id="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div class="contact-field contact-field-message">
              <label for="message" class="contact-label">Message</label>
              <textarea
                v-model="message"
                class="contact-input contact-textarea"
                id="message"
                rows="4"
                placeholder="Place your message here..."
                required
              ></textarea>
            </div>
            <div class="d-flex justify-content-between">
              <button
                type="submit"
                class="btn btn-submit "
                :disabled="isLoading"
              >
                {{ isLoading ? "Sending..." : "Submit" }}
              </button>
              <div ref="recaptchaContainer"></div> 
            </div>   
          </form>
        </div>
      </div>
    </div>
  </section>

  <div class="modal" id="modalDiv" tabindex="-1" role="dialog" aria-labelledby="modalDivLabel">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-dark">
        <div class="modal-header bg-orange-dark text-white">
          <h2 class="modal-title h5" id="modalDivLabel">Message Sent</h2>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleModalConfirm"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">Thank you for contacting me! I will review your submission soon.</p>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-orange-dark" 
            data-bs-dismiss="modal"
            @click="handleModalConfirm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

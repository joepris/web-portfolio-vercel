<script setup>
    import { onMounted, onBeforeUnmount, ref } from "vue";
    import {Notyf} from "notyf";

    const notyf = new Notyf();

    const name = ref("");
    const email = ref("");
    const message = ref("");
    
    const isLoading = ref(false);

    const WEB3FORMS_ACCESS_KEY = "680dd147-0de9-4144-8aaf-27d7e099e450";
    const subject = "User sent an message through the Website (Github pages) Contact Form";

    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading.value = true;

        const formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: subject,
            name: name.value,
            email: email.value,
            message: message.value
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok) {
                notyf.success("Message sent successfully!");
                name.value = "";
                email.value = "";
                message.value = "";
            } else {
                notyf.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            notyf.error("An error occurred. Please try again.");
        } finally {
            resetRecaptcha();
            isLoading.value = false;
        }
    };

    const SITE_KEY = "6LdrB3MtAAAAAP9yeidr3SDOPWGOBrfNGkcTU_xX";  // Replace with your site key

    const recaptchaContainer = ref(null);
    const recaptchaWidgetId = ref(null);
    const recaptchaToken = ref('');

    // Callback called by reCAPTCHA when successful
    function onRecaptchaSuccess(token) {
    recaptchaToken.value = token;
    }

    // Callback when expired
    function onRecaptchaExpired() {
    recaptchaToken.value = '';
    }

    // Function to render the reCAPTCHA widget
    function renderRecaptcha() {
    if (!window.grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
    }

    recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: SITE_KEY,
        size: 'normal', // or 'compact'
        callback: onRecaptchaSuccess,
        'expired-callback': onRecaptchaExpired,
    });
    }

    // Function to reset reCAPTCHA 
    function resetRecaptcha() {
    if (recaptchaWidgetId.value !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.value);
        recaptchaToken.value = '';
        }
    }

    onMounted(() => {
        const interval = setInterval(() => {
            if (window.grecaptcha && window.grecaptcha.render) {
                renderRecaptcha();
                clearInterval(interval);
            }
        }, 100);

        onBeforeUnmount(() => {
            clearInterval(interval);
        });
    });

</script>
<template>
    <h1 class="text-center my-4 pt-5" id="contact">Contact</h1>
    <div class="contact-section">
        <div class="row align-items-center mt-4">
            <div class="col-md-6 map-container">
                <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d220165.81259794882!2d120.99868986529657!3d14.577907223365868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1782286306659!5m2!1sen!2sph"
          class="contact-map"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          title="Map showing Metro Manila, Philippines"
        ></iframe>
            </div>
            <div class="col-md-6">
                <form @submit="handleSubmit" class="contact-form">
                    <div class="mb-3">
                        <input type="text" v-model="name" class="form-control contact-form-control" placeholder="First Name M.I. Last Name">
                    </div>
                    <div class="mb-3">
                        <input type="email" v-model="email" class="form-control contact-form-control" placeholder="Email">
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control contact-form-control" v-model="message" name="message" rows="6" placeholder="Message"></textarea>
                    </div>
                    <div class="form-footer">
                        <div class="social-icons">
<!--                                <a href="https://www.facebook.com/profile.php?id=100085701498879" id="facebook"><i class="fab fa-facebook"></i></a> -->
                            <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" id="linkedin"><i class="fab fa-linkedin"></i></a>
                            <a href="https://gitlab.com/cbabbage0991" id="gitlab"><i class="fab fa-gitlab"></i></a>
                            <a href="https://github.com/cbabbage0991" id="github"><i class="fab fa-github"></i></a>
                        </div>
                        <button type="submit" class="submit-btn pl-5 pr-5">Submit</button>
                        <div class="d-flex justify-content-center mt-2">
                            <div ref="recaptchaContainer"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
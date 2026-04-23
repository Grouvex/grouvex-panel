//!function(){'use strict';const n=(m,t="🚫 ACCIÓN BLOQUEADA")=>{const e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);z-index:2147483647;display:flex;align-items:center;justify-content:center;color:#ff4444;font-family:Arial,sans-serif;text-align:center;flex-direction:column;backdrop-filter:blur(5px)",e.innerHTML=`<div style="font-size:28px;font-weight:bold;margin-bottom:15px">${t}</div><div style="font-size:16px;color:#ff9999;max-width:80%;margin:0 auto">${m}</div><div style="font-size:12px;color:#ccc;margin-top:25px">Desaparece en <span id="cnt">10</span>s</div>`,document.body.appendChild(e);let s=10;const i=setInterval(()=>{s--,document.getElementById("cnt")&&(document.getElementById("cnt").textContent=s),s<=0&&(clearInterval(i),e.remove())},1e3)};document.addEventListener("keydown",e=>{if(e.key==="p"&&(e.ctrlKey||e.metaKey))return e.preventDefault(),e.stopImmediatePropagation(),n("No se permite imprimir esta página","🚫 IMPRESIÓN BLOQUEADA"),!1;if((e.ctrlKey&&e.shiftKey&&(e.key==="I"||e.key==="J"||e.key==="C"||e.key==="U"))||e.key==="F12"||e.keyCode===123)return e.preventDefault(),e.stopImmediatePropagation(),n("Acceso restringido","🔧 ACCIÓN BLOQUEADA"),!1},!0);["copy","cut","paste","contextmenu","selectstart","dragstart"].forEach(e=>{document.addEventListener(e,t=>{t.preventDefault(),t.stopImmediatePropagation()},!0)});const e=document.createElement("style");e.textContent="*{user-select:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important}input,textarea,[contenteditable]{user-select:text!important}@media print{*{display:none!important}body::before{content:'IMPRESIÓN BLOQUEADA';display:block!important;font-size:24px;color:red;text-align:center;margin-top:100px;font-weight:bold}}",document.head.appendChild(e);window.matchMedia("print").addListener(t=>{t.matches&&n("No se permite imprimir esta página","🚫 IMPRESIÓN BLOQUEADA")});setInterval(()=>{try{const e=performance.now();let t=0;for(let n=0;n<5e5;n++)t+=Math.random();performance.now()-e>500&&n("Comportamiento inusual detectado","⚠️ ADVERTENCIA")}catch{}},5e3);document.addEventListener("visibilitychange",()=>{document.hidden&&setTimeout(()=>{n("La página fue minimizada","📋 ATENCIÓN")},500)})}();

// ============================================
// FUNCIÓN PARA EXTRAER TEXTO DE CUALQUIER TIPO DE DATO
// ============================================
function extractTextContent(data) {
    if (!data) return '';
    
    // Si es un string, devolverlo directamente
    if (typeof data === 'string') return data;
    
    // Si es un número, convertirlo a string
    if (typeof data === 'number') return String(data);
    
    // Si es un objeto HTML (como HTMLDivElement)
    if (data && typeof data === 'object') {
        // Si tiene textContent, usarlo
        if (data.textContent !== undefined) {
            return data.textContent;
        }
        // Si tiene innerText, usarlo
        if (data.innerText !== undefined) {
            return data.innerText;
        }
        // Si es un objeto normal, intentar convertirlo a JSON
        try {
            return JSON.stringify(data);
        } catch(e) {
            return String(data);
        }
    }
    
    // Si es un array, unirlo con comas
    if (Array.isArray(data)) {
        return data.map(item => extractTextContent(item)).filter(item => item).join(', ');
    }
    
    // Fallback: convertir a string
    return String(data);
}

// ============================================
// FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyAgoQ_Px3hHVrevUsyct_FBeXWMDKXpPSw",
    authDomain: "grouvex-studios.firebaseapp.com",
    databaseURL: "https://grouvex-studios-default-rtdb.firebaseio.com",
    projectId: "grouvex-studios",
    storageBucket: "grouvex-studios.appspot.com",
    messagingSenderId: "1070842606062",
    appId: "1:1070842606062:web:5d887863048fd100b49eff",
    measurementId: "G-75BR8D2CR3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ============================================
// DOM ELEMENTS
// ============================================
const authtabs = document.getElementById('authtabs');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginSpinner = document.getElementById('loginSpinner');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const unverifiedWarning = document.getElementById('unverifiedWarning');

// Register form elements
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerConfirmPasswordInput = document.getElementById('registerConfirmPassword');
const registerUsernameInput = document.getElementById('registerUsername');
const registerPhonePrefixInput = document.getElementById('registerPhonePrefix');
const registerPhoneInput = document.getElementById('registerPhone');
const registerAddressInput = document.getElementById('registerAddress');
const registerCityInput = document.getElementById('registerCity');
const registerPostalCodeInput = document.getElementById('registerPostalCode');
const registerInstagramInput = document.getElementById('registerInstagram');
const registerTikTokInput = document.getElementById('registerTikTok');
const registerYouTubeInput = document.getElementById('registerYouTube');
const registerDiscordInput = document.getElementById('registerDiscord');
const registerXInput = document.getElementById('registerX');
const registerFacebookInput = document.getElementById('registerFacebook');
const registerClientNameInput = document.getElementById('registerClientName');
const registerClientEmailInput = document.getElementById('registerClientEmail');
const registerFullNameInput = document.getElementById('registerFullName');
const registerConflictResolutionInput = document.getElementById('registerConflictResolution');
const registerProfileDescriptionInput = document.getElementById('registerProfileDescription');
const profileDescriptionCounter = document.getElementById('profileDescriptionCounter');
const registerAcceptTermsInput = document.getElementById('registerAcceptTerms');
const enableStripeCheckbox = document.getElementById('enableStripeSection');
const stripeInfoSection = document.getElementById('stripeInfoSection');
const registerBtn = document.getElementById('registerBtn');
const registerText = document.getElementById('registerText');
const registerSpinner = document.getElementById('registerSpinner');

// Error elements
const registerEmailError = document.getElementById('registerEmailError');
const registerPasswordError = document.getElementById('registerPasswordError');
const registerConfirmPasswordError = document.getElementById('registerConfirmPasswordError');
const registerUsernameError = document.getElementById('registerUsernameError');
const registerPhoneError = document.getElementById('registerPhoneError');
const registerAddressError = document.getElementById('registerAddressError');
const registerCityError = document.getElementById('registerCityError');
const registerPostalCodeError = document.getElementById('registerPostalCodeError');
const registerClientNameError = document.getElementById('registerClientNameError');
const registerClientEmailError = document.getElementById('registerClientEmailError');
const registerFullNameError = document.getElementById('registerFullNameError');
const registerConflictResolutionError = document.getElementById('registerConflictResolutionError');
const registerContactRightsError = document.getElementById('registerContactRightsError');
const registerOtherRightsError = document.getElementById('registerOtherRightsError');
const registerAcceptTermsError = document.getElementById('registerAcceptTermsError');
const registerProfileDescriptionError = document.getElementById('registerProfileDescriptionError');
const registerInfoToShowError = document.getElementById('registerInfoToShowError');

const userDashboard = document.getElementById('userDashboard');
const userEmail = document.getElementById('userEmail');
const staffBadge = document.getElementById('staffBadge');
const verifiedTeamBadge = document.getElementById('verifiedTeamBadge');
const logoutBtn = document.getElementById('logoutBtn');
const memberPortalBtn = document.getElementById('memberPortalBtn');
const staffPortalBtn = document.getElementById('staffPortalBtn');
const searchOtherBtn = document.getElementById('searchOtherBtn');

// App constants
const BASE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyx2ZKEOGThYPBLjDeavIn1EYF9tmcYieT-6mfvAZAeiR0-nO__NKiJTejXxjJGJCBaBA/exec";
const WEB_LINK = "https://panel.grouvex.com/";

// State variables
let currentUser = null;
let isStaff = false;
let isVerifiedTeam = false;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    
    // Initialize UI elements
    initializeUI();
    
    // Start time counters
    startTimeCounters();
    
    // Load artist data if on member page
    const urlParams = new URLSearchParams(window.location.search);
    const mostrarID = urlParams.get('targetid') || urlParams.get('targetId') || urlParams.get('id') || urlParams.get('userId') || (currentUser?.uid);
    if (mostrarID) {
        loadArtistData(mostrarID);
    }
});

function initializeUI() {
    // Tab switching
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            if (loginForm) loginForm.classList.add('active');
            if (registerForm) registerForm.classList.remove('active');
            if (unverifiedWarning) unverifiedWarning.classList.add('hidden');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            if (registerForm) registerForm.classList.add('active');
            if (loginForm) loginForm.classList.remove('active');
        });
    }
    
    // Profile description counter
    if (registerProfileDescriptionInput && profileDescriptionCounter) {
        registerProfileDescriptionInput.addEventListener('input', function() {
            const length = this.value.length;
            profileDescriptionCounter.textContent = `${length}/200`;
            
            if (length > 180) {
                profileDescriptionCounter.classList.add('warning');
                profileDescriptionCounter.classList.remove('error');
            } else if (length > 200) {
                profileDescriptionCounter.classList.add('error');
                profileDescriptionCounter.classList.remove('warning');
            } else {
                profileDescriptionCounter.classList.remove('warning', 'error');
            }
        });
    }
    
    // Stripe section toggle
    if (enableStripeCheckbox && stripeInfoSection) {
        enableStripeCheckbox.addEventListener('change', toggleStripeSection);
        toggleStripeSection();
    }
    
    // Event listeners for buttons
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (registerBtn) registerBtn.addEventListener('click', handleRegister);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (memberPortalBtn) memberPortalBtn.addEventListener('click', openMemberPortal);
    if (staffPortalBtn) staffPortalBtn.addEventListener('click', openStaffPortal);
    if (searchOtherBtn) searchOtherBtn.addEventListener('click', searchOtherMember);
    
    // Enter key press
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }
    if (registerConfirmPasswordInput) {
        registerConfirmPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleRegister();
        });
    }
}

// ============================================
// AUTH STATE OBSERVER
// ============================================
auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        
        // Verificar si el email está verificado
        await user.reload();
        
        if (!user.emailVerified) {
            auth.signOut();
            return;
        }
        
        // Update UI
        if (userEmail) userEmail.textContent = user.email;
        
        // Show dashboard
        if (loginForm) loginForm.classList.remove('active');
        if (registerForm) registerForm.classList.remove('active');
        if (userDashboard) userDashboard.classList.remove('hidden');
        if (loginForm) loginForm.classList.add('hidden');
        if (authtabs) authtabs.classList.add('hidden');
        if (registerForm) registerForm.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        
        // Hide staff features by default
        if (staffPortalBtn) staffPortalBtn.classList.add('hidden');
        if (searchOtherBtn) searchOtherBtn.classList.add('hidden');
        if (staffBadge) staffBadge.classList.add('hidden');
        if (verifiedTeamBadge) verifiedTeamBadge.classList.add('hidden');
        
    } else {
        // No user signed in
        currentUser = null;
        isStaff = false;
        isVerifiedTeam = false;
        if (loginForm) loginForm.classList.add('active');
        if (registerForm) registerForm.classList.remove('active');
        if (userDashboard) userDashboard.classList.add('hidden');
        if (loginForm) loginForm.classList.remove('hidden');
        if (authtabs) authtabs.classList.remove('hidden');
        if (registerForm) registerForm.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (unverifiedWarning) unverifiedWarning.classList.add('hidden');
        
        // Clear inputs
        clearInputs();
    }
});

// ============================================
// LOGIN HANDLER
// ============================================
function handleLogin() {
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';
    
    if (!email) {
        showError(emailError, "Por favor ingresa tu correo electrónico");
        return;
    }
    
    if (!password) {
        showError(passwordError, "Por favor ingresa tu contraseña");
        return;
    }
    
    hideError(emailError);
    hideError(passwordError);
    if (unverifiedWarning) unverifiedWarning.classList.add('hidden');
    
    if (loginText) loginText.classList.add('hidden');
    if (loginSpinner) loginSpinner.classList.remove('hidden');
    if (loginBtn) loginBtn.disabled = true;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await user.reload();
            
            if (!user.emailVerified) {
                if (unverifiedWarning) unverifiedWarning.classList.remove('hidden');
                auth.signOut();
                showError(emailError, "Tu cuenta no ha sido verificada. Por favor, revisa tu correo electrónico.");
                
                const resendBtn = document.createElement('button');
                resendBtn.className = 'boton boton-portal mt-2 resend-verification-btn';
                resendBtn.innerHTML = '<i class="fas fa-redo mr-2"></i> Reenviar email de verificación';
                resendBtn.onclick = () => {
                    user.sendEmailVerification().then(() => {
                        alert('✅ Email de verificación reenviado.');
                    }).catch((error) => {
                        alert('❌ Error: ' + error.message);
                    });
                };
                
                if (emailError && emailError.parentNode) {
                    const existingBtn = emailError.parentNode.querySelector('.resend-verification-btn');
                    if (existingBtn) existingBtn.remove();
                    emailError.parentNode.appendChild(resendBtn);
                }
                
                if (loginText) loginText.classList.remove('hidden');
                if (loginSpinner) loginSpinner.classList.add('hidden');
                if (loginBtn) loginBtn.disabled = false;
                if (registerBtn) registerBtn.disabled = true;
                return;
            }
            
            // Login successful
            if (userEmail) userEmail.textContent = user.email;
            
            if (loginForm) loginForm.classList.remove('active');
            if (registerForm) registerForm.classList.remove('active');
            if (userDashboard) userDashboard.classList.remove('hidden');
            if (loginForm) loginForm.classList.add('hidden');
            if (authtabs) authtabs.classList.add('hidden');
            if (registerForm) registerForm.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            
        })
        .catch((error) => {
            if (loginText) loginText.classList.remove('hidden');
            if (loginSpinner) loginSpinner.classList.add('hidden');
            if (loginBtn) loginBtn.disabled = false;
            
            switch (error.code) {
                case 'auth/user-not-found':
                    showError(emailError, "Usuario no encontrado");
                    break;
                case 'auth/wrong-password':
                case 'auth/invalid-login-credentials':
                    showError(passwordError, "Contraseña incorrecta");
                    break;
                case 'auth/invalid-email':
                    showError(emailError, "Correo electrónico inválido");
                    break;
                case 'auth/user-disabled':
                    showError(emailError, "La cuenta ha sido deshabilitada");
                    break;
                default:
                    showError(emailError, "Error al iniciar sesión. Intenta nuevamente.");
                    console.error("Login error:", error);
            }
        });
}

// ============================================
// LOGOUT HANDLER
// ============================================
function handleLogout() {
    auth.signOut().catch((error) => {
        console.error("Logout error:", error);
    });
}

// ============================================
// REGISTRATION HANDLER
// ============================================
function handleRegister() {
    const formData = collectFormData();
    const validationResult = validateFormData(formData);
    
    if (!validationResult.isValid) {
        showValidationErrors(validationResult.errors);
        return;
    }
    
    if (registerText) registerText.classList.add('hidden');
    if (registerSpinner) registerSpinner.classList.remove('hidden');
    if (registerBtn) registerBtn.disabled = true;
    
    console.log("Enviando datos de registro al servidor...");
    
    google.script.run
        .withSuccessHandler(function(result) {
            console.log("Respuesta exitosa del servidor:", result);
            handleRegistrationSuccess(result);
        })
        .withFailureHandler(function(error) {
            console.error("Error del servidor:", error);
            handleRegistrationError(error);
        })
        .validateAndProcessRegistration(formData);
}

function collectFormData() {
    const stripeEnabled = enableStripeCheckbox ? enableStripeCheckbox.checked : false;
    
    const contactRights = [];
    if (document.getElementById('contactInstagram')?.checked) contactRights.push('Instagram');
    if (document.getElementById('contactTikTok')?.checked) contactRights.push('TikTok');
    if (document.getElementById('contactGmail')?.checked) contactRights.push('Gmail');
    if (document.getElementById('contactDrive')?.checked) contactRights.push('Drive');
    if (document.getElementById('contactDiscord')?.checked) contactRights.push('Discord');
    if (document.getElementById('contactWhatsApp')?.checked) contactRights.push('WhatsApp');
    if (document.getElementById('contactX')?.checked) contactRights.push('X');
    if (document.getElementById('contactFacebook')?.checked) contactRights.push('Facebook');
    if (document.getElementById('contactOther')?.checked) {
        const otherText = document.getElementById('contactOtherText')?.value.trim() || '';
        contactRights.push(`Otros: ${otherText}`);
    }
    
    const otherRights = [];
    if (document.getElementById('rightNone')?.checked) otherRights.push('Ninguno');
    if (document.getElementById('rightPublish')?.checked) otherRights.push('Publicar contenido suyo en nuestras redes sociales');
    if (document.getElementById('rightMention')?.checked) otherRights.push('Mencionarte en las redes sociales proporcionadas');
    if (document.getElementById('rightCollaborator')?.checked) otherRights.push('Añadirte como colaborador en las redes sociales proporcionadas');
    if (document.getElementById('rightPaidCollaborator')?.checked) otherRights.push('Añadirte como colaborador pagado en las redes sociales proporcionadas');
    if (document.getElementById('rightStripe')?.checked) otherRights.push('Crear una cuenta de Stripe');
    
    const infoToShowElements = document.querySelectorAll('.info-to-show:checked');
    const infoToShow = Array.from(infoToShowElements).map(el => el.value).join(', ');
    
    return {
        email: registerEmailInput?.value.trim() || '',
        password: registerPasswordInput?.value.trim() || '',
        username: registerUsernameInput?.value.trim() || '',
        
        phonePrefix: registerPhonePrefixInput?.value || '',
        phone: registerPhoneInput?.value.trim() || '',
        address: registerAddressInput?.value.trim() || '',
        city: registerCityInput?.value.trim() || '',
        postalCode: registerPostalCodeInput?.value.trim() || '',
        
        instagram: registerInstagramInput?.value.trim() || '',
        tiktok: registerTikTokInput?.value.trim() || '',
        youtube: registerYouTubeInput?.value.trim() || '',
        discord: registerDiscordInput?.value.trim() || '',
        x: registerXInput?.value.trim() || '',
        facebook: registerFacebookInput?.value.trim() || '',
        
        stripeEnabled: stripeEnabled,
        clientName: stripeEnabled ? (registerClientNameInput?.value.trim() || '') : '',
        clientEmail: stripeEnabled ? (registerClientEmailInput?.value.trim() || '') : '',
        fullName: stripeEnabled ? (registerFullNameInput?.value.trim() || '') : '',
        
        conflictResolution: registerConflictResolutionInput?.value || '',
        
        contactRights: contactRights.join(', '),
        otherRights: otherRights.join(', '),
        
        acceptTerms: registerAcceptTermsInput?.checked || false,
        
        profileType: document.querySelector('input[name="profileType"]:checked')?.value || 'Público',
        infoToShow: infoToShow,
        profileDescription: registerProfileDescriptionInput?.value.trim() || '',
        
        accountType: document.querySelector('input[name="accountType"]:checked')?.value || 'permanent',
        
        timestamp: new Date().toISOString()
    };
}

function validateFormData(formData) {
    const errors = {};
    let isValid = true;
    
    if (!formData.email) {
        errors.email = "❌ Por favor ingresa tu correo electrónico";
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        errors.email = "❌ Por favor ingresa un correo electrónico válido";
        isValid = false;
    }
    
    if (!formData.password) {
        errors.password = "❌ Por favor ingresa una contraseña";
        isValid = false;
    } else if (formData.password.length < 6) {
        errors.password = "❌ La contraseña debe tener al menos 6 caracteres";
        isValid = false;
    }
    
    const confirmPassword = registerConfirmPasswordInput?.value.trim() || '';
    if (!confirmPassword) {
        errors.confirmPassword = "❌ Por favor confirma tu contraseña";
        isValid = false;
    } else if (formData.password !== confirmPassword) {
        errors.confirmPassword = "❌ Las contraseñas no coinciden";
        isValid = false;
    }
    
    let phoneError = "";
    
    if (!formData.phonePrefix) {
        phoneError = "❌ Por favor selecciona el prefijo del teléfono";
        isValid = false;
    }
    
    if (!formData.phone) {
        if (phoneError) {
            phoneError += " y ❌ ingresa tu número de teléfono";
        } else {
            phoneError = "❌ Por favor ingresa tu número de teléfono";
        }
        isValid = false;
    } else if (!isValidPhone(formData.phone)) {
        phoneError = "❌ Por favor ingresa un número de teléfono válido";
        isValid = false;
    }
    
    if (phoneError) {
        errors.phone = phoneError;
    }
    
    if (!formData.city) {
        errors.city = "❌ Por favor ingresa tu ciudad";
        isValid = false;
    }
    
    if (!formData.postalCode) {
        errors.postalCode = "❌ Por favor ingresa tu código postal";
        isValid = false;
    }
    
    if (formData.stripeEnabled) {
        if (!formData.clientName) {
            errors.clientName = "❌ Por favor ingresa el nombre del cliente";
            isValid = false;
        }
        
        if (!formData.clientEmail) {
            errors.clientEmail = "❌ Por favor ingresa el correo electrónico del cliente";
            isValid = false;
        } else if (!isValidEmail(formData.clientEmail)) {
            errors.clientEmail = "❌ Por favor ingresa un correo electrónico válido para el cliente";
            isValid = false;
        }
        
        if (!formData.fullName) {
            errors.fullName = "❌ Por favor ingresa tu nombre completo";
            isValid = false;
        } else if (formData.fullName.length < 5) {
            errors.fullName = "❌ Por favor ingresa tu nombre completo real";
            isValid = false;
        }
    }
    
    if (!formData.conflictResolution) {
        errors.conflictResolution = "❌ Por favor selecciona un método de resolución de conflictos";
        isValid = false;
    }
    
    if (!formData.acceptTerms) {
        errors.acceptTerms = "❌ Debes aceptar los términos para continuar";
        isValid = false;
    }
    
    if (formData.profileDescription && formData.profileDescription.length > 200) {
        errors.profileDescription = "❌ La descripción no puede exceder los 200 caracteres";
        isValid = false;
    }
    
    return { isValid, errors };
}

function showValidationErrors(errors) {
    // Clear all errors first
    const allErrorElements = [
        registerEmailError, registerPasswordError, registerConfirmPasswordError,
        registerUsernameError, registerPhoneError, registerAddressError,
        registerCityError, registerPostalCodeError, registerClientNameError,
        registerClientEmailError, registerFullNameError, registerConflictResolutionError,
        registerContactRightsError, registerOtherRightsError, registerAcceptTermsError,
        registerProfileDescriptionError, registerInfoToShowError
    ];
    
    allErrorElements.forEach(element => {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    });
    
    // Display errors
    if (errors.email && registerEmailError) {
        registerEmailError.textContent = String(errors.email);
        registerEmailError.style.display = 'block';
    }
    if (errors.password && registerPasswordError) {
        registerPasswordError.textContent = String(errors.password);
        registerPasswordError.style.display = 'block';
    }
    if (errors.confirmPassword && registerConfirmPasswordError) {
        registerConfirmPasswordError.textContent = String(errors.confirmPassword);
        registerConfirmPasswordError.style.display = 'block';
    }
    if (errors.phone && registerPhoneError) {
        registerPhoneError.textContent = String(errors.phone);
        registerPhoneError.style.display = 'block';
    }
    if (errors.city && registerCityError) {
        registerCityError.textContent = String(errors.city);
        registerCityError.style.display = 'block';
    }
    if (errors.postalCode && registerPostalCodeError) {
        registerPostalCodeError.textContent = String(errors.postalCode);
        registerPostalCodeError.style.display = 'block';
    }
    if (errors.clientName && registerClientNameError) {
        registerClientNameError.textContent = String(errors.clientName);
        registerClientNameError.style.display = 'block';
    }
    if (errors.clientEmail && registerClientEmailError) {
        registerClientEmailError.textContent = String(errors.clientEmail);
        registerClientEmailError.style.display = 'block';
    }
    if (errors.fullName && registerFullNameError) {
        registerFullNameError.textContent = String(errors.fullName);
        registerFullNameError.style.display = 'block';
    }
    if (errors.conflictResolution && registerConflictResolutionError) {
        registerConflictResolutionError.textContent = String(errors.conflictResolution);
        registerConflictResolutionError.style.display = 'block';
    }
    if (errors.acceptTerms && registerAcceptTermsError) {
        registerAcceptTermsError.textContent = String(errors.acceptTerms);
        registerAcceptTermsError.style.display = 'block';
    }
    if (errors.profileDescription && registerProfileDescriptionError) {
        registerProfileDescriptionError.textContent = String(errors.profileDescription);
        registerProfileDescriptionError.style.display = 'block';
    }
    
    const firstErrorElement = document.querySelector('.error-message[style*="display: block"]');
    if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function handleRegistrationSuccess(result) {
    if (registerText) registerText.classList.remove('hidden');
    if (registerSpinner) registerSpinner.classList.add('hidden');
    if (registerBtn) registerBtn.disabled = false;
    
    if (result.success) {
        if (result.requiresVerification) {
            showVerificationPendingScreen(result);
        } else {
            alert("🎉 " + result.message);
            if (loginTab) loginTab.click();
            clearRegisterForm();
        }
    } else {
        alert("❌ " + result.message);
    }
}

function handleRegistrationError(error) {
    console.error("Error en registro:", error);
    
    if (registerText) registerText.classList.remove('hidden');
    if (registerSpinner) registerSpinner.classList.add('hidden');
    if (registerBtn) registerBtn.disabled = false;
    
    alert('❌ Error de conexión: ' + error);
}

// ============================================
// PORTAL NAVIGATION
// ============================================
function openMemberPortal() {
    if (!currentUser) return;
    
    const url = `${WEB_LINK}member?id=${currentUser?.uid}`;
    window.open(url);
}

function openStaffPortal() {
    if (!currentUser || !(isStaff || isVerifiedTeam)) return;
    
    const url = `${WEB_LINK}staff`;
    window.open(url);
}

function searchOtherMember() {
    if (!currentUser || !(isStaff || isVerifiedTeam)) return;
    
    const targetId = prompt("Ingresa el GS-ID del miembro que deseas buscar:");
    if (targetId) {
        const url = `${WEB_LINK}member?id=${targetId}`;
        window.open(url);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function showError(element, message) {
    if (element) {
        let finalMessage = message;
        if (typeof message !== 'string') {
            finalMessage = String(message);
        }
        element.textContent = finalMessage;
        element.style.display = 'block';
    }
}

function hideError(element) {
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]+$/;
    return re.test(phone);
}

function clearInputs() {
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    clearRegisterForm();
}

function clearRegisterForm() {
    if (registerEmailInput) registerEmailInput.value = '';
    if (registerPasswordInput) registerPasswordInput.value = '';
    if (registerConfirmPasswordInput) registerConfirmPasswordInput.value = '';
    if (registerUsernameInput) registerUsernameInput.value = '';
    if (registerPhonePrefixInput) registerPhonePrefixInput.value = '';
    if (registerPhoneInput) registerPhoneInput.value = '';
    if (registerAddressInput) registerAddressInput.value = '';
    if (registerCityInput) registerCityInput.value = '';
    if (registerPostalCodeInput) registerPostalCodeInput.value = '';
    if (registerInstagramInput) registerInstagramInput.value = '';
    if (registerTikTokInput) registerTikTokInput.value = '';
    if (registerYouTubeInput) registerYouTubeInput.value = '';
    if (registerDiscordInput) registerDiscordInput.value = '';
    if (registerXInput) registerXInput.value = '';
    if (registerFacebookInput) registerFacebookInput.value = '';
    if (registerClientNameInput) registerClientNameInput.value = '';
    if (registerClientEmailInput) registerClientEmailInput.value = '';
    if (registerFullNameInput) registerFullNameInput.value = '';
    if (registerConflictResolutionInput) registerConflictResolutionInput.value = '';
    if (registerProfileDescriptionInput) registerProfileDescriptionInput.value = '';
    if (registerAcceptTermsInput) registerAcceptTermsInput.checked = false;
    
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        if (cb.id !== 'contactGmail') {
            cb.checked = false;
        }
    });
    
    const contactOtherText = document.getElementById('contactOtherText');
    if (contactOtherText) contactOtherText.value = '';
    
    if (enableStripeCheckbox) {
        enableStripeCheckbox.checked = false;
        toggleStripeSection();
    }
    
    document.querySelectorAll('.info-to-show').forEach(cb => {
        cb.checked = false;
    });
    
    const contactGmail = document.getElementById('contactGmail');
    if (contactGmail) contactGmail.checked = true;
    
    const profileTypePublic = document.querySelector('input[name="profileType"][value="Público"]');
    if (profileTypePublic) profileTypePublic.checked = true;
    
    const accountTypePermanent = document.querySelector('input[name="accountType"][value="permanent"]');
    if (accountTypePermanent) accountTypePermanent.checked = true;
    
    if (profileDescriptionCounter) {
        profileDescriptionCounter.textContent = '0/200';
        profileDescriptionCounter.classList.remove('warning', 'error');
    }
}

function toggleStripeSection() {
    if (!enableStripeCheckbox || !stripeInfoSection) return;
    
    if (enableStripeCheckbox.checked) {
        stripeInfoSection.classList.remove('hidden');
        
        if (registerClientNameInput) registerClientNameInput.required = true;
        if (registerClientEmailInput) registerClientEmailInput.required = true;
        if (registerFullNameInput) registerFullNameInput.required = true;
    } else {
        stripeInfoSection.classList.add('hidden');
        
        if (registerClientNameInput) registerClientNameInput.required = false;
        if (registerClientEmailInput) registerClientEmailInput.required = false;
        if (registerFullNameInput) registerFullNameInput.required = false;
    }
}

// ============================================
// VERIFICATION SCREEN
// ============================================
function showVerificationPendingScreen(result) {
    const originalRegisterForm = document.getElementById('registerForm');
    
    if (!originalRegisterForm) return;
    
    // Save original content
    if (!window.originalRegisterContent) {
        window.originalRegisterContent = originalRegisterForm.innerHTML;
    }
    
    // Replace content
    originalRegisterForm.innerHTML = `
        <div class="text-center py-8">
            <div class="mb-6">
                <i class="fas fa-envelope text-5xl text-secondary mb-4"></i>
                <h2 class="text-2xl font-bold text-secondary mb-2">Verificación Requerida</h2>
                <p class="text-light">Hemos enviado un correo de verificación a:</p>
                <p class="text-xl font-bold text-secondary mt-2">${extractTextContent(result.userEmail) || ''}</p>
            </div>
            
            <div class="info-text mb-6">
                <p><strong>Por favor sigue estos pasos:</strong></p>
                <ol class="text-left mt-2 space-y-2">
                    <li>1. Revisa tu bandeja de entrada (y carpeta de spam)</li>
                    <li>2. Haz clic en el enlace de verificación que te hemos enviado</li>
                    <li>3. Vuelve a esta página y haz clic en "Verificar Ahora"</li>
                </ol>
            </div>
            
            <div class="mb-6">
                <div class="timer-circle mx-auto mb-4">
                    <span id="countdown">30:00</span>
                </div>
                <p class="text-sm text-light">Tiempo restante para verificar</p>
            </div>
            
            <div class="space-y-3">
                <button id="checkVerificationBtn" class="boton boton-primary w-full">
                    <i class="fas fa-sync-alt mr-2"></i> Verificar Ahora
                </button>
                <button id="resendEmailBtn" class="boton boton-portal w-full">
                    <i class="fas fa-redo mr-2"></i> Reenviar Email
                </button>
                <button id="backToRegisterBtn" class="boton w-full bg-gray-600 hover:bg-gray-700">
                    <i class="fas fa-arrow-left mr-2"></i> Volver al Registro
                </button>
            </div>
        </div>
    `;
    
    startCountdown(30, result.userEmail, result.userId);
    
    setTimeout(() => {
        const checkBtn = document.getElementById('checkVerificationBtn');
        const resendBtn = document.getElementById('resendEmailBtn');
        const backBtn = document.getElementById('backToRegisterBtn');
        
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                checkEmailVerification(result.userId, result.userEmail);
            });
        }
        
        if (resendBtn) {
            resendBtn.addEventListener('click', () => {
                resendVerificationEmail(result.userId, result.userEmail);
            });
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }, 100);
}

function startCountdown(minutes, userEmail, userId) {
    let timeLeft = minutes * 60;
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const countdown = setInterval(() => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        countdownElement.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 300) {
            countdownElement.style.color = '#e74c3c';
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            countdownElement.textContent = "00:00";
            showTimeExpiredMessage(userEmail);
        }
        
        timeLeft--;
    }, 1000);
}

function checkEmailVerification(userId, userEmail) {
    const checkBtn = document.getElementById('checkVerificationBtn');
    if (!checkBtn) return;
    
    const originalText = checkBtn.innerHTML;
    checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    checkBtn.disabled = true;
    
    google.script.run
        .withSuccessHandler((result) => {
            if (result.verified) {
                alert("🎉 ¡Email verificado exitosamente! Ahora puedes iniciar sesión.");
                if (loginTab) loginTab.click();
            } else {
                alert("❌ El email aún no ha sido verificado. Por favor, revisa tu bandeja de entrada.");
                checkBtn.innerHTML = originalText;
                checkBtn.disabled = false;
            }
        })
        .withFailureHandler((error) => {
            alert("❌ Error al verificar: " + error);
            checkBtn.innerHTML = originalText;
            checkBtn.disabled = false;
        })
        .checkUserVerificationStatus(userId?.replace('GS-', ''));
}

function resendVerificationEmail(userId, userEmail) {
    const resendBtn = document.getElementById('resendEmailBtn');
    if (!resendBtn) return;
    
    const originalText = resendBtn.innerHTML;
    resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    resendBtn.disabled = true;
    
    google.script.run
        .withSuccessHandler((result) => {
            alert("✅ Email de verificación reenviado a " + extractTextContent(userEmail));
            resendBtn.innerHTML = originalText;
            resendBtn.disabled = false;
        })
        .withFailureHandler((error) => {
            alert("❌ Error al reenviar el email: " + error);
            resendBtn.innerHTML = originalText;
            resendBtn.disabled = false;
        })
        .resendVerificationEmail(userId?.replace('GS-', ''));
}

function showTimeExpiredMessage(userEmail) {
    const verificationSection = document.querySelector('.text-center.py-8');
    if (verificationSection) {
        verificationSection.innerHTML = `
            <div class="text-center py-8">
                <div class="mb-6">
                    <i class="fas fa-exclamation-triangle text-5xl text-warning mb-4"></i>
                    <h2 class="text-2xl font-bold text-warning mb-2">Tiempo Agotado</h2>
                    <p class="text-light">El tiempo para verificar tu email ha expirado.</p>
                </div>
                
                <div class="info-text mb-6">
                    <p>Por favor, contacta con el equipo de soporte o intenta registrarte nuevamente.</p>
                </div>
                
                <button onclick="location.reload()" class="boton boton-primary w-full">
                    <i class="fas fa-redo mr-2"></i> Intentar Nuevamente
                </button>
            </div>
        `;
    }
}

// ============================================
// TIME COUNTERS
// ============================================
function startTimeCounters() {
    const webStatusMessages = document.getElementById('webStatusMessages');
    if (!webStatusMessages) return;
    
    const webCloseTimestamp = 1776268800;
    const webOpenTimestamp = 1780460000;
    
    function updateCounters() {
        const now = Math.floor(Date.now() / 1000);
        let messages = '';
        
        const closeDiff = webCloseTimestamp - now;
        const openDiff = webOpenTimestamp - now;
        
        if (closeDiff > 0) {
            const days = Math.floor(closeDiff / (60 * 60 * 24));
            const hours = Math.floor((closeDiff % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((closeDiff % (60 * 60)) / 60);
            const seconds = closeDiff % 60;
            const eventDate = new Date(webCloseTimestamp * 1000).toUTCString();
            messages += `<div style="color: white">El Portal de Miembros, <strong style="color:red">se cerrará por Mantenimientos en: ${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}min:${padZero(seconds)}s<br><small>(Fecha: ${eventDate})</small></strong></div>`;
        } else if(openDiff > 0) {
            const days = Math.floor(openDiff / (60 * 60 * 24));
            const hours = Math.floor((openDiff % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((openDiff % (60 * 60)) / 60);
            const seconds = openDiff % 60;
            const eventDate = new Date(webOpenTimestamp * 1000).toUTCString();
            messages += `<div style="color: red"><strong>Portal de Miembros Cerrado</strong></div>`;
            messages += `<div style="color: white">El Portal de Miembros, cerrado por Mantenimientos, <strong style="color:green">se abrirá en: ${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}min:${padZero(seconds)}s<br><small>(Fecha: ${eventDate})</small></strong></div>`;
            if (loginBtn) loginBtn.disabled = true;
            if (registerBtn) registerBtn.disabled = true;
            if (memberPortalBtn) memberPortalBtn.disabled = true;
        }
        
        webStatusMessages.innerHTML = messages;
        
        setTimeout(updateCounters, 1000);
    }
    
    updateCounters();
}

function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

// ============================================
// FUNCIÓN PARA MOSTRAR LOS DATOS DEL ARTISTA (CORREGIDA)
// ============================================
function displayArtistData(artistData) {
    console.log("🎨 Mostrando datos del artista:", artistData);
    
    // Verificar si hay datos válidos
    if (!artistData) {
        console.error("❌ No se encontraron datos del artista");
        showErrorInContainer("No se encontraron datos del artista");
        return;
    }
    
    // Mostrar información básica del artista
    const usernameElement = document.getElementById('artist-username');
    if (usernameElement) {
        usernameElement.textContent = extractTextContent(artistData.username) || 'Sin nombre';
    }
    
    const emailElement = document.getElementById('artist-email');
    if (emailElement) {
        emailElement.textContent = extractTextContent(artistData.email) || 'Sin email';
    }
    
    // Descripción del perfil - CORREGIDO
    const descriptionElement = document.getElementById('artist-description');
    if (descriptionElement) {
        let descriptionText = extractTextContent(artistData.profileDescription);
        descriptionElement.textContent = descriptionText || 'Sin descripción';
    }
    
    const profileTypeElement = document.getElementById('profile-type');
    if (profileTypeElement) {
        profileTypeElement.textContent = extractTextContent(artistData.profileType) || 'Público';
    }
    
    // Mostrar redes sociales
    const socialFields = [
        { id: 'artist-instagram', key: 'instagram', type: 'social', prefix: 'https://instagram.com/' },
        { id: 'artist-tiktok', key: 'tiktok', type: 'social', prefix: 'https://tiktok.com/@' },
        { id: 'artist-youtube', key: 'youtube', type: 'social', prefix: 'https://youtube.com/@' },
        { id: 'artist-discord', key: 'discord', type: 'text' },
        { id: 'artist-x', key: 'x', type: 'social', prefix: 'https://twitter.com/' },
        { id: 'artist-facebook', key: 'facebook', type: 'social', prefix: 'https://facebook.com/' }
    ];
    
    socialFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            const value = extractTextContent(artistData[field.key]);
            if (value) {
                if (field.type === 'social') {
                    let cleanValue = value.replace('@', '');
                    element.href = field.prefix + cleanValue;
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
                element.style.display = 'inline-flex';
            } else {
                element.style.display = 'none';
            }
        }
    });
    
    // Mostrar insignias
    const insigniasContainer = document.getElementById('insignias-container');
    if (insigniasContainer) {
        let insigniaUrls = artistData.insignias || [];
        
        if (typeof insigniaUrls === 'string') {
            try {
                insigniaUrls = JSON.parse(insigniaUrls);
            } catch(e) {
                insigniaUrls = [];
            }
        }
        
        if (Array.isArray(insigniaUrls) && insigniaUrls.length > 0) {
            insigniasContainer.innerHTML = insigniaUrls.map(url => 
                `<img src="${extractTextContent(url)}" alt="Insignia" class="insignia-image" style="width: 20px; height: 20px; flex-shrink: 0; margin-right: 4px;" onerror="this.style.display='none'">`
            ).join('');
            insigniasContainer.style.display = 'flex';
        } else {
            insigniasContainer.style.display = 'none';
            insigniasContainer.innerHTML = '';
        }
    }
    
    // Fecha de registro
    const createdAtElement = document.getElementById('artist-created-at');
    if (createdAtElement && artistData.timestamp) {
        const date = new Date(extractTextContent(artistData.timestamp));
        if (!isNaN(date.getTime())) {
            createdAtElement.textContent = date.toLocaleDateString('es-ES');
        }
    }
    
    // Info que muestra
    const infoToShowElement = document.getElementById('artist-info-to-show');
    if (infoToShowElement && artistData.infoToShow) {
        infoToShowElement.textContent = extractTextContent(artistData.infoToShow);
    }
    
    // Ocultar loading
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    console.log("✅ Datos del artista mostrados correctamente");
}

function showErrorInContainer(message) {
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = extractTextContent(message);
        errorElement.style.display = 'block';
    }
}

function loadArtistData(userId) {
    console.log("📡 Cargando datos del artista:", userId);
    
    if (!userId) {
        console.error("❌ No se proporcionó userId");
        showErrorInContainer("No se especificó un usuario");
        return;
    }
    
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    
    google.script.run
        .withSuccessHandler(function(response) {
            console.log("✅ Respuesta recibida:", response);
            
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            if (response && response.status === 'success') {
                displayArtistData(response.data || response.result);
            } else if (response && response.found !== undefined) {
                displayArtistData(response);
            } else if (response && response.data) {
                displayArtistData(response.data);
            } else {
                console.error("❌ Error en la respuesta:", response);
                showErrorInContainer(response?.message || "No se pudieron cargar los datos del artista");
            }
        })
        .withFailureHandler(function(error) {
            console.error("❌ Error en la llamada API:", error);
            
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            showErrorInContainer("Error de conexión con el servidor: " + extractTextContent(error));
        })
        .getArtistData(extractTextContent(userId));
}

// ============================================
// EXTERNAL LINK MODAL
// ============================================
(function() {
    const allowedUrls = [
        'www.grouvex.com',
        'grouvex.com',
        'panel.grouvex.com',
        'ddoo.grouvex.com', 
        'grouvex.github.io',
        'script.google.com',
        'drive.google.com'
    ];

    function isExternalLink(href) {
        if (!href) return false;
        try {
            const url = new URL(href, window.location.origin);
            
            const isAllowed = allowedUrls.some(allowedUrl => {
                return url.hostname === allowedUrl || url.hostname.endsWith('.' + allowedUrl);
            });
            
            return !isAllowed;
        } catch (e) {
            return false;
        }
    }

    let modal = document.getElementById('customModal');
    
    if (!modal) {
        const modalHTML = `
        <div id="customModal" class="modal">
            <div class="modal-content">
                <img src="https://raw.githubusercontent.com/Grouvex/grouvex.github.io/refs/heads/main/img/Grouvex1.png" alt="Logo" class="modal-logo">
                <div class="modal-text">
                    <p>Estás a punto de salir de <strong>Grouvex Studios</strong>. Grouvex Studios no se responsabiliza por el contenido, la seguridad, las políticas de privacidad o las prácticas de los sitios de terceros, fuera del dominio.</p>
                    <p>Si le da a Cancelar, permanecerá dentro de Grouvex Studios.</p>
                    <p>Si le da a Continuar, se le redirigirá a la página seleccionada.</p>
                </div>
                <div class="modal-buttons">
                    <button class="modal-button cancel">Cancelar</button>
                    <button class="modal-button continue">Continuar</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('customModal');
    }

    let targetLink = null;
    let targetAttribute = null;

    const cancelButton = modal?.querySelector('.cancel');
    const continueButton = modal?.querySelector('.continue');

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
            targetLink = null;
            targetAttribute = null;
        });
    }

    if (continueButton) {
        continueButton.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
            if (targetLink) {
                if (targetAttribute === '_blank') {
                    window.open(targetLink, '_blank');
                } else {
                    window.location.href = targetLink;
                }
                targetLink = null;
                targetAttribute = null;
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                targetLink = null;
                targetAttribute = null;
            }
        });
    }

    document.addEventListener('click', function(event) {
        const element = event.target.closest('[href]');
        if (element) {
            const href = element.getAttribute('href');
            
            if (href && isExternalLink(href)) {
                event.preventDefault();
                targetLink = href;
                targetAttribute = element.getAttribute('target');
                
                if (modal) {
                    modal.style.display = 'block';
                }
            }
        }
    });

    const originalWindowOpen = window.open;
    window.open = function(url, target, features) {
        if (url && isExternalLink(url)) {
            targetLink = url;
            targetAttribute = target || '_self';
            
            if (modal) {
                modal.style.display = 'block';
            }
            return null;
        }
        return originalWindowOpen(url, target, features);
    };
})();

// ============================================
// FLOATING HELP BUTTON
// ============================================
(function() {
    const mainBtn = document.getElementById('main-floating-btn');
    const helpBtn = document.getElementById('help-btn');
    const helpContent = document.getElementById('help-content');
    let subButtonsVisible = false;
    
    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            subButtonsVisible = !subButtonsVisible;
            
            document.querySelectorAll('.sub-btn').forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.toggle('show', subButtonsVisible);
                }, index * 100);
            });
            
            const icon = mainBtn.querySelector('i');
            if (icon) {
                icon.style.transform = subButtonsVisible ? 'rotate(45deg)' : 'rotate(0)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            e.stopPropagation();
        });
    }
    
    if (helpBtn && helpContent) {
        helpBtn.addEventListener('click', function(e) {
            hideAllContent();
            helpContent.classList.add('active');
            
            if (subButtonsVisible) {
                subButtonsVisible = false;
                document.querySelectorAll('.sub-btn').forEach(btn => {
                    btn.classList.remove('show');
                });
                const icon = mainBtn?.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0)';
            }
            
            e.stopPropagation();
        });
    }
    
    window.showHelpContent = function() {
        hideAllContent();
        if (helpContent) helpContent.classList.add('active');
    };
    
    window.showContent = function(contentId) {
        hideAllContent();
        const content = document.getElementById(contentId);
        if (content) content.classList.add('active');
    };
    
    window.hideAllContent = function() {
        document.querySelectorAll('.content-container').forEach(content => {
            content.classList.remove('active');
        });
    };
    
    document.addEventListener('click', function(e) {
        const contentContainers = document.querySelectorAll('.content-container');
        let isClickInsideContent = false;
        
        contentContainers.forEach(container => {
            if (container.classList.contains('active') && container.contains(e.target)) {
                isClickInsideContent = true;
            }
        });
        
        if (mainBtn && (e.target === mainBtn || mainBtn.contains(e.target))) {
            isClickInsideContent = true;
        }
        if (helpBtn && (e.target === helpBtn || helpBtn.contains(e.target))) {
            isClickInsideContent = true;
        }
        
        if (!isClickInsideContent) {
            hideAllContent();
            
            if (subButtonsVisible && mainBtn) {
                subButtonsVisible = false;
                document.querySelectorAll('.sub-btn').forEach(btn => {
                    btn.classList.remove('show');
                });
                const icon = mainBtn.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0)';
            }
        }
    });
    
    document.querySelectorAll('.content-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
})();

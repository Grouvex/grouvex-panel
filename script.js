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
const BASE_APPS_SCRIPT_URL = GAS_API_URL;
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
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize UI elements
    initializeUI();
    
    // Start time counters
    startTimeCounters();
});

function initializeUI() {
    // Tab switching
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        unverifiedWarning.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });
    
    // Profile description counter
    if (registerProfileDescriptionInput) {
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
    if (enableStripeCheckbox) {
        enableStripeCheckbox.addEventListener('change', toggleStripeSection);
        toggleStripeSection();
    }
    
    // Event listeners for buttons
    loginBtn.addEventListener('click', handleLogin);
    registerBtn.addEventListener('click', handleRegister);
    logoutBtn.addEventListener('click', handleLogout);
    memberPortalBtn.addEventListener('click', openMemberPortal);
    staffPortalBtn.addEventListener('click', openStaffPortal);
    searchOtherBtn.addEventListener('click', searchOtherMember);
    
    // Enter key press
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
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
        userEmail.textContent = user.email;
        
        // Show dashboard
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        userDashboard.classList.remove('hidden');
        loginForm.classList.add('hidden');
        authtabs.classList.add('hidden');
        registerForm.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        
        // Hide staff features by default (they will be enabled if user is staff)
        staffPortalBtn.classList.add('hidden');
        searchOtherBtn.classList.add('hidden');
        staffBadge.classList.add('hidden');
        verifiedTeamBadge.classList.add('hidden');
        
    } else {
        // No user signed in
        currentUser = null;
        isStaff = false;
        isVerifiedTeam = false;
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        userDashboard.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authtabs.classList.remove('hidden');
        registerForm.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        unverifiedWarning.classList.add('hidden');
        
        // Clear inputs
        clearInputs();
    }
});

// ============================================
// LOGIN HANDLER
// ============================================
function handleLogin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
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
    unverifiedWarning.classList.add('hidden');
    
    loginText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    loginBtn.disabled = true;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await user.reload();
            
            if (!user.emailVerified) {
                unverifiedWarning.classList.remove('hidden');
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
                
                const existingBtn = emailError.parentNode.querySelector('.resend-verification-btn');
                if (existingBtn) existingBtn.remove();
                emailError.parentNode.appendChild(resendBtn);
                
                loginText.classList.remove('hidden');
                loginSpinner.classList.add('hidden');
                loginBtn.disabled = false;
                return;
            }
            
            // Login successful
            userEmail.textContent = user.email;
            
            loginForm.classList.remove('active');
            registerForm.classList.remove('active');
            userDashboard.classList.remove('hidden');
            loginForm.classList.add('hidden');
            authtabs.classList.add('hidden');
            registerForm.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            
        })
        .catch((error) => {
            loginText.classList.remove('hidden');
            loginSpinner.classList.add('hidden');
            loginBtn.disabled = false;
            
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
    
    registerText.classList.add('hidden');
    registerSpinner.classList.remove('hidden');
    registerBtn.disabled = true;
    
    console.log("Enviando datos de registro:", formData);
    
    google.script.run
        .withSuccessHandler(handleRegistrationSuccess)
        .withFailureHandler(handleRegistrationError)
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
    
    if (!formData.phonePrefix) {
        errors.phone = "❌ Por favor selecciona el prefijo del teléfono";
        isValid = false;
    }
    if (!formData.phone) {
        errors.phone = errors.phone ? errors.phone + " y " : "❌ ";
        errors.phone += "ingresa tu número de teléfono";
        isValid = false;
    } else if (!isValidPhone(formData.phone)) {
        errors.phone = "❌ Por favor ingresa un número de teléfono válido";
        isValid = false;
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
    
    if (formData.profileDescription.length > 200) {
        errors.profileDescription = "❌ La descripción no puede exceder los 200 caracteres";
        isValid = false;
    }
    
    return { isValid, errors };
}

function showValidationErrors(errors) {
    hideError(registerEmailError);
    hideError(registerPasswordError);
    hideError(registerConfirmPasswordError);
    hideError(registerUsernameError);
    hideError(registerPhoneError);
    hideError(registerAddressError);
    hideError(registerCityError);
    hideError(registerPostalCodeError);
    hideError(registerClientNameError);
    hideError(registerClientEmailError);
    hideError(registerFullNameError);
    hideError(registerConflictResolutionError);
    hideError(registerContactRightsError);
    hideError(registerOtherRightsError);
    hideError(registerAcceptTermsError);
    hideError(registerProfileDescriptionError);
    hideError(registerInfoToShowError);
    
    if (errors.email) showError(registerEmailError, errors.email);
    if (errors.password) showError(registerPasswordError, errors.password);
    if (errors.confirmPassword) showError(registerConfirmPasswordError, errors.confirmPassword);
    if (errors.phone) showError(registerPhoneError, errors.phone);
    if (errors.city) showError(registerCityError, errors.city);
    if (errors.postalCode) showError(registerPostalCodeError, errors.postalCode);
    if (errors.clientName) showError(registerClientNameError, errors.clientName);
    if (errors.clientEmail) showError(registerClientEmailError, errors.clientEmail);
    if (errors.fullName) showError(registerFullNameError, errors.fullName);
    if (errors.conflictResolution) showError(registerConflictResolutionError, errors.conflictResolution);
    if (errors.acceptTerms) showError(registerAcceptTermsError, errors.acceptTerms);
    if (errors.profileDescription) showError(registerProfileDescriptionError, errors.profileDescription);
    
    const firstErrorElement = document.querySelector('.error-message[style*="display: block"]');
    if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function handleRegistrationSuccess(result) {
    console.log("Respuesta del servidor:", result);
    
    registerText.classList.remove('hidden');
    registerSpinner.classList.add('hidden');
    registerBtn.disabled = false;
    
    if (result.success) {
        if (result.requiresVerification) {
            showVerificationPendingScreen(result);
        } else {
            alert("🎉 " + result.message);
            loginTab.click();
            clearRegisterForm();
        }
    } else {
        alert("❌ " + result.message);
    }
}

function handleRegistrationError(error) {
    console.error("Error en registro:", error);
    
    registerText.classList.remove('hidden');
    registerSpinner.classList.add('hidden');
    registerBtn.disabled = false;
    
    alert('❌ Error de conexión: ' + error);
}

// ============================================
// PORTAL NAVIGATION
// ============================================
function openMemberPortal() {
    if (!currentUser) return;
    
    const url = `${WEB_LINK}member`;
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
        const url = `${WEB_LINK}member`;
        window.open(url);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function showError(element, message) {
    if (element) {
        element.textContent = message;
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
    if (!registerForm) return;
    
    registerForm.innerHTML = `
        <div class="text-center py-8">
            <div class="mb-6">
                <i class="fas fa-envelope text-5xl text-secondary mb-4"></i>
                <h2 class="text-2xl font-bold text-secondary mb-2">Verificación Requerida</h2>
                <p class="text-light">Hemos enviado un correo de verificación a:</p>
                <p class="text-xl font-bold text-secondary mt-2">${result.userEmail || ''}</p>
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
    
    document.getElementById('checkVerificationBtn')?.addEventListener('click', () => {
        checkEmailVerification(result.userId, result.userEmail);
    });
    
    document.getElementById('resendEmailBtn')?.addEventListener('click', () => {
        resendVerificationEmail(result.userId, result.userEmail);
    });
    
    document.getElementById('backToRegisterBtn')?.addEventListener('click', () => {
        location.reload();
    });
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
                loginTab.click();
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
            alert("✅ Email de verificación reenviado a " + userEmail);
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
// TIME COUNTERS (replacing <?!= ... ?>)
// ============================================
function startTimeCounters() {
    const webStatusMessages = document.getElementById('webStatusMessages');
    if (!webStatusMessages) return;
    
    // These timestamps would come from your backend normally
    // For now, we'll use placeholder logic
    const webCloseTimestamp = 1764099000; // Example timestamp
    const webOpenTimestamp = 1764522000; // Example timestamp
    
    function updateCounters() {
        const now = Math.floor(Date.now() / 1000);
        let messages = '';
        
        // Close counter
        const closeDiff = webCloseTimestamp - now;
        if (closeDiff > 0) {
            const days = Math.floor(closeDiff / (60 * 60 * 24));
            const hours = Math.floor((closeDiff % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((closeDiff % (60 * 60)) / 60);
            const seconds = closeDiff % 60;
            
            messages += `<div>Se cierra el Portal de Miembros por Mantenimientos: ${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}min:${padZero(seconds)}s</div>`;
        } else {
            messages += `<div>Portal de Miembros Cerrado</div>`;
        }
        
        // Open counter
        const openDiff = webOpenTimestamp - now;
        if (openDiff > 0) {
            const days = Math.floor(openDiff / (60 * 60 * 24));
            const hours = Math.floor((openDiff % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((openDiff % (60 * 60)) / 60);
            const seconds = openDiff % 60;
            
            messages += `<div>Se abre el Portal de Miembros, cerrado por Mantenimientos: ${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}min:${padZero(seconds)}s</div>`;
        } else {
            messages += `<div>Portal de Miembros Abierto</div>`;
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
// EXTERNAL LINK MODAL (original code preserved)
// ============================================
(function() {
    const allowedUrls = [
        'www.grouvex.com',
        'grouvex.com', 
        'grouvex.github.io',
        GAS_API_URL,
        'https://drive.google.com/drive/folders/1d9RgDnoGOU9ce2bf9gvUxByZtgzQOBnT?usp=drive_link'
    ];

    function isExternalLink(href) {
        if (!href) return false;
        try {
            const url = new URL(href, window.location.origin);
            
            const isAllowed = allowedUrls.some(allowedUrl => {
                if (!allowedUrl.includes('://')) {
                    return url.hostname === allowedUrl;
                } else {
                    return url.href === allowedUrl || url.href.startsWith(allowedUrl);
                }
            });
            
            return !isAllowed;
        } catch (e) {
            return false;
        }
    }

    // Create modal if it doesn't exist
    let modal = document.getElementById('customModal');
    
    if (!modal) {
        const modalHTML = `
        <div id="customModal" class="modal">
            <div class="modal-content">
                <img src="https://raw.githubusercontent.com/Grouvex/grouvex.github.io/refs/heads/main/img/Grouvex1.png" alt="Logo" class="modal-logo">
                <div class="modal-text">
                    <p>Estás a punto de salir de <n>Grouvex Studios</n>. Grouvex Studios no se responsabiliza por el contenido, la seguridad, las políticas de privacidad o las prácticas de los sitios de terceros, fuera del dominio, puesto que los Términos de Servicio y Políticas de Privacidad, de Grouvex Studios, solo tienen validez dentro del dominio o donde el equipo tenga permiso para actuar.</p>
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

    // Modal buttons
    const cancelButton = modal?.querySelector('.cancel');
    const continueButton = modal?.querySelector('.continue');

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            modal.style.display = 'none';
            targetLink = null;
            targetAttribute = null;
        });
    }

    if (continueButton) {
        continueButton.addEventListener('click', function() {
            if (targetLink) {
                modal.style.display = 'none';
                
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

    // Intercept clicks on links
    document.addEventListener('click', function(event) {
        const element = event.target.closest('[href]');
        if (element) {
            const href = element.getAttribute('href');
            
            if (isExternalLink(href)) {
                event.preventDefault();
                targetLink = href;
                targetAttribute = element.getAttribute('target');
                
                if (modal) {
                    modal.style.display = 'block';
                }
            }
        }
    });

    // Intercept window.open
    const originalWindowOpen = window.open;
    window.open = function(url, target, features) {
        if (isExternalLink(url)) {
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
    
    // Setup help navigation
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
    
    // Close when clicking outside
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
    
    // Prevent propagation
    document.querySelectorAll('.content-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
})();




      // ============================================
// FUNCIÓN PARA MOSTRAR LOS DATOS DEL ARTISTA
// ============================================
function displayArtistData(artistData) {
  console.log("🎨 Mostrando datos del artista:", artistData);
  
  // Verificar si hay datos válidos
  if (!artistData || !artistData.found) {
    console.error("❌ No se encontraron datos del artista");
    return;
  }
  
  // ============================================
  // MOSTRAR INFORMACIÓN BÁSICA DEL ARTISTA
  // ============================================
  
  // Nombre de usuario
  const usernameElement = document.getElementById('artist-username');
  if (usernameElement) {
    usernameElement.textContent = artistData.username || 'Sin nombre';
  }
  
  // Email
  const emailElement = document.getElementById('artist-email');
  if (emailElement) {
    emailElement.textContent = artistData.email || 'Sin email';
  }
  
  // Descripción del perfil
  const descriptionElement = document.getElementById('artist-description');
  if (descriptionElement) {
    descriptionElement.textContent = artistData.profileDescription || 'Sin descripción';
  }
  
  // Tipo de perfil (Público/Privado)
  const profileTypeElement = document.getElementById('profile-type');
  if (profileTypeElement) {
    profileTypeElement.textContent = artistData.profileType || 'Público';
  }
  
  // ============================================
  // MOSTRAR REDES SOCIALES
  // ============================================
  
  // Instagram
  const instagramElement = document.getElementById('artist-instagram');
  if (instagramElement && artistData.instagram) {
    instagramElement.href = `https://instagram.com/${artistData.instagram.replace('@', '')}`;
    instagramElement.textContent = artistData.instagram;
    instagramElement.style.display = 'inline-flex';
  } else if (instagramElement) {
    instagramElement.style.display = 'none';
  }
  
  // TikTok
  const tiktokElement = document.getElementById('artist-tiktok');
  if (tiktokElement && artistData.tiktok) {
    tiktokElement.href = `https://tiktok.com/@${artistData.tiktok.replace('@', '')}`;
    tiktokElement.textContent = artistData.tiktok;
    tiktokElement.style.display = 'inline-flex';
  } else if (tiktokElement) {
    tiktokElement.style.display = 'none';
  }
  
  // YouTube
  const youtubeElement = document.getElementById('artist-youtube');
  if (youtubeElement && artistData.youtube) {
    youtubeElement.href = `https://youtube.com/@${artistData.youtube.replace('@', '')}`;
    youtubeElement.textContent = artistData.youtube;
    youtubeElement.style.display = 'inline-flex';
  } else if (youtubeElement) {
    youtubeElement.style.display = 'none';
  }
  
  // Discord
  const discordElement = document.getElementById('artist-discord');
  if (discordElement && artistData.discord) {
    discordElement.textContent = artistData.discord;
    discordElement.style.display = 'inline-flex';
  } else if (discordElement) {
    discordElement.style.display = 'none';
  }
  
  // X (Twitter)
  const xElement = document.getElementById('artist-x');
  if (xElement && artistData.x) {
    xElement.href = `https://twitter.com/${artistData.x.replace('@', '')}`;
    xElement.textContent = artistData.x;
    xElement.style.display = 'inline-flex';
  } else if (xElement) {
    xElement.style.display = 'none';
  }
  
  // Facebook
  const facebookElement = document.getElementById('artist-facebook');
  if (facebookElement && artistData.facebook) {
    facebookElement.href = `https://facebook.com/${artistData.facebook}`;
    facebookElement.textContent = artistData.facebook;
    facebookElement.style.display = 'inline-flex';
  } else if (facebookElement) {
    facebookElement.style.display = 'none';
  }
  
  // ============================================
  // MOSTRAR INSIGNIAS (LO NUEVO)
  // ============================================
  const insigniasContainer = document.getElementById('insignias-container');
  if (insigniasContainer) {
    const insigniaUrls = artistData.insignias || [];
    
    if (insigniaUrls.length > 0) {
      insigniasContainer.innerHTML = insigniaUrls.map(url => 
        `<img src="${url}" alt="Insignia del usuario" class="insignia-image" style="width: 20px; height: 20px; flex-shrink: 0; margin-right: 4px;">`
      ).join('');
      insigniasContainer.style.display = 'flex';
    } else {
      insigniasContainer.style.display = 'none';
      insigniasContainer.innerHTML = '';
    }
  }
  
  // ============================================
  // MOSTRAR INFORMACIÓN ADICIONAL
  // ============================================
  
  // Fecha de registro
  const createdAtElement = document.getElementById('artist-created-at');
  if (createdAtElement && artistData.timestamp) {
    const date = new Date(artistData.timestamp);
    createdAtElement.textContent = date.toLocaleDateString('es-ES');
  }
  
  // Info que muestra (si es relevante)
  const infoToShowElement = document.getElementById('artist-info-to-show');
  if (infoToShowElement && artistData.infoToShow) {
    infoToShowElement.textContent = artistData.infoToShow;
  }
  
  console.log("✅ Datos del artista mostrados correctamente");
}

// ============================================
// FUNCIÓN PARA CARGAR LOS DATOS DESDE LA API
// ============================================
function loadArtistData(userId) {
  console.log("📡 Cargando datos del artista:", userId);
  
  if (!userId) {
    console.error("❌ No se proporcionó userId");
    return;
  }
  
  // Mostrar loading
  const loadingElement = document.getElementById('loading-spinner');
  if (loadingElement) {
    loadingElement.style.display = 'block';
  }
  
  // Usando el simulador de google.script.run que ya tienes
  google.script.run
    .withSuccessHandler(function(response) {
      console.log("✅ Respuesta recibida:", response);
      
      // Ocultar loading
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      // Procesar la respuesta
      if (response.status === 'success') {
        displayArtistData(response.result);
      } else if (response.found !== undefined) {
        // Si la respuesta es directamente el objeto del artista
        displayArtistData(response);
      } else {
        console.error("❌ Error en la respuesta:", response);
        showError("No se pudieron cargar los datos del artista");
      }
    })
    .withFailureHandler(function(error) {
      console.error("❌ Error en la llamada API:", error);
      
      // Ocultar loading
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      showError("Error de conexión con el servidor");
    })
    .getArtistData(userId);
}

// ============================================
// FUNCIÓN PARA MOSTRAR ERRORES
// ============================================
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  } else {
    alert(message);
  }
}

// ============================================
// INICIALIZAR CUANDO CARGA LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 Página cargada, inicializando...");
  
  // Obtener el ID del usuario desde la URL (ej: ?id=GS-123)
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id') || urlParams.get('userId');
  
  if (userId) {
    loadArtistData(userId);
  } else {
    console.warn("⚠️ No se encontró userId en la URL");
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = "No se especificó un usuario";
      errorElement.style.display = 'block';
    }
  }
});

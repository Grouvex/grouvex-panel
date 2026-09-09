//!function(){'use strict';const n=(m,t="🚫 ACCIÓN BLOQUEADA")=>{const e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);z-index:2147483647;display:flex;align-items:center;justify-content:center;color:#ff4444;font-family:Arial,sans-serif;text-align:center;flex-direction:column;backdrop-filter:blur(5px)",e.innerHTML=`<div style="font-size:28px;font-weight:bold;margin-bottom:15px">${t}</div><div style="font-size:16px;color:#ff9999;max-width:80%;margin:0 auto">${m}</div><div style="font-size:12px;color:#ccc;margin-top:25px">Desaparece en <span id="cnt">10</span>s</div>`,document.body.appendChild(e);let s=10;const i=setInterval(()=>{s--,document.getElementById("cnt")&&(document.getElementById("cnt").textContent=s),s<=0&&(clearInterval(i),e.remove())},1e3)};document.addEventListener("keydown",e=>{if(e.key==="p"&&(e.ctrlKey||e.metaKey))return e.preventDefault(),e.stopImmediatePropagation(),n("No se permite imprimir esta página","🚫 IMPRESIÓN BLOQUEADA"),!1;if((e.ctrlKey&&e.shiftKey&&(e.key==="I"||e.key==="J"||e.key==="C"||e.key==="U"))||e.key==="F12"||e.keyCode===123)return e.preventDefault(),e.stopImmediatePropagation(),n("Acceso restringido","🔧 ACCIÓN BLOQUEADA"),!1},!0);["copy","cut","paste","contextmenu","selectstart","dragstart"].forEach(e=>{document.addEventListener(e,t=>{t.preventDefault(),t.stopImmediatePropagation()},!0)});const e=document.createElement("style");e.textContent="*{user-select:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important}input,textarea,[contenteditable]{user-select:text!important}@media print{*{display:none!important}body::before{content:'IMPRESIÓN BLOQUEADA';display:block!important;font-size:24px;color:red;text-align:center;margin-top:100px;font-weight:bold}}",document.head.appendChild(e);window.matchMedia("print").addListener(t=>{t.matches&&n("No se permite imprimir esta página","🚫 IMPRESIÓN BLOQUEADA")});setInterval(()=>{try{const e=performance.now();let t=0;for(let n=0;n<5e5;n++)t+=Math.random();performance.now()-e>500&&n("Comportamiento inusual detectado","⚠️ ADVERTENCIA")}catch{}},5e3);document.addEventListener("visibilitychange",()=>{document.hidden&&setTimeout(()=>{n("La página fue minimizada","📋 ATENCIÓN")},500)})}();
// ============================================
// EXTERNAL LINK MODAL (original code preserved)
// ============================================
(function() {
    const allowedUrls = [
        'www.grouvex.com',
        'grouvex.com',
        'records.grouvex.com',
        'panel.grouvex.com',
        'grouvex.github.io',
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

/// Manejo de Permisos y Notificaciones
const PERMISOS_FUNCIONES = {
  // CUALQUIERA o TODAS
  "testAdminConnection": {
    insignias: ["verified", "verified-team", ["developer", "verified-developer-a"], ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "ejecutarSetMailbox": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "ejecutarGetMailbox": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "ejecutarManageCategory": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "enviarRespuestaConPlantilla": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "prepararYEnviarComunicado": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "enviarRespuestaConPlantillaMejorada": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "loadUserFields": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "searchArtistas": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "viewUserProfile": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "viewArtistaProfile": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "applyQuickEdits": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "applyQuickEditsArtistas": {
    insignias: ["verified", "verified-team", ["moderator", "verified-moderator", "employee", "verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "adminCreateNewUser": {
    insignias: ["verified", "verified-team", ["verified-employee", "sistema"]],
    condicion: "TODAS"
  },
  "quickSearchByUid": {
    insignias: ["verified", "verified-team", ["verified-employee", "sistema"]],
    condicion: "TODAS"
  }
};

function showNotification(message, type = 'info', duration = 10000) {
  // 1. Inicializar el almacenamiento interno de la función si no existe
  showNotification.maxVisible = 5;
  showNotification.active = showNotification.active || [];
  showNotification.queue = showNotification.queue || [];

  // Configuración de estilos y tipografías por cada tipo
  const typesConfig = {
    success:   { bg: '#28a745', icon: 'fa-check-circle' },
    error:     { bg: '#dc3545', icon: 'fa-exclamation-circle' },
    forbidden: { bg: '#a71d2a', icon: 'fa-ban' },
    warning:   { bg: '#ffc107', color: '#1f2d3d', icon: 'fa-exclamation-triangle' },
    info:      { bg: '#17a2b8', icon: 'fa-info-circle' },
    primary:   { bg: '#007bff', icon: 'fa-bell' },
    question:  { bg: '#6f42c1', icon: 'fa-question-circle' },
    loading:   { bg: '#6c757d', icon: 'fa-spinner fa-spin' }
  };

  // 2. Función interna que se encarga de crear y renderizar el DOM
  const render = (msg, t, dur) => {
    // Asegurar que exista el contenedor de la pila
    let container = document.getElementById('notification-stack-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-stack-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 2147483647;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const config = typesConfig[t] || typesConfig.info;
    const notification = document.createElement('div');
    
    // Generador de ID único ultra seguro e independiente del reloj del sistema
    const id = 'notif_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();

    notification.style.cssText = `
      position: relative;
      padding: 14px 20px 18px 20px;
      background: ${config.bg};
      color: ${config.color || 'white'};
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      animation: slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      pointer-events: auto;
      width: 310px;
      overflow: hidden;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <i class="fas ${config.icon}" style="margin-right: 10px; font-size: 1.1em;"></i>
        <span style="font-size: 0.88rem; line-height: 1.4; font-weight: 500;">${msg}</span>
      </div>
      <div class="notification-progress-bar" style="
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background: ${t === 'warning' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.4)'};
        transform-origin: left;
        transform: scaleX(1);
        transition: transform ${dur}ms linear;
      "></div>
    `;
    
    container.appendChild(notification);
    showNotification.active.push({ id, element: notification });

    // Corrección de la barra de progreso: Forzar layout síncrono antes de mutar la propiedad CSS
    requestAnimationFrame(() => {
      const bar = notification.querySelector('.notification-progress-bar');
      if (bar) {
        // Forzamos un reflow/layout del DOM de forma explícita leyendo offsetWidth
        void bar.offsetWidth; 
        bar.style.transform = 'scaleX(0)';
      }
    });

    // Manejar el tiempo de vida de forma aislada
    const lifeTimer = setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
      
      setTimeout(() => {
        notification.remove();
        showNotification.active = showNotification.active.filter(n => n.id !== id);
        
        // Si hay elementos esperando en la cola, procesamos el siguiente de manera limpia
        if (showNotification.queue.length > 0) {
          const next = showNotification.queue.shift();
          render(next.message, next.type, next.duration);
        }
      }, 300);
    }, dur);

    // Guardamos el timer de vida para evitar colisiones en limpiezas asíncronas masivas
    notification.dataset.timerId = lifeTimer;
  };

  // 3. Lógica de control de flujo (Pila / Cola)
  if (showNotification.active.length < showNotification.maxVisible) {
    render(message, type, duration);
  } else {
    showNotification.queue.push({ message, type, duration });
  }
}

function verificadoPermisos(nombreFuncion) {
  // Si no se le pasa ningún nombre, lo detecta automáticamente usando el stack trace
  if (!nombreFuncion) {
    const errorMsg = "No se ha podido completar la verificación de permisos.";
    // Mostramos la notificación visual de error inmediatamente
    showNotification(errorMsg, "error");
    // Rechazamos la promesa con throw para detener por completo la ejecución de la función padre
    throw new Error(errorMsg);
  }

  return new Promise((resolve) => {
    // Si no hay ningún usuario logueado en la variable global, denegamos el acceso
    if (typeof currentUser === 'undefined' || !currentUser) {
      console.warn("Intento de verificación sin usuario activo.");
      insigniasCache = [];
      procesarBloqueosVisuales([]);
      return resolve(false);
    }

    const fullUserId = `GS-${currentUser.uid}`;
    const configuracionPermiso = PERMISOS_FUNCIONES[nombreFuncion];

    // Si la función no existe en nuestro mapa de permisos
    if (!configuracionPermiso) {
      console.error(`La función '${nombreFuncion}' no tiene permisos configurados.`);
      return resolve(false);
    }

    // 1. MOSTRAR NOTIFICACIÓN DE CARGA / VALIDACIÓN
    showNotification("Verificando permisos de acceso...", "loading");
    
    // Capturamos el elemento recién creado en el DOM para poder quitarlo manualmente después
    const loadingNotification = document.body.lastElementChild;

    // Función auxiliar para limpiar la notificación de carga
    const removeLoadingNotification = () => {
      if (loadingNotification && loadingNotification.parentNode === document.body) {
        loadingNotification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => loadingNotification.remove(), 300);
      }
    };

    // 2. Llamada al backend de Google Apps Script
    google.script.run
      .withSuccessHandler(function(insignias) {
        // Quitamos la notificación de carga tan pronto como responde el servidor
        removeLoadingNotification();

        if (insignias && Array.isArray(insignias) && insignias.length > 0) {
          // Extraemos los nombres de las insignias del usuario (con soporte para .nombre o .name)
          const nombresInsigniasUsuario = insignias.map(ins => ins.nombre || ins.name).filter(Boolean);
          
          const requeridas = configuracionPermiso.insignias;
          const condicion = configuracionPermiso.condicion;
          let tienePermiso = false;

          // Evaluamos según la condición configurada
          if (condicion === "TODAS") {
            // El usuario debe cumplir con cada uno de los elementos de la lista
            tienePermiso = requeridas.every(insigniaRequerida => {
              if (Array.isArray(insigniaRequerida)) {
                // Si es un sub-array (grupo "O"), el usuario debe tener al menos una de estas opciones
                return insigniaRequerida.some(subInsignia => nombresInsigniasUsuario.includes(subInsignia));
              } else {
                // Si es un texto directo, debe tenerlo obligatoriamente
                return nombresInsigniasUsuario.includes(insigniaRequerida);
              }
            });
          } else {
            // "CUALQUIERA": Basta con que cumpla una sola de las condiciones de la lista superior
            tienePermiso = requeridas.some(insigniaRequerida => {
              if (Array.isArray(insigniaRequerida)) {
                return insigniaRequerida.some(subInsignia => nombresInsigniasUsuario.includes(subInsignia));
              } else {
                return nombresInsigniasUsuario.includes(insigniaRequerida);
              }
            });
          }

          resolve(tienePermiso);
        } else {
          resolve(false); // El usuario no tiene insignias
        }
      })
      .withFailureHandler(function(error) {
        removeLoadingNotification();
        
        console.error("Error al obtener insignias del servidor:", error);
        resolve(false); // Denegamos por seguridad ante fallos de conexión
      })
      .getArtistInsignias(fullUserId);
  });
}
/**
async function miFuncion(parametros) {
  try {
    // 1. Comprobamos permisos asíncronamente
    const accesoPermitido = await verificadoPermisos("miFuncion");

    if (!accesoPermitido) {
      showNotification("No tienes los permisos necesarios para realizar esta acción.", "forbidden");
      return; 
    }
    // Tu lógica de negocio aquí...

  } catch (error) {
    console.error("Error crítico durante la ejecución de miFuncion:", error);
    showNotification("Ocurrió un error inesperado al procesar la solicitud.", "error");
  }
}
*/


/**
 * ============================================================================
 * 🛡️ SISTEMA GENERALIZADO DE SEGURIDAD Y CONTROL DE INTERFAZ (UI) EN TIEMPO REAL
 * ============================================================================
 * 
 * ¿CÓMO FUNCIONA ESTE SISTEMA?
 * ----------------------------
 * 1. El sistema NO utiliza almacenamiento en caché (memoria intermedia). Cada vez
 *    que se ejecuta la función `verificadoInsignias()`, se realiza una consulta
 *    asíncrona directa mediante `google.script.run` al servidor.
 * 2. El backend lee las celdas y filas asociadas al ID del usuario actual de Firebase 
 *    directamente desde tu Hoja de Cálculo (Google Sheets) en ese preciso instante.
 * 3. Si modificas, añades o quitas rangos/insignias manualmente en la Hoja de Cálculo,
 *    el cambio se verá reflejado en la web la próxima vez que se evalúe la interfaz, 
 *    sin riesgo de mostrar datos obsoletos.
 * 
 * ¿QUÉ TIPOS DE SELECTORES PUEDO USAR?
 * -------------------------------------
 * Al ser un motor generalizado con `querySelectorAll`, el primer parámetro acepta
 * cualquier selector de CSS estándar. Puede afectar a un solo elemento o a grupos masivos:
 *   - Por ID:        "#miBotonUnico"       -> Afecta solo a ese elemento.
 *   - Por Clase:     ".zona-premium"       -> Afecta a TODOS los elementos con esa clase.
 *   - Por Etiqueta:  "input"               -> Afecta a todos los inputs de la página.
 *   - Compuestos:    "form.admin button"   -> Botones dentro del formulario ".admin".
 * 
 * ============================================================================
 * 🚫 CATÁLOGO DE BLOQUEOS JAVASCRIPT DISPONIBLES (Tercer Parámetro)
 * ============================================================================
 * Todos los bloqueos se aplican mediante manipulación profunda del DOM y eventos nativos 
 * con JS puro, garantizando que el usuario no pueda saltárselos simplemente desactivando 
 * o modificando CSS externo.
 * 
 * 1. "hide" / "hidden" (Ocultado Estricto)
 *    - Qué hace: Aplica un estilo `display: none !important` directo al elemento 
 *                y añade el atributo de accesibilidad `aria-hidden="true"`.
 *    - Uso ideal: Secciones completas del panel, menús de navegación o módulos enteros.
 * 
 * 2. "disable" / "disabled" (Deshabilitado de Interacción)
 *    - Qué hace: Si es un elemento nativo (button, input), le aplica la propiedad `.disabled = true`.
 *                Si es un contenedor genérico (div, span), le quita el foco de teclado (`tabindex="-1"`),
 *                reduce su opacidad al 50% y apaga sus eventos físicos (`pointer-events: none`).
 *    - Uso ideal: Botones de acción, interruptores, selectores o formularios que quieres que vean pero no usen.
 * 
 * 3. "readonly" (Modo Lectura Avanzado)
 *    - Qué hace: En inputs de texto, activa la propiedad nativa `readOnly`. En contenedores de texto 
 *                o editores enriquecidos, desactiva el atributo `contenteditable`, bloquea la selección 
 *                de texto (`user-select: none`) y congela interacciones.
 *    - Uso ideal: Inputs que muestran configuraciones, tokens o datos que el usuario puede copiar/ver pero no editar.
 * 
 * 4. "no-click" / "lock-events" (Secuestro Defensivo de Eventos)
 *    - Qué hace: Agrega escuchadores (Listeners) en la fase de CAPTURA profunda de JS para los eventos 
 *                'click', 'mousedown' y 'keydown'. Intercepta el evento antes de que llegue al elemento
 *                y lo destruye con `stopImmediatePropagation()`. Además, cambia el cursor a `not-allowed`.
 *    - Uso ideal: Enlaces (`<a>`), elementos con eventos previamente asignados por otras librerías, o spans interactivos.
 * 
 * 5. "blur" (Filtro Anti-Miradas / Modo Premium)
 *    - Qué hace: Aplica un filtro de desenfoque visual de 5 píxeles mediante estilos en línea de JS, 
 *                haciendo el texto ilegible. Bloquea también la selección de texto y los clicks.
 *    - Uso ideal: Previsualizaciones de paneles estadísticos premium, gráficos o datos sensibles protegidos.
 * 
 * 6. "remove" (Destrucción Estructural)
 *    - Qué hace: Elimina físicamente el elemento del árbol HTML del navegador usando `.remove()`.
 *    - Uso ideal: Datos extremadamente confidenciales. *(⚠️ Nota: Al destruir el elemento, si el usuario 
 *                recupera el permiso en la hoja de cálculo, el elemento no volverá a aparecer mágicamente 
 *                a menos que se refresque la página por completo o se vuelva a renderizar su HTML).*
 * 
 * ============================================================================
 */

// 1. CONFIGURACIÓN DE REGLAS DE ACCESO
const PERMISOS_ACCESOS = {
  "HQ1-cRemove": {
    insignias: ["sistema", "GROUVEX%20Studios%20GCO"],
    condicion: "TODAS"
  },
  "HQ2-cDisabled": {
    insignias: ["moderation", "verified-moderation", "employee", "verified-employee", "sistema", "GROUVEX%20Studios%20GCO"],
    condicion: "CUALQUIERA"
  },
  "inputConfiguracion": {
    insignias: ["Admin"],
    condicion: "TODAS"
  },
  "cierreHoraGS": {
    insignias: ["verified-employee", "sistema", "GROUVEX%20Studios%20GCO"],
    condicion: "CUALQUIERA"
  }
};

// Variable global para almacenar el usuario activo de Firebase
let insigniasCache = null; // Cambiado a null para saber de forma estricta si ya cargaron o no
let ultimoEstadoApertura = undefined; 
let seguridadObserver = null;

function activarObservadorSeguridad() {
  if (seguridadObserver) return;

  const config = { childList: true, subtree: true };

  seguridadObserver = new MutationObserver(function(mutations) {
    // 🛑 CONTROL CRÍTICO: Si el servidor no ha devuelto las insignias reales,
    // NO dejamos que el observer procese bloqueos visuales a ciegas.
    if (insigniasCache === null) {
      return;
    }

    let soloFueronEliminaciones = true;
    for (let mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        soloFueronEliminaciones = false;
        break; 
      }
    }

    if (soloFueronEliminaciones) {
      return; 
    }

    seguridadObserver.disconnect();
    
    procesarBloqueosVisuales(insigniasCache);
    
    seguridadObserver.observe(document.body, config);
  });

  seguridadObserver.observe(document.body, config);
  console.log("🛡️ MutationObserver optimizado: Modo 'remove' seguro activado.");
}

// ----------------------------------------------------
// 2. ORQUESTADOR GENERALIZADO DE LA INTERFAZ (ULTRA-RÁPIDO)
// ----------------------------------------------------
async function inicializarSeguridadUI() {

  // Activamos el observador desde el inicio de forma segura
  activarObservadorSeguridad();

  if (!currentUser) {
    console.warn("No hay usuario activo. Bloqueando elementos de forma preventiva.");
    insigniasCache = []; // Inicializamos vacío si confirmamos que no hay usuario
    procesarBloqueosVisuales([]);
    return;
  }

  const fullUserId = `GS-${currentUser.uid}`;

  google.script.run
    .withSuccessHandler(function(insigniasServidor) {
      let insigniasFrescas = [];
      if (insigniasServidor && Array.isArray(insigniasServidor)) {
        insigniasFrescas = insigniasServidor.map(ins => ins.nombre || ins.name).filter(Boolean);
      }

      console.log("📊 Insignias frescas recibidas:", insigniasFrescas);
     
      // 1. Guardamos los datos en el caché global primero
      insigniasCache = insigniasFrescas;
      
      // 2. Ahora que el caché no es null, procesamos de forma segura la interfaz
      procesarBloqueosVisuales(insigniasFrescas);
    })
    .withFailureHandler(function(error) {
      console.error("❌ Fallo de red al conectar con Google Apps Script:", error);
      insigniasCache = [];
      procesarBloqueosVisuales([]);
    })
    .getArtistInsignias(fullUserId);
}

/**
 * Sub-función organizadora para listar tus selectores.
 */
function procesarBloqueosVisuales(insigniasUsuario) {
  // Si por alguna razón asíncrona se llama sin datos válidos, abortamos preventivamente
  if (!insigniasUsuario || !Array.isArray(insigniasUsuario)) {
    return;
  }
  
  verificadoInsignias(".HQ1-cRemove", "HQ1-cRemove", "remove", true, insigniasUsuario);
  verificadoInsignias(".HQ2-cDisabled", "HQ2-cDisabled", "disabled", true, insigniasUsuario);
  
  const estaAbierto = ultimoEstadoApertura; 
  const activarEvaluacionPorCierre = !estaAbierto;
  
  verificadoInsignias(".cCierreHora-ROnly", "cierreHoraGS", "readonly", activarEvaluacionPorCierre, insigniasUsuario);
  verificadoInsignias(".cCierreHora-cHidden", "cierreHoraGS", "hidden", activarEvaluacionPorCierre, insigniasUsuario);
  verificadoInsignias(".cCierreHora-cDisabled", "cierreHoraGS", "disabled", activarEvaluacionPorCierre, insigniasUsuario);
}

// ----------------------------------------------------
// 3. FUNCIÓN DE VERIFICACIÓN (CON CONTROL DE ACTIVACIÓN)
// ----------------------------------------------------
function verificadoInsignias(targetHTML, identificadorPermiso, accionBloqueo, activarEvaluacion = true, insigniasUsuario = insigniasCache) {
  // 1. Protección contra parámetros nulos o ausentes
  if (!targetHTML || !identificadorPermiso) {
    console.error("❌ Error de desarrollo: Faltan parámetros obligatorios en verificadoInsignias.");
    return false;
  }

  // Soporte por si se intercambia el orden de los parámetros opcionales
  if (Array.isArray(activarEvaluacion)) {
    insigniasUsuario = activarEvaluacion;
    activarEvaluacion = true;
  }

  let elementos = [];
  let selectorParaLog = "";

  // 2. NORMALIZADOR INTELIGENTE DE ELEMENTOS HTML / SELECTORES
  if (typeof targetHTML === "string") {
    let selector = targetHTML.trim();
    
    if (!selector.startsWith(".") && !selector.startsWith("#") && !selector.includes(" ") && !selector.includes("[")) {
      if (document.getElementById(selector)) {
        selector = `#${selector}`;
      } else {
        selector = `.${selector}`;
      }
    }
    
    selectorParaLog = selector;
    try {
      elementos = Array.from(document.querySelectorAll(selector));
    } catch (e) {
      console.error(`❌ Selector CSS inválido o mal estructurado: "${targetHTML}"`);
      return false;
    }

  } else if (targetHTML instanceof HTMLElement) {
    elementos = [targetHTML];
    selectorParaLog = targetHTML.id ? `#${targetHTML.id}` : `<${targetHTML.tagName.toLowerCase()}>`;

  } else if (targetHTML instanceof NodeList || Array.isArray(targetHTML)) {
    elementos = Array.from(targetHTML).filter(el => el instanceof HTMLElement);
    selectorParaLog = `Colección de [${elementos.length}] elementos`;

  } else {
    console.error("❌ Tipo de objetivo HTML no reconocido. Debe ser un String (Selector), HTMLElement o NodeList.");
    return false;
  }

  // 3. Control de presencia en la página actual
  if (elementos.length === 0) {
    return false; 
  }

  // Si la evaluación está desactivada, vamos directo a desbloquear/restaurar los elementos
  if (activarEvaluacion === false) {
    elementos.forEach(el => gestionarBloqueoJS(el, accionBloqueo, false));
    return true; // Retorna true porque el elemento queda totalmente accesible
  }

  // 4. EVALUACIÓN NORMAL DE RESTRICCIONES (Segura y Optimizada)
  const configuracionPermiso = PERMISOS_ACCESOS[identificadorPermiso];
  if (!configuracionPermiso) {
    console.error(`El identificador de regla '${identificadorPermiso}' no existe en PERMISOS_ACCESOS.`);
    elementos.forEach(el => gestionarBloqueoJS(el, accionBloqueo, true));
    return false;
  }

  const requeridas = configuracionPermiso.insignias;
  const condicion = configuracionPermiso.condicion;
  let tienePermiso = false;

  // Forzamos que insigniasUsuario sea un array limpio para evitar errores de referencia
  const misInsignias = Array.isArray(insigniasUsuario) ? insigniasUsuario : insigniasCache;

  if (condicion === "TODAS") {
    // El usuario debe tener cada una de las insignias requeridas
    tienePermiso = true; 
    for (let i = 0; i < requeridas.length; i++) {
      const req = requeridas[i];
      if (Array.isArray(req)) {
        if (!req.some(sub => misInsignias.includes(sub))) { tienePermiso = false; break; }
      } else {
        if (!misInsignias.includes(req)) { tienePermiso = false; break; }
      }
    }
  } else {
    // Condición CUALQUIERA: Al menos una debe coincidir
    tienePermiso = false;
    for (let i = 0; i < requeridas.length; i++) {
      const req = requeridas[i];
      if (Array.isArray(req)) {
        if (req.some(sub => misInsignias.includes(sub))) { tienePermiso = true; break; }
      } else {
        if (misInsignias.includes(req)) { tienePermiso = true; break; }
      }
    }
  }
  // Si tiene permiso -> NO se bloquea (false). Si NO tiene permiso -> SE bloquea (true).
  let debeBloquearElemento = !tienePermiso;

  // 5. Aplicar o remover el bloqueo en base al cálculo de insignias
  elementos.forEach(el => gestionarBloqueoJS(el, accionBloqueo, debeBloquearElemento));
  return tienePermiso;
}

// ----------------------------------------------------
// 4. MOTOR DE BLOQUEO AVANZADO MEDIANTE JS PURO
// ----------------------------------------------------
function gestionarBloqueoJS(el, accion, aplicarBloqueo) {
  // Validación extra: nos aseguramos que el elemento siga existiendo físicamente en el DOM
  if (!el || !el.setAttribute) return;

  const modo = accion.toLowerCase();

  if (aplicarBloqueo) {
    el.setAttribute("data-active-lock", modo);

    switch (modo) {
      case "hide":
      case "hidden":
        el.style.setProperty("display", "none", "important");
        el.setAttribute("aria-hidden", "true");
        break;

      case "disable":
      case "disabled":
        el.disabled = true;
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("tabindex", "-1");
        el.style.opacity = "0.5";
        el.style.pointerEvents = "none";
        break;

      case "readonly":
        if ("readOnly" in el) {
          el.readOnly = true;
        } else {
          el.setAttribute("contenteditable", "false");
          el.style.pointerEvents = "none";
          el.style.userSelect = "none";
          el.style.opacity = "0.8";
        }
        break;

      case "no-click":
      case "lock-events":
        el.addEventListener("click", bloquearEventoNativo, true);
        el.addEventListener("mousedown", bloquearEventoNativo, true);
        el.addEventListener("keydown", bloquearEventoNativo, true);
        el.style.cursor = "not-allowed";
        break;

      case "blur":
        el.style.filter = "blur(5px)";
        el.style.pointerEvents = "none";
        el.style.userSelect = "none";
        break;

      case "remove":
        el.remove();
        break;
    }
  } else {
    // --- LÓGICA DE RESTAURACIÓN (DESBLOQUEO) ---
    const bloqueoActual = el.getAttribute("data-active-lock");
    if (!bloqueoActual) return;

    el.removeAttribute("data-active-lock");

    switch (bloqueoActual) {
      case "hide":
      case "hidden":
        el.style.removeProperty("display");
        el.removeAttribute("aria-hidden");
        break;

      case "disable":
      case "disabled":
        el.disabled = false;
        el.removeAttribute("aria-disabled");
        el.removeAttribute("tabindex");
        el.style.removeProperty("opacity");
        el.style.removeProperty("pointer-events");
        break;

      case "readonly":
        if ("readOnly" in el) el.readOnly = false;
        el.removeAttribute("contenteditable");
        el.style.removeProperty("pointer-events");
        el.style.removeProperty("user-select");
        el.style.removeProperty("opacity");
        break;

      case "no-click":
      case "lock-events":
        el.removeEventListener("click", bloquearEventoNativo, true);
        el.removeEventListener("mousedown", bloquearEventoNativo, true);
        el.removeEventListener("keydown", bloquearEventoNativo, true);
        el.style.removeProperty("cursor");
        break;

      case "blur":
        el.style.removeProperty("filter");
        el.style.removeProperty("pointer-events");
        el.style.removeProperty("user-select");
        break;
      case "remove":
        break;
    }
  }
}

function bloquearEventoNativo(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}

// ===============================================================
// CENTRALIZACIÓN DE CALENDARIOS POR TEMPORADA (LOCAL DISPOSITIVO)
// ===============================================================
const CONFIG_WIDGET = {
  estadoHorario: 'vacaciones', 
  infoEstado: "",
  // 1 (lunes)... 6 (sábado) y 0 (domingo)
  horarios: {
    normal: {
      1: [ { abre: "12:00", cierra: "14:30" }, { abre: "16:00", cierra: "20:00" } ],
      2: [ { abre: "12:00", cierra: "14:30" }, { abre: "16:00", cierra: "20:00" } ],
      3: [ { abre: "12:00", cierra: "14:30" }, { abre: "16:00", cierra: "20:00" } ],
      4: [ { abre: "12:00", cierra: "14:30" }, { abre: "16:00", cierra: "20:00" } ],
      5: [ { abre: "12:00", cierra: "14:30" }, { abre: "16:00", cierra: "20:00" } ],
      6: [ { abre: "11:00", cierra: "14:00" }, { abre: "17:00", cierra: "20:00" } ],
      0: [ { abre: "11:00", cierra: "14:00" }, { abre: "17:00", cierra: "20:00" } ],
    },
    vacaciones: {
      1: [ { abre: "12:00", cierra: "14:00" }, { abre: "16:00", cierra: "20:00" } ],
      2: [ { abre: "12:00", cierra: "14:00" }, { abre: "16:00", cierra: "20:00" } ],
      3: [ { abre: "12:00", cierra: "14:00" }, { abre: "16:00", cierra: "20:00" } ],
      4: [ { abre: "12:00", cierra: "14:00" }, { abre: "16:00", cierra: "20:00" } ],
      5: [ { abre: "12:00", cierra: "14:00" }, { abre: "16:00", cierra: "20:00" } ],
      6: [ { abre: "12:00", cierra: "13:00" }, { abre: "16:00", cierra: "20:30" } ],
      0: [ { abre: "12:00", cierra: "13:00" }, { abre: "17:00", cierra: "20:30" } ],
    },
    sistemaGCO: {
      1: [ { abre: "7:30", cierra: "15:30" } ],
      2: [ { abre: "7:30", cierra: "15:30" } ],
      3: [ { abre: "7:30", cierra: "15:30" } ],
      4: [ { abre: "7:30", cierra: "15:30" } ],
      5: [ { abre: "07:30", cierra: "14:30" } ],
      6: [],
      0: []
    },
    especial: {
      1: [ { abre: "09:00", cierra: "22:00" } ],
      2: [ { abre: "09:00", cierra: "22:00" } ],
      3: [ { abre: "09:00", cierra: "22:00" } ],
      4: [ { abre: "09:00", cierra: "22:00" } ],
      5: [ { abre: "09:00", cierra: "23:00" } ],
      6: [ { abre: "10:00", cierra: "20:00" } ],
      0: [ { abre: "11:00", cierra: "17:00" } ]
    }
  }
};

const styleAnimaciones = document.createElement('style');
styleAnimaciones.textContent = `
  @keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
`;
document.head.appendChild(styleAnimaciones);


// ==========================================
// INTERFAZ PROFESIONAL CON CONTROL DE FLUJO
// ==========================================
const aplicarEstilosProfesionales = () => {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --bg-widget: rgba(18, 18, 20, 0.85);
      --bg-hover: rgba(26, 26, 30, 0.95);
      --border-widget: rgba(255, 255, 255, 0.1);
      --border-inner: rgba(255, 255, 255, 0.04);
      --text-main: #f5f5f7;
      --text-muted: #8e8e93;
      --color-abierto: #30d158;
      --color-cerrado: #ff453a;
      --color-tag-bg: rgba(41, 151, 255, 0.12); 
      --color-tag-text: #2997ff;
      --radius-main: 16px;
      --fx-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 var(--border-inner);
      
      --bg-row-card: rgba(255, 255, 255, 0.02);
      --bg-row-today: rgba(41, 151, 255, 0.04);
      --border-row-today: rgba(41, 151, 255, 0.15);
      --bg-time-pill: rgba(255, 255, 255, 0.05);
    }

    #datetime-widget-container,
    #datetime-widget-container * {
      box-sizing: border-box !important;
    }

    #datetime-widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, sans-serif;
      background: var(--bg-widget);
      backdrop-filter: blur(24px) saturate(190%);
      -webkit-backdrop-filter: blur(24px) saturate(190%);
      border: 1px solid var(--border-widget);
      padding: 16px 20px;
      border-radius: var(--radius-main);
      box-shadow: var(--fx-shadow);
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147483646;
      user-select: none;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: 310px;
      max-width: calc(100vw - 48px);
      overflow: hidden;
    }
    
    #datetime-widget-container:hover { 
      background: var(--bg-hover);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    #datetime-widget-container.is-compact {
      padding: 12px 18px;
      gap: 0px;
    }

    /* Cabecera */
    #datetime-widget-main { 
      display: flex; 
      align-items: center; 
      gap: 14px; 
      cursor: pointer; 
      width: 100%;
      overflow: hidden;
    }
    
    #datetime-widget-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    #datetime-widget-display { 
      font-size: 0.88rem; 
      font-weight: 400; 
      line-height: 1.4; 
      text-align: left;
      flex-grow: 1;
      overflow: hidden;
    }
    
    .date-highlight { 
      font-weight: 600; 
      color: var(--text-main);
      letter-spacing: -0.01em;
      margin-bottom: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .status-abierto { color: var(--color-abierto); }
    .status-cerrado { color: var(--color-cerrado); }
    
    .time-string {
      font-variant-numeric: tabular-nums;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time-string.compact-style {
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .widget-info-estado {
      font-size: 0.76rem;
      color: var(--color-tag-text);
      background: rgba(41, 151, 255, 0.08);
      border-left: 2px solid var(--color-tag-text);
      padding: 4px 8px;
      border-radius: 0 4px 4px 0;
      margin-top: 6px;
      line-height: 1.3;
    }

    .widget-advertencia-estado {
      font-size: 0.68rem;
      color: var(--color-cerrado);
      display: block;
      margin-top: 2px;
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    .widget-divider { 
      height: 1px; 
      background: linear-gradient(90deg, var(--border-widget) 0%, rgba(255,255,255,0.02) 100%); 
      width: 100%; 
      flex-shrink: 0;
      transition: opacity 0.2s ease, margin 0.2s ease;
    }

    #datetime-widget-container.is-compact .widget-divider {
      opacity: 0;
      margin: 0;
      height: 0;
    }

    /* Pie de la Sección Principal */
    #datetime-widget-footer { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      font-size: 0.74rem; 
      width: 100%;
      overflow: hidden;
      transition: opacity 0.2s ease, height 0.2s ease, margin 0.2s ease;
    }

    #datetime-widget-container.is-compact #datetime-widget-footer {
      opacity: 0;
      height: 0;
      overflow: hidden;
      margin: 0;
    }
    
    .schedule-tag { 
      text-transform: uppercase; 
      letter-spacing: 0.06em; 
      background: var(--color-tag-bg); 
      padding: 3px 8px; 
      border-radius: 6px; 
      color: var(--color-tag-text); 
      font-weight: 600;
      font-size: 0.68rem;
      flex-shrink: 0;
    }
    
    .legend-box { 
      display: flex; 
      align-items: center; 
      gap: 10px; 
      flex-shrink: 0;
    }
    
    .legend-item { 
      display: flex; 
      align-items: center; 
      gap: 5px; 
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Desplegable de Horarios */
    #widget-schedule-details {
      width: 100%;
      border-top: 1px dashed rgba(255, 255, 255, 0.06);
      margin-top: 2px;
      overflow: hidden;
      transition: opacity 0.2s ease, height 0.2s ease;
    }

    #datetime-widget-container.is-compact #widget-schedule-details {
      opacity: 0;
      height: 0;
      overflow: hidden;
      border: none;
      margin: 0;
    }
    
    #widget-schedule-details summary {
      padding: 8px 2px 2px 2px;
      cursor: pointer;
      font-weight: 600;
      color: var(--text-muted);
      outline: none;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.74rem;
      width: 100%;
    }
    
    #widget-schedule-details summary::-webkit-details-marker { display: none; }
    #widget-schedule-details summary:hover { color: var(--text-main); }
    
    #widget-schedule-details summary::after {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border-right: 1.5px solid var(--text-muted);
      border-bottom: 1.5px solid var(--text-muted);
      transform: rotate(45deg) translate(-2px, -2px);
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
    #widget-schedule-details[open] summary::after {
      transform: rotate(-135deg) translate(-1px, -1px);
    }

    .details-animated-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      width: 100%;
    }
    #widget-schedule-details[open] .details-animated-wrapper {
      grid-template-rows: 1fr;
    }
    
    .details-schedule-content {
      overflow: hidden;
      padding: 4px 0;
      width: 100%;
    }
    
    /* Contenedor del Navegador Diario */
    .schedule-viewer-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-row-card);
      border: 1px solid rgba(255, 255, 255, 0.02);
      border-radius: 8px;
      padding: 6px;
      width: 100%;
      gap: 4px;
    }

    .schedule-viewer-container.is-today-view {
      background: var(--bg-row-today);
      border-color: var(--border-row-today);
    }

    .nav-schedule-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 4px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .nav-schedule-btn:hover {
      color: var(--text-main);
      background: rgba(255,255,255,0.05);
    }

    .day-view-data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      overflow: hidden;
      gap: 8px;
    }

    /* Layout cuando hay múltiples turnos */
    .day-view-data.has-multiple-turns {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 2px 4px;
    }

    .day-view-title-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      overflow: hidden;
    }

    .day-view-name {
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 500;
      white-space: nowrap;
    }
    .is-today-view .day-view-name {
      color: var(--text-main);
      font-weight: 600;
    }

    .day-view-tag-hoy {
      color: var(--color-tag-text);
      font-size: 0.74rem;
      font-weight: 600;
    }

    /* Contenedor de Turnos Horarios */
    .details-hours-container {
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap; 
    }

    .details-hours { 
      color: var(--text-main); 
      font-variant-numeric: tabular-nums; 
      font-size: 0.7rem;
      font-weight: 500;
      background: var(--bg-time-pill);
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }
    
    .details-closed { 
      color: var(--color-cerrado); 
      background: rgba(255, 69, 58, 0.1);
      border: 1px solid rgba(255, 69, 58, 0.15);
      font-weight: 600;
      font-size: 0.68rem;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    .timezone-label {
      font-size: 0.65rem;
      opacity: 0.65;
      font-weight: 500;
      display: inline-block;
      white-space: nowrap;
    }

    /* Estilos añadidos para el sub-desplegable global */
    .sub-details-all-days {
      margin-top: 8px;
      width: 100%;
    }
    .sub-details-all-days summary {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7rem;
      color: var(--color-tag-text) !important;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      cursor: pointer;
      padding: 4px 0;
      outline: none;
    }
    .sub-details-all-days summary::-webkit-details-marker { display: none; }
    .sub-details-all-days summary .text-toggle::before { content: 'desplegar'; font-size:10px}
    .sub-details-all-days[open] summary .text-toggle::before { content: 'replegar'; font-size:10px}
    
    .sub-details-all-days summary::after { display: none !important; } /* Quitamos flecha por defecto */

    .all-days-list-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 6px;
      max-height: 190px;
      overflow-y: auto;
      padding-right: 2px;
    }
    /* Estilización fina del scroll para la lista completa */
    .all-days-list-wrapper::-webkit-scrollbar { width: 4px; }
    .all-days-list-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

    .all-days-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.01);
      border-radius: 6px;
      padding: 5px 8px;
    }
    .all-days-row.is-row-today {
      background: var(--bg-row-today);
      border-color: rgba(41, 151, 255, 0.1);
    }
    .all-days-row .day-name {
      font-size: 0.74rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .all-days-row.is-row-today .day-name {
      color: var(--text-main);
      font-weight: 600;
    }

    @media (max-width: 480px) {
      #datetime-widget-container {
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: var(--radius-main) var(--radius-main) 0 0;
        border-left: none;
        border-right: none;
        border-bottom: none;
        padding: 12px 20px;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
      }
    }
  `;
  document.head.appendChild(style);
};

class DateTimeWidget {
  constructor() {
    this.isExpanded = false; 
    this.container = null;
    this.display = null;
    this.iconContainer = null;
    this.footer = null;
    this.detailsElement = null;
    this.timerId = null;
    this.notificacionesEnviadas = new Set();
    
    this.ordenSemanas = [
      { id: 1, nombre: 'Lunes' },
      { id: 2, nombre: 'Martes' },
      { id: 3, nombre: 'Miércoles' },
      { id: 4, nombre: 'Jueves' },
      { id: 5, nombre: 'Viernes' },
      { id: 6, nombre: 'Sábado' },
      { id: 0, nombre: 'Domingo' }
    ];

    this.indiceDiaVisualizado = 0;
    this.userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';

    this.icons = {
      calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
      clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      circleGreen: `<svg width="8" height="8" viewBox="0 0 24 24" fill="#30d158"><circle cx="12" cy="12" r="10"></circle></svg>`,
      circleRed: `<svg width="8" height="8" viewBox="0 0 24 24" fill="#ff453a"><circle cx="12" cy="12" r="10"></circle></svg>`,
      chevronLeft: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
      chevronRight: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    };

    this.init();
  }

  init() {
    aplicarEstilosProfesionales();
    this.establecerDiaActualPorDefecto();
    this.buildDOM();
    this.startClock();
    this.addEventListeners();
  }

  establecerDiaActualPorDefecto() {
    const diaActualLocal = new Date().getDay();
    const index = this.ordenSemanas.findIndex(d => d.id === diaActualLocal);
    this.indiceDiaVisualizado = index !== -1 ? index : 0;
  }

  buildDOM() {
    this.container = document.createElement('div');
    this.container.id = 'datetime-widget-container';

    const mainSection = document.createElement('div');
    mainSection.id = 'datetime-widget-main';
    this.iconContainer = document.createElement('div');
    this.iconContainer.id = 'datetime-widget-icon';
    this.display = document.createElement('div');
    this.display.id = 'datetime-widget-display';
    mainSection.appendChild(this.iconContainer);
    mainSection.appendChild(this.display);

    const divider1 = document.createElement('div');
    divider1.className = 'widget-divider';

    this.footer = document.createElement('div');
    this.footer.id = 'datetime-widget-footer';

    this.detailsElement = document.createElement('details');
    this.detailsElement.id = 'widget-schedule-details';
    
    this.detailsElement.innerHTML = `
      <summary>Cuadrante semanal</summary>
      <div class="details-animated-wrapper">
        <div class="details-schedule-content"></div>
      </div>
    `;

    this.container.appendChild(mainSection);
    this.container.appendChild(divider1);
    this.container.appendChild(this.footer);
    this.container.appendChild(this.detailsElement);

    document.body.appendChild(this.container);
  }

  getCalendarioActivo() {
    const tipo = CONFIG_WIDGET.estadoHorario;
    return CONFIG_WIDGET.horarios[tipo] || CONFIG_WIDGET.horarios.normal;
  }

  comprobarEstadoApertura(fechaLocal) {
      const diaSemana = fechaLocal.getDay(); 
      const tiempoActualEnMinutos = (fechaLocal.getHours() * 60) + fechaLocal.getMinutes();
      const calendarioActivo = this.getCalendarioActivo();
      const turnosDelDia = calendarioActivo[diaSemana] || [];

      // 1. Calculamos si está abierto según tus turnos dinámicos
      const abiertoAhora = turnosDelDia.some(turno => {
        const [hApertura, mApertura] = turno.abre.split(':').map(Number);
        const [hCierre, mCierre] = turno.cierra.split(':').map(Number);
        return tiempoActualEnMinutos >= ((hApertura * 60) + mApertura) && tiempoActualEnMinutos < ((hCierre * 60) + mCierre);
      });

      // 2. MODIFICACIÓN: Si es la primera vez (undefined) o si el estado cambió en vivo
      if (ultimoEstadoApertura === undefined || ultimoEstadoApertura !== abiertoAhora) {
        ultimoEstadoApertura = abiertoAhora;
        
        // Forzamos que la interfaz se actualice inmediatamente con el estado real
        if (typeof procesarBloqueosVisuales === 'function') {
          procesarBloqueosVisuales(insigniasCache);
        }
      }

      return abiertoAhora;
  }

  checkProximosEventos(fechaLocal) {
    const diaSemana = fechaLocal.getDay();
    const horas = fechaLocal.getHours();
    const minutos = fechaLocal.getMinutes();
    const tiempoActualEnMinutos = (horas * 60) + minutos;
    
    const calendarioActivo = this.getCalendarioActivo();
    const turnosDelDia = calendarioActivo[diaSemana] || [];
    const intervalosAviso = [0, 1, 5, 10, 15, 30, 60];

    turnosDelDia.forEach(turno => {
      const [hApertura, mApertura] = turno.abre.split(':').map(Number);
      const [hCierre, mCierre] = turno.cierra.split(':').map(Number);
      
      const minutesApertura = (hApertura * 60) + mApertura;
      const minutesCierre = (hCierre * 60) + mCierre;

      intervalosAviso.forEach(antelacion => {
        const idAlertaApertura = `A-${CONFIG_WIDGET.estadoHorario}-${diaSemana}-${minutesApertura}-${antelacion}-${horas}:${minutos}`;
        const idAlertaCierre = `C-${CONFIG_WIDGET.estadoHorario}-${diaSemana}-${minutesCierre}-${antelacion}-${horas}:${minutos}`;

        if (tiempoActualEnMinutos === (minutesApertura - antelacion)) {
          if (!this.notificacionesEnviadas.has(idAlertaApertura)) {
            const msg = antelacion === 0 
              ? `¡El sistema ya está ABIERTO! (Hora Local: ${turno.abre})` 
              : `Apertura inminente: Quedan ${antelacion} minutos para abrir (${turno.abre}).`;
            if (typeof showNotification === 'function') showNotification(msg, antelacion === 0 ? 'success' : 'info');
            this.notificacionesEnviadas.add(idAlertaApertura);
          }
        }

        if (tiempoActualEnMinutos === (minutesCierre - antelacion)) {
          if (!this.notificacionesEnviadas.has(idAlertaCierre)) {
            const msg = antelacion === 0 
              ? `¡El sistema se ha CERRADO! (Hora Local: ${turno.cierra})`
              : `Atención: Quedan ${antelacion} minutos para el cierre (${turno.cierra}).`;
            if (typeof showNotification === 'function') showNotification(msg, 'warning');
            this.notificacionesEnviadas.add(idAlertaCierre);
          }
        }
      });
    });

    if (horas === 0 && minutos === 0) this.notificacionesEnviadas.clear();
  }

  renderSelectedDaySchedule() {
    const contentDiv = this.detailsElement.querySelector('.details-schedule-content');
    if (!contentDiv) return;

    const calendarioActivo = this.getCalendarioActivo();
    const diaActualLocal = new Date().getDay();

    const diaObj = this.ordenSemanas[this.indiceDiaVisualizado];
    const turnos = calendarioActivo[diaObj.id] || [];
    const esHoy = diaObj.id === diaActualLocal;

    let bloqueHorasHTML = '';
    if (turnos.length === 0) {
      bloqueHorasHTML = '<span class="details-closed">Cerrado</span>';
    } else {
      bloqueHorasHTML = `<div class="details-hours-container">` + 
        turnos.map(t => `<span class="details-hours">${t.abre} - ${t.cierra}</span>`).join('') + 
      `</div>`;
    }

    const textoHoy = esHoy ? '<span class="day-view-tag-hoy">(Hoy)</span>' : '';
    const containerClasses = esHoy ? 'schedule-viewer-container is-today-view' : 'schedule-viewer-container';
    const clasesDataLayout = turnos.length > 1 ? 'day-view-data has-multiple-turns' : 'day-view-data';

    // Generar el bloque HTML de todos los días para el sub-desplegable
    const todosLosDiasHTML = this.ordenSemanas.map(d => {
      const turnosDia = calendarioActivo[d.id] || [];
      const esDiaHoy = d.id === diaActualLocal;
      let horasRowHTML = '';
      
      if (turnosDia.length === 0) {
        horasRowHTML = '<span class="details-closed">Cerrado</span>';
      } else {
        horasRowHTML = `<div class="details-hours-container">` + 
          turnosDia.map(t => `<span class="details-hours">${t.abre} - ${t.cierra}</span>`).join('') + 
        `</div>`;
      }
      
      return `
        <div class="all-days-row ${esDiaHoy ? 'is-row-today' : ''}">
          <span class="day-name">${d.nombre} ${esDiaHoy ? '(Hoy)' : ''}</span>
          ${horasRowHTML}
        </div>
      `;
    }).join('');

    contentDiv.innerHTML = `
      <div class="${containerClasses}">
        <button class="nav-schedule-btn" id="btn-widget-prev" title="Día anterior">${this.icons.chevronLeft}</button>
        <div class="${clasesDataLayout}">
          <div class="day-view-title-box">
            <span class="day-view-name">${diaObj.nombre}</span>
            ${textoHoy}
          </div>
          ${bloqueHorasHTML}
        </div>
        <button class="nav-schedule-btn" id="btn-widget-next" title="Día siguiente">${this.icons.chevronRight}</button>
      </div>

      <!-- Sub-desplegable nativo para ver la semana completa -->
      <details class="sub-details-all-days">
        <summary><span class="text-toggle"></span></summary>
        <div class="all-days-list-wrapper">
          ${todosLosDiasHTML}
        </div>
      </details>
    `;

    document.getElementById('btn-widget-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      this.navegarDia(-1);
    });
    document.getElementById('btn-widget-next').addEventListener('click', (e) => {
      e.stopPropagation();
      this.navegarDia(1);
    });
  }

  navegarDia(direccion) {
    this.indiceDiaVisualizado = (this.indiceDiaVisualizado + direccion + 7) % 7;
    this.renderSelectedDaySchedule();
  }

  updateDisplay() {
    const ahora = new Date();
    this.checkProximosEventos(ahora);

    const dia = String(ahora.getDate()).padStart(2, '0');
    const año = ahora.getFullYear();
    
    const mesesTexto = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    const nombreDia = diasSemana[ahora.getDay()];
    const nombreMes = mesesTexto[ahora.getMonth()];

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const abiertoAhora = this.comprobarEstadoApertura(ahora);
    this.iconContainer.style.color = abiertoAhora ? 'var(--color-abierto)' : 'var(--color-cerrado)';

    const zonaFormateada = this.userTimezone.replace(/_/g, ' ');
    const infoTexto = CONFIG_WIDGET.infoEstado || '';

    if (this.isExpanded) {
      this.container.classList.remove('is-compact');
      this.iconContainer.innerHTML = this.icons.calendar;
      this.display.innerHTML = `
        <div class="date-highlight">${nombreDia}, ${dia} de ${nombreMes} de ${año}</div>
        <div class="time-string ${abiertoAhora ? 'status-abierto' : 'status-cerrado'}">${horas}:${minutos}:${segundos} <span class="timezone-label">(${zonaFormateada})</span></div>
        ${infoTexto ? `<div class="widget-info-estado">${infoTexto}</div>` : ''}
        <small style="color:var(--text-muted); font-size:10px; display:block; margin-top:4px;">Presione para ver menos información</small>
      `;
      
      this.footer.innerHTML = `
        <span class="schedule-tag">${CONFIG_WIDGET.estadoHorario}</span>
        <div class="legend-box">
          <div class="legend-item">${this.icons.circleGreen}<span>Abierto</span></div>
          <div class="legend-item">${this.icons.circleRed}<span>Cerrado</span></div>
        </div>
      `;
    } else {
      this.container.classList.add('is-compact');
      this.iconContainer.innerHTML = this.icons.clock;
      this.display.innerHTML = `
        <div class="time-string compact-style ${abiertoAhora ? 'status-abierto' : 'status-cerrado'}">
          ${horas}:${minutos}:${segundos} <span class="timezone-label" style="font-size:0.75rem; font-weight:400;">(${zonaFormateada})</span>
        </div>
        ${infoTexto ? `<span class="widget-advertencia-estado">⚠️ Hay nueva información. ¡Expande para leer!</span>` : ''}
        <small style="color:var(--text-muted); font-size:10px; display:block; margin-top:2px;">Presione para ver más información</small>
      `;
    }
  }

  startClock() {
    this.updateDisplay();
    this.timerId = setInterval(() => this.updateDisplay(), 1000);
  }

  addEventListeners() {
    document.getElementById('datetime-widget-main').addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;
      this.updateDisplay();
    });

    this.detailsElement.addEventListener('toggle', () => {
      if (this.detailsElement.open) {
        this.renderSelectedDaySchedule();
      }
    });
  }
}

// Inicialización del script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new DateTimeWidget());
} else {
  new DateTimeWidget();
}
// Relojes UTC
const relojes = document.querySelectorAll('.reloj-utc');
const opciones = { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
const actualizar = () => {const str = new Date().toLocaleString('es-ES', opciones);const hora = str[0].toUpperCase() + str.slice(1);for (const reloj of relojes) reloj.textContent = hora;};
actualizar();setInterval(actualizar, 1000);
// Cierre Manejo de Permisos y Notificaciones

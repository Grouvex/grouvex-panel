function injectUpdateSystem(userId) {
  console.log("🔄 INYECTANDO SISTEMA DE ACTUALIZACIONES para usuario:", userId);
  try {
    let userVersionInfo = {
      currentVersion: "0.1.0",
      userId: userId,
      hasSession: !!userId
    };
    
    // Obtener versión REAL del usuario desde Google Sheets
    if (userId) {
      try {
        console.log("🔍 Obteniendo versión REAL para usuario desde Google Sheets:", userId);
        const versionResult = getUserVersion(userId);
        console.log("📋 RESULTADO DE VERSIÓN DESDE SHEETS:", versionResult);
        
        if (versionResult.success) {
          userVersionInfo.currentVersion = versionResult.version || "0.1.0";
          console.log("✅ Versión obtenida desde Sheets:", userVersionInfo.currentVersion);
        } else {
          console.error("❌ Error obteniendo versión desde Sheets:", versionResult.error);
          // Si hay error, usar versión por defecto
          userVersionInfo.currentVersion = "0.1.0";
        }
      } catch (error) {
        console.error("❌ Excepción obteniendo versión:", error);
        userVersionInfo.currentVersion = "0.1.0";
      }
    }
    
    console.log("🎯 Información final de versión:", userVersionInfo);

    // SISTEMA DE ACTUALIZACIONES HÍBRIDO - PANTALLA COMPLETA + HEADER HISTORIAL
    const updateScript = `
      <script>
        console.log("🚀 SISTEMA DE ACTUALIZACIONES CARGADO");
        
        const UPDATE_SYSTEM = {
          userInfo: ${JSON.stringify(userVersionInfo)},
          expandedVersion: null,
          isUpdating: false,
          updateProgress: 0,
          estimatedTime: 0,
          isUpdateComplete: false,
          
          VERSION_HISTORY: {
            currentVersion: "${userVersionInfo.currentVersion}",
            latestVersion: "0.1.0",
            versions: {
              "0.1.2": {
                date: "2026-02-21",
                updateRequired: false,
                mandatory: false,
                changes: ["Revisión de los sistemas del Panel"],
                resources: {
                  images: [
                    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"
                  ],
                  videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
                  links: [
                    {
                      url: "https://grouvex.com/changelog",
                      title: "Registro de cambios completo",
                      description: "Documentación detallada de todos los cambios"
                    },
                    {
                      url: "https://grouvex.com/docs",
                      title: "Documentación oficial",
                      description: "Guías y manuales de usuario"
                    }
                  ]
                }
              },
              "0.1.1": {
                date: "2026-02-7",
                updateRequired: true,
                mandatory: true,
                changes: [
                  "Mejora de Registro en el Panel", 
                  "Mejora del sistema de Nuevo Perfil de GSRecords", 
                  "Nueva función de subida de lanzamiento", 
                  "Nueva y mejora de Comunidad de Grouvex Studios", 
                  "Mejora del sistema de Emails", 
                  "Mejora de funcionalidades existentes"
                ],
                resources: {
                  images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"],
                  videos: ["https://www.youtube.com/embed/9bZkp7q19f0"],
                  links: [
                    {
                      url: "https://grouvex.com/tutorial",
                      title: "Tutorial de actualización",
                      description: "Video guía paso a paso"
                    }
                  ]
                }
              },
              "0.1.0": {
                date: "2026-02-10",
                updateRequired: true,
                mandatory: true,
                changes: [
                  "Mejora en el sistema de actualizaciones", 
                  "Mejora de los estilos de la página web", 
                  "Actualización de los formularios",
                  "Mejora del sistema de Emails"
                ],
                resources: {
                  images: [],
                  videos: [],
                  links: [
                    {
                      url: "https://grouvex.com/release-notes",
                      title: "Notas de la versión 0.1.0",
                      description: "Información técnica detallada"
                    }
                  ]
                }
              },
              "0.0.6": {
                date: "2025-11-01",
                updateRequired: true,
                mandatory: true,
                changes: [
                  "Plantilla para Email para Staff", 
                  "Mejora en los permisos de modificación y visualización en Staff", 
                  "Actualización de Documentos Oficiales de Grouvex Studios", 
                  "Introducción de Grouvex Studios", 
                  "Mejora del sistema de Emails", 
                  "Implementación de GCO"
                ],
                resources: {
                  images: [],
                  videos: [],
                  links: [
                    {
                      url: "https://grouvex.com/release-notes",
                      title: "Notas de la versión 0.0.6",
                      description: "Información técnica detallada"
                    }
                  ]
                }
              },
              "0.0.4": {
                date: "2025-09-29",
                updateRequired: true,
                mandatory: false,
                changes: ["Mejoras en rendimiento", "Nuevas funciones de reportes", "Interfaz mejorada", "Logo y Nombres en la página web", "Noticias de Ofertas", "Corrección de Centro de Ayudas", "Corrección de Nomenclaturas", "Portal de Staff", "Eliminación de Ver como... para el equipo", "Creación de Update y Mejoras ya implementadas", "Implementación de Música - Grouvex Player (Partners y Verified Partners)"]
              },
              "0.0.3": {
                date: "2025-09-28",
                updateRequired: true,
                mandatory: true,
                changes: ["Corrección de errores críticos", "Optimización de procesos"]
              },
              "0.0.1": {
                date: "2025-09-27",
                updateRequired: true,
                mandatory: true,
                changes: ["Bienvenidx a DataBase", "Primera versión estable", "Funcionalidades básicas", "Sistema de autenticación", "Mejora en seguridad"]
              }
            }
          },

          // FUNCIÓN PARA GUARDAR LA VERSIÓN ACTUALIZADA EN GOOGLE SHEETS
          saveUpdatedVersion: function(newVersion) {
            return new Promise((resolve, reject) => {
              try {
                console.log("💾 Intentando guardar versión en Google Sheets:", newVersion);
                
                // Hacer llamada a Google Apps Script
                google.script.run
                  .withSuccessHandler(function(result) {
                    console.log("✅ Versión guardada exitosamente:", result);
                    resolve(result);
                  })
                  .withFailureHandler(function(error) {
                    console.error("❌ Error al guardar versión:", error);
                    // Aún resolvemos para continuar con el flujo
                    resolve({ success: false, error: error.message });
                  })
                  .saveUserVersion(UPDATE_SYSTEM.userInfo.userId, newVersion);
              } catch (error) {
                console.error("❌ Excepción al guardar versión:", error);
                resolve({ success: false, error: error.message });
              }
            });
          },

          // PANTALLA COMPLETA DE ACTUALIZACIÓN - VISTA PREVIA DE VERSIONES
          showFullScreenUpdate: function() {
            const pendingVersions = this.getPendingVersions();
            if (pendingVersions.length === 0) return;
            
            // Bloquear el scroll del cuerpo
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            // Calcular tiempo basado en cambios
            const baseTime = 10; // segundos base para inicialización
            const perChangeTime = 4; // 4 segundos por cada cambio
            let totalChanges = 0;
            let versionDetails = {};
            
            pendingVersions.forEach(version => {
              const versionInfo = this.VERSION_HISTORY.versions[version];
              const changesCount = versionInfo?.changes?.length || 0;
              totalChanges += changesCount;
              versionDetails[version] = {
                changesCount: changesCount,
                versionTime: changesCount * perChangeTime,
                info: versionInfo
              };
            });
            
            const estimatedSeconds = baseTime + (totalChanges * perChangeTime);
            this.estimatedTime = estimatedSeconds;
            
            // Generar lista de versiones con detalles basados en cambios
            const versionsListHTML = pendingVersions.map(version => {
              const details = versionDetails[version];
              const versionInfo = details.info;
              
              return \`
                <div style="
                  background: rgba(59, 130, 246, 0.1);
                  border: 1px solid rgba(59, 130, 246, 0.3);
                  border-radius: 10px;
                  padding: 15px;
                  margin-bottom: 12px;
                  transition: all 0.3s;
                  cursor: pointer;
                "
                onmouseover="this.style.background='rgba(59, 130, 246, 0.2)'; this.style.transform='translateY(-2px)'"
                onmouseout="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.transform='translateY(0)'"
                onclick="UPDATE_SYSTEM.showVersionDetails('\${version}')">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div style="
                        width: 32px;
                        height: 32px;
                        background: \${versionInfo.mandatory ? '#ef4444' : '#3b82f6'};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 14px;
                      ">
                        \${versionInfo.mandatory ? '!' : '↗'}
                      </div>
                      <div>
                        <div style="font-weight: 700; color: white; font-size: 16px;">
                          Versión v\${version}
                        </div>
                        <div style="font-size: 12px; color: #94a3b8;">
                          \${versionInfo.date} • \${versionInfo.mandatory ? 'Obligatoria' : 'Opcional'}
                        </div>
                      </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                      <div style="
                        background: \${versionInfo.mandatory ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'};
                        color: \${versionInfo.mandatory ? '#ef4444' : '#22c55e'};
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        white-space: nowrap;
                      ">
                        \${details.changesCount} cambios
                      </div>
                      <div style="
                        background: rgba(245, 158, 11, 0.2);
                        color: #f59e0b;
                        padding: 2px 10px;
                        border-radius: 12px;
                        font-size: 11px;
                        font-weight: 500;
                        white-space: nowrap;
                      ">
                        \${details.versionTime}s
                      </div>
                    </div>
                  </div>
                  
                  <!-- Mostrar primeros 2 cambios como preview -->
                  <div style="margin-top: 10px;">
                    <div style="font-size: 12px; color: #3b82f6; margin-bottom: 5px; font-weight: 600;">
                      <i class="fas fa-star"></i> Principales cambios:
                    </div>
                    <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                      \${versionInfo.changes.slice(0, 2).map(change => \`
                        <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 5px;">
                          <i class="fas fa-chevron-right" style="color: #3b82f6; margin-top: 3px; font-size: 10px;"></i>
                          <span>\${change}</span>
                        </div>
                      \`).join('')}
                      \${versionInfo.changes.length > 2 ? \`
                        <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">
                          + \${versionInfo.changes.length - 2} cambios más...
                        </div>
                      \` : ''}
                    </div>
                  </div>
                  
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px dashed rgba(255,255,255,0.1);
                  ">
                    <span style="font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 5px;">
                      <i class="fas fa-clock"></i> 
                      <span>
                        Tiempo estimado: <strong style="color: #f59e0b;">\${details.versionTime} segundos</strong>
                      </span>
                    </span>
                    <button onclick="event.stopPropagation(); UPDATE_SYSTEM.showVersionDetails('\${version}')" 
                      style="
                        background: transparent;
                        color: #3b82f6;
                        border: 1px solid #3b82f6;
                        padding: 4px 12px;
                        border-radius: 4px;
                        font-size: 11px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                      "
                      onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'"
                      onmouseout="this.style.background='transparent'">
                      Ver detalles completos
                    </button>
                  </div>
                </div>
              \`;
            }).join('');
            
            const modalHTML = \`
              <div id="fullscreen-update-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 998;
                padding: 20px;
                overflow-y: auto;
                animation: fadeIn 0.5s ease-out;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              ">
                <div style="
                  max-width: 800px;
                  height: 100%;
                  width: 100%;
                  text-align: center;
                  animation: slideUp 0.5s ease-out 0.2s both;
                ">
                  <!-- LOGO -->
                  <div style="
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 30px;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
                    animation: pulse 2s infinite;
                    position: relative;
                  ">
                    <i class="fas fa-sync-alt" style="font-size: 48px;"></i>
                    <div style="
                      position: absolute;
                      top: -5px;
                      right: -5px;
                      background: #ef4444;
                      color: white;
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-weight: bold;
                      font-size: 14px;
                    ">
                      \${pendingVersions.length}
                    </div>
                  </div>
                  
                  <!-- TÍTULO -->
                  <h1 style="
                    margin: 0 0 15px 0;
                    font-size: 36px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #3b82f6, #10b981);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.5px;
                  ">
                    Actualización Pendiente
                  </h1>
                  
                  <!-- DESCRIPCIÓN -->
                  <p style="
                    font-size: 18px;
                    color: #bdc3c7;
                    margin-bottom: 30px;
                    line-height: 1.6;
                  ">
                    Se encontraron <strong style="color: #3b82f6;">\${pendingVersions.length} actualizaciones</strong> 
                    con un total de <strong style="color: #22c55e;">\${totalChanges} cambios</strong>.<br>
                    El sistema se actualizará automáticamente.
                  </p>
                  
                  <!-- RESUMEN RÁPIDO CON TIEMPO BASADO EN CAMBIOS -->
                  <div style="
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin-bottom: 30px;
                  ">
                    <div style="
                      background: rgba(59, 130, 246, 0.1);
                      border: 1px solid rgba(59, 130, 246, 0.3);
                      border-radius: 10px;
                      padding: 15px 25px;
                      text-align: center;
                      min-width: 140px;
                    ">
                      <div style="font-size: 12px; color: #3b82f6; margin-bottom: 5px; font-weight: 600;">
                        <i class="fas fa-clock"></i> DURACIÓN TOTAL
                      </div>
                      <div style="font-size: 24px; font-weight: 700; color: white;">
                        \${estimatedSeconds}s
                      </div>
                    </div>
                    
                    <div style="
                      background: rgba(34, 197, 94, 0.1);
                      border: 1px solid rgba(34, 197, 94, 0.3);
                      border-radius: 10px;
                      padding: 15px 25px;
                      text-align: center;
                      min-width: 140px;
                    ">
                      <div style="font-size: 12px; color: #22c55e; margin-bottom: 5px; font-weight: 600;">
                        <i class="fas fa-layer-group"></i> VERSIONES
                      </div>
                      <div style="font-size: 24px; font-weight: 700; color: white;">
                        \${pendingVersions.length}
                      </div>
                    </div>
                    
                    <div style="
                      background: rgba(139, 92, 246, 0.1);
                      border: 1px solid rgba(139, 92, 246, 0.3);
                      border-radius: 10px;
                      padding: 15px 25px;
                      text-align: center;
                      min-width: 140px;
                    ">
                      <div style="font-size: 12px; color: #8b5cf6; margin-bottom: 5px; font-weight: 600;">
                        <i class="fas fa-tasks"></i> CAMBIOS TOTALES
                      </div>
                      <div style="font-size: 24px; font-weight: 700; color: white;">
                        \${totalChanges}
                      </div>
                    </div>
                  </div>
                  
                  <!-- LISTA DE VERSIONES CON DETALLES DE TIEMPO -->
                  <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 25px;
                    margin-bottom: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    max-height: 400px;
                    overflow-y: auto;
                  ">
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 10px;
                      margin-bottom: 20px;
                    ">
                      <i class="fas fa-list-check" style="color: #3b82f6; font-size: 20px;"></i>
                      <h2 style="margin: 0; font-size: 22px; color: white;">
                        Versiones a actualizar
                      </h2>
                      <span style="
                        background: rgba(59, 130, 246, 0.2);
                        color: #3b82f6;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-left: auto;
                      ">
                        \${pendingVersions.length} versiones • \${totalChanges} cambios
                      </span>
                    </div>
                    
                    <!-- EXPLICACIÓN DEL CÁLCULO DE TIEMPO -->
                    <div style="
                      background: rgba(59, 130, 246, 0.05);
                      border-radius: 8px;
                      padding: 12px;
                      margin-bottom: 15px;
                      border: 1px dashed rgba(59, 130, 246, 0.3);
                    ">
                      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <i class="fas fa-calculator" style="color: #3b82f6; font-size: 16px;"></i>
                        <span style="font-size: 13px; font-weight: 600; color: #3b82f6;">
                          Cálculo de tiempo estimado:
                        </span>
                      </div>
                      <div style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
                        <strong>\${baseTime}s</strong> (inicialización) + 
                        <strong>\${totalChanges} cambios</strong> × 
                        <strong>\${perChangeTime}s/cambio</strong> = 
                        <strong style="color: #f59e0b;">\${estimatedSeconds} segundos totales</strong>
                      </div>
                    </div>
                    
                    <div id="pending-versions-list">
                      \${versionsListHTML}
                    </div>
                    
                    <div style="
                      margin-top: 20px;
                      padding: 15px;
                      background: rgba(59, 130, 246, 0.05);
                      border-radius: 8px;
                      border: 1px dashed rgba(59, 130, 246, 0.3);
                    ">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                        <span style="font-size: 13px; color: #94a3b8;">
                          <strong>Nota:</strong> El tiempo de cada versión se calcula automáticamente según la cantidad de cambios.
                          Haz clic en cualquier versión para ver todos sus detalles.
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- INICIO AUTOMÁTICO -->
                  <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 25px;
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                  ">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                      <i class="fas fa-robot" style="color: #3b82f6; font-size: 20px;"></i>
                      <span style="font-size: 16px; font-weight: 600; color: #3b82f6;">
                        INICIO AUTOMÁTICO
                      </span>
                    </div>
                    <p style="font-size: 14px; color: #94a3b8; margin: 0;">
                      La actualización comenzará en <span id="countdown" style="color: #22c55e; font-weight: bold; font-size: 18px;">10</span> segundos...
                    </p>
                    <div style="margin-top: 15px;">
                      <button onclick="UPDATE_SYSTEM.startUpdateProcess()" 
                        style="
                          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                          color: white;
                          border: none;
                          padding: 12px 30px;
                          border-radius: 8px;
                          font-size: 15px;
                          font-weight: 600;
                          cursor: pointer;
                          display: inline-flex;
                          align-items: center;
                          gap: 10px;
                          transition: all 0.3s;
                          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
                        "
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(34, 197, 94, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(34, 197, 94, 0.3)'">
                        <i class="fas fa-play-circle"></i>
                        Iniciar Ahora
                      </button>
                    </div>
                  </div>
                  
                  <!-- ADVERTENCIA -->
                  <div style="
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 20px;
                  ">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                      <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                      <strong style="color: #ef4444; font-size: 14px;">IMPORTANTE</strong>
                    </div>
                    <div style="font-size: 12px; color: #ecf0f1; text-align: left; line-height: 1.5;">
                      <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 5px;">
                        <i class="fas fa-ban" style="color: #ef4444; margin-top: 2px;"></i>
                        <span>No cierre esta ventana durante la actualización</span>
                      </div>
                      <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 5px;">
                        <i class="fas fa-calculator" style="color: #f59e0b; margin-top: 2px;"></i>
                        <span>El tiempo estimado se calcula automáticamente según los cambios</span>
                      </div>
                      <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <i class="fas fa-sync-alt" style="color: #22c55e; margin-top: 2px;"></i>
                        <span>Al finalizar, deberá recargar la página manualmente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            \`;
            
            // Remover modal existente si hay
            const existingModal = document.getElementById('fullscreen-update-modal');
            if (existingModal) existingModal.remove();
            
            // Agregar el nuevo modal
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Iniciar cuenta regresiva AUTOMÁTICA
            let countdown = 10;
            const countdownElement = document.getElementById('countdown');
            const countdownInterval = setInterval(() => {
              countdown--;
              countdownElement.textContent = countdown;
              
              if (countdown <= 0) {
                clearInterval(countdownInterval);
                document.querySelector('[style*="INICIO AUTOMÁTICO"]').parentElement.style.display = 'none';
                this.startUpdateProcess();
              }
            }, 1000);
          },

          // INICIAR EL PROCESO DE ACTUALIZACIÓN
          startUpdateProcess: function() {
            if (this.isUpdating) return;
            
            this.isUpdating = true;
            this.updateProgress = 0;
            const pendingVersions = this.getPendingVersions();
            
            // Detener cualquier cuenta regresiva previa
            const countdownElements = document.querySelectorAll('#countdown');
            countdownElements.forEach(el => {
              const parent = el.closest('[style*="INICIO AUTOMÁTICO"]');
              if (parent) {
                parent.style.display = 'none';
              }
            });
            
            // Actualizar el modal para mostrar la barra de progreso
            const modal = document.getElementById('fullscreen-update-modal');
            if (!modal) return;
            
            modal.innerHTML = \`
              <div style="
                max-width: 800px;
                height: 100%;
                width: 100%;
                text-align: center;
                animation: slideUp 0.5s ease-out;
              ">
                <!-- ENCABEZADO -->
                <div style="margin-bottom: 40px;">
                  <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
                  ">
                    <i class="fas fa-sync-alt fa-spin" style="font-size: 36px;"></i>
                  </div>
                  <h1 style="
                    margin: 0 0 10px 0;
                    font-size: 32px;
                    font-weight: 700;
                    color: white;
                  ">
                    Actualizando Sistema...
                  </h1>
                  <p style="font-size: 16px; color: #bdc3c7; margin: 0;">
                    \${pendingVersions.length} actualizaciones en proceso
                  </p>
                </div>
                
                <!-- BARRA DE PROGRESO -->
                <div style="margin-bottom: 40px;">
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                  ">
                    <span style="font-size: 14px; color: #94a3b8;">
                      <i class="fas fa-spinner fa-spin"></i> Progreso de Actualización
                    </span>
                    <span id="progress-percentage" style="
                      font-size: 24px;
                      font-weight: 700;
                      color: #22c55e;
                      background: rgba(34, 197, 94, 0.1);
                      padding: 5px 15px;
                      border-radius: 20px;
                      border: 1px solid rgba(34, 197, 94, 0.3);
                    ">
                      0%
                    </span>
                  </div>
                  
                  <!-- BARRA PRINCIPAL -->
                  <div style="
                    width: 100%;
                    height: 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    position: relative;
                  ">
                    <div id="progress-bar" style="
                      width: 0%;
                      height: 100%;
                      background: linear-gradient(90deg, #3b82f6, #22c55e);
                      border-radius: 8px;
                      transition: width 0.5s ease;
                      position: relative;
                    ">
                      <div style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: 40px;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
                        animation: shimmer 1.5s infinite;
                      "></div>
                    </div>
                    
                    <!-- MARCAS DE PROGRESO -->
                    <div style="
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      display: flex;
                      justify-content: space-between;
                      padding: 0 10px;
                      pointer-events: none;
                    ">
                      \${[0, 25, 50, 75, 100].map(percent => \`
                        <div style="
                          width: 2px;
                          height: 100%;
                          background: \${percent <= this.updateProgress ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'};
                          transform: translateX(-50%);
                        "></div>
                      \`).join('')}
                    </div>
                  </div>
                  
                  <!-- DETALLES DEL PROGRESO -->
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                  ">
                    <div style="text-align: left;">
                      <div id="current-action" style="
                        font-size: 14px;
                        font-weight: 600;
                        color: white;
                        margin-bottom: 5px;
                      ">
                        <i class="fas fa-cog fa-spin"></i> Iniciando proceso...
                      </div>
                      <div id="version-info" style="font-size: 12px; color: #94a3b8;">
                        Preparando actualización...
                      </div>
                    </div>
                    
                    <div style="text-align: right;">
                      <div id="time-remaining" style="
                        font-size: 14px;
                        font-weight: 600;
                        color: #f59e0b;
                        margin-bottom: 5px;
                      ">
                        <i class="fas fa-clock"></i> \${this.estimatedTime}s restantes
                      </div>
                      <div style="font-size: 12px; color: #94a3b8;">
                        \${pendingVersions.length} versiones pendientes
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- VERSIONES EN PROCESO CON DETALLES -->
                <div style="
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                  padding: 20px;
                  margin-bottom: 30px;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                  ">
                    <i class="fas fa-list-ol" style="color: #8b5cf6;"></i>
                    <span style="font-size: 16px; font-weight: 600; color: white;">
                      Versiones en proceso
                    </span>
                    <span style="
                      background: rgba(139, 92, 246, 0.2);
                      color: #8b5cf6;
                      padding: 4px 12px;
                      border-radius: 20px;
                      font-size: 12px;
                      font-weight: 600;
                      margin-left: auto;
                    ">
                      \${pendingVersions.length} versiones
                    </span>
                  </div>
                  
                  <div id="versions-list" style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                  ">
                    \${pendingVersions.map((version, index) => {
                      const versionInfo = this.VERSION_HISTORY.versions[version];
                      return \`
                        <div id="version-\${version}" style="
                          background: rgba(255, 255, 255, 0.05);
                          border: 1px solid rgba(255, 255, 255, 0.1);
                          padding: 10px 15px;
                          border-radius: 20px;
                          font-size: 13px;
                          font-weight: 500;
                          color: #94a3b8;
                          transition: all 0.3s ease;
                          min-width: 120px;
                          text-align: center;
                          cursor: pointer;
                        "
                        onclick="UPDATE_SYSTEM.showVersionDetails('\${version}')"
                        onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.borderColor='#3b82f6'"
                        onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'"
                        title="Ver detalles de v\${version}">
                          <div style="margin-bottom: 5px;">
                            <i class="fas fa-clock" style="margin-right: 5px;"></i>
                            v\${version}
                          </div>
                          <div style="font-size: 11px; color: #64748b;">
                            \${versionInfo.changes.length} cambios
                          </div>
                        </div>
                      \`;
                    }).join('')}
                  </div>
                  
                  <div style="
                    margin-top: 15px;
                    padding: 12px;
                    background: rgba(59, 130, 246, 0.05);
                    border-radius: 8px;
                    border: 1px dashed rgba(59, 130, 246, 0.2);
                  ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <i class="fas fa-mouse-pointer" style="color: #3b82f6; font-size: 12px;"></i>
                      <span style="font-size: 12px; color: #94a3b8;">
                        Haz clic en cualquier versión para ver sus cambios detallados
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- MENSAJE FIJO -->
                <div style="
                  background: rgba(59, 130, 246, 0.1);
                  border-radius: 10px;
                  padding: 15px;
                  border-left: 4px solid #3b82f6;
                ">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    <span style="font-size: 14px; color: white; font-weight: 500;">
                      Por favor, espere hasta que se complete todo el proceso. <strong style="color:red">No cierre la página</strong>
                    </span>
                  </div>
                </div>
              </div>
            \`;
            
            // Iniciar el proceso de actualización
            this.simulateUpdateProcess(pendingVersions);
          },

          // SIMULAR EL PROCESO DE ACTUALIZACIÓN
          simulateUpdateProcess: function(pendingVersions) {
            // CALCULAR TIEMPO POR VERSIÓN BASADO EN LA CANTIDAD DE CAMBIOS
            const baseTime = 10; // segundos base para inicialización
            const perChangeTime = 4; // 4 segundos por cada cambio
            
            // Calcular tiempo total: base + (suma de cambios en todas las versiones * tiempo por cambio)
            let totalChanges = 0;
            let versionTimes = {};
            
            pendingVersions.forEach(version => {
              const versionInfo = this.VERSION_HISTORY.versions[version];
              const changesCount = versionInfo?.changes?.length || 0;
              totalChanges += changesCount;
              versionTimes[version] = changesCount * perChangeTime;
            });
            
            const totalSeconds = baseTime + (totalChanges * perChangeTime);
            this.estimatedTime = totalSeconds;
            
            const totalSteps = pendingVersions.length + 5; // Versiones + pasos inicial/final + guardar en Sheets
            let currentStep = 0;
            
            // Elementos del DOM
            const progressBar = document.getElementById('progress-bar');
            const progressPercentage = document.getElementById('progress-percentage');
            const currentAction = document.getElementById('current-action');
            const versionInfo = document.getElementById('version-info');
            const timeRemaining = document.getElementById('time-remaining');
            
            // Función para actualizar tiempo restante real
            const updateRemainingTime = (progress) => {
              if (timeRemaining) {
                const remaining = Math.max(0, totalSeconds - Math.round(totalSeconds * (progress / 100)));
                timeRemaining.innerHTML = \`<i class="fas fa-clock"></i> \${remaining}s restantes\`;
              }
            };
            
            // Función para avanzar al siguiente paso
            const nextStep = (message, version = null, isComplete = false) => {
              currentStep++;
              const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
              
              // Actualizar progreso
              if (progressBar) progressBar.style.width = progress + '%';
              if (progressPercentage) progressPercentage.textContent = progress + '%';
              
              // Actualizar tiempo restante
              updateRemainingTime(progress);
              
              // Actualizar acción actual
              if (currentAction) {
                const iconClass = isComplete ? 'fa-check-circle' : 'fa-cog fa-spin';
                currentAction.innerHTML = \`
                  <i class="fas \${iconClass}"></i> 
                  \${message}
                \`;
              }
              
              // Actualizar información de versión
              if (version && versionInfo) {
                const versionIndex = pendingVersions.indexOf(version) + 1;
                const versionData = this.VERSION_HISTORY.versions[version];
                const changesCount = versionData.changes.length;
                const versionTime = changesCount * perChangeTime;
                
                versionInfo.innerHTML = \`
                  Versión \${versionIndex} de \${pendingVersions.length} • 
                  <strong style="color: #3b82f6;">v\${version}</strong> • 
                  \${changesCount} cambios • 
                  \${versionTime}s • 
                  \${versionData.mandatory ? '<span style="color: #ef4444;">Obligatoria</span>' : '<span style="color: #22c55e;">Opcional</span>'}
                \`;
                
                // Marcar versión como completada
                const versionElement = document.getElementById(\`version-\${version}\`);
                if (versionElement) {
                  versionElement.style.background = 'rgba(34, 197, 94, 0.2)';
                  versionElement.style.borderColor = '#22c55e';
                  versionElement.style.color = '#22c55e';
                  versionElement.innerHTML = \`
                    <div style="margin-bottom: 5px;">
                      <i class="fas fa-check-circle"></i>
                      v\${version}
                    </div>
                    <div style="font-size: 11px; color: #16a34a;">
                      \${changesCount} cambios<br>\${versionTime}s
                    </div>
                  \`;
                  
                  // Actualizar el hover para mantener funcionalidad
                  versionElement.onmouseover = function() {
                    this.style.background = 'rgba(34, 197, 94, 0.3)';
                    this.style.borderColor = '#22c55e';
                  };
                  versionElement.onmouseout = function() {
                    this.style.background = 'rgba(34, 197, 94, 0.2)';
                    this.style.borderColor = '#22c55e';
                  };
                }
              }
            };
            
            // PASOS INICIALES FIJOS (10 segundos base)
            setTimeout(() => nextStep("Inicializando sistema de actualización..."), 500);
            
            setTimeout(() => nextStep("Creando copia de seguridad del sistema..."), 2000);
            
            setTimeout(() => nextStep("Verificando integridad de archivos..."), 3500);
            
            setTimeout(() => nextStep("Preparando archivos de actualización..."), 5000);
            
            // PROCESAR CADA VERSIÓN CON TIEMPO PROPORCIONAL A CAMBIOS
            let accumulatedTime = 6500; // Empieza en 6.5s después de los pasos iniciales
            
            pendingVersions.forEach((version, index) => {
              const versionInfo = this.VERSION_HISTORY.versions[version];
              const changesCount = versionInfo.changes.length;
              const versionTime = changesCount * perChangeTime * 1000; // Convertir a milisegundos
              
              setTimeout(() => {
                const stepMessage = versionInfo.mandatory 
                  ? \`Actualizando a v\${version} (OBLIGATORIO - \${changesCount} cambios)...\`
                  : \`Aplicando cambios de v\${version} (\${changesCount} cambios)...\`;
                
                nextStep(stepMessage, version);
                
              }, accumulatedTime);
              
              // Acumular tiempo para la siguiente versión
              accumulatedTime += versionTime;
            });
            
            // PASOS FINALES (incluyendo guardar en Sheets)
            setTimeout(() => nextStep("Aplicando configuraciones finales..."), accumulatedTime + 1000);
            
            setTimeout(() => nextStep("Verificando instalación..."), accumulatedTime + 2500);
            
            setTimeout(() => nextStep("Guardando cambios en la base de datos..."), accumulatedTime + 4000);
            
            // PASO CRÍTICO: Guardar en Google Sheets (2 segundos)
            setTimeout(() => {
              nextStep("Actualizando registro de versión...");
              
              // Guardar la nueva versión en Google Sheets
              this.saveUpdatedVersion(this.VERSION_HISTORY.latestVersion)
                .then((result) => {
                  console.log("Resultado del guardado:", result);
                  
                  if (result.success) {
                    // Actualizar la versión en el sistema local
                    this.VERSION_HISTORY.currentVersion = this.VERSION_HISTORY.latestVersion;
                    this.userInfo.currentVersion = this.VERSION_HISTORY.latestVersion;
                    
                    // Último paso - COMPLETADO
                    setTimeout(() => {
                      nextStep("¡Actualización completada exitosamente!", null, true);
                      
                      // Mostrar pantalla de completado
                      setTimeout(() => {
                        this.isUpdateComplete = true;
                        this.showUpdateComplete();
                      }, 1500);
                      
                    }, 1500);
                    
                  } else {
                    // Si falla el guardado
                    setTimeout(() => {
                      nextStep("¡Actualización completada! (Error al guardar registro)", null, true);
                      
                      setTimeout(() => {
                        this.isUpdateComplete = true;
                        this.showUpdateComplete();
                      }, 1500);
                    }, 1500);
                  }
                })
                .catch((error) => {
                  console.error("Error en el proceso de guardado:", error);
                  setTimeout(() => {
                    nextStep("¡Actualización completada! (Error en registro)", null, true);
                    
                    setTimeout(() => {
                      this.isUpdateComplete = true;
                      this.showUpdateComplete();
                    }, 1500);
                    setTimeout(() => {
                      window.top.location.href = window.top.location.href;
                    }, 2000);
                  }, 1500);
                });
                
            }, accumulatedTime + 5500);
          },

          // MOSTRAR PANTALLA DE ACTUALIZACIÓN COMPLETADA CON INSTRUCCIONES DE RECARGA
          showUpdateComplete: function() {
            const pendingVersions = this.getPendingVersions();
            const totalChanges = pendingVersions.reduce((total, version) => {
              const versionInfo = this.VERSION_HISTORY.versions[version];
              return total + (versionInfo?.changes?.length || 0);
            }, 0);
            
            const modal = document.getElementById('fullscreen-update-modal');
            if (!modal) return;
            
            modal.innerHTML = \`
              <div style="
                max-width: 700px;
                height: 100%;
                width: 100%;
                text-align: center;
                animation: slideUp 0.5s ease-out;
              ">
                <!-- ÍCONO DE ÉXITO -->
                <div style="
                  width: 120px;
                  height: 120px;
                  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 30px;
                  box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
                  animation: bounceIn 0.8s ease-out;
                  position: relative;
                ">
                  <i class="fas fa-check" style="font-size: 60px;"></i>
                  <div style="
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: #3b82f6;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                  ">
                    ✓
                  </div>
                </div>
                
                <!-- TÍTULO -->
                <h1 style="
                  margin: 0 0 15px 0;
                  font-size: 40px;
                  font-weight: 800;
                  color: #22c55e;
                  letter-spacing: -0.5px;
                ">
                  ¡Actualización Exitosa!
                </h1>
                
                <!-- SUBTÍTULO -->
                <p style="
                  font-size: 18px;
                  color: #bdc3c7;
                  margin-bottom: 40px;
                  line-height: 1.6;
                  max-width: 500px;
                  margin-left: auto;
                  margin-right: auto;
                ">
                  Se ha actualizado en \${this.estimatedTime} segundos
                </p>
                
                <!-- RESUMEN ESTADÍSTICAS -->
                <div style="
                  display: flex;
                  justify-content: space-around;
                  flex-wrap: wrap;
                  gap: 15px;
                  margin-bottom: 40px;
                ">                  
                  <div style="
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid rgba(245, 158, 11, 0.3);
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    flex: 1;
                    min-width: 140px;
                  ">
                    <div style="font-size: 32px; font-weight: 700; color: #f59e0b;">
                      \${this.estimatedTime}s
                    </div>
                    <div style="font-size: 14px; color: #94a3b8;">
                      <i class="fas fa-clock"></i> TIEMPO
                    </div>
                  </div>
                </div>
                
                <!-- VERSIÓN FINAL -->
                <div style="
                  background: rgba(34, 197, 94, 0.1);
                  border-radius: 12px;
                  padding: 20px;
                  margin-bottom: 40px;
                  border: 2px solid rgba(34, 197, 94, 0.3);
                ">
                  <div style="font-size: 14px; color: #22c55e; margin-bottom: 10px; font-weight: 600;">
                    <i class="fas fa-flag-checkered"></i> VERSIÓN ACTUALIZADA
                  </div>
                  <div style="
                    font-size: 42px;
                    font-weight: 800;
                    color: #22c55e;
                    text-shadow: 0 2px 10px rgba(34, 197, 94, 0.3);
                    font-family: 'Courier New', monospace;
                  ">
                    v\${this.VERSION_HISTORY.latestVersion}
                  </div>
                  <div style="font-size: 14px; color: #94a3b8; margin-top: 10px;">
                    Actualizada el \${new Date().toLocaleDateString()}
                  </div>
                </div>
                
                <!-- SECCIÓN CRÍTICA: INSTRUCCIONES DE RECARGA -->
                <div style="
                  background: rgba(239, 68, 68, 0.1);
                  border-radius: 15px;
                  padding: 25px;
                  margin-bottom: 40px;
                  border: 2px solid rgba(239, 68, 68, 0.3);
                  text-align: left;
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                      width: 50px;
                      height: 50px;
                      background: #ef4444;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-shrink: 0;
                    ">
                      <i class="fas fa-sync-alt" style="font-size: 24px;"></i>
                    </div>
                    <div>
                      <h2 style="margin: 0 0 5px 0; font-size: 24px; color: #ef4444;">
                        PASO FINAL REQUERIDO
                      </h2>
                      <p style="margin: 0; color: #fca5a5; font-size: 16px;">
                        Debe recargar la página manualmente para aplicar todos los cambios
                      </p>
                    </div>
                  </div>
                  
                  <!-- INSTRUCCIONES POR DISPOSITIVO -->
                  <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 25px;
                  ">
                    <!-- COMPUTADORA -->
                    <div style="
                      background: rgba(59, 130, 246, 0.1);
                      border-radius: 10px;
                      padding: 20px;
                      border-left: 4px solid #3b82f6;
                    ">
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                      ">
                        <i class="fas fa-desktop" style="color: #3b82f6; font-size: 24px;"></i>
                        <h3 style="margin: 0; color: white; font-size: 18px;">
                          En Computadora
                        </h3>
                      </div>
                      <ul style="
                        margin: 0;
                        padding-left: 20px;
                        color: #cbd5e1;
                        font-size: 14px;
                        line-height: 1.8;
                      ">
                        <li><strong>Método 1:</strong> Presiona la tecla <code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">F5</code></li>
                        <li><strong>Método 2:</strong> Usa <code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Ctrl + R</code> (Windows/Linux)</li>
                        <li><strong>Método 3:</strong> Usa <code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Cmd + R</code> (Mac)</li>
                        <li><strong>Método 4:</strong> Haz clic en <i class="fas fa-redo"></i> en el navegador</li>
                      </ul>
                    </div>
                    
                    <!-- DISPOSITIVOS MÓVILES -->
                    <div style="
                      background: rgba(139, 92, 246, 0.1);
                      border-radius: 10px;
                      padding: 20px;
                      border-left: 4px solid #8b5cf6;
                    ">
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                      ">
                        <i class="fas fa-mobile-alt" style="color: #8b5cf6; font-size: 24px;"></i>
                        <h3 style="margin: 0; color: white; font-size: 18px;">
                          En Móvil/Tablet
                        </h3>
                      </div>
                      <ul style="
                        margin: 0;
                        padding-left: 20px;
                        color: #cbd5e1;
                        font-size: 14px;
                        line-height: 1.8;
                      ">
                        <li><strong>Método 1:</strong> Desliza hacia abajo desde la parte superior de la pantalla</li>
                        <li><strong>Método 2:</strong> Toca el ícono <i class="fas fa-redo"></i> en la barra de direcciones</li>
                        <li><strong>Método 3:</strong> Usa el menú del navegador → "Recargar"</li>
                        <li><strong>Método 4:</strong> Reinicia la aplicación del navegador</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- ADVERTENCIA IMPORTANTE -->
                  <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 15px;
                    border: 1px dashed rgba(255, 255, 255, 0.3);
                  ">
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                      <i class="fas fa-exclamation-triangle" style="color: #f59e0b; margin-top: 2px;"></i>
                      <div>
                        <strong style="color: #f59e0b; display: block; margin-bottom: 5px;">
                          Importante:
                        </strong>
                        <span style="color: #94a3b8; font-size: 14px;">
                          Se intentará recargar la pagina sola en unos segundos, sino...Si no recarga la página, es posible que algunas funciones no funcionen correctamente. 
                          Los cambios se han guardado en la base de datos, pero necesitan recargarse en el navegador.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- BOTÓN PARA CERRAR EL MODAL -->
                <div style="margin-top: 20px;">
                  <button onclick="document.getElementById('fullscreen-update-modal').remove(); document.body.style.overflow = ''; document.documentElement.style.overflow = ''; const mainContent = document.querySelector('body > *:not(#fullscreen-update-modal):not(#version-history-header)'); if (mainContent) { mainContent.style.opacity = '1'; mainContent.style.pointerEvents = 'auto'; }" 
                    style="
                      background: rgba(255, 255, 255, 0.1);
                      color: white;
                      border: 1px solid rgba(255, 255, 255, 0.3);
                      padding: 12px 30px;
                      border-radius: 8px;
                      font-size: 15px;
                      font-weight: 600;
                      cursor: pointer;
                      display: inline-flex;
                      align-items: center;
                      gap: 10px;
                      transition: all 0.3s;
                    "
                    onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'; this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.transform='translateY(0)'" disabled>
                    <i class="fas fa-times"></i>
                    Cerrar esta ventana
                  </button>
                </div>
                
                <!-- NOTA FINAL -->
                <div style="
                  background: rgba(34, 197, 94, 0.05);
                  border-radius: 10px;
                  padding: 15px;
                  border: 1px solid rgba(34, 197, 94, 0.2);
                  margin-top: 30px;
                ">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-shield-alt" style="color: #22c55e;"></i>
                    <span style="font-size: 14px; color: #94a3b8;">
                      Sistema actualizado correctamente • Versión \${this.VERSION_HISTORY.latestVersion} guardada. Puede <strong style="color: green">recargar la página</strong>
                    </span>
                  </div>
                </div>
              </div>
            \`;
            
            // Restaurar scroll del cuerpo
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            // Habilitar contenido principal
            const mainContent = document.querySelector('body > *:not(#fullscreen-update-modal)');
            if (mainContent) {
              mainContent.style.opacity = '1';
              mainContent.style.pointerEvents = 'auto';
            }
          },

          // FUNCIONES UTILITARIAS PARA VERSIONES
          getPendingVersions: function() {
            const userVersion = this.VERSION_HISTORY.currentVersion;
            const latestVersion = this.VERSION_HISTORY.latestVersion;
            const allVersions = Object.keys(this.VERSION_HISTORY.versions);
            
            const sortedVersions = allVersions.sort((a, b) => {
              const aParts = a.split('.').map(Number);
              const bParts = b.split('.').map(Number);
              
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || 0;
                const bPart = bParts[i] || 0;
                if (aPart !== bPart) return aPart - bPart;
              }
              return 0;
            });
            
            const userVersionIndex = sortedVersions.indexOf(userVersion);
            const latestVersionIndex = sortedVersions.indexOf(latestVersion);
            
            if (userVersionIndex === -1) {
              return sortedVersions.filter(version => 
                sortedVersions.indexOf(version) <= latestVersionIndex
              );
            }
            
            if (latestVersionIndex === -1) {
              return sortedVersions.slice(userVersionIndex + 1);
            }
            
            return sortedVersions.slice(userVersionIndex + 1, latestVersionIndex + 1);
          },

          getFutureVersions: function() {
            const latestVersion = this.VERSION_HISTORY.latestVersion;
            const allVersions = Object.keys(this.VERSION_HISTORY.versions);
            
            const sortedVersions = allVersions.sort((a, b) => {
              const aParts = a.split('.').map(Number);
              const bParts = b.split('.').map(Number);
              
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || 0;
                const bPart = bParts[i] || 0;
                if (aPart !== bPart) return aPart - bPart;
              }
              return 0;
            });
            
            const latestVersionIndex = sortedVersions.indexOf(latestVersion);
            
            if (latestVersionIndex === -1) {
              return [];
            }
            
            return sortedVersions.slice(latestVersionIndex + 1);
          },

          getPreviousVersions: function() {
            const userVersion = this.VERSION_HISTORY.currentVersion;
            const allVersions = Object.keys(this.VERSION_HISTORY.versions);
            
            const sortedVersions = allVersions.sort((a, b) => {
              const aParts = a.split('.').map(Number);
              const bParts = b.split('.').map(Number);
              
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || 0;
                const bPart = bParts[i] || 0;
                if (aPart !== bPart) return aPart - bPart;
              }
              return 0;
            });
            
            const userVersionIndex = sortedVersions.indexOf(userVersion);
            
            if (userVersionIndex === -1) {
              return [];
            }
            
            return sortedVersions.slice(0, userVersionIndex);
          },

          // FUNCIÓN PARA OSCURECER COLORES
          darkenColor: function(color, percent) {
            const num = parseInt(color.replace("#", ""), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) - amt;
            const G = (num >> 8 & 0x00FF) - amt;
            const B = (num & 0x0000FF) - amt;
            return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
              (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
              (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
          },

          hexToRgb: function(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? 
              \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` :
              "59, 130, 246";
          },

          // FUNCIÓN PARA MOSTRAR DETALLES DE VERSIÓN 
          showVersionDetails: function(version) {
            console.log("🔍 Mostrando detalles completos de la versión:", version);
            
            const versionInfo = this.VERSION_HISTORY.versions[version];
            if (!versionInfo) {
              console.error("❌ Versión no encontrada:", version);
              return;
            }
            
            // Determinar el tipo de versión
            const pendingVersions = this.getPendingVersions();
            const futureVersions = this.getFutureVersions();
            const isCurrent = version === this.VERSION_HISTORY.currentVersion;
            const isFuture = futureVersions.includes(version);
            const isPrevious = this.getPreviousVersions().includes(version);
            
            let versionType, versionColor, versionIcon;
            
            if (isCurrent) {
              versionType = "TU VERSIÓN ACTUAL";
              versionColor = "#22c55e";
              versionIcon = "fa-star";
            } else if (futureVersions.includes(version)) {
              versionType = "PRÓXIMA VERSIÓN";
              versionColor = "#8b5cf6";
              versionIcon = "fa-clock";
            } else if (pendingVersions.includes(version)) {
              versionType = versionInfo.mandatory ? "ACTUALIZACIÓN OBLIGATORIA" : "ACTUALIZACIÓN DISPONIBLE";
              versionColor = versionInfo.mandatory ? "#ef4444" : "#3b82f6";
              versionIcon = versionInfo.mandatory ? "fa-exclamation-triangle" : "fa-arrow-circle-up";
            } else if (isPrevious) {
              versionType = "VERSIÓN IMPLEMENTADA";
              versionColor = "#64748b";
              versionIcon = "fa-check-circle";
            }
            
            // Renderizar recursos si existen
            const resourcesHTML = this.renderResources(versionInfo.resources, version);
            
            const modalHTML = \`
              <div id="version-details-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999;
                padding: 20px;
                animation: fadeIn 0.3s ease-out;
                backdrop-filter: blur(10px);
              ">
                <div style="
                  background: #1e293b;
                  border-radius: 20px;
                  max-width: 800px;
                  width: 100%;
                  max-height: 85vh;
                  overflow-y: auto;
                  box-shadow: 0 25px 50px rgba(0,0,0,0.6);
                  animation: slideUp 0.4s ease-out;
                  border: 1px solid rgba(255,255,255,0.1);
                ">
                  <!-- HEADER -->
                  <div style="
                    background: linear-gradient(135deg, \${versionColor} 0%, \${this.darkenColor(versionColor, 20)} 100%);
                    color: white;
                    padding: 25px 30px;
                    border-radius: 20px 20px 0 0;
                    position: sticky;
                    top: 0;
                    z-index: 2;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                  ">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                      <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                          <div style="
                            width: 50px;
                            height: 50px;
                            background: rgba(255,255,255,0.2);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                          ">
                            <i class="fas \${versionIcon}"></i>
                          </div>
                          <div>
                            <h2 style="margin: 0 0 5px 0; font-size: 28px; font-weight: 800;">
                              Versión v\${version}
                            </h2>
                            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                              <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 6px 14px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: 700;
                                backdrop-filter: blur(10px);
                              ">
                                \${versionType}
                              </span>
                              <span style="font-size: 14px; opacity: 0.9; display: flex; align-items: center; gap: 5px;">
                                <i class="far fa-calendar"></i> \${versionInfo.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" 
                        style="
                          background: rgba(255,255,255,0.2);
                          border: none;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          color: white;
                          cursor: pointer;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          transition: all 0.2s;
                          flex-shrink: 0;
                        "
                        onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='rotate(90deg)'"
                        onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='rotate(0deg)'">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <!-- RESUMEN RÁPIDO -->
                    <div style="
                      display: flex;
                      gap: 15px;
                      margin-top: 20px;
                      flex-wrap: wrap;
                    ">
                      <div style="
                        background: rgba(255,255,255,0.15);
                        padding: 12px 15px;
                        border-radius: 10px;
                        flex: 1;
                        min-width: 120px;
                      ">
                        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                          <i class="fas fa-bullhorn"></i> NOVEDADES
                        </div>
                        <div style="font-size: 22px; font-weight: 800;">
                          \${versionInfo.changes.length}
                        </div>
                      </div>
                      
                      \${versionInfo.mandatory !== undefined ? \`
                        <div style="
                          background: rgba(255,255,255,0.15);
                          padding: 12px 15px;
                          border-radius: 10px;
                          flex: 1;
                          min-width: 120px;
                        ">
                          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-exclamation-circle"></i> TIPO
                          </div>
                          <div style="font-size: 22px; font-weight: 800;">
                            \${versionInfo.mandatory ? 'Obligatoria' : 'Opcional'}
                          </div>
                        </div>
                      \` : ''}
                      
                      \${versionInfo.updateRequired !== undefined ? \`
                        <div style="
                          background: rgba(255,255,255,0.15);
                          padding: 12px 15px;
                          border-radius: 10px;
                          flex: 1;
                          min-width: 120px;
                        ">
                          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-sync-alt"></i> REQUERIDA
                          </div>
                          <div style="font-size: 22px; font-weight: 800;">
                            \${versionInfo.updateRequired ? 'Sí' : 'No'}
                          </div>
                        </div>
                      \` : ''}
                    </div>
                  </div>
                  
                  <!-- CONTENIDO DEL MODAL -->
                  <div style="padding: 30px;">
                    <!-- CAMBIOS -->
                    <div style="margin-bottom: 30px;">
                      <h3 style="
                        color: #e2e8f0; 
                        margin: 0 0 20px 0; 
                        font-size: 22px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                      ">
                        <i class="fas fa-star" style="color: \${versionColor};"></i>
                        Novedades y Cambios
                      </h3>
                      <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 12px;
                        padding: 20px;
                        border-left: 4px solid \${versionColor};
                      ">
                        <ul style="margin: 0; padding-left: 20px;">
                          \${versionInfo.changes.map((change, index) => \`
                            <li style="
                              margin-bottom: 15px;
                              color: #cbd5e1;
                              padding-left: 10px;
                              line-height: 1.5;
                              position: relative;
                              font-size: 15px;
                            ">
                              <span style="
                                position: absolute;
                                left: -20px;
                                top: 8px;
                                width: 8px;
                                height: 8px;
                                background: \${versionColor};
                                border-radius: 50%;
                              "></span>
                              \${change}
                            </li>
                          \`).join('')}
                        </ul>
                      </div>
                    </div>
                    
                    <!-- RECURSOS -->
                    \${resourcesHTML}
                  </div>
                  
                  <!-- FOOTER DEL MODAL -->
                  <div style="
                    padding: 20px 30px;
                    background: rgba(0,0,0,0.2);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    border-radius: 0 0 20px 20px;
                  ">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                      style="
                        background: \${versionColor};
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 10px;
                        font-size: 15px;
                        font-weight: 700;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin: 0 auto;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(\${this.hexToRgb(versionColor)}, 0.4);
                      "
                      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(\${this.hexToRgb(versionColor)}, 0.6)'"
                      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(\${this.hexToRgb(versionColor)}, 0.4)'">
                      <i class="fas fa-times"></i>
                      Cerrar Detalles
                    </button>
                  </div>
                </div>
              </div>
            \`;
            
            // Remover modal existente si hay
            const existingModal = document.getElementById('version-details-modal');
            if (existingModal) existingModal.remove();
            
            // Agregar el nuevo modal
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Guardar referencia para scroll táctil
            const modal = document.getElementById('version-details-modal');
            modal.addEventListener('touchmove', function(e) {
              e.stopPropagation();
            }, { passive: false });
          },

          // FUNCIÓN PARA RENDERIZAR RECURSOS 
          renderResources: function(resources, version) {
            if (!resources || (!resources.images && !resources.videos && !resources.links)) {
              return '';
            }
            
            let html = '<div style="margin-top: 30px;">';
            
            // Sección de imágenes
            if (resources.images && resources.images.length > 0) {
              html += \`
                <div style="margin-bottom: 30px;">
                  <h3 style="
                    color: #e2e8f0; 
                    margin: 0 0 15px 0; 
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  ">
                    <i class="fas fa-images" style="color: #3b82f6;"></i>
                    Capturas de Pantalla
                  </h3>
                  <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 12px;
                  ">
                    \${resources.images.map((imageUrl, index) => \`
                      <a href="\${imageUrl}" target="_blank" rel="noopener noreferrer" 
                        style="
                          display: block;
                          border-radius: 10px;
                          overflow: hidden;
                          border: 2px solid rgba(59, 130, 246, 0.3);
                          transition: all 0.3s;
                          position: relative;
                          aspect-ratio: 1/1;
                        "
                        onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#3b82f6'"
                        onmouseout="this.style.transform='scale(1)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'"
                        title="Ver imagen en tamaño completo">
                        <img src="\${imageUrl}" 
                          alt="Captura v\${version} - \${index + 1}"
                          style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                          ">
                        <div style="
                          position: absolute;
                          bottom: 0;
                          left: 0;
                          right: 0;
                          background: rgba(59, 130, 246, 0.9);
                          color: white;
                          font-size: 10px;
                          padding: 4px;
                          text-align: center;
                          font-weight: 600;
                        ">
                          <i class="fas fa-expand"></i> Ver
                        </div>
                      </a>
                    \`).join('')}
                  </div>
                </div>
              \`;
            }
            
            // Sección de videos
            if (resources.videos && resources.videos.length > 0) {
              html += \`
                <div style="margin-bottom: 30px;">
                  <h3 style="
                    color: #e2e8f0; 
                    margin: 0 0 15px 0; 
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  ">
                    <i class="fab fa-youtube" style="color: #ef4444;"></i>
                    Videos Demostrativos
                  </h3>
                  <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                  ">
                    \${resources.videos.map((videoUrl, index) => {
                      const videoId = videoUrl.includes('youtube.com/embed/') 
                        ? videoUrl.split('youtube.com/embed/')[1]?.split('?')[0]
                        : videoUrl.includes('youtu.be/')
                          ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
                          : null;
                      
                      if (!videoId) return '';
                      
                      return \`
                        <div style="
                          background: rgba(239, 68, 68, 0.1);
                          border: 1px solid rgba(239, 68, 68, 0.3);
                          border-radius: 12px;
                          padding: 15px;
                        ">
                          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
                            <iframe 
                              src="https://www.youtube.com/embed/\${videoId}?rel=0&modestbranding=1"
                              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen>
                            </iframe>
                          </div>
                          <div style="margin-top: 12px; text-align: center;">
                            <a href="https://youtu.be/\${videoId}" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style="
                                display: inline-flex;
                                align-items: center;
                                gap: 8px;
                                background: #ef4444;
                                color: white;
                                padding: 8px 16px;
                                border-radius: 6px;
                                text-decoration: none;
                                font-size: 13px;
                                font-weight: 600;
                                transition: all 0.2s;
                              "
                              onmouseover="this.style.background='#dc2626'; this.style.transform='translateY(-2px)'"
                              onmouseout="this.style.background='#ef4444'; this.style.transform='translateY(0)'">
                              <i class="fab fa-youtube"></i>
                              Ver en YouTube
                            </a>
                          </div>
                        </div>
                      \`;
                    }).join('')}
                  </div>
                </div>
              \`;
            }
            
            // Sección de enlaces
            if (resources.links && resources.links.length > 0) {
              html += \`
                <div>
                  <h3 style="
                    color: #e2e8f0; 
                    margin: 0 0 15px 0; 
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  ">
                    <i class="fas fa-external-link-alt" style="color: #22c55e;"></i>
                    Recursos Relacionados
                  </h3>
                  <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                  ">
                    \${resources.links.map(link => \`
                      <a href="\${link.url}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style="
                          display: block;
                          padding: 16px;
                          background: rgba(255, 255, 255, 0.05);
                          border-radius: 10px;
                          border: 1px solid rgba(34, 197, 94, 0.3);
                          text-decoration: none;
                          color: #e2e8f0;
                          transition: all 0.3s;
                        "
                        onmouseover="this.style.transform='translateX(5px)'; this.style.background='rgba(34, 197, 94, 0.1)'; this.style.borderColor='#22c55e'"
                        onmouseout="this.style.transform='translateX(0)'; this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(34, 197, 94, 0.3)'">
                        <div style="display: flex; align-items: center;">
                          <div style="
                            width: 40px;
                            height: 40px;
                            background: #22c55e;
                            color: white;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 15px;
                            flex-shrink: 0;
                          ">
                            <i class="fas fa-external-link-alt"></i>
                          </div>
                          <div style="flex: 1;">
                            <div style="font-weight: 700; margin-bottom: 4px; color: white; font-size: 16px;">
                              \${link.title}
                            </div>
                            \${link.description ? \`
                              <div style="font-size: 13px; color: #94a3b8;">
                                \${link.description}
                              </div>
                            \` : ''}
                          </div>
                          <i class="fas fa-chevron-right" style="color: #64748b; font-size: 14px;"></i>
                        </div>
                      </a>
                    \`).join('')}
                  </div>
                </div>
              \`;
            }
            
            html += '</div>';
            return html;
          },

          init: function() {
            console.log("🎯 Inicializando sistema de actualizaciones...");
            
            document.addEventListener('DOMContentLoaded', function() {
              console.log("📄 DOM cargado, verificando estado...");
              
              // Verificar después de un breve delay
              setTimeout(function() {
                UPDATE_SYSTEM.checkForUpdates();
              }, 1000);
            });
          },

          checkForUpdates: function() {
            console.log("🔍 VERIFICANDO ACTUALIZACIONES");
            
            const pendingVersions = this.getPendingVersions();
            const hasUpdates = pendingVersions.length > 0;
            
            if (hasUpdates) {
              console.log("🔄 Actualizaciones pendientes encontradas:", pendingVersions.length);
              
              // Ocultar contenido principal suavemente
              const mainContent = document.querySelector('body > *:not(#fullscreen-update-modal):not(#version-history-header)');
              if (mainContent) {
                mainContent.style.transition = 'opacity 0.8s ease';
                mainContent.style.opacity = '0.3';
                mainContent.style.pointerEvents = 'none';
              }
              
              // Mostrar pantalla completa de actualización
              this.showFullScreenUpdate();
              
            } else {
              console.log("✅ Sistema actualizado, mostrando historial...");
              
              // HEADER DE HISTORIAL DE VERSIONES
              // Solo mostrar si no hay actualizaciones
              const historyHTML = this.createVersionHistoryHeader();
              if (historyHTML) {
                document.body.insertAdjacentHTML('afterbegin', historyHTML);
              }
            }
          },

          // HEADER DE HISTORIAL DE VERSIONES 
          createVersionHistoryHeader: function() {
            const pendingVersions = this.getPendingVersions();
            const futureVersions = this.getFutureVersions();
            const previousVersions = this.getPreviousVersions();
            const hasUpdates = pendingVersions.length > 0;
            
            // Si hay actualizaciones pendientes, no mostrar el header de historial
            if (hasUpdates) return '';
            
            return \`
              <div id="version-history-header" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 998;
                background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                color: white;
                padding: 12px 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                max-height: 60px;
                overflow: hidden;
                border-bottom: 1px solid rgba(255,255,255,0.1);
              ">
                <div style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 15px;
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                    min-width: 0;
                  ">
                    <div style="
                      width: 36px;
                      height: 36px;
                      background: rgba(59, 130, 246, 0.3);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-shrink: 0;
                    ">
                      <i class="fas fa-history"></i>
                    </div>
                    
                    <div style="flex: 1; min-width: 0;">
                      <div style="
                        font-weight: 600;
                        font-size: 16px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      ">
                        Sistema Actualizado ✓
                      </div>
                      <div style="
                        font-size: 12px;
                        opacity: 0.9;
                        display: flex;
                        gap: 12px;
                        flex-wrap: wrap;
                      ">
                        <span>
                          <i class="fas fa-user-check"></i> v\${this.VERSION_HISTORY.currentVersion}
                        </span>
                        <span>
                          <i class="fas fa-archive"></i> \${previousVersions.length} Pasadas
                        </span>
                        \${futureVersions.length > 0 ? \`
                          <span>
                            <i class="fas fa-rocket"></i> \${futureVersions.length} Futuras
                          </span>
                        \` : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 10px; flex-shrink: 0;">
                    <button onclick="UPDATE_SYSTEM.toggleHistoryHeader()" 
                      style="
                        background: rgba(255,255,255,0.15);
                        border: none;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        color: white;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.2s;
                        flex-shrink: 0;
                      "
                      onmouseover="this.style.background='rgba(255,255,255,0.25)'; this.style.transform='rotate(180deg)'"
                      onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.transform='rotate(0deg)'"
                      title="Ver historial de versiones">
                      <i id="history-toggle-icon" class="fas fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
                
                <!-- SECCIÓN EXPANDIBLE DEL HISTORIAL - VERSIONES CLICKEABLES -->
                <div id="history-expanded" style="
                  display: none;
                  margin-top: 15px;
                  padding-top: 15px;
                  border-top: 1px solid rgba(255,255,255,0.2);
                  animation: slideDown 0.3s ease-out;
                ">
                  <!-- RESUMEN DE VERSIONES -->
                  <div style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div onclick="UPDATE_SYSTEM.showVersionDetails('${userVersionInfo.currentVersion}')"
                      style="
                        flex: 1;
                        min-width: 120px;
                        background: rgba(34, 197, 94, 0.2);
                        padding: 10px;
                        border-radius: 8px;
                        border-left: 3px solid #22c55e;
                        cursor: pointer;
                        transition: all 0.2s;
                      "
                      onmouseover="this.style.background='rgba(34, 197, 94, 0.3)'; this.style.transform='translateY(-2px)'"
                      onmouseout="this.style.background='rgba(34, 197, 94, 0.2)'; this.style.transform='translateY(0)'"
                      title="Ver detalles de tu versión actual">
                      <div style="font-size: 11px; opacity: 0.9; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-user-check"></i> TU VERSIÓN
                      </div>
                      <div style="font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace;">
                        v\${this.VERSION_HISTORY.currentVersion}
                      </div>
                    </div>
                    
                    <div onclick="UPDATE_SYSTEM.showVersionDetails('0.0.6')"
                      style="
                        flex: 1;
                        min-width: 120px;
                        background: rgba(59, 130, 246, 0.2);
                        padding: 10px;
                        border-radius: 8px;
                        border-left: 3px solid #3b82f6;
                        cursor: pointer;
                        transition: all 0.2s;
                      "
                      onmouseover="this.style.background='rgba(59, 130, 246, 0.3)'; this.style.transform='translateY(-2px)'"
                      onmouseout="this.style.background='rgba(59, 130, 246, 0.2)'; this.style.transform='translateY(0)'"
                      title="Ver detalles de la última versión estable">
                      <div style="font-size: 11px; opacity: 0.9; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-flag-checkered"></i> ÚLTIMA
                      </div>
                      <div style="font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace;">
                        v\${this.VERSION_HISTORY.latestVersion}
                      </div>
                    </div>
                  </div>
                  
                  <!-- LISTA COMPLETA DE VERSIONES CLICKEABLES -->
                  <div style="margin-bottom: 15px;">
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      margin-bottom: 12px;
                    ">
                      <i class="fas fa-stream" style="color: #3b82f6;"></i>
                      <span style="font-size: 14px; font-weight: 600; color: white;">
                        Línea de tiempo de versiones
                      </span>
                    </div>
                    
                    <div style="
                      display: flex;
                      flex-wrap: wrap;
                      gap: 8px;
                      justify-content: center;
                    ">
                      \${(previousVersions.length > 5) ? \`
                        <div style="
                          background: rgba(255,255,255,0.1);
                          border: 1px dashed rgba(255,255,255,0.3);
                          padding: 6px 10px;
                          border-radius: 16px;
                          font-size: 10px;
                          color: rgba(255,255,255,0.7);
                          display: flex;
                          align-items: center;
                          gap: 4px;
                        ">
                          <i class="fas fa-ellipsis-h" style="font-size: 9px;"></i>
                          más
                        </div>
                      \` : ''}
                      <!-- Versiones anteriores (máximo 5) -->
                      \${previousVersions.slice(-5).map(version => {
                        const versionInfo = this.VERSION_HISTORY.versions[version];
                        return \`
                          <div onclick="UPDATE_SYSTEM.showVersionDetails('\${version}')"
                            style="
                              background: rgba(100, 116, 139, 0.3);
                              border: 1px solid #64748b;
                              padding: 6px 12px;
                              border-radius: 16px;
                              font-size: 11px;
                              cursor: pointer;
                              transition: all 0.2s;
                              display: flex;
                              align-items: center;
                              gap: 5px;
                              font-family: 'Courier New', monospace;
                            "
                            onmouseover="this.style.background='rgba(100, 116, 139, 0.4)'; this.style.transform='translateY(-2px)'"
                            onmouseout="this.style.background='rgba(100, 116, 139, 0.3)'; this.style.transform='translateY(0)'"
                            title="Ver detalles de v\${version} | \${versionInfo.date}">
                            <i class="fas fa-check-circle" style="color: #22c55e; font-size: 9px;"></i>
                            v\${version}
                          </div>
                        \`;
                      }).join('')}
                      
                      <!-- Versión actual -->
                      <div onclick="UPDATE_SYSTEM.showVersionDetails('${userVersionInfo.currentVersion}')"
                        style="
                          background: rgba(34, 197, 94, 0.4);
                          border: 2px solid #22c55e;
                          padding: 6px 12px;
                          border-radius: 16px;
                          font-size: 12px;
                          font-weight: 600;
                          cursor: pointer;
                          transition: all 0.2s;
                          display: flex;
                          align-items: center;
                          gap: 5px;
                          font-family: 'Courier New', monospace;
                          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
                        "
                        onmouseover="this.style.background='rgba(34, 197, 94, 0.5)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(34, 197, 94, 0.4)'"
                        onmouseout="this.style.background='rgba(34, 197, 94, 0.4)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(34, 197, 94, 0.3)'"
                        title="Ver detalles de tu versión actual">
                        <i class="fas fa-star" style="color: #fbbf24; font-size: 10px;"></i>
                        v\${this.VERSION_HISTORY.currentVersion}
                      </div>
                      
                      <!-- Versiones futuras (máximo 5) -->
                      \${futureVersions.slice(0, 5).map(version => {
                        const versionInfo = this.VERSION_HISTORY.versions[version];
                        return \`
                          <div onclick="UPDATE_SYSTEM.showVersionDetails('\${version}')"
                            style="
                              background: rgba(139, 92, 246, 0.3);
                              border: 1px solid #8b5cf6;
                              padding: 6px 12px;
                              border-radius: 16px;
                              font-size: 11px;
                              cursor: pointer;
                              transition: all 0.2s;
                              display: flex;
                              align-items: center;
                              gap: 5px;
                              font-family: 'Courier New', monospace;
                            "
                            onmouseover="this.style.background='rgba(139, 92, 246, 0.4)'; this.style.transform='translateY(-2px)'"
                            onmouseout="this.style.background='rgba(139, 92, 246, 0.3)'; this.style.transform='translateY(0)'"
                            title="Ver detalles de v\${version} | \${versionInfo.date}">
                            <i class="fas fa-clock" style="color: #8b5cf6; font-size: 9px;"></i>
                            v\${version}
                          </div>
                        \`;
                      }).join('')}
                      
                      <!-- Indicador de más versiones si hay más -->
                      \${(futureVersions.length > 5) ? \`
                        <div style="
                          background: rgba(255,255,255,0.1);
                          border: 1px dashed rgba(255,255,255,0.3);
                          padding: 6px 10px;
                          border-radius: 16px;
                          font-size: 10px;
                          color: rgba(255,255,255,0.7);
                          display: flex;
                          align-items: center;
                          gap: 4px;
                        ">
                          <i class="fas fa-ellipsis-h" style="font-size: 9px;"></i>
                          más
                        </div>
                      \` : ''}
                    </div>
                    
                    <!-- INSTRUCCIÓN CLARA -->
                    <div style="
                      margin-top: 15px;
                      padding: 10px;
                      background: rgba(59, 130, 246, 0.1);
                      border-radius: 8px;
                      border-left: 3px solid #3b82f6;
                    ">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-mouse-pointer" style="color: #3b82f6; font-size: 12px;"></i>
                        <span style="font-size: 11px; color: #cbd5e1;">
                          Haz clic en cualquier versión para ver todos los detalles
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- BOTÓN ÚNICO PARA CERRAR -->
                  <div style="text-align: center;">
                    <button onclick="UPDATE_SYSTEM.toggleHistoryHeader()" 
                      style="
                        background: rgba(255,255,255,0.1);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.3);
                        padding: 8px 20px;
                        border-radius: 8px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        transition: all 0.2s;
                      "
                      onmouseover="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(-1px)'"
                      onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(0)'">
                      <i class="fas fa-chevron-up"></i>
                      Cerrar historial
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- ESPACIADOR PARA EL HEADER -->
              <div id="history-header-spacer" style="height: 60px;"></div>
            \`;
          },

          // FUNCIONES DEL HEADER DE HISTORIAL
          toggleHistoryHeader: function() {
            const header = document.getElementById('version-history-header');
            const expanded = document.getElementById('history-expanded');
            const toggleIcon = document.getElementById('history-toggle-icon');
            const spacer = document.getElementById('history-header-spacer');
            
            if (!header || !expanded || !toggleIcon || !spacer) return;
            
            if (expanded.style.display === 'none' || !expanded.style.display) {
              // Expandir
              expanded.style.display = 'block';
              header.style.maxHeight = '400px';
              header.style.padding = '12px 20px 20px 20px';
              toggleIcon.className = 'fas fa-chevron-up';
              spacer.style.height = '400px';
            } else {
              // Colapsar
              expanded.style.display = 'none';
              header.style.maxHeight = '60px';
              header.style.padding = '12px 20px';
              toggleIcon.className = 'fas fa-chevron-down';
              spacer.style.height = '60px';
            }
          }
        };

        // INICIAR EL SISTEMA
        UPDATE_SYSTEM.init();
      </script>
      
      <style>
        /* ANIMACIONES (se mantienen igual) */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        /* ESTILOS RESPONSIVOS (se mantienen igual) */
        @media (max-width: 768px) {
          #fullscreen-update-modal h1 {
            font-size: 28px !important;
          }
          
          #fullscreen-update-modal p {
            font-size: 16px !important;
          }
          
          #version-history-header {
            padding: 10px 15px !important;
          }
          
          #version-details-modal > div {
            width: 95% !important;
            max-height: 90vh !important;
            margin: 10px !important;
            padding: 15px !important;
          }
          
          #history-expanded > div:first-child > div {
            min-width: calc(50% - 8px) !important;
          }
        }
        
        @media (max-width: 480px) {
          #fullscreen-update-modal h1 {
            font-size: 24px !important;
          }
          
          #fullscreen-update-modal {
            padding: 10px !important;
          }
          
          #version-history-header {
            padding: 8px 12px !important;
          }
          
          #version-details-modal > div {
            padding: 10px !important;
          }
          
          #history-expanded > div:first-child > div {
            min-width: 100% !important;
          }
        }
        
        /* SCROLLBAR PERSONALIZADO  */
        #fullscreen-update-modal,
        #version-details-modal > div,
        #version-history-header {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #1e293b;
        }
        
        #fullscreen-update-modal::-webkit-scrollbar,
        #version-details-modal > div::-webkit-scrollbar,
        #version-history-header::-webkit-scrollbar {
          width: 8px;
        }
        
        #fullscreen-update-modal::-webkit-scrollbar-track,
        #version-details-modal > div::-webkit-scrollbar-track,
        #version-history-header::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        
        #fullscreen-update-modal::-webkit-scrollbar-thumb,
        #version-details-modal > div::-webkit-scrollbar-thumb,
        #version-history-header::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 10px;
        }
        
        #fullscreen-update-modal::-webkit-scrollbar-thumb:hover,
        #version-details-modal > div::-webkit-scrollbar-thumb:hover,
        #version-history-header::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
        }
        
        /* MEJORAS DE TOUCH (se mantienen igual) */
        @media (hover: none) and (pointer: coarse) {
          button:hover, [onclick]:hover {
            transform: none !important;
          }
          
          [onhover]:hover {
            transform: none !important;
          }
          
          button, [onclick] {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* TRANSICIONES SUAVES (se mantienen igual) */
        #fullscreen-update-modal,
        #version-history-header,
        #history-expanded,
        #version-details-modal > div {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* MEJORAS DE USABILIDAD (se mantienen igual) */
        [onclick] {
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        [onclick]:active {
          transform: scale(0.98) !important;
        }
        
        /* AJUSTE PARA DISPOSITIVOS PEQUEÑOS (se mantienen igual) */
        @media (max-width: 360px) {
          #fullscreen-update-modal h1 {
            font-size: 22px !important;
          }
          
          #version-history-header {
            font-size: 14px !important;
          }
          
          #history-expanded > div:first-child > div {
            font-size: 16px !important;
          }
        }
      </style>
    `;
    
    console.log("✅ Sistema de actualizaciones inyectado correctamente");
    
  } catch (error) {
    console.error("❌ Error inyectando sistema:", error);
  }
}

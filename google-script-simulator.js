// ============================================
// CONFIGURACIÓN DE LA API (usa GET directo)
// ============================================
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyx2ZKEOGThYPBLjDeavIn1EYF9tmcYieT-6mfvAZAeiR0-nO__NKiJTejXxjJGJCBaBA/exec';

// ============================================
// SIMULADOR DE GOOGLE.SCRIPT.RUN (usando GET)
// ============================================
(function(global) {
    global.google = global.google || {};
    
    global.google.script = (function() {
        let successHandler = null;
        let failureHandler = null;
        let userObject = null;

        function resetHandlers() {
            successHandler = null;
            failureHandler = null;
            userObject = null;
        }

        const createRunProxy = () => {
            return new Proxy({}, {
                get: (target, prop) => {
                    if (prop === 'withSuccessHandler') {
                        return (handler) => {
                            successHandler = handler;
                            return runProxy;
                        };
                    }
                    if (prop === 'withFailureHandler') {
                        return (handler) => {
                            failureHandler = handler;
                            return runProxy;
                        };
                    }
                    if (prop === 'withUserObject') {
                        return (obj) => {
                            userObject = obj;
                            return runProxy;
                        };
                    }

                    return (...args) => {
                        const functionName = prop;
                        const functionArgs = args;
                        
                        // Para getArtistData, usar GET
                        if (functionName === 'getArtistData') {
                            const userId = functionArgs[0];
                            const url = `${GAS_API_URL}?api=true&endpoint=getArtistData&id=${encodeURIComponent(userId)}`;
                            
                            fetch(url)
                                .then(response => response.json())
                                .then(data => {
                                    if (successHandler) {
                                        successHandler(data, userObject);
                                    }
                                    resetHandlers();
                                })
                                .catch(error => {
                                    if (failureHandler) {
                                        failureHandler(error.message, userObject);
                                    }
                                    resetHandlers();
                                });
                        } else {
                            // Para otras funciones, mantener POST (si las necesitas)
                            const payload = {
                                action: functionName,
                                data: functionArgs.length === 1 ? functionArgs[0] : functionArgs
                            };

                            fetch(GAS_API_URL, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(payload)
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'success') {
                                    if (successHandler) {
                                        successHandler(data.result, userObject);
                                    }
                                } else {
                                    if (failureHandler) {
                                        failureHandler(data.error, userObject);
                                    }
                                }
                                resetHandlers();
                            })
                            .catch(error => {
                                if (failureHandler) {
                                    failureHandler(error.message, userObject);
                                }
                                resetHandlers();
                            });
                        }

                        return runProxy;
                    };
                }
            });
        };

        const runProxy = createRunProxy();

        return {
            run: runProxy
        };
    })();
})(window);

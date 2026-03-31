// ============================================
// CONFIGURACIÓN DE LA API (CAMBIA ESTO)
// ============================================
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbxvTb2OPuTvquH6zSut1gVyPproFjHGSaN02xGDjNN7NoluU5PDaH5PBi0WA2K6c2TaeQ/exec';

// ============================================
// SIMULADOR DE GOOGLE.SCRIPT.RUN
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
                        .then(response => {
                            if (response.redirected) {
                                return fetch(response.url);
                            }
                            return response;
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                if (successHandler) {
                                    successHandler(data.result, userObject);
                                } else {
                                    console.log('Éxito:', data.result);
                                }
                            } else {
                                if (failureHandler) {
                                    failureHandler(data.error, userObject);
                                } else {
                                    console.error('Error:', data.error);
                                }
                            }
                            resetHandlers();
                        })
                        .catch(error => {
                            console.error('Error de red:', error);
                            if (failureHandler) {
                                failureHandler(error.message, userObject);
                            }
                            resetHandlers();
                        });

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

// ============================================
// CONFIGURACIÓN DE LA API (usa GET directo)
// ============================================
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyx2ZKEOGThYPBLjDeavIn1EYF9tmcYieT-6mfvAZAeiR0-nO__NKiJTejXxjJGJCBaBA/exec';

// ============================================
// SIMULADOR DEFINITIVO (JSON-SAFE)
// ============================================
(function(global) {
    // Definimos la URL de tu Web App de Google

    global.google = global.google || {};
    global.google.script = (function() {
        let _h = { s: null, f: null, obj: null };
        const reset = () => { _h = { s: null, f: null, obj: null }; };

        const execute = (name, args) => {
            // Recogemos los handlers actuales
            const success = _h.s;
            const failure = _h.f;
            const userObj = _h.obj;
            reset(); // Limpiamos para la siguiente llamada

            // Enviamos siempre como Array de Strings para evitar errores de tipo
            const payloadData = args.map(arg => String(arg || "").trim());

            fetch(GAS_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    endpoint: name,
                    payload: payloadData
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    if (success) success(data.data, userObj);
                } else {
                    if (failure) failure(data.error, userObj);
                }
            })
            .catch(err => {
                if (failure) failure(err.message, userObj);
            });
        };

        // El Proxy hace la magia: intercepta cualquier nombre de función
        const proxy = new Proxy({}, {
            get: (target, prop) => {
                if (prop === 'withSuccessHandler') return (h) => { _h.s = h; return proxy; };
                if (prop === 'withFailureHandler') return (h) => { _h.f = h; return proxy; };
                if (prop === 'withUserObject') return (o) => { _h.obj = o; return proxy; };
                
                // Si no es un handler, es el nombre de la función (ej: getRelatedArtistIds)
                return (...args) => execute(prop, args);
            }
        });

        return { run: proxy };
    })();
})(window);

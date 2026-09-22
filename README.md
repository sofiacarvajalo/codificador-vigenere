# Codificador Vigenère v1

App web instalable (PWA), estática y sin backend.

Alfabeto histórico inmutable:
ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ

Privacidad:
- Texto, resultado y clave activa no se guardan.
- El cifrado Vigenère ocurre localmente.
- Solo la Bóveda persiste datos elegidos por la usuaria.
- La Bóveda usa AES-GCM y PBKDF2-SHA-256 mediante Web Crypto.
- No hay analítica ni base de datos remota.

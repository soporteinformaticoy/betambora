/**
 * test-going.js — Verifica que el toggle "voy a ir" funciona correctamente
 *
 * Requiere: backend corriendo en localhost:3000 y MongoDB activo
 * Uso: node test-going.js
 */

const BASE = 'http://localhost:3000';

async function run() {
    console.log('=== Test toggle going ===\n');

    // 1. Login con admin para obtener token
    console.log('1. Login...');
    const loginRes = await fetch(`${BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const { token, user } = await loginRes.json();

    if (!token) {
        console.error('❌ Login falló. ¿El backend está corriendo y la BD tiene datos?');
        console.error('   Ejecutá: npm run dev  y  npm run seedAdmin');
        return;
    }
    console.log(`   ✅ Logueado como: ${user.username}`);

    // 2. Obtener un evento publicado
    console.log('\n2. Buscando un evento publicado...');
    const eventosRes = await fetch(`${BASE}/api/events`);
    const eventos = await eventosRes.json();

    if (!eventos.length) {
        console.error('❌ No hay eventos publicados. Ejecutá: npm run seedAdmin');
        return;
    }
    const evento = eventos[0];
    console.log(`   ✅ Evento encontrado: "${evento.titulo}" (id: ${evento._id})`);
    console.log(`   Estado inicial — goingCount: ${evento.goingCount}`);

    // 3. Primer toggle (agregar)
    console.log('\n3. Primer toggle — agregando "voy"...');
    const toggle1 = await fetch(`${BASE}/api/events/${evento._id}/going`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    const res1 = await toggle1.json();

    if (toggle1.status !== 200) {
        console.error('❌ Toggle falló:', res1);
        return;
    }
    console.log(`   goingCount: ${res1.goingCount} | iAmGoing: ${res1.iAmGoing}`);
    const paso1 = res1.iAmGoing === true && res1.goingCount > 0;
    console.log(`   ${paso1 ? '✅ Correcto' : '❌ Error: iAmGoing debería ser true'}`);

    // 4. Segundo toggle (quitar)
    console.log('\n4. Segundo toggle — quitando "voy"...');
    const toggle2 = await fetch(`${BASE}/api/events/${evento._id}/going`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    const res2 = await toggle2.json();
    console.log(`   goingCount: ${res2.goingCount} | iAmGoing: ${res2.iAmGoing}`);
    const paso2 = res2.iAmGoing === false;
    console.log(`   ${paso2 ? '✅ Correcto' : '❌ Error: iAmGoing debería ser false'}`);

    // Resultado final
    console.log('\n=== Resultado ===');
    if (paso1 && paso2) {
        console.log('✅ Todo funciona. El toggle going opera correctamente con ObjectIds.');
    } else {
        console.log('❌ Hay un problema. Revisá los logs de arriba.');
    }
}

run().catch(err => {
    console.error('Error inesperado:', err.message);
    console.error('¿El backend está corriendo? Ejecutá: npm run dev');
});

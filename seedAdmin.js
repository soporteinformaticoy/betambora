const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Agrupacion = require('./models/Agrupacion');
const Integrante = require('./models/Integrante');
const Event = require('./models/Event');

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1);
    });

async function seedDatabase() {
    try {
        // Limpiar base de datos
        await User.deleteMany({});
        await Agrupacion.deleteMany({});
        await Integrante.deleteMany({});
        await Event.deleteMany({});
        console.log('Base de datos limpiada');

        // Crear usuario admin
        const admin = await User.create({
            username: 'admin',
            email: 'admin@tambora.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('✓ Usuario admin creado (username: admin, password: admin123)');

        // Crear agrupaciones de Uruguay
        const cuareim1080 = await Agrupacion.create({
            nombre: 'Cuareim 1080',
            tipo: 'Comparsa Oficial',
            participaConcurso: true,
            barrio: 'Cuareim',
            ciudad: 'Montevideo',
            pais: 'Uruguay',
            descripcion: 'Ganadora del Desfile de Llamadas 2024. Mejor cuerda de tambores y mejor cuerpo de baile.',
            añoFundacion: 1989,
            redesSociales: {
                instagram: '@cuareim1080oficial',
                facebook: 'Cuareim1080'
            }
        });

        const candongaAfricana = await Agrupacion.create({
            nombre: 'Candonga Africana',
            tipo: 'Comparsa Oficial',
            participaConcurso: true,
            barrio: 'Palermo',
            ciudad: 'Montevideo',
            pais: 'Uruguay',
            descripcion: 'Tradicional comparsa de Montevideo, participante destacada del concurso oficial.',
            añoFundacion: 1976,
            redesSociales: {
                instagram: '@candongaafricana'
            }
        });

        const laGeneracionLubola = await Agrupacion.create({
            nombre: 'La Generación Lubola',
            tipo: 'Comparsa Oficial',
            participaConcurso: true,
            barrio: 'Cordón',
            ciudad: 'Montevideo',
            pais: 'Uruguay',
            descripcion: 'Comparsa clasificada para el Desfile de Llamadas 2025.',
            añoFundacion: 2001
        });

        const eleggua = await Agrupacion.create({
            nombre: 'Elegguá',
            tipo: 'Comparsa Oficial',
            participaConcurso: true,
            barrio: 'Barrio Sur',
            ciudad: 'Montevideo',
            pais: 'Uruguay',
            descripcion: 'Comparsa clasificada para las Llamadas 2025, con fuerte presencia en el candombe montevideano.',
            añoFundacion: 1998
        });

        const yamboKenia = await Agrupacion.create({
            nombre: 'Yambo Kenia',
            tipo: 'Comparsa Oficial',
            participaConcurso: true,
            barrio: 'Barrio Sur',
            ciudad: 'Montevideo',
            pais: 'Uruguay',
            descripcion: 'Comparsa tradicional del Barrio Sur, participante del Desfile de Llamadas 2025.',
            añoFundacion: 1982
        });

        // Crear agrupaciones de Argentina
        const lonjasSanTelmo = await Agrupacion.create({
            nombre: 'Lonjas de San Telmo',
            tipo: 'Agrupación/Grupo',
            participaConcurso: false,
            barrio: 'San Telmo',
            ciudad: 'Buenos Aires',
            pais: 'Argentina',
            descripcion: 'Agrupación de candombe que realiza llamadas todos los domingos en San Telmo. Dirigida por Artigas Martirena.',
            añoFundacion: 2005,
            redesSociales: {
                instagram: '@lonjas_santelmo'
            }
        });

        const kimbaCandombe = await Agrupacion.create({
            nombre: 'Kimba Candombe',
            tipo: 'Agrupación/Grupo',
            participaConcurso: false,
            barrio: 'Caballito',
            ciudad: 'Buenos Aires',
            pais: 'Argentina',
            descripcion: 'Comparsa que practica en Parque Centenario los domingos por la tarde desde hace más de 20 años.',
            añoFundacion: 2000,
            redesSociales: {
                facebook: 'KimbaCandombe'
            }
        });

        console.log('✓ 7 agrupaciones creadas');

        // Crear integrantes para Cuareim 1080
        await Integrante.create([
            {
                nombre: 'Roberto',
                apellido: 'Silva',
                rol: 'Director',
                agrupacion: cuareim1080._id,
                experienciaAños: 25,
                biografia: 'Director musical de Cuareim 1080 desde 2010.'
            },
            {
                nombre: 'María',
                apellido: 'González',
                rol: 'Vedette',
                agrupacion: cuareim1080._id,
                experienciaAños: 15,
                biografia: 'Vedette principal de la comparsa.'
            },
            {
                nombre: 'Carlos',
                apellido: 'Rodríguez',
                rol: 'Jefe de Cuerda',
                agrupacion: cuareim1080._id,
                experienciaAños: 30,
                biografia: 'Jefe de cuerda de tambores, responsable del ritmo ganador.'
            },
            {
                nombre: 'Ana',
                apellido: 'Martínez',
                rol: 'Coreógrafa',
                agrupacion: cuareim1080._id,
                experienciaAños: 20
            },
            {
                nombre: 'Diego',
                apellido: 'Fernández',
                rol: 'Tamborilero',
                agrupacion: cuareim1080._id,
                experienciaAños: 12
            }
        ]);

        // Crear integrantes para Candonga Africana
        await Integrante.create([
            {
                nombre: 'Jorge',
                apellido: 'Pérez',
                rol: 'Propietario',
                agrupacion: candongaAfricana._id,
                experienciaAños: 35
            },
            {
                nombre: 'Laura',
                apellido: 'López',
                rol: 'Bailarina',
                agrupacion: candongaAfricana._id,
                experienciaAños: 10
            },
            {
                nombre: 'Miguel',
                apellido: 'Santos',
                rol: 'Gramillero',
                agrupacion: candongaAfricana._id,
                experienciaAños: 18
            }
        ]);

        // Crear integrantes para Lonjas de San Telmo
        await Integrante.create([
            {
                nombre: 'Artigas',
                apellido: 'Martirena',
                rol: 'Director',
                agrupacion: lonjasSanTelmo._id,
                experienciaAños: 25,
                biografia: 'Director y fundador de Lonjas de San Telmo.'
            },
            {
                nombre: 'Lucía',
                apellido: 'Ramírez',
                rol: 'Bailarina',
                agrupacion: lonjasSanTelmo._id,
                experienciaAños: 8
            },
            {
                nombre: 'Pablo',
                apellido: 'Moreno',
                rol: 'Tamborilero',
                agrupacion: lonjasSanTelmo._id,
                experienciaAños: 15
            }
        ]);

        // Crear integrantes para Kimba Candombe
        await Integrante.create([
            {
                nombre: 'Fernando',
                apellido: 'Castro',
                rol: 'Jefe de Cuerda',
                agrupacion: kimbaCandombe._id,
                experienciaAños: 22
            },
            {
                nombre: 'Sofía',
                apellido: 'Benítez',
                rol: 'Bailarina',
                agrupacion: kimbaCandombe._id,
                experienciaAños: 6
            }
        ]);

        console.log('✓ 15 integrantes creados');

        // Crear eventos
        await Event.create([
            {
                titulo: 'Desfile de Llamadas 2025 - Viernes',
                descripcion: 'Primera noche del Desfile de Llamadas oficial 2025 con 23 comparsas participantes.',
                fecha: new Date('2025-02-07T20:00:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-56.1850, -34.8900]
                },
                direccion: 'Calle Isla de Flores',
                ciudad: 'Montevideo',
                pais: 'Uruguay',
                agrupaciones: [cuareim1080._id, candongaAfricana._id, laGeneracionLubola._id, eleggua._id],
                estado: 'Publicado',
                createdBy: admin._id
            },
            {
                titulo: 'Desfile de Llamadas 2025 - Sábado',
                descripcion: 'Segunda noche del Desfile de Llamadas oficial 2025.',
                fecha: new Date('2025-02-08T20:00:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-56.1850, -34.8900]
                },
                direccion: 'Calle Isla de Flores',
                ciudad: 'Montevideo',
                pais: 'Uruguay',
                agrupaciones: [yamboKenia._id, eleggua._id],
                estado: 'Publicado',
                createdBy: admin._id
            },
            {
                titulo: 'Ensayo Cuareim 1080',
                descripcion: 'Ensayo abierto al público de la comparsa ganadora 2024.',
                fecha: new Date('2025-01-25T19:00:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-56.1920, -34.8850]
                },
                direccion: 'Barrio Cuareim',
                ciudad: 'Montevideo',
                pais: 'Uruguay',
                agrupaciones: [cuareim1080._id],
                estado: 'Publicado',
                createdBy: admin._id
            },
            {
                titulo: 'Llamada en San Telmo',
                descripcion: 'Llamada dominical de Lonjas de San Telmo. Todos los domingos a partir de las 18:30.',
                fecha: new Date('2025-01-26T18:30:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-58.3716, -34.6212]
                },
                direccion: 'Calle Defensa y Av. Juan de Garay',
                ciudad: 'Buenos Aires',
                pais: 'Argentina',
                agrupaciones: [lonjasSanTelmo._id],
                estado: 'Publicado',
                createdBy: admin._id
            },
            {
                titulo: 'Candombe en Parque Centenario',
                descripcion: 'Práctica semanal de Kimba Candombe en Parque Centenario.',
                fecha: new Date('2025-01-26T19:00:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-58.4368, -34.6061]
                },
                direccion: 'Parque Centenario',
                ciudad: 'Buenos Aires',
                pais: 'Argentina',
                agrupaciones: [kimbaCandombe._id],
                estado: 'Publicado',
                createdBy: admin._id
            },
            {
                titulo: 'Festival de Candombe - Barrio Sur',
                descripcion: 'Gran festival con múltiples comparsas del Barrio Sur.',
                fecha: new Date('2025-02-15T17:00:00'),
                ubicacion: {
                    type: 'Point',
                    coordinates: [-56.1880, -34.9080]
                },
                direccion: 'Barrio Sur',
                ciudad: 'Montevideo',
                pais: 'Uruguay',
                agrupaciones: [eleggua._id, yamboKenia._id, candongaAfricana._id],
                estado: 'Aprobado',
                createdBy: admin._id
            }
        ]);

        console.log('✓ 6 eventos creados');

        console.log('\n✅ Base de datos poblada exitosamente!');
        console.log('\n📝 Credenciales de acceso:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('\n🌐 Accede al dashboard en: http://localhost:3000/admin');

        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

seedDatabase();

import { testConnection } from "./app.js"
import app from "./app.js"
import Articulos from "./model/articulos.model.js"
import Congresos from "./model/congreso.model.js"
import Membresias from "./model/membresias.model.js"
import Roles from "./model/rol.model.js"
import Usuarios from "./model/user.model.js"
import bcryptjs from 'bcryptjs'

testConnection()


export const insertions=async ()=>{
    const passwordHash=await bcryptjs.hash('123456',10)

    const roles = [1, 2, 3];
// const usuarios = [];
const usuarios = [
  {
    nombre: "Guilebaldo",
    apellidos: "Vargas Solis",
    contraseña: passwordHash,
    institucion: "Facultad de Matemáticas",
    email: "guilebaldo@gmail.com",
    RoleId: 1
  },
  {
    nombre: "Maria",
    apellidos: "García",
    contraseña: passwordHash,
    institucion: "Universidad Nacional Autónoma de México",
    email: "maria1@gmail.com",
    RoleId: 1
  },
  {
    nombre: "José",
    apellidos: "Martínez",
    contraseña: passwordHash,
    institucion: "Tecnológico de Monterrey",
    email: "jose2@gmail.com",
    RoleId: 2
  },
  {
    nombre: "Ana",
    apellidos: "López",
    contraseña: passwordHash,
    institucion: "Universidad de Guadalajara",
    email: "ana3@gmail.com",
    RoleId: 2
  },
  {
    nombre: "Luis",
    apellidos: "Hernández",
    contraseña: passwordHash,
    institucion: "Instituto Politécnico Nacional",
    email: "luis4@gmail.com",
    RoleId: 2
  },
  {
    nombre: "Carmen",
    apellidos: "González",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Nuevo León",
    email: "carmen5@gmail.com",
    RoleId: 2
  },
  {
    nombre: "Carlos",
    apellidos: "Rodríguez",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de México",
    email: "carlos6@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Fernanda",
    apellidos: "Sánchez",
    contraseña: passwordHash,
    institucion: "Universidad de Sonora",
    email: "fernanda7@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Miguel",
    apellidos: "Ramírez",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Baja California",
    email: "miguel8@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Daniela",
    apellidos: "Torres",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Puebla",
    email: "daniela9@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Javier",
    apellidos: "Ruiz",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma del Estado de México",
    email: "javier10@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Valeria",
    apellidos: "Flores",
    contraseña: passwordHash,
    institucion: "Universidad de Colima",
    email: "valeria11@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Ricardo",
    apellidos: "Gómez",
    contraseña: passwordHash,
    institucion: "Universidad Michoacana de San Nicolás de Hidalgo",
    email: "ricardo12@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Patricia",
    apellidos: "Díaz",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Chihuahua",
    email: "patricia13@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Alejandro",
    apellidos: "Álvarez",
    contraseña: passwordHash,
    institucion: "Universidad Veracruzana",
    email: "alejandro14@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Laura",
    apellidos: "Medina",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de San Luis Potosí",
    email: "laura15@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Andrés",
    apellidos: "Chávez",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Querétaro",
    email: "andres16@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Adriana",
    apellidos: "Ortiz",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Sinaloa",
    email: "adriana17@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Juan",
    apellidos: "Moreno",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Zacatecas",
    email: "juan18@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Rebeca",
    apellidos: "Reyes",
    contraseña: passwordHash,
    institucion: "Universidad de Guanajuato",
    email: "rebeca19@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Pablo",
    apellidos: "Cruz",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Yucatán",
    email: "pablo20@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Elena",
    apellidos: "Mendoza",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Aguascalientes",
    email: "elena21@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Roberto",
    apellidos: "Vargas",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Nayarit",
    email: "roberto22@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Diana",
    apellidos: "Paredes",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Tlaxcala",
    email: "diana23@gmail.com",
    RoleId: 3
  },
  {
    nombre: "Esteban",
    apellidos: "Castañeda",
    contraseña: passwordHash,
    institucion: "Universidad Autónoma de Campeche",
    email: "esteban24@gmail.com",
    RoleId: 3
  }
];


    const datosRoles=[
        {"nombre": "Admin"},
        {"nombre": "Revisor"},
        {"nombre": "Ponente"},
    ]


    const datosCongresos = [
      {
        "nombre": "Congreso de Inteligencia Artificial",
        "fecha": "2024-05-10",
        "descripcion": "Un evento dedicado a explorar los últimos avances en inteligencia artificial, incluyendo aprendizaje profundo, procesamiento del lenguaje natural, y aplicaciones en diversas industrias. Este congreso contará con la participación de expertos internacionales que compartirán sus conocimientos y experiencias sobre cómo la inteligencia artificial está transformando sectores como la salud, la educación, la industria manufacturera, y los servicios financieros. Los asistentes tendrán la oportunidad de participar en talleres prácticos, paneles de discusión y sesiones de networking para intercambiar ideas y colaborar en proyectos innovadores. Además, se presentarán investigaciones recientes y casos de estudio que demuestran el impacto de la inteligencia artificial en la mejora de la eficiencia operativa, la toma de decisiones y la creación de nuevos productos y servicios. Los artículos científicos presentados abordarán temas como la ética en IA, el aprendizaje automático, y la robótica avanzada.",
        "institucion": "Universidad ABC",
        "color": "#FF6666",
        "web_institucion":"www.institucion.com",
        "link_convocatoria":"www.convocatoria.com"

      },
      {
        "nombre": "Congreso de Desarrollo de Software",
        "fecha": "2024-06-15",
        "descripcion": "Este congreso reúne a desarrolladores de software para discutir las mejores prácticas, herramientas emergentes, y metodologías ágiles. Se presentarán artículos científicos sobre el desarrollo de software eficiente y seguro.",
        "institucion": "Instituto Tecnológico DEF",
        "color": "#4099FF"
      },
      {
        "nombre": "Congreso de Ciberseguridad",
        "fecha": "2024-07-20",
        "descripcion": "Un evento centrado en las últimas amenazas y soluciones en el campo de la ciberseguridad. Los artículos científicos abordarán nuevas estrategias y tecnologías para proteger los datos.",
        "institucion": "Universidad XYZ",
        "color": "#FF9966"
      },
      {
        "nombre": "Congreso de Redes y Comunicaciones",
        "fecha": "2024-08-10",
        "descripcion": "Explora los avances en redes de comunicación y tecnología 5G. Los artículos científicos se centrarán en la optimización de redes y la seguridad en comunicaciones.",
        "institucion": "Instituto de Telecomunicaciones",
        "color": "#66CCFF"
      },
      {
        "nombre": "Congreso de Ciencia de Datos",
        "fecha": "2024-09-05",
        "descripcion": "Un congreso que abarca temas desde análisis de big data hasta técnicas avanzadas de visualización de datos. Los artículos científicos discutirán métodos innovadores en la ciencia de datos.",
        "institucion": "Universidad de Ciencias Aplicadas",
        "color": "#2ED8B6"
      },
      {
        "nombre": "Congreso de Ingeniería de Software",
        "fecha": "2024-10-12",
        "descripcion": "Dedicado a las técnicas y herramientas de ingeniería de software. Los artículos científicos presentarán investigaciones sobre desarrollo ágil y pruebas automatizadas.",
        "institucion": "Escuela de Ingeniería",
        "color": "#FF5370"
      },
      {
        "nombre": "Congreso de Tecnologías Emergentes",
        "fecha": "2024-11-20",
        "descripcion": "Este congreso trata sobre nuevas tecnologías como blockchain, IoT, y computación cuántica. Los artículos científicos explorarán aplicaciones prácticas y teóricas de estas tecnologías.",
        "institucion": "Universidad Innovatech",
        "color": "#FFCC66"
      },
      {
        "nombre": "Congreso de Computación en la Nube",
        "fecha": "2024-12-01",
        "descripcion": "Un evento sobre las últimas tendencias en computación en la nube y servicios web. Los artículos científicos cubrirán temas desde arquitecturas de nube hasta seguridad en la nube.",
        "institucion": "Instituto de Computación",
        "color": "#FF9AA2"
      },
      {
        "nombre": "Congreso de Realidad Virtual y Aumentada",
        "fecha": "2025-01-15",
        "descripcion": "Este congreso explora los desarrollos en realidad virtual y aumentada. Los artículos científicos presentarán innovaciones en aplicaciones y hardware de RV y RA.",
        "institucion": "Universidad de Tecnología",
        "color": "#96C8DA"
      }
    ];

    const membresias = [
      { UsuarioId: 1, CongresoId: 1, dueño: true },
      { UsuarioId: 1, CongresoId: 2, dueño: true },
      { UsuarioId: 1, CongresoId: 3, dueño: true },
      { UsuarioId: 1, CongresoId: 4, dueño: true },
      { UsuarioId: 1, CongresoId: 5, dueño: true },
      { UsuarioId: 1, CongresoId: 6, dueño: true },
      { UsuarioId: 1, CongresoId: 7, dueño: true },
      { UsuarioId: 1, CongresoId: 8, dueño: true },
      { UsuarioId: 1, CongresoId: 9, dueño: true },
    
      { UsuarioId: 2, CongresoId: 1, dueño: false },
      { UsuarioId: 2, CongresoId: 2, dueño: false },
      { UsuarioId: 2, CongresoId: 3, dueño: false },
      { UsuarioId: 2, CongresoId: 4, dueño: false },
      { UsuarioId: 2, CongresoId: 5, dueño: false },
      { UsuarioId: 2, CongresoId: 6, dueño: false },
      { UsuarioId: 2, CongresoId: 7, dueño: false },
      { UsuarioId: 2, CongresoId: 8, dueño: false },
      { UsuarioId: 2, CongresoId: 9, dueño: false },
    
      { UsuarioId: 3, CongresoId: 1, dueño: false },
      { UsuarioId: 3, CongresoId: 2, dueño: false },
      { UsuarioId: 4, CongresoId: 1, dueño: false },
      { UsuarioId: 4, CongresoId: 2, dueño: false },
      { UsuarioId: 5, CongresoId: 1, dueño: false },
      { UsuarioId: 5, CongresoId: 2, dueño: false },
      { UsuarioId: 6, CongresoId: 1, dueño: false },
      { UsuarioId: 6, CongresoId: 2, dueño: false }
    ];
    
    // Asignar los congresos adicionales a los revisores
    const revisoresCongresosAdicionales = [
      { UsuarioId: 3, CongresoId: 3 },
      { UsuarioId: 3, CongresoId: 4 },
      { UsuarioId: 4, CongresoId: 5 },
      { UsuarioId: 4, CongresoId: 6 },
      { UsuarioId: 5, CongresoId: 7 },
      { UsuarioId: 5, CongresoId: 8 },
      { UsuarioId: 6, CongresoId: 9 }
    ];
    
    revisoresCongresosAdicionales.forEach(membresia => {
      membresias.push({
        UsuarioId: membresia.UsuarioId,
        CongresoId: membresia.CongresoId,
        dueño: false
      });
    });
    
    // Asignar congresos a los participantes (usuarios 7 al 25)
    for (let i = 7; i <= 25; i++) {
      membresias.push({ UsuarioId: i, CongresoId: 1, dueño: false });
      membresias.push({ UsuarioId: i, CongresoId: 2, dueño: false });
    
      for (let j = 3; j <= 9; j++) {
        if (Math.random() < 0.5) {
          membresias.push({ UsuarioId: i, CongresoId: j, dueño: false });
        }
      }
    }
      

    const articulos = [
      // Artículos para el Congreso 1
      {
        titulo: "Inteligencia artificial para asistir al diagnóstico clínico en medicina",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "medicina, inteligencia artificial, diagnóstico",
        abstract: "Este artículo explora cómo la inteligencia artificial puede mejorar el diagnóstico clínico en medicina.",
        CongresoId: 1,
        UsuarioId: 7
      },
      {
        titulo: "Avances recientes en machine learning aplicado a análisis de datos",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "machine learning, análisis de datos, inteligencia artificial",
        abstract: "Se discuten los últimos avances en machine learning y su aplicación en el análisis de datos.",
        CongresoId: 1,
        UsuarioId: 7
      },
      {
        titulo: "Impacto de la robótica en la educación del siglo XXI",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "robótica, educación, tecnología",
        abstract: "Se examina cómo la robótica está transformando la educación en el siglo XXI y sus implicaciones futuras.",
        CongresoId: 1,
        UsuarioId: 7
      },
      {
        titulo: "Automatización en la industria: retos y oportunidades",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "automatización, industria, inteligencia artificial",
        abstract: "Este artículo analiza los retos y oportunidades de la automatización en la industria moderna.",
        CongresoId: 1,
        UsuarioId: 15
      },
      {
        titulo: "Seguridad informática en el Internet de las Cosas (IoT)",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "seguridad informática, IoT, tecnología",
        abstract: "Este artículo analiza los desafíos de seguridad en el Internet de las Cosas (IoT) y propone soluciones.",
        CongresoId: 1,
        UsuarioId: 8
      },
      {
        titulo: "Aplicaciones de la inteligencia artificial en la gestión de datos médicos",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, datos médicos, tecnología",
        abstract: "Se explora cómo la inteligencia artificial puede mejorar la gestión de datos médicos y la atención al paciente.",
        CongresoId: 1,
        UsuarioId: 10
      },
      {
        titulo: "Desarrollo de sistemas autónomos para la exploración espacial",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "sistemas autónomos, exploración espacial, tecnología",
        abstract: "Este artículo discute el desarrollo y aplicación de sistemas autónomos en misiones de exploración espacial.",
        CongresoId: 1,
        UsuarioId: 13
      },
      {
        titulo: "Impacto de la inteligencia artificial en la atención al cliente",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, atención al cliente, tecnología",
        abstract: "Se analiza cómo la inteligencia artificial está transformando la atención al cliente en diversos sectores.",
        CongresoId: 1,
        UsuarioId: 16
      },
      {
        titulo: "Robótica colaborativa en entornos industriales",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "robótica colaborativa, industria, tecnología",
        abstract: "Este artículo explora las aplicaciones y ventajas de la robótica colaborativa en entornos industriales.",
        CongresoId: 1,
        UsuarioId: 19
      },
      {
        titulo: "Desarrollo de tecnologías de realidad virtual para la educación",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "realidad virtual, educación, tecnología",
        abstract: "Se discute el desarrollo y potencial educativo de las tecnologías de realidad virtual en el ámbito educativo.",
        CongresoId: 1,
        UsuarioId: 20
      },
      {
        titulo: "Aplicaciones de la inteligencia artificial en la predicción de enfermedades",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, predicción de enfermedades, tecnología",
        abstract: "Este artículo examina cómo la inteligencia artificial puede predecir enfermedades basándose en datos médicos.",
        CongresoId: 1,
        UsuarioId: 22
      },
      {
        titulo: "Impacto de la ciberseguridad en la industria financiera",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "ciberseguridad, industria financiera, tecnología",
        abstract: "Se analiza la importancia y repercusiones de la ciberseguridad en el sector financiero y bancario.",
        CongresoId: 1,
        UsuarioId: 23
      },
      {
        titulo: "Tecnologías emergentes en la gestión de residuos urbanos",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "tecnologías emergentes, residuos urbanos, tecnología",
        abstract: "Este artículo explora tecnologías innovadoras para la gestión eficiente de residuos urbanos en entornos urbanos.",
        CongresoId: 1,
        UsuarioId: 24
      },
      {
        titulo: "Aplicaciones de la inteligencia artificial en la agricultura de precisión",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, agricultura de precisión, tecnología",
        abstract: "Se discute cómo la inteligencia artificial está revolucionando la agricultura mediante técnicas de precisión.",
        CongresoId: 1,
        UsuarioId: 25
      },
      // Artículos para el Congreso 2
      {
        titulo: "Desarrollo de aplicaciones móviles: tendencias y desafíos",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "desarrollo de aplicaciones, móviles, tecnología",
        abstract: "Se exploran las tendencias actuales y los desafíos del desarrollo de aplicaciones móviles en la industria.",
        CongresoId: 2,
        UsuarioId: 9
      },
      {
        titulo: "Integración de sistemas en la nube para empresas",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "sistemas en la nube, empresas, tecnología",
        abstract: "Este artículo analiza cómo las empresas pueden integrar sistemas en la nube para mejorar la eficiencia operativa.",
        CongresoId: 2,
        UsuarioId: 10
      },
      {
        titulo: "Desarrollo de software de código abierto en la era digital",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "software de código abierto, era digital, tecnología",
        abstract: "Se discute el impacto y la evolución del desarrollo de software de código abierto en la era digital actual.",
        CongresoId: 2,
        UsuarioId: 11
      },
      {
        titulo: "Impacto de la inteligencia artificial en el comercio electrónico",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, comercio electrónico, tecnología",
        abstract: "Este artículo analiza cómo la inteligencia artificial está transformando el comercio electrónico y las ventas online.",
        CongresoId: 2,
        UsuarioId: 12
      },
      {
        titulo: "Avances en tecnología blockchain y su aplicación en diferentes sectores",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "tecnología blockchain, sectores, tecnología",
        abstract: "Se explora la tecnología blockchain y sus aplicaciones en diversos sectores como la banca, logística y más.",
        CongresoId: 2,
        UsuarioId: 14
      },
      {
        titulo: "Innovación en sistemas de realidad aumentada para aplicaciones educativas",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "realidad aumentada, aplicaciones educativas, tecnología",
        abstract: "Este artículo discute las innovaciones en sistemas de realidad aumentada y su potencial educativo.",
        CongresoId: 2,
        UsuarioId: 17
      },
      {
        titulo: "Transformación digital en el sector salud: desafíos y oportunidades",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "transformación digital, sector salud, tecnología",
        abstract: "Se analizan los desafíos y oportunidades de la transformación digital en el sector salud mediante tecnologías emergentes.",
        CongresoId: 2,
        UsuarioId: 18
      },
      {
        titulo: "Aplicaciones de la inteligencia artificial en la gestión de recursos humanos",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, recursos humanos, tecnología",
        abstract: "Este artículo explora cómo la inteligencia artificial está optimizando la gestión de recursos humanos en las empresas.",
        CongresoId: 2,
        UsuarioId: 21
      },
      {
        titulo: "Implicaciones éticas de la inteligencia artificial en la toma de decisiones",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "inteligencia artificial, ética, toma de decisiones",
        abstract: "Se discuten las implicaciones éticas de la inteligencia artificial en la toma de decisiones en diversos contextos.",
        CongresoId: 2,
        UsuarioId: 22
      },
      {
        titulo: "Desarrollo de aplicaciones móviles multiplataforma: retos y soluciones",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "desarrollo de aplicaciones, multiplataforma, tecnología",
        abstract: "Este artículo analiza los retos y soluciones en el desarrollo de aplicaciones móviles para múltiples plataformas.",
        CongresoId: 2,
        UsuarioId: 23
      },
      {
        titulo: "Integración de tecnologías emergentes en la gestión logística",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "tecnologías emergentes, gestión logística, tecnología",
        abstract: "Se explora cómo las tecnologías emergentes están transformando la gestión logística en la era digital.",
        CongresoId: 2,
        UsuarioId: 24
      },
      {
        titulo: "Aplicaciones de la realidad virtual en la formación profesional",
        link: "ajakja",
        cloudinary_url: "jsakjhkjas",
        palabras_clave: "realidad virtual, formación profesional, tecnología",
        abstract: "Este artículo explora las aplicaciones de la realidad virtual en la formación profesional y el aprendizaje.",
        CongresoId: 2,
        UsuarioId: 25
      }
    ];

    // for (let i = 3; i <= 25; i++) {
    //     articulos.push({
    //     titulo:`Titulo de articulo ${i}`,
    //     link:"ajakja",
    //     abstract:"Esto es el abstract",
    //     palabras_clave:"Estas son palabras clave",
    //     UsuarioId: i,
    //     CongresoId: 1
    //     });
    //   }


    try {
        await Roles.bulkCreate(datosRoles)
        await Usuarios.bulkCreate(usuarios)    
        await Congresos.bulkCreate(datosCongresos)
        await Membresias.bulkCreate(membresias)
        await Articulos.bulkCreate(articulos)
        
    } catch (error) {
        console.log(error)
    }
}


 

app.listen(3000,()=>console.log("Servidor on port 3000"))

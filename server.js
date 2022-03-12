var http = require("http");
const path = require('path');
const express = require('express');
const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = process.env.PORT || 12103;

var server = http.createServer(app);
var io = require("socket.io")(server);

let players = [];
let nombresJugadores = [];
var arrayCartasNegras = ["La normativa de la Secretaria de Transporte ahora prohibe _________ en los aviones.", 
"Es una pena que hoy en día los jóvenes se están metiendo con _________.", 
"En 1000 años, cuando el papel moneda sea una memoria distante, _________ va a ser nuestra moneda.", 
"La Asociación de Fútbol Argentino ha prohibido _________ por dar a los jugadores una ventaja injusta.", 
"¿Cuál es el placer culposo de Batman?", 
"Lo nuevo de JK Rowling: Harry Potter y la Cámara de _________.",
"¿Qué me traje de vuelta de Paraguay?",
"¿_________? Hay una app para eso.",
"_________. ¿A que no podés comer sólo una?",
"¿Cuál es mi sustituto para no usar drogas?",
"Cuando los EEUU y la URSS corrían la carrera espacial, el gobierno argentino dedicó millones de pesos a la investigación de _________.",
"En la nueva película original de Disney Channel, Hannah Montana se enfrenta a _________ por primera vez.",
"¿Cuál es mi poder secreto?",
"¿Cuál es la nueva dieta de moda?",
"¿Qué comió Vin Diesel para la cena?",
"Cuando el faraón se mantuvo en su postura, Moisés llamó una Plaga de _________.",
"¿Qué hago para mantener estable mi relación amorosa?",
"¿Qué es lo más crujiente?",
"En la cárcel de Devoto se dice que podés cambiar 200 cigarrillos por _________.",
"Ahora, en vez de carbón, Papá Noel le da _________ a los chicos malos.",
"La vida para los pueblos originarios cambió drásticamente cuando el hombre blanco les mostró _________.",
"En los momentos finales de Michael Jackson, pensó en _________.",
"A la gente blanca le gusta _________.",
"¿Por qué me duele todo?",
"Una cena romántica a la luz de las velas estaría incompleta sin _________.",
"¿Qué llevaría en un viaje al pasado para convencer a la gente de que soy un poderoso hechicero?",
"La excursión del curso fue completamente arruinada por _________.",
"¿Qué es el mejor amigo de una chica?",
"Cuando sea Presidente de la Argentina, voy a crear el Ministerio de _________.",
"¿Qué me están escondiendo mis padres?",
"¿Qué nunca falla para animar una fiesta?",
"¿Qué mejora con la edad?",
"_________: Rico hasta la última gota",
"Tengo 99 problemas, pero _________ no es uno.",
"_________. ¡Es una trampa!",
"El nuevo Gran Hermano Famosos va a tener 8 famosos de segunda viviendo con _________.",
"¿Qué encontraría la abuela perturbador, pero extrañamente encantador?",
"¿Qué es lo más emo?",
"Durante el sexo, me gusta pensar en _________.",
"¿Qué terminó mi última relación?",
"¿Qué es ese ruido?",
"_________. Así quiero morir.",
"¿Por qué estoy pegajoso?",
"¿Cuál es el próximo juguete de la Cajita Feliz?",
"¿De qué hay un montón en el cielo?",
"No sé con qué armas se luchará la tercera guerra mundial, pero la cuarta se luchará con _________.",
"¿Qué cosa siempre logra llevarte a la cama?",
"_________: Probado en niños, aprobado por madres.",
"¿Por qué no me puedo dormir por las noches?",
"¿Qué es ese olor?",
"¿Qué ayuda a Cristina Kirchner a relajarse?",
"Así termina el mundo, no con un Big Bang, sino con _________.",
"Llega a la calle Corrientes este verano, _________: El Musical",
"Antropólogos han descubierto recientemente a una tribu primitiva que adora _________.",
"Pero antes de matarlo, Sr Bond, debo mostrarle _________.",
"Estudios demuestran que las ratas de laboratorio recorren laberintos 50% más rápido después de ser expuestas a _________.",
"A continuación, en ESPN+: El torneo mundial de _________.",
"Cuando sea billonario, erigiré una estatua de 15 metros de altura conmemorando _________.",
"Con la intención de atraer más público, el Museo de Ciencias Naturales abrió una exhibición interactiva de _________.",
"Yo me pregunto, ¿para qué sirve la guerra?",
"¿Qué me da gases incontrolables?",
"¿A qué huele la gente mayor?",
"La medicina alternativa ahora está usando las propiedades curativas de _________.",
"Durante el frecuentemente no tenido en cuenta Período Marrón de Picasso, él produjo cientos de pinturas de _________.",
"¿Qué no querés encontrar en tu comida china?",
"Tomo para olvidar _________.",
"_________. Chocá los 5, papá.",
"Lo siento profesor, pero no pude completar mi tarea porque _________.",
"¿Cuál es el peor regalo que te pueden hacer?",
"No hay nada mejor para una primera cita que _________",
"Se difundió una encuesta que dice que al 71% de los argentinos les gusta _________.",
"Donald Trump podrá tener todo el dinero del mundo, pero nunca podrá tener _________.",
"Elige tu propia aventura: Eres un agente secreto contra _________.",
"Hoy en yoga aprendimos tres posturas nuevas. La grulla, el loto y _________.",
"Nada le gusta tanto a un cura como _________.",
"Trágico accidente deja 35 heridos. La causa: _________.",
"Mi vida sexual es comparable a _________.",
"La verdad es que soy un privilegiado, vivo de _________.",
"El homeópata me recomendó _________.",
"Cuando tenía tiempo, en lugar de la Z el Zorro te dibujaba _________.",
"¿Qué es lo peor que te podés tatuar borracho?",
"¿Cuál es tu secreto para ser tan sexy?",
"Informe especial: El lado oscuro de _________.",
"Club Atlético _________.",
"¿Por qué llora Quico?",
"La causa de la Tercera Guerra Mundial va a ser _________.",
"Lo único que le gusta más a los Pumas que cantar el himno es _________.",
"Plantar un árbol, escribir un libro, _________.",
"Llegué tarde porque había un piquete a favor de _________.",
"Soy el genio de la lámpara y te concederé tres deseos, ¿cuál es el primero?",
"Según la Organización Mundial de la Salud no hay nada más peligroso que _________.",
"Mis viejos se unieron a una secta nueva que adora _________.",
"Mi viejo siempre decía: 'En la mesa no se habla de política ni de _________.'",
"El problema de la Iglesia es que está controlada por _________.",
"¿De qué fue testigo Jehová?",
"Todos los días de 20 a 21 me tomo una horita para _________.",
"La secuela de Charlie y la Fábrica de Chocolate debería llamarse Charlie y _________.",
"Nada es tan desagradable como masturbarse pensando en _________.",
"Todo bien con el colectivo y la birome, pero el mejor invento argentino es por lejos _________.",
"Lo más difícil de ser ciego debe ser _________.",
"#_________.",
"Solo hay una cosa que me gusta más que coger: _________.",
"Amo el olor de _________ por la mañana.",
"No hay nada más triste que _________.",
"Los ricos comen sushi sobre el cuerpo de una mujer desnuda. Los MUY ricos, sobre _________.",
"Cuando era chico, todos los años le pedía a Papá Noel lo mismo: _________.",
"¿Sabías que el campeón mundial de _________ es argentino?",
"El tiburón más grande es el tiburón ballena. Pero el más raro es el tiburón _________.",
"Solo dos cosas pueden lastimar a Superman: la kryptonita y _________.",
"Chanel presenta su nueva fragancia: Obsesión de _________, eau de toilette.",
"De pibe tenía el álbum de figuritas de _________.",
"¿Quién estuvo detrás del atentado a la AMIA?",
"No se la pude chupar. Tenía gusto a _________.",
"El mundo sería un mejor lugar sin _________.",
"¿Qué tiene que tener tu pareja ideal?",
"El Frente para la Victoria tiene a La Cámpora, Cambiemos tiene _________.",
"Se solicita a los señores pasajeros _________.",
"Macri reemplazó los cuadros de la Casa Rosada por cuadros de _________.",
"Soy el heredero al trono. La espada de _________ me pertenece.",
"Entre mi porno tengo una carpeta entera dedicada a _________.",
"El Comité Olímpico Internacional está analizando sumar _________ a los próximos juegos.",
"¿Qué cosa es legal pero va a dejar de serlo en 10 años?",
"El que depositó dólares, recibirá _________.",
"De los caballeros de la mesa redonda, el que más me gusta es Sir _________.",
"_________ puso a Argentina en el mapa.",
"Acabo de terminar de leer una novela erótica sobre _________.",
"En lugar de rendir el final tuvimos que preparar una monografía sobre _________.",
"En el nombre del Padre, del Hijo y de _________.",
"Mi pareja me dejó por _________.",
"Debo confesarlo, tengo un fetiche con _________.",
"Arqueólogos descubren que los antiguos egipcios amaban _________.",
"¿Qué guarda Batman en lo más profundo de la Baticueva?",
"Olmedo y Porcel presentan: A las chicas les gusta _________.",
"En el cine están dando _________ III.",
"Dios perdona, _________ no.",
"Piedra, papel o _________.",
"El médico me dijo que fue un milagro, pero de ahora en más, nada de _________.",
"Soy capaz de tolerar cualquier cosa, excepto _________.",
"Cada vez hay más gente con fobia a _________.",
"El gobierno planea reemplazar el Obelisco con un monumento a _________.",
"Antes de morir, Nostradamus predijo la llegada de _________.",
"No te puedo explicar el asco que me da _________."
    ];

    
    var arrayCartasBlancas = ["Una maldición gitana.","Un minuto de silencio.","Mucho pibe y poca mina.","Un policía honesto sin nada que perder.","Hambruna.","Bacteria come-carne.","Serpientes sexuales voladoras.","Que no te importe un carajo el tercer mundo.","Sexting.","Criaturas cambia-aspecto.","Estrellas porno.","Saquear y violar.","72 vírgenes.","Persecución y tiroteo.","Una paradoja temporal.","Auténtica comida mexicana.","Bijouterie de Once.","Consultores.","Deuda impagable.","Complejo de Elektra.","El 10 de Pachano.","Tirar un candelabro sobre tus enemigos y subir colgado de la soga.","Carlos Saúl Menem.","Desnudo frontal total.","Inyecciones hormonales.","Poner un huevo.","Desnudarse y mirar Nickelodeon.","Fingir que te importa.","Hacer el ridículo en público.","Compartir jeringas.","Mocos.","La inevitable muerte por calor del universo.","El milagro del nacimiento.","El apocalipsis.","Sacar el amigo.","Privilegios de la gente blanca.","Obligaciones de casada.","El payaso de McDonalds.","Desodorante AXE.","La sangre de Cristo.","Accidentes horroríficos con láser para remoción de pelo.","BATMAN!!!","Agricultura.","Un mongoloide robusto.","Selección natural.","Abortos hechos con perchas.","Comerse todas las galletitas antes de la venta de galletas para el SIDA.","El escote de la diputada Hot.","World of Warcraft.","Proteger a una amiga de un hinchapelotas.","Obesidad.","Un montaje homoerótico de Voleibol.","Mandíbula trabada.","Un ritual de apareamiento.","Torsión testicular.","Sushi de Tenedor Libre.","Ricardo Fort.","Queso caliente.","Ataques de velocirraptors.","Sacarte la remera.","Smegma.","Alcoholismo.","Un hombre de mediana edad andando en rollers.","Super Rayo Cariñosito.","Tener arcadas y vomitar.","Chupetines demasiado grandes.","Odiarse a uno mismo.","Niños con correas.","Juego previo de medio pelo.","La Biblia.","Porno extremo alemán.","Estar prendido fuego.","Embarazo adolescente.","Gandhi.","Dejar un mensaje de voz incómodo.","Una trompada.","Representantes del Servicio al Consumidor.","Una erección que dure más de 4 horas.","Mis genitales.","Ir de levante a una clínica de abortos.","Ciencia.","Sexo oral no reciprocado.","Aves que no pueden volar.","Una buena línea.","Tortura por ahogamiento simulado.","Un desayuno balanceado.","El Normal 4.","Sacarle un dulce a un niño. De verdad.","Un Sol para los Chicos.","Rascarse el culo a escondidas.","Post-it pasivo-agresivos.","El equipo de gimnasia de China.","Pasarse a La Caja de Ahorro.","Mear un poquito.","Video casero de Claribel Medina llorando mientras come una viandita Cormillot.","Eyaculaciones nocturnas.","Los judíos.","Mis curvas.","Muslos poderosos.","Guiñarle el ojo a gente mayor.","Mr Músculo saliendo de la nada.","Una suave caricia en el interior del muslo.","Tensión sexual.","La fruta prohibida.","Skeletor.","Whiskas.","Ser rico.","Dulce venganza.","Menemistas.","Un antílope con gases.","Natalie Portman.","Una tocadita disimulada.","Pilotos Kamikaze.","Sean Connery.","La legislación homosexual.","El paraguayo trabajador en serio.","Un pájaro en una jaula cubierta.","Monaguillos.","La Caja Vengadora.","Enojarte tanto que se te para.","Muestras gratis.","Mucho ruido y pocas nueces.","Hacer lo correcto.","La Asamblea del Año XIII.","Lactación.","Paz mundial.","RoboCop.","Cabeza de termo.","Justin Bieber.","Oompa-Loompas.","Gemido tirolés.","Pubertad.","Fantasmas.","Lolas hechas asimétricas.","Las Manos Mágicas.","Colarse los dedos.","Mariano Grondona agarrándose el escroto en un gancho de cortina.","Naranjú.","Brutalidad policíaca.","El petiso orejudo.","Preadolescentes.","Escalpar.","Tweeting.","Darth Vader.","Una tirada de goma decepcionante.","Exactamente lo que esperarías.","Esperar un eructo y terminar vomitando en el piso.","Células madre de embriones.","Escote elegante y pronunciado.","No ponerla nunca.","Una lobotomía hecha con un picahielo.","Tom Cruise.","Herpes bucal.","Cachalote.","Gente sin casa.","Tercera base.","Incesto.","Pac-man traga-leche.","Un mimo teniendo un ataque.","Hulk Hogan.","Dios.","Lavarse los pliegues.","Lluvia dorada.","Emociones.","Lamer cosas para marcar territorio.","Cerveza Patagonia.","La placenta.","Combustión humana espontánea.","Amigos con beneficios.","Pintar con los dedos.","Olor a abuelo.","Morirse de cólera.","Mis demonios internos.","Un trapo de piso empapado en pis de gato.","Domingo Cavallo.","Acurrucarse.","El porro.","Peleas de gallos.","Fuego aliado.","Juan Domingo Perón.","Una fiesta de cumpleaños decepcionante.","Una mina canchera.","El equipo de olimpiadas de matemática.","Un pequeño caballito.","William Shatner.","Cabalgar hacia el horizonte.","Un giro argumental de M. Night Shyamalan.","Peyot.","Destrucción mutua garantizada.","Pederastas.","Levadura.","Robo de tumbas.","Comerse el último yaguareté.","Catapultas.","Gente pobre.","Olvidarte de la Vuelta de Obligado.","El Meneadito.","La Fuerza.","El perreo.","Diseño inteligente.","Boca floja.","SIDA.","Fotos de tetas.","The Ubersmench.","Lilita Carrió.","Supermatch.","Drogarse zarpado.","Cientología.","La envidia del pene.","Rezar para curar lo gay.","Retozar.","Dos enanos cagando en un balde.","El Ku Klux Klan.","Gengis Khan.","Metanfetamina.","Servidumbre feudal.","Cuidado con los extraños.","Simón dice.","La carrera actoral de Martín Palermo.","Caminar dando saltitos de felicidad.", "Justicia por mano propia.", "Sobrecompensar.", "Un bukkake pixelado.", "Una vida de tristezas.", "Racismo.", "Lanzamiento de enanos.", "Sol y arcoíris.", "Un mono fumando un habano.", "Inundación instantánea.", "El testículo que le falta a Lance Armstrong.", "Arcadas.", "Los terroristas.", "Britney Spears a los 55 años.", "Actitud.", "Largarse a cantar y bailar.", "Lepra.", "Agujero de gloria.", "Pezones con piercings.", "El corazón de un niño.", "¡Cachorritos!", "Despertar semi desnudo en el estacionamiento de un McDonalds.", "Tela quirúrgica.", "La vagina de Maitena.", "Ni cu ni hue.", "Escuchar y parafrasear.", "Legalización en contra de una etnia.", "La Tortuga Manuelita.", "La mano invisible.", "Esperar hasta el casamiento.", "Una estupidez inimaginable.", "Euphoria by Calvin Klein.", "Regalar un regalo que te dieron.", "Auto canibalismo.", "Disfunción eréctil.", "Mi colección de juguetes sexuales de alta tecnología.", "El Papa.", "Gente blanca.", "Porno japonés con tentáculos.", "Mariano Grondona vomitando convulsivamente mientras una camada de arañas cangrejo incuban en su cerebro y salen por sus conductos lagrimales.", "Demasiado gel para el pelo.", "Seppuku.", "Parejas de baile sobre hielo del mismo sexo.", "Hacer trampa en las Paralimpiadas.", "Carisma.", "Keanu Reeves.", "Sean Penn.", "Mambrú.", "Un vistazo.", "Bancarse la mierda del otro.", "La menstruación.", "Niños con cáncer en el culo.", "Una sorpresa láctea.", "El Sur.", "La violación de nuestros más básicos derechos humanos.", "NECESITAS CONSTRUIR MÁS PYLONS.", "Violación en una cita.", "Ser fabuloso/a.", "Necrofilia.", "Centauros.", "El mundo de Beakman.", "Negros.", "Caballerosidad.", "Sanguchitos de miga de kiosco.", "Perras!", "Los extremadamente lisiados.", "Huérfanos adorables.", "MechaHitler.", "Diarrea explosiva.", "Otra maldita película de vampiros.", "Resortes enredados.", "El verdadero significado de la navidad.", "Estrógeno.", "Choripán crudo de la Costanera.", "La cosa esa que electrocuta tus abdominales.", "Pasar un cálculo renal.", "Un orto desteñido.", "Michael Jackson.", "Implantes Cibernéticos.", "Hombres que no llaman.", "Sábanas infectadas con viruela.", "Masturbación.", "Discurso oligarca.", "Pedos vaginales.", "Ocultar el mástil.", "Ropa interior comestible.", "Viagra.", "Sopa demasiado caliente.", "Mahoma (alabado sea).", "Sexo sorpresa!", "Un pebete de $5", "Emborracharse solo.", "Manos de manteca.", "Múltiples puñaladas.", "Cagarse encima.", "Abuso de menores.", "Bolas anales.", "Muerte de civiles.", "Sacarla y acabar afuera.", "Robert Downey Jr.", "Mortadela.", "Alto sombrero.", "Kim Jong-Il.", "Un vello púbico.", "Fraternidades judías.", "El negro que se muere primero.", "Hacerlo por atrás.", "Darle de comer a Lilita Carrió.", "Enseñarle a un robot a amar.", "Seguí así y cobrás.", "Un molino lleno de cadáveres.", "El Tigre Tony.", "Usar la ropa interior al revés para no tener que lavarla.", "Un rayo mortal.", "El techo laboral.", "Una heladerita llena de órganos.", "El sueño americano.", "Fondo blanco.", "Cuando te tirás un pedo y viene con sorpresa.", "Retractarse.", "Bebés muertos.", "El prepucio.", "Solos de saxo.", "Gallegos.", "Un feto.", "Disparar un rifle al aire mientras te cogés duro a un cerdo histérico.", "Francisco de Narváez.", "Amputados.", "Mejoramiento racial.", "Mi estado amoroso.", "Christopher Walken.", "Abejas?", "Porno de Harry Potter.", "La universidad.", "Emborracharse con Listerine.", "Nazis.", "200 gramos de delicioso paco.", "Stephen Hawking diciendo chanchadas.", "Padres muertos.", "Teoría de desarrollo cognitivo de Piaget.", "Pulgares oponibles.", "Preguntas de exámen racistas.", "Paparruchadas.", "Motosierras en lugar de manos.", "Nicholas Cage.", "Concursos de belleza de niñas.", "Explosiones.", "Oler pegamento.", "Mariano Grondona siendo acosado por una bandada de buitres.", "Represión.", "Un pañuelo con cloroformo.", "Mi vagina.", "Pantalones de montar de cuero.", "Un asesinato terrible.", "Dar el 110%.", "Su alteza real la Reina Elizabeth II.", "Campaña del Desierto.", "Ser dejado de lado.", "Goblins.", "Esperanza.", "El Padre Mugica.", "Manicero.", "Mi alma.", "Loca linda.", "Vikingos.", "Gente que está buena.", "Seducción.", "Un complejo de Edipo.", "Gansos.", "Calentamiento global.", "Música New Age.", "Empanadas congeladas de Sibarita.", "Poner cara de puchero.", "Homicidio imprudente con vehículo a motor.", "Voto femenino.", "Un forro pinchado.", "La corte del pueblo.", "Chicos africanos.", "La masacre de Carmen de Patagones.", "Cristina Fernández de Kirchner.", "Asiáticos que no saben matemática.", "Ancianos japoneses.", "Intercambiar saludos de protocolo.", "Heteronormatividad.", "Partir el Mar Rojo.", "Arnold Schwarzenegger.", "Mamada en el auto.", "Abdominales como una plancha de ravioles.", "Pan dulce.", "Un león de zoológico triste.", "Una bolsa de habichuelas mágicas.", "Malas elecciones de vida.", "Mi vida sexual.", "Auschwitz.", "Una tortuga mordiéndote la punta del pene.", "Una detonación termonuclear.", "El clítoris.", "El Big Bang.", "Minas terrestres.", "Amigos que se comen toda la picada.", "Cabras comiéndose latas.", "La Danza del Hada de Azúcar.", "Acabar dentro de una pileta llena de lágrimas de niños.", "Chupetín de carne.", "Tiempo para uno mismo.", "Chistes del Holocausto en el momento equivocado.", "La mar de problemas.", "Fantasías con bomberos.", "La voz de Morgan Freeman.", "Las mujeres de las publicidades de Activia.", "Crecimiento natural del pene.", "Ser mago.", "Piercings genitales.", "Travestis aceptables.", "Peleas de almohadas cachondas.", "Pelotas.", "La abuela.", "Fricción.", "Aguafiestas.", "Tirarte un pedo y hacerte el boludo.", "Tratar mal a los niños.", "Llenar la casa de trampas para cagar a los ladrones.", "Colchón de espuma con memoria de forma.", "Morir.", "El Huracán Katrina.", "Los homosexuales.", "La imprudencia del hombre.", "Hombres.", "Los Amish.", "Huevos de Pterodáctilo.", "Ejercicios para dinámica de grupos.", "Un tumor cerebral.", "Este juego.", "El miedo mismo.", "Lady Gaga.", "El sodero.", "Boca sucia.", "El sadomasoquismo.", "La 12.", "La computadorita por la que habla Stephen Hawking.", "Maiameeeee.", "Un banco de esperma.", "La asfixia erótica.", "La que hace la traducción para sordomudos.", "Una bicicleta con dos vergas en lugar de manubrio.", "La verdad, toda la verdad y nada más que la verdad.", "Los pelirrojos.", "La adicción al sexo.", "El gigoló de Rosario.", "Un ano contra natura.", "El rigor mortis.", "El anillo de cuero.", "Un volquete lleno de cadáveres.", "El amor de Viggo Mortensen por San Lorenzo.", "El sex shop al final de la galería.", "Un mal flash.", "El pibe de Mi Pobre Angelito.", "Una verga más ancha que larga.", "La subtrenmetrocleta.", "Imponer socialmente el Día de la Concha.", "La navaja de MacGyver.", "El testículo del medio.", "Ponerla.", "Pobreza digna.", "La pica entre colectiveros y taxistas.", "Tener cara de boludo.", "Dos semanas de retraso.", "Un culo peludo.", "Ir a pilates.", "El trabajo esclavo.", "Una guerra de almohadas.", "Compartir jeringas.", "¡Essssta!.", "Eyacular en gravedad cero.", "Un pinguino empetrolado.", "Un disfraz de empanada.", "Pezones bizcos.", "La cárcel de Devoto.", "Los ensayos nucleares de Corea del Norte.", "Chuck Norris.", "Vladimir Putin.", "El Opus Dei.", "Recuerdos reprimidos.", "Las bicisendas.", "El Papa Francisco.", "La iglesia maradoniana.", "La muerte.", "Orgasmos múltiples.", "Un puñal de carne.", "Apoyar el traste en la estufa.", "El Dirty Sánchez.", "Forros sabor cordero patagónico.", "Una milanesa de soja.", "Un mes sin masacres en Estados Unidos.", "Andar a caballo en pelotas.", "Salir de joda los martes.", "Laburar los findes.", "Un Falcon verde.", "Un cinturón de castidad.", "Un detector de sarcasmo.", "El Viagra.", "Enterarme de que mi vieja es insaciable.", "Guantánamo.", "La Cámara de Diputados.", "La Marcha Peronista.", "Ese festival chino donde comen carne de perro.", "El pibe con el que debutó Pelé.", "Un cabeza de termo.", "El porno gay.", "Los pañales para adultos.", "El pueblo judío.", "Brownies con gusto a pasto.", "Un deportista argentino en una final.", "La barba candado.", "El colesterol alto.", "Irse en seco.", "Usar sandalias con medias.", "Tu situación laboral.", "Matar al último panda.", "Esa tibia sensación que sentís cuando levantás la caca del perro con una bolsita.", "La carpita mañanera.", "Cerrar el orto.", "La pulserita roja contra la envidia.", "La leche cortada.", "36 vírgenes por un trabajo hecho a medias.", "Hacerle caso a las voces en mi cabeza.", "Una paja bolsillera.", "Responder un 'te amo' con un 'gracias'.", "Chupar de abajo para arriba.", "Enterarme de que su ex la tenía mucho más grande.", "Mi entrepierna.", "Poner la otra mejilla.", "Ser mufa.", "La cura contra el cáncer.", "Un antojo de carne humana.", "La selección rusa de voley.", "El padre Grassi.", "Lamer axilas.", "Entrarle como gallego a la gaita.", "Dos niñas de 7 años.", "La AFIP.", "Una mujer con los pies muy pequeños y el pene muy grande.", "La copa menstrual.", "Una jauría de lobos salvajes.", "Una silla de ruedas.", "Mirar nenas en jumper.", "Parir en el auto.", "La tira de cola.", "El machismo.", "Tapar el baño.", "La fibra intestinal.", "Automedicarse.", "Un pedo vaginal.", "Lágrimas de semen.", "La pastilla del día después.", "Eructar el abecedario.", "Un test de embarazo positivo.", "Preguntarle si está por acabar.", "El negro pijudo del WhatsApp.", "Negar el Holocausto.", "Un enorme y gigantesco clítoris.", "Coger con cocaína en la punta de la verga.", "El 70% de descuento en la segunda unidad.", "Quedarse pelado.", "Jugar al teto.", "Un culo come trapo.", "Sergio Massa.", "La flacidez.", "La cumbia villera.", "Auschwitz.", "El carnaval carioca.", "Separar siameses.", "ISIS.", "La pubertad.", "La concha de la lora.", "La ira de Dios.", "Mauricio Macri.", "Un accidente en un parque de diversiones.", "Un bebé de caca.", "ALF.", "El poliamor.", "Anonymous.", "Los millenials.", "El aro del corpiño.", "Los piojos.", "Esperar a que cumpla 18.", "Un hippie con OSDE.", "Ejercer el derecho de prima nocte con todos mis amigos.", "Un secuestro express.", "Dar el vuelto con caramelos.", "El olor a billete viejo.", "El ex presidente Pinedo.", "Un disparo en la cabeza.", "Hacer cucharita con Hitler.", "Agacharse y conocerlo.", "Coger con extraños.", "Un harén de cholas peruanas.", "Oler la ropa interior de tu vieja.", "El espiral para los mosquitos.", "La versión braille del kamasutra.", "Depilarse el pecho.", "Consumir drogas duras.", "La fiesta de la espuma.", "El culto al Crossfit.", "El pibe de Sistemas.", "Jugar al Jenga con un sobreviviente de las Torres Gemelas.", "El calentamiento global.", "La Deep Web.", "Un video de ISIS decapitando periodistas.", "Fingir el orgasmo.", "El tipo con el que fantasea tu vieja.", "El olor a bebé.", "El autor intelectual del crimen de Cabezas.", "Una denuncia de Carrió.", "Las anécdotas de mi viejo.", "Rosa, la maravillosa.", "La infertilidad.", "Un supositorio.", "Mi colección de rosarios anales.", "La pena de muerte.", "El Gauchito Gil.", "Un sueño húmedo.", "Un perrito con ruedas en lugar de patas traseras.", "Un masaje de próstata.", "El gol del Diego a los ingleses.", "La homofobia.", "Cambiar de género.", "La bipolaridad.", "Revisarle el celu a tu pareja.", "Una salidera bancaria.", "Una fuerte tendencia a la necrofilia.", "Sentir que me están cagando.", "El negro que muere primero en las películas.", "El líquido azul de las propagandas de toallitas.", "El tránsito lento.", "El fantasma de la B.", "Un alto guiso.", "Un uruguayo llamado Washington.", "Donald Trump.", "Rabas hechas con prepucios.", "La justicia por mano propia.", "Hacer molinete.", "Un frasquito con un feto adentro.", "Un guiso de escrotos.", "Cagar al prójimo.", "Los kelpers.", "Larry, Curly y Moe.", "Un Pollock de caca.", "Las Islas Malvinas.", "Los mormones.", "Una inerte barra de carbón.", "La zona roja.", "La Bonaerense.", "El racismo.", "Las inundaciones.", "La fiesta.", "Cenar atún directo de la lata.", "El gluten.", "Fosas comunes.", "La SIDE.", "Irse a vivir al Uritorco.", "La siesta santiagueña.", "La década ganada.", "El anticristo.", "La celulitis.", "La gilada.", "La Santa Biblia.", "Frodo, Sam y los otros dos.", "Quebrar en la previa.", "Diciembre de 2001.", "El chi chi chi le le le.", "Stalkear a tu ex en redes sociales.", "Amar animales más de lo que alguien debería amar un animal.", "Las invasiones bárbaras.", "Instalar la monarquía en la Argentina.", "Borrar una publicación porque nadie le dio like.", "Un brote de dengue.", "El tráfico de órganos.", "Una lluvia de pijas.", "Un ataque de palometas.", "Sacarla y acabar afuera.", "La Difunta Correa.", "Un dildo de dos puntas.", "Matilda.", "La eutanasia.", "Salpicar la tapa del inodoro.", "La servidumbre.", "El antidóping.", "El sueño de ser campeón de Gimnasia.", "Mi jefe.", "El hijo de puta que se está cogiendo al amor de tu vida mientras vos estás jugando a esto.", "Un grupo de viejos fachos.", "Hacerte el orto.", "Ese tío raro que tienen todas las familias.", "La Tercera Guerra Mundial.", "Una foto mía de hace 5 años.", "Lo que queda del radicalismo.", "Vivir rodeado de pelotudos.", "La pincita de la depiladora.", "La mafia china.", "La posibilidad de una guerra mundial.", "Un chiste misógino.", "Una bañera llena de tibia leche.", "Un enema.", "Las manos de todos los pibes arriba.", "Querer que vuelvan los militares.", "Los skinheads.", "El Dalai Lama.", "Herpes bucales.", "El cavado profundo.", "Una MILF.", "Darle para que tenga.", "Los porteños.", "Un metrodelegado.", "La raza aria.", "Tomar medio vasito de orina.", "Las hemorroides.", "El amor.", "Una tuca.", "La cara de Cristiano cuando le dan un premio a Messi.", "Salir del clóset.", "El vértigo en la cola.", "Probar con un yogur.", "Un cinturonga.", "Los niños rata.", "Un volcán de semen.", "No tener códigos.", "Los barones del conurbano.", "La clase obrera.", "Sacar los pelos de la rejilla del baño.", "Un ginecólogo pediatra.", "Mi hermano.", "Ponerse la gorra.", "Un señor desnudo llorando en la calle.", "Un niño africano y su AK-47.", "Un payaso.", "Un poster de la concha de tu hermana.", "El fundamentalismo vegano.", "Pinchar forros.", "Tu vieja.", "El cuco.", "Creer en el horóscopo.", "Llegar virgen al matrimonio.", "La del mono.", "Meter los cuernos.", "El paco.", "La fe cristiana.", "Malos modales.", "Ponerle pasas de uva a las empanadas.", "El acoso sexual en el subte.", "Ir a misa.", "Adolf Hitler.", "El segundo cordón del conurbano bonaerense.", "Jesús.", "Un conchero.", "Rambo.", "Legalizar el aborto.", "El incesto.", "La esvástica.", "Las manos de Perón.", "Tener las bolas por el piso.", "Un arquero paraguayo con el ego altísimo.", "La discriminación.", "El Día de la Lealtad.", "El Ku Klux Klan.", "Un motochorro.", "Una wacha piola.", "El tipo que piensa las placas de Crónica.", "Aguantar los trapos.", "Opinar sin saber.", "Un super chino.", "Algún pelotudo de la farándula al azar.", "Viajar en la línea Sarmiento.", "Un proctólogo.", "Los piqueteros.", "Los fluidos vaginales."];

    var estadoCartasNegras = [];
    var estadoCartasBlancas = [];
    var seleccionCartasInicial = [];
    var indiceCartaBlanca;
    var cartasJugadasEnRonda = [];
    var ordenJugadoresEnRonda = [];
    var horaInicial;
    var horaInicialRondaVotacion;
    var puntosDeCartas = [];
    var puntosJugadores = [];
    var horaInicialRondaResultados;
    var rondaActual = "salaDeEspera";
    var ganadorDeRonda;
    var cartaGanadoraDeRonda;
    var numeroRonda = 0;
    var cantidadDeCartasJugadas = 0;
    var cantidadDeVotos = 0;
    var cantidadDeCartasInactivas = 0;
    var configJuego = [1, 1, 60, 5, 10, 1, 0, 1];
    var nuevoJuegoIniciado = false;

    for (var i=0; i < arrayCartasNegras.length; i++){
        estadoCartasNegras.push("Activa");
    }

    for (var j=0; j < arrayCartasBlancas.length; j++){
        estadoCartasBlancas.push("Activa");
    }

    io.sockets.on("connection", function(socket) {
        console.log('A user connected: ' + socket.id);
        players.push(socket.id);
        console.log(players.length);
        
        if (players.length === 1) {
            io.emit('isPlayerA');
        } else {
            io.emit('otroJugador');
        };
    
        socket.on('unidoASala', function (nombreJugador) {
            nombresJugadores.push(nombreJugador);
            puntosJugadores.push(0);
            console.log(nombresJugadores);
            io.emit('unidoASala', nombresJugadores);
        });
    
    
        socket.on('cambioConfig', function (configJuego) {
            console.log(configJuego);
        });
    
        socket.on('iniciarJuego', function () {
            for (i = 0; i < (nombresJugadores.length); i++){
                console.log("Cartas de: " + nombresJugadores[i]);
                seleccionCartasInicial[i] = new Array();
                for (j = 0; j < 10; j++){
                    indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
                    while (estadoCartasBlancas[indiceCartaBlanca] === "Inactiva"){
                        indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
                    }
                    seleccionCartasInicial[i][j] = indiceCartaBlanca;
                    estadoCartasBlancas[indiceCartaBlanca] = "Inactiva";
                }
            }
            io.emit('iniciarJuego', nombresJugadores, seleccionCartasInicial);
        });
    
        socket.on('iniciarRonda', function () {
            cantidadDeCartasInactivas = 0;
            for (var k=0; k < estadoCartasBlancas.length; k++){
                if (estadoCartasBlancas[k] == "Inactiva"){
                    cantidadDeCartasInactivas += 1;
                }
            }
            console.log(cantidadDeCartasInactivas);
            cantidadDeCartasJugadas = 0;
            if (rondaActual === 'salaDeEspera' || rondaActual === 'resultados'){
                numeroRonda += 1;
                cartasJugadasEnRonda = [];
                ordenJugadoresEnRonda = [];
                puntosDeCartas = [];
                rondaActual = "juego";
                horaInicial = new Date().getTime();
                var indiceCartaNegra = Math.floor(Math.random() * (arrayCartasNegras.length - 1));
                while (estadoCartasNegras[indiceCartaNegra] === "Inactiva"){
                    indiceCartaNegra = Math.floor(Math.random() * (arrayCartasNegras.length - 1));
                }
                estadoCartasNegras[indiceCartaNegra] = "Inactiva";
                io.emit('iniciarRonda', indiceCartaNegra, horaInicial, numeroRonda);
            }
        });
    
        socket.on('cardPlayed', function (nombreJugador, textoCartaElegida) {
            ordenJugadoresEnRonda.push(nombreJugador);
            cartasJugadasEnRonda.push(textoCartaElegida);
            puntosDeCartas.push(0);
            console.log(ordenJugadoresEnRonda);
            console.log(cartasJugadasEnRonda);
            indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
            while (estadoCartasBlancas[indiceCartaBlanca] === "Inactiva"){
                indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
            }
            estadoCartasBlancas[indiceCartaBlanca] = "Inactiva";
            io.emit('cartaReemplazo', indiceCartaBlanca);
            socket.broadcast.emit('cartaJugadaPorOponente');
            cantidadDeCartasJugadas += 1;
            if (cantidadDeCartasJugadas == nombresJugadores.length){
                console.log("Terminó ronda porque todos jugaron");
                rondaActual = "votacion";
                cantidadDeVotos = 0;
                horaInicialRondaVotacion = new Date().getTime();
                io.emit('rondaTerminada', ordenJugadoresEnRonda, cartasJugadasEnRonda, horaInicialRondaVotacion);
            }
        });
    
        socket.on('cartasMezcladas', function(nombreJugador, textoCartaMezclada){
            indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
            while (estadoCartasBlancas[indiceCartaBlanca] === "Inactiva"){
                indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
            }
            estadoCartasBlancas[indiceCartaBlanca] = "Inactiva";
            var indiceCartaMezclada = arrayCartasBlancas.indexOf(textoCartaMezclada);
            console.log(indiceCartaMezclada);
            estadoCartasBlancas[indiceCartaMezclada] = "Activa";
            io.emit('cartaReemplazo', indiceCartaBlanca, nombreJugador);
        });
    
        socket.on('rondaTerminada', function () {
                rondaActual = "votacion";
                cantidadDeVotos = 0;
                horaInicialRondaVotacion = new Date().getTime();
                io.emit('rondaTerminada', ordenJugadoresEnRonda, cartasJugadasEnRonda, horaInicialRondaVotacion);
        });
    
        socket.on('finJuego', function (ganadorJuego) {
            io.emit('finJuego', ganadorJuego);
        });
    
        socket.on('nuevoJuego', function () {
            if (players.length > 1 && nuevoJuegoIniciado == false){
                players = [];
                nuevoJuegoIniciado = true;
            }
        });
    
        socket.on('disconnect', function () {
            console.log('A user disconnected: ' + socket.id);
            players = players.filter(player => player !== socket.id);
        });
    
        socket.on('votoEmitido', function (cartaVotada, nombreJugador) {
            for (var i = 0; i < cartasJugadasEnRonda.length; i++){
                if (cartaVotada == cartasJugadasEnRonda[i]){
                    puntosDeCartas[i] += 1;
                    console.log(puntosDeCartas);
                    console.log("El jugador " + nombreJugador + " votó la carta " + cartaVotada + " con el indice " + i + " perteneciente al jugador " + ordenJugadoresEnRonda[i]);
                }
            }
            socket.broadcast.emit('votoEmitidoPorOponente');
            cantidadDeVotos += 1;
            console.log(cantidadDeVotos);
            if (cantidadDeVotos == nombresJugadores.length){
                console.log("Terminó ronda porque todos votaron");
                rondaActual = "resultados";
                horaInicialRondaResultados = new Date().getTime();
                var valorMaximo = Math.max.apply(Math, puntosDeCartas);
                for (var i = 0; i < puntosDeCartas.length; i++){
                    if (valorMaximo == puntosDeCartas[i]){
                        ganadorDeRonda = ordenJugadoresEnRonda[i];
                        cartaGanadoraDeRonda = cartasJugadasEnRonda[i];
                        console.log("Ganador: " + ordenJugadoresEnRonda[i]);
                    }
                }
                for (var j = 0; j < nombresJugadores.length; j++){
                    if (ganadorDeRonda == nombresJugadores[j]){
                        puntosJugadores[j] += 1;
                        console.log(puntosJugadores);
                    }
                }
                io.emit('votacionTerminada', ganadorDeRonda, cartaGanadoraDeRonda, puntosJugadores, horaInicialRondaResultados);
            }
        });
    
        socket.on('votacionTerminada', function () {
                rondaActual = "resultados";
                horaInicialRondaResultados = new Date().getTime();
                var valorMaximo = Math.max.apply(Math, puntosDeCartas);
                for (var i = 0; i < puntosDeCartas.length; i++){
                    if (valorMaximo == puntosDeCartas[i]){
                        ganadorDeRonda = ordenJugadoresEnRonda[i];
                        cartaGanadoraDeRonda = cartasJugadasEnRonda[i];
                        console.log("Ganador: " + ordenJugadoresEnRonda[i]);
                    }
                }
                for (var j = 0; j < nombresJugadores.length; j++){
                    if (ganadorDeRonda == nombresJugadores[j]){
                        puntosJugadores[j] += 1;
                        console.log(puntosJugadores);
                    }
                }
                io.emit('votacionTerminada', ganadorDeRonda, cartaGanadoraDeRonda, puntosJugadores, horaInicialRondaResultados);
        });
    });
    
    app.use(express.static(DIST_DIR));
    app.get('*', (req, res) => {
      res.sendFile(HTML_FILE);
    });
    
    server.listen(PORT, function() {
      console.log("Server is listening at http://localhost:" + PORT);
    });
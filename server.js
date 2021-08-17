const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
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
        "Lo siento profesor, pero no pude completar mi tarea porque _________."
    ];

    
    var arrayCartasBlancas = ["Una maldición gitana.","Un minuto de silencio.","Mucho pibe, poca mina.","Un policía honesto, sin nada que perder.","Hambruna.","Bacteria come-carne.","Serpientes sexuales voladoras.","Que no te importe un carajo el tercer mundo.","Sexting.","Criaturas cambia-aspecto.","Estrellas porno.","Saquear y violar.","72 vírgenes.","Persecución y tiroteo.","Una paradoja temporal.","Auténtica comida mexicana.","Bijouterie de Once.","Consultores.","Deuda impagable.","Complejo de Elektra.","El 10 de Pachano.","Tirar un candelabro sobre tus enemigos y subir colgado de la soga.","Carlos Saúl Menem.","Desnudo frontal total.","Inyecciones hormonales.","Poner un huevo.","Desnudarse y mirar Nickelodeon.","Fingir que te importa.","Hacer el ridículo en público.","Compartir jeringas.","Mocos.","La inevitable muerte por calor del universo.","El milagro del nacimiento.","El apocalipsis.","Sacar el amigo.","Privilegios de la gente blanca.","Obligaciones de casada.","El payaso de McDonalds.","Desodorante AXE.","La sangre de Cristo.","Accidentes horroríficos con láser para remoción de pelo.","BATMAN!!!","Agricultura.","Un mongoloide robusto.","Selección natural.","Abortos hechos con perchas.","Comerse todas las galletitas antes de la venta de galletas para el SIDA.","El escote de la diputada Hot.","World of Warcraft.","Proteger a una amiga de un hinchapelotas.","Obesidad.","Un montaje homoerótico de Voleibol.","Mandíbula trabada.","Un ritual de apareamiento.","Torsión testicular.","Sushi de Tenedor Libre.","Ricardo Fort.","Queso caliente.","Ataques de velocirraptors.","Sacarte la remera.","Smegma.","Alcoholismo.","Un hombre de mediana edad andando en rollers.","Super Rayo Cariñosito.","Tener arcadas y vomitar.","Chupetines demasiado grandes.","Odiarse a uno mismo.","Niños con correas.","Juego previo de medio pelo.","La Biblia.","Porno extremo alemán.","Estar prendido fuego.","Embarazo adolescente.","Gandhi.","Dejar un mensaje de voz incómodo.","Una trompada.","Representantes del Servicio al Consumidor.","Una erección que dure más de 4 horas.","Mis genitales.","Ir de levante a una clínica de abortos.","Ciencia.","Sexo oral no reciprocado.","Aves que no pueden volar.","Una buena línea.","Tortura por ahogamiento simulado.","Un desayuno balanceado.","El Normal 4.","Sacarle un dulce a un niño. De verdad.","Un Sol para los Chicos.","Rascarse el culo a escondidas.","Post-it pasivo-agresivos.","El equipo de gimnasia de China.","Pasarse a La Caja de Ahorro.","Mear un poquito.","Video casero de Claribel Medina llorando mientras come una viandita Cormillot.","Eyaculaciones nocturnas.","Los judíos.","Mis curvas.","Muslos poderosos.","Guiñarle el ojo a gente mayor.","Mr Músculo, saliendo de la nada.","Una suave caricia en el interior del muslo.","Tensión sexual.","La fruta prohibida.","Skeletor.","Whiskas.","Ser rico.","Dulce venganza.","Menemistas.","Un antílope con gases.","Natalie Portman.","Una tocadita disimulada.","Pilotos Kamikaze.","Sean Connery.","La legislación homosexual.","El paraguayo trabajador en serio.","Un pájaro en una jaula cubierta.","Monaguillos.","La Caja Vengadora.","Enojarte tanto que se te para.","Muestras gratis.","Mucho ruido y pocas nueces.","Hacer lo correcto.","La Asamblea del Año XIII.","Lactación.","Paz mundial.","RoboCop.","Cabeza de termo.","Justin Bieber.","Oompa-Loompas.","Gemido tirolés.","Pubertad.","Fantasmas.","Lolas hechas asimétricas.","Las Manos Mágicas.","Colarse los dedos.","Mariano Grondona agarrándose el escroto en un gancho de cortina.","Naranjú.","Brutalidad policíaca.","El petiso orejudo.","Preadolescentes.","Escalpar.","Tweeting.","Darth Vader.","Una tirada de goma decepcionante.","Exactamente lo que esperarías.","Esperar un eructo y terminar vomitando en el piso.","Células madre de embriones.","Escote elegante y pronunciado.","No ponerla nunca.","Una lobotomía hecha con un picahielo.","Tom Cruise.","Herpes bucal.","Cachalote.","Gente sin casa.","Tercera base.","Incesto.","Pac-man traga-leche.","Un mimo teniendo un ataque.","Hulk Hogan.","Dios.","Lavarse los pliegues.","Lluvia dorada.","Emociones.","Lamer cosas para marcar territorio.","Cerveza Patagonia.","La placenta.","Combustión humana espontánea.","Amigos con beneficios.","Pintar con los dedos.","Olor a abuelo.","Morirse de cólera.","Mis demonios internos.","Un trapo de piso empapado en pis de gato.","Domingo Cavallo.","Acurrucarse.","El porro.","Peleas de gallos.","Fuego aliado.","Juan Domingo Perón.","Una fiesta de cumpleaños decepcionante.","Una mina canchera.","El equipo de olimpiadas de matemática.","Un pequeño caballito.","William Shatner.","Cabalgar hacia el horizonte.","Un giro argumental de M. Night Shyamalan.","Peyot.","Destrucción mutua garantizada.","Pederastas.","Levadura.","Robo de tumbas.","Comerse el último yaguareté.","Catapultas.","Gente pobre.","Olvidarte de la Vuelta de Obligado.","El Meneadito.","La Fuerza.","El perreo.","Diseño inteligente.","Boca floja.","SIDA.","Fotos de tetas.","The Ubersmench.","Lilita Carrió.","Supermatch.","Drogarse zarpado.","Cientología.","La envidia del pene.","Rezar para curar lo gay.","Retozar.","Dos enanos cagando en un balde.","El Ku Klux Klan.","Gengis Khan.","Metanfetamina.","Servidumbre feudal.","Cuidado con los extraños.","Simón dice.","La carrera actoral de Martín Palermo.","Caminar dando saltitos de felicidad.",
            ];
    
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

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    players.push(socket.id);
    
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

    socket.on('iniciarJuego', function () {
        for (i = 0; i < (nombresJugadores.length); i++){
            console.log("Cartas de: " + nombresJugadores[i]);
            seleccionCartasInicial[i] = new Array();
            for (j = 0; j < 10; j++){
                indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
                seleccionCartasInicial[i][j] = indiceCartaBlanca;
            }
        }
        console.log(seleccionCartasInicial);
        io.emit('iniciarJuego', nombresJugadores, seleccionCartasInicial);
    });

    socket.on('iniciarRonda', function () {
        numeroRonda += 1;
        if (rondaActual == "salaDeEspera" || rondaActual == "resultados"){
            cartasJugadasEnRonda = [];
            ordenJugadoresEnRonda = [];
            puntosDeCartas = [];
            var indiceCartaNegra = Math.floor(Math.random() * (arrayCartasNegras.length - 1));
            rondaActual = "juego";
            horaInicial = new Date().getTime();
            io.emit('iniciarRonda', indiceCartaNegra, horaInicial);
        }
    });

    socket.on('cardPlayed', function (gameObject, nombreJugador, textoCartaElegida) {
        ordenJugadoresEnRonda.push(nombreJugador);
        cartasJugadasEnRonda.push(textoCartaElegida);
        puntosDeCartas.push(0);
        console.log(ordenJugadoresEnRonda);
        console.log(cartasJugadasEnRonda);
        indiceCartaBlanca = Math.floor(Math.random() * (arrayCartasBlancas.length - 1));
        io.emit('cartaReemplazo', gameObject, indiceCartaBlanca);
        socket.broadcast.emit('cartaJugadaPorOponente');
    });

    socket.on('rondaTerminada', function () {
        if (rondaActual == "juego"){
            rondaActual = "votacion";
            console.log("Terminó ronda de juego");
            horaInicialRondaVotacion = new Date().getTime();
            io.emit('rondaTerminada', ordenJugadoresEnRonda, cartasJugadasEnRonda, horaInicialRondaVotacion);
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
    });

    socket.on('votacionTerminada', function () {
        if (rondaActual == "votacion"){
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
});

http.listen(3000, function () {
    console.log('Server started!');
});
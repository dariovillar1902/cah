import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

var text;
var horaInicio;
var cartasBlancasDeJugador = [];
var cartaJugada = false;
var rondaActiva = true;
var cartaVotada;
var votacionRealizada = false;
var jugadorVotado;
var cartaBlancaFinal = [];
var nombreJugador;


export default class Votacion extends Phaser.Scene {
    constructor() {
        super({
            key: 'Votacion'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaVotacion"));
        text = this.add.text(55, 55, "60", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        let self = this;
        this.socket = io('http://localhost:3000', {transports : ["websocket"] });
        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        for(var i = 0; i < nombres.length; i++){
            if (i == sessionStorage.getItem("idJugador")) {
                nombreJugador = nombres[i];
            }
        }
        var ordenJugadoresEnRonda = sessionStorage.getItem("ordenJugadoresEnRonda").split(",");
        var cartasJugadasEnRonda = sessionStorage.getItem("cartasJugadasEnRonda").split(",");
        console.log(ordenJugadoresEnRonda);
        console.log(cartasJugadasEnRonda);
        
        for (var i = 0; i < ordenJugadoresEnRonda.length; i++){
            var cartaBlanca = `<div style='
            background-color: white;
            color: black;
            border: 1px solid black;
            border-radius: 1em;
            width: 14.88em;
            height: 20.78em;'> <p id="texto" style='
            padding: .5em 1.5em 1em 1.5em;
            font-family: sans-serif;
            font-weight: bold;
            font-size: 1.3em;
            line-height: 1.3em;'> </p> </div>`;
            cartaBlancaFinal[i] = this.add.dom(400 + i*200, 375).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
            cartaBlancaFinal[i].node.children[0].children[0].innerText = cartasJugadasEnRonda[i];
            cartaBlancaFinal[i].on('pointerdown', function (pointer) {
                if (pointer.downElement.innerText !== ""){
                    if (votacionRealizada == false){
                        console.log(pointer.downElement.innerText);
                        cartaVotada = pointer.downElement.innerText;
                        votacionRealizada = true;
                        self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                    }
                }
            }, self);
        }

        

        
        
        console.log("Ronda de votación activa");
        /* var arrayCartasNegras = ["La normativa de la Secretaria de Transporte ahora prohibe _________ en los aviones.", 
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
        "_________. Así quiero morir",
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
        "_________. Chocá los 5, papá",
        "Lo siento profesor, pero no pude completar mi tarea porque _________."

    ];
        var cartaNegraElegida = `<div style='
                background-color: black;
                color: white;
                border: 1px solid white;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em;'> <p id="texto" style='
                padding: .5em 1.5em 1em 1.5em;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 1.3em;
                line-height: 1.3em;'> </p> </div>`;
        var cartaNegraFinal = this.add.dom(400, 375).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        cartaNegraFinal.node.children[0].children[0].innerText = arrayCartasNegras[parseInt(sessionStorage.getItem("numeroCartaNegra"))];
        
        this.isPlayerA = false;
        this.opponentCards = [];
        horaInicio = parseInt(sessionStorage.getItem("horaInicio"));
        var arrayCartasBlancas = ["Una maldición gitana.","Un minuto de silencio.","Mucho pibe, poca mina.","Un policía honesto, sin nada que perder.","Hambruna.","Bacteria come-carne.","Serpientes sexuales voladoras.","Que no te importe un carajo el tercer mundo.","Sexting.","Criaturas cambia-aspecto.","Estrellas porno.","Saquear y violar.","72 vírgenes.","Persecución y tiroteo.","Una paradoja temporal.","Auténtica comida mexicana.","Bijouterie de Once.","Consultores.","Deuda impagable.","Complejo de Elektra.","El 10 de Pachano.","Tirar un candelabro sobre tus enemigos y subir colgado de la soga.","Carlos Saúl Menem.","Desnudo frontal total.","Inyecciones hormonales.","Poner un huevo.","Desnudarse y mirar Nickelodeon.","Fingir que te importa.","Hacer el ridículo en público.","Compartir jeringas.","Mocos.","La inevitable muerte por calor del universo.","El milagro del nacimiento.","El apocalipsis.","Sacar el amigo.","Privilegios de la gente blanca.","Obligaciones de casada.","El payaso de McDonalds.","Desodorante AXE.","La sangre de Cristo.","Accidentes horroríficos con láser para remoción de pelo.","BATMAN!!!","Agricultura.","Un mongoloide robusto.","Selección natural.","Abortos hechos con perchas.","Comerse todas las galletitas antes de la venta de galletas para el SIDA.","El escote de la diputada Hot.","World of Warcraft.","Proteger a una amiga de un hinchapelotas.","Obesidad.","Un montaje homoerótico de Voleibol.","Mandíbula trabada.","Un ritual de apareamiento.","Torsión testicular.","Sushi de Tenedor Libre.","Ricardo Fort.","Queso caliente.","Ataques de velocirraptors.","Sacarte la remera.","Smegma.","Alcoholismo.","Un hombre de mediana edad andando en rollers.","Super Rayo Cariñosito.","Tener arcadas y vomitar.","Chupetines demasiado grandes.","Odiarse a uno mismo.","Niños con correas.","Juego previo de medio pelo.","La Biblia.","Porno extremo alemán.","Estar prendido fuego.","Embarazo adolescente.","Gandhi.","Dejar un mensaje de voz incómodo.","Una trompada.","Representantes del Servicio al Consumidor.","Una erección que dure más de 4 horas.","Mis genitales.","Ir de levante a una clínica de abortos.","Ciencia.","Sexo oral no reciprocado.","Aves que no pueden volar.","Una buena línea.","Tortura por ahogamiento simulado.","Un desayuno balanceado.","El Normal 4.","Sacarle un dulce a un niño. De verdad.","Un Sol para los Chicos.","Rascarse el culo a escondidas.","Post-it pasivo-agresivos.","El equipo de gimnasia de China.","Pasarse a La Caja de Ahorro.","Mear un poquito.","Video casero de Claribel Medina llorando mientras come una viandita Cormillot.","Eyaculaciones nocturnas.","Los judíos.","Mis curvas.","Muslos poderosos.","Guiñarle el ojo a gente mayor.","Mr Músculo, saliendo de la nada.","Una suave caricia en el interior del muslo.","Tensión sexual.","La fruta prohibida.","Skeletor.","Whiskas.","Ser rico.","Dulce venganza.","Menemistas.","Un antílope con gases.","Natalie Portman.","Una tocadita disimulada.","Pilotos Kamikaze.","Sean Connery.","La legislación homosexual.","El paraguayo trabajador en serio.","Un pájaro en una jaula cubierta.","Monaguillos.","La Caja Vengadora.","Enojarte tanto que se te para.","Muestras gratis.","Mucho ruido y pocas nueces.","Hacer lo correcto.","La Asamblea del Año XIII.","Lactación.","Paz mundial.","RoboCop.","Cabeza de termo.","Justin Bieber.","Oompa-Loompas.","Gemido tirolés.","Pubertad.","Fantasmas.","Lolas hechas asimétricas.","Las Manos Mágicas.","Colarse los dedos.","Mariano Grondona agarrándose el escroto en un gancho de cortina.","Naranjú.","Brutalidad policíaca.","El petiso orejudo.","Preadolescentes.","Escalpar.","Tweeting.","Darth Vader.","Una tirada de goma decepcionante.","Exactamente lo que esperarías.","Esperar un eructo y terminar vomitando en el piso.","Células madre de embriones.","Escote elegante y pronunciado.","No ponerla nunca.","Una lobotomía hecha con un picahielo.","Tom Cruise.","Herpes bucal.","Cachalote.","Gente sin casa.","Tercera base.","Incesto.","Pac-man traga-leche.","Un mimo teniendo un ataque.","Hulk Hogan.","Dios.","Lavarse los pliegues.","Lluvia dorada.","Emociones.","Lamer cosas para marcar territorio.","Cerveza Patagonia.","La placenta.","Combustión humana espontánea.","Amigos con beneficios.","Pintar con los dedos.","Olor a abuelo.","Morirse de cólera.","Mis demonios internos.","Un trapo de piso empapado en pis de gato.","Domingo Cavallo.","Acurrucarse.","El porro.","Peleas de gallos.","Fuego aliado.","Juan Domingo Perón.","Una fiesta de cumpleaños decepcionante.","Una mina canchera.","El equipo de olimpiadas de matemática.","Un pequeño caballito.","William Shatner.","Cabalgar hacia el horizonte.","Un giro argumental de M. Night Shyamalan.","Peyot.","Destrucción mutua garantizada.","Pederastas.","Levadura.","Robo de tumbas.","Comerse el último yaguareté.","Catapultas.","Gente pobre.","Olvidarte de la Vuelta de Obligado.","El Meneadito.","La Fuerza.","El perreo.","Diseño inteligente.","Boca floja.","SIDA.","Fotos de tetas.","The Ubersmench.","Lilita Carrió.","Supermatch.","Drogarse zarpado.","Cientología.","La envidia del pene.","Rezar para curar lo gay.","Retozar.","Dos enanos cagando en un balde.","El Ku Klux Klan.","Gengis Khan.","Metanfetamina.","Servidumbre feudal.","Cuidado con los extraños.","Simón dice.","La carrera actoral de Martín Palermo.","Caminar dando saltitos de felicidad.",
            ];

        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        var cartas = sessionStorage.getItem("seleccionCartasInicial").split(",");
        for(var i = 0; i < nombres.length; i++){
            if (i == sessionStorage.getItem("idJugador")) {
                console.log("Cartas de " + nombres[i]);
                for(var j = i*10; j < (i*10)+10; j++){
                    console.log(arrayCartasBlancas[cartas[j]]);
                    cartasBlancasDeJugador.push(arrayCartasBlancas[cartas[j]]);
                }
            }
        }

        this.dealer = new Dealer(this);
        this.dealer.dealCards(cartasBlancasDeJugador);
        console.log(sessionStorage.getItem("idJugador"));
        this.socket = io('http://localhost:3000', {transports : ["websocket"] })

        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
        })

        this.socket.on('cartaReemplazo', function (gameObject, indiceCartaBlanca) {
            if (cartaJugada == true) {
                var textoCartaReemplazo = arrayCartasBlancas[indiceCartaBlanca];
                self.dealer.cartaReemplazo(xCartaJugada, yCartaJugada, textoCartaReemplazo);
                cartaJugada = false;
            }
        })

        this.socket.on('cartaJugadaPorOponente', function () {
            console.log("Alguien jugó una carta");
        })

        this.socket.on('rondaTerminada', function () {
        	console.log("Terminó la ronda");
            self.scene.switch('salaDeEspera');
        })

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        let self = this;
        let xCartaJugada;
        let yCartaJugada;

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })    

        this.input.on('dragstart', function (pointer, gameObject) {
            // self.node.children[0].children[0].innerText.disableInteractive(gameObject); 
            //self.node.firstChild.firstElementChild.disableInteractive(gameObject);
            //gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
            xCartaJugada = gameObject.input.dragStartX;
            yCartaJugada = gameObject.input.dragStartY;
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            //gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 50) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject);
            cartaJugada = true;
        })
        */
    }
    
    update() {
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio)/1000;
        var segundosRestantes = 60 - diferenciaS;
        if (segundosRestantes > 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else {
            rondaActiva = false;
            this.socket.emit('rondaTerminada');
        }

        /*
        var horaActual = new Date().getTime();
        // text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
        var diferenciaS = (horaActual - horaInicio)/1000;
        var segundosRestantes = 60 - diferenciaS;
        if (segundosRestantes > 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else {
            rondaActiva = false;
            this.socket.emit('rondaTerminada');
        }
        */
    }


}
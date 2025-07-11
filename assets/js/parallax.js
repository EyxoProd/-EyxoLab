document.addEventListener("DOMContentLoaded", function () {
    var tipo = 1;
    var intensidade = 100;
    var elementos = [".grid-container", ".s3 .checklist-container .caixa"];

    Parallax.Carregar(intensidade, elementos, tipo);
});

var Parallax = {
    Carregar: function (intensidade, elementos, tipo) {


        if(window.innerWidth > 768)
        {
            this.Tipo = tipo;
            this.Intensidade = intensidade / 10000;
            this.Elementos = elementos.map(selector => document.querySelectorAll(selector));

            this.QuadranteLarguraJanela = window.innerWidth / 2;
            this.QuadranteAlturaJanela = window.innerHeight / 2;

            document.addEventListener("mousemove", this.Animar.bind(this));
        }

        
    },

    Animar: function (e) {

        const body = document.querySelector("body");

        if(!body.classList.contains("acessibilidade"))
        {
            this.Elementos.forEach(elementGroup => {
                elementGroup.forEach(elemento => {
                    var larguraElemento = elemento.offsetWidth;
                    var alturaElemento = elemento.offsetHeight;
    
                    var intensidadeOffsetX, intensidadeOffsetY;
    
                    if (this.Tipo == 1) {
                        intensidadeOffsetX = this.Intensidade / (larguraElemento / 1000);
                        intensidadeOffsetY = this.Intensidade / (alturaElemento / 1000);
                    } else if (this.Tipo == 2) {
                        intensidadeOffsetX = this.Intensidade * (alturaElemento / 1000);
                        intensidadeOffsetY = this.Intensidade * (larguraElemento / 1000);
                    } else if (this.Tipo == 3) {
                        intensidadeOffsetX = this.Intensidade;
                        intensidadeOffsetY = this.Intensidade;
                    }
    
                    var offsetX = (e.clientX - this.QuadranteLarguraJanela) * intensidadeOffsetX;
                    var offsetY = (e.clientY - this.QuadranteAlturaJanela) * -intensidadeOffsetY;
    
                    elemento.style.transform = "perspective(1000px) rotateX(" + offsetY + "deg) rotateY(" + offsetX + "deg)";
                });
            });
        }
        else {

            this.Elementos.forEach(elementGroup => {
                elementGroup.forEach(elemento => {

                    elemento.style.transform = "";

                });
            });

            
        }


        
    }
};



/*-------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const numberOfParticles = 500; // Increased number of particles
    const particleContainer = document.getElementById("particle-container");

    for (let i = 0; i < numberOfParticles; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");

        // Random size range between 1px and 3px
        let size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random depth effect
        let depth = Math.random();
        particle.style.setProperty('--depth', depth);

        // Random direction for floating
        let randomX = Math.random();
        let randomY = Math.random();
        particle.style.setProperty('--random-x', randomX);
        particle.style.setProperty('--random-y', randomY);

        // Random position
        let posX = Math.random() * 100;
        let posY = Math.random() * 100;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;

        particleContainer.appendChild(particle);
    }
});


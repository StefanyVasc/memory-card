let pontos = 0;
const memoryCard = () => {
  const $head = document.querySelector("head");
  const $styleCard = document.createElement("style");

  $styleCard.textContent = `

    .memory-card { 
      width: 155px;
      height: 155px;
      position: relative;
    }
    .memory-card .card {
      width: 155px;
      height: 155px;
      background-color: #f25a70;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      cursor: pointer;
      position: absolute;

    }


    .memory-card.-active .card,
    .memory-card.-score .card{
      display: none;
    }

    .memory-card.-active .card.-front,
    .memory-card.-score .card.-front{
      display: flex;
    }
    
    .memory-card .card.-front {
      background-color: #ffffff;

    }
    
    
    .memory-card .card.-front::before {
      content: "";
      width: 95px;
      height: 95px;
      background-color: #d4d4d4;
      border-radius: 50%;
      position: absolute;
    }
    
    .memory-card .card > .icon {
      width: 100px;
      height: 100px;
    }
    
    .memory-card .card.-front > .icon {
      position: absolute;
      transform: translateY(-12px);
    
    }
  `;

  $head.insertBefore($styleCard, null);

  /*   
o return da memorycard é associado a uma nova constante da page. Dai 
só é aplicado o estilo uma unica vez e sempre que ele é chamado na page
ele retorna apenas o conteudo do return. O estilo é inserido no momento
de preparação para o memory card (page)
*/

  return ({ src, alt }) => `
      <div class="memory-card" onClick='handleClick(this)'>
        <article class= "card -front">
          <img        
            src='${src}' 
            alt='${alt}'
            class='icon'
            
          />      
        </article>

        <article class= "card">
          <img        
            src='img/icon-collabcode.png' 
            alt='O mascote da collabCode'
            class='icon'
          />
        </article>
      </div>
    `;
};
let score = 0;
const handleClick = $component => {
  if (!$component.classList.contains("-active")) {
    if (qtdActiveMemoryCard < 2) {
      $component.classList.toggle("-active");
    }

    if (qtdActiveMemoryCard === 1) {
      const $memoryCards = document.querySelectorAll(".memory-card.-active");

      if (
        $memoryCards[0].querySelector(".-front .icon").getAttribute("src") ===
        $memoryCards[1].querySelector(".-front .icon").getAttribute("src")
      ) {
        score++;
        console.log("Score:", score);
        $memoryCards.forEach($memoryCard => {
          $memoryCard.classList.add("-score");
          $memoryCard.classList.remove("-active");
        });
      } else {
        console.log("Score:", score);
        setTimeout(() => {
          const $activeMemoryCard = document.querySelectorAll(
            ".memory-card.-active"
          );

          $activeMemoryCard.forEach($memoryCard => {
            $memoryCard.classList.remove("-active");
          });

          qtdActiveMemoryCard = 0;
        }, 1200);
      }
    }
  }
};

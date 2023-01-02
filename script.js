//DOMS
const hpEl = document.querySelector('.hp')
const apEl = document.querySelector('.ap')
const textEl = document.querySelector('.text')
const btnContainerEl = document.querySelector(".buttongrid")

let player = {
    gp: 10,
    cool: false
}

let gp = player.gp
let current = 0

let map = [
    {
        id: 0, 
        desc:"A circle is a circle", 
        options:[
            {
                oid: 0,
                txt:"Buy an old shield",
                destination: 1,
                get state(){
                    player.shield = true
                }
            },
            {
                oid: 1,
                txt:"Buy extra rations",
                destination: 1,
                get state(){
                    player.rations = true
                }
            },
            {
                oid: 2,
                txt:"Buy a grappling hook",
                destination: 1,
                get state(){
                    player.rope = true
                }
            },
            {
                oid: 3,
                txt:"Buy a LUXURY shovel",
                destination: 1,
                get state(){
                    player.shovel = true
                } ,
                get req (){ 
                    return player.gp > 15
                }
            },
         ]
    },
    {
        id: 1, 
        desc:"Finally, I leave town and head out on a great adventure! My destination is unclear, all I know is that the Demon Lord's castle is far to the north.", 
        options:[
            {
                oid: 0,
                txt:"I get some bling",
                destination: 0,
                get state(){
                    player.gp = gp+1
                }
            },
        ]
    }
]

function initGame(){
    initText()
    initBtns()
}
initGame()

function initText(){
    textEl.innerText = ""
    btnContainerEl.innerHTML = ""

    textEl.innerText = map[current].desc

    for (let i = 0; i<map[current].options.length; i++){

        if (checkRequirement(map[current].options[i].req)){
        let btnEl = document.createElement("button")
        let btnContent = map[current].options[i].txt
        btnEl.innerText = btnContent
        btnEl.classList.add("btn")
        btnEl.dataset.button = i
        btnContainerEl.append(btnEl)
        }
    }
}

function initBtns(){
    const btnEls = document.querySelectorAll(".btn")
    btnEls.forEach(btn =>{
        btn.addEventListener("click", handleClick)
    })
}

function checkRequirement(bool){
    if (bool === true || bool === undefined){
        return true
    } return false
}

function handleClick(e){
        let option = e.target.dataset.button
        if (map[current].options[option].state){
            map[current].options[option].state
        }
        current = map[current].options[option].destination
        initText()
        initBtns()
        updateVariable()
        console.log(player)
        console.log(gp)
    }

function updateVariable(){
    gp = player.gp
}
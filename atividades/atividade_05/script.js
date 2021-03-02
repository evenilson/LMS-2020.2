/* SCRIPT DO BOTÃO HAMBUGUER*/
let buttonHamburguer = document.querySelector(".hamburguer-bt")
let navSide = document.querySelector(".nav-side")
let feed = document.querySelector(".feed")

buttonHamburguer.addEventListener("click", function(){
    buttonHamburguer.classList.toggle("active")
    navSide.classList.toggle("active")
    feed.classList.toggle("feed__right")
})

/* SCRIPT DO MODAL*/

/* Para abrir o modal*/
let openPost = document.querySelector(".open-post")
let overlayModal = document.querySelector(".overlay-modal")

openPost.addEventListener("click", function(event){
    event.preventDefault();
    overlayModal.classList.add("active")
    openPost.classList.add("active")
})

/* Para fechar o modal*/
closePost = document.querySelector(".close-modal")

closePost.addEventListener("click", function(event){
    event.preventDefault();
    overlayModal.classList.remove("active")
    openPost.classList.remove("active")

    newUsername.value = '';
    newMessage.value = '';
})


/* SCRIPT DO FEED E POST */
let posts_data = [
    {
        nome:"Victor",
        mensagem:"tudo bem?",
    },
    {
        nome:"Carlos",
        mensagem:"Tá quente hoje!",
    }
]

let newUsername = document.querySelector(".username-form")
let newMessage = document.querySelector(".message-form")
let addPost = document.querySelector(".add-post")

addPost.addEventListener("click", function(event){
    event.preventDefault();

    /*Criando post e colocando no feed */
    let post = document.createElement("div")
    post.classList.add("post")
    feed.appendChild(post)

    /* Criando e adicioando a div user-info ao post*/
    let userInfo = document.createElement("div")
    userInfo.classList.add("user-info")
    post.appendChild(userInfo)

    /* Criando, preechendo e adicinando icone de usuario ao user-info */
    let materialIcon = document.createElement("i")
    materialIcon.classList.add("material-icons")
    materialIcon.appendChild(document.createTextNode("account_circle"))
    userInfo.appendChild(materialIcon)

    /* Criando, preechendo e adicinando nome do usuario do post ao user-info */
    let username = document.createElement("span")
    username.classList.add("username")
    username.appendChild(document.createTextNode(newUsername.value))
    userInfo.appendChild(username)

    /* Criando, preechendo e adicinando a mensagem do post ao post */
    let message = document.createElement("p")
    message.classList.add("message")
    message.appendChild(document.createTextNode(newMessage.value))
    post.appendChild(message)

    /* adicioando post a lista*/
    let newPost = {nome: newUsername.value, mensagem: newMessage.value}
    posts_data.push(newPost)

    /* fechando o modal */
    overlayModal.classList.remove("active")
    openPost.classList.remove("active")

    newUsername.value = '';
    newMessage.value = '';


})

/* SCRIPT PARA ALTERAR O POST EM DESTAQUE* */

/* função que gera numero aleatorio*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let post = 0;
let OldPost;

/* a cada dois segundos muda o conteúdo do primeiro post*/
let Interval = setInterval(function() {

    let equal = true

    while (equal) {
        post = getRandomInt(0, posts_data.length)

        if(post !==OldPost) {
            equal = false;
        }

    }

    OldPost = post
    
    document.querySelector(".post.highlighted .username").innerHTML = posts_data[post].nome
    document.querySelector(".post.highlighted .message").innerHTML = posts_data[post].mensagem

}, 2000)




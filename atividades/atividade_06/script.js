
let formName = document.querySelector(".form-name");
let formGroup = document.querySelector(".form-group");
let formMessage = document.querySelector(".form-message");

let listGroupsDiv = document.querySelector(".list-groups");
let listMessagesDiv = document.querySelector(".list-messages");

let overlayModal = document.querySelector(".overlay-modal");

userName = "";
idGroup = "";
idGroupLast = "";
groupDivs = "";

formName.addEventListener("submit", (event) => {
    event.preventDefault();

    userName = (document.querySelector(".form-name input")).value;

    if(userName == ""){
        alert("Preencha o campo corretamente");
    }else{
        let userNameDiv = document.querySelector(".app header .username");
        let userNameSpan = document.createElement("span");
        userNameSpan.textContent = userName;
        userNameDiv.appendChild(userNameSpan);

        overlayModal.classList.add("close")
        getAndRenderGrups()
    }
})

formGroup.addEventListener("submit", (event)=>{
    event.preventDefault();

    let inputGroup = document.querySelector(".form-group input");

    if(inputGroup.value == "") {
        alert("Preencha o campo corretamente");
    }else{
        insertGroup(inputGroup.value);

        inputGroup.value = "";
    }
})

formMessage.addEventListener("submit", (event)=>{
    event.preventDefault();

    let inputMessage = document.querySelector(".form-message input");

    if(inputMessage.value == "") {
        alert("Preencha o campo corretamente");
    }else{
        insertMessage(userName, inputMessage.value);

        inputMessage.value = "";
    }
    
})

function makeGroup(name, id){

    let groupDiv = document.createElement("div");
    let groupImgDiv = document.createElement("div");
    let groupNameDiv = document.createElement("div");

    let imgGroup = document.createElement("img");
    let spanName = document.createElement("span");

    groupDiv.classList.add("group");
    groupImgDiv.classList.add("group-img");
    groupNameDiv.classList.add("group-name");

    imgGroup.src = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png";
    imgGroup.alt = "Imagem do grupo";

    spanName.textContent = name;

    groupImgDiv.appendChild(imgGroup);
    groupNameDiv.appendChild(spanName);
    

    groupDiv.appendChild(groupImgDiv);
    groupDiv.appendChild(groupNameDiv);

    let strongIdGroup = document.createElement("strong");
    strongIdGroup.style.display = "none";

    if(id == null ){
        strongIdGroup.textContent = idGroupLast + 1;
    }else{
        strongIdGroup.textContent = id;
    }

    idGroupLast = parseInt(strongIdGroup.textContent);
    
    groupDiv.appendChild(strongIdGroup)


    groupDiv.addEventListener("click", (event) => {
        event.preventDefault();

        idGroup = parseInt(strongIdGroup.textContent);

        getAndRenderMessages();
        formMessage.classList.remove("close");

        groupDivs.forEach(group => {
            group.classList.remove("active");
        });

        groupDiv.classList.add("active");

        let messagesContainerDiv = document.querySelector(".messages-container");
        messagesContainerDiv.classList.add("wallpaper")

    })

    return groupDiv;
}

function makeMessage(user, text){

    let messageDiv = document.createElement("div");
    let userDiv = document.createElement("div");
    let textDiv = document.createElement("div");

    let strongUser = document.createElement("strong");
    let spanText = document.createElement("span");

    messageDiv.classList.add("message");
    userDiv.classList.add("user");
    textDiv.classList.add("text");

    strongUser.textContent = user;
    spanText.textContent = text;

    strongUser.style.color = generateColorRandom(); 

    userDiv.appendChild(strongUser);
    textDiv.appendChild(spanText);

    messageDiv.appendChild(userDiv);
    messageDiv.appendChild(textDiv);

    return messageDiv;

}


function getAndRenderGrups(){
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos"
    }).then((response) => {
        for (const group of response.data) {
            listGroupsDiv.appendChild(makeGroup(group.nome, group.id))
        }

        groupDivs = document.querySelectorAll(".group");

    }).catch((error) => {
        console.log(error);
    })
}

function insertGroup(name){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos",
        data: {
            nome: name
        }
    }).then((response) => {
        listGroupsDiv.appendChild(makeGroup(response.data.nome));

        groupDivs = document.querySelectorAll(".group");
    }).catch((error) => {
        console.log(error);
    })
}

function getAndRenderMessages(){
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos/"+idGroup+"/mensagens"
    }).then((response) => {
        listMessagesDiv.innerHTML = "";
        for (const message of response.data) {
            listMessagesDiv.appendChild(makeMessage(message.nome, message.corpo));
        }
    }).catch((error) => {
        console.log(error);
    })
}

function insertMessage(user, text){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/mensagens",
        data: {
            nome: user,
            corpo: text,
            grupoId: idGroup
        }
    }).then((response) => {
        listMessagesDiv.appendChild(makeMessage(response.data.nome, response.data.corpo))
    }).catch((error) => {
        console.log(error);
    })
}

function generateColorRandom() {
    const colorsPallete = ['#fed049', '#d8ebe4', '#66CDAA',
                            '#F4A460','##DCDCDC','#e4bad4',
                            '#9fd8df', '#EE82EE', '#cdc733', '#ac0d',
                            '#00FF00', '#87CEEb', '#dddddd', '#f9f3f3'];

    colorsPallete[Math.floor(Math.random() * colorsPallete.length)]

    return colorsPallete[Math.floor(Math.random() * colorsPallete.length)];
}

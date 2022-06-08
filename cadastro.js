let nome = document.querySelector("#nome")
let labelNome = document.querySelector("#labelNome")
let validarNome = false;

let usuario = document.querySelector("#usuario")
let labelUsuario = document.querySelector("#labelUsuario")
let validarUsuario = false; 

let senha = document.querySelector("#senha")
let labelSenha = document.querySelector("#labelSenha")
let validarSenha = false;

let confirmarSenha = document.querySelector("#confirmarSenha")
let labelConfirmarSenha = document.querySelector("#labelConfirmarSenha")
let validarConfirmarSenha = false;

let erro = document.querySelector("#erro")
let sucesso = document.querySelector("#sucesso")

nome.addEventListener("keyup", ()=> {
  if(nome.value.lenght <= 2) {
    labelNome.setAttribute("style", "color: red")
    labelNome.innerHTML = "Nome *Nome muito curto"
    nome.setAttribute("style", "border-color: red")
    validarNome = false
  } else {
    labelNome.setAttribute("style", "color: green")
    labelNome.innerHTML = "Nome"
    nome.setAttribute("style", "border-color: green")
    validarNome = true
  }
})

usuario.addEventListener("keyup", ()=> {
  if(nome.value.lenght <= 6) {
    labelUsuario.setAttribute("style", "color: red")
    labelUsuario.innerHTML = "Usuário *Usuário muito curto"
    usuario.setAttribute("style", "border-color: red")
    validarUsuario = false
  } else {
    labelUsuario.setAttribute("style", "color: green")
    labelUsuario.innerHTML = "Usuário"
    usuario.setAttribute("style", "border-color: green")
    validarUsuario = true
  }
})

senha.addEventListener("keyup", ()=> {
  if(senha.value.lenght <= 6) {
    labelSenha.setAttribute("style", "color: red")
    labelSenha.innerHTML = "Senha *Senha muito curta"
    senha.setAttribute("style", "border-color: red")
    validarSenha = false
  } else {
    labelSenha.setAttribute("style", "color: green")
    labelSenha.innerHTML = "Senha"
    senha.setAttribute("style", "border-color: green")
    validarSenha = true
  }
})

senha.addEventListener("keyup", ()=> {
  if(senha.value != confirmarSenha.value) {
    labelConfirmarSenha.setAttribute("style", "color: red")
    labelConfirmarSenha.innerHTML = "Senha *Senha não confere"
    confirmarSenha.setAttribute("style", "border-color: red")
    validarConfirmarSenha = false
  } else {
    labelConfirmarSenha.setAttribute("style", "color: green")
    labelConfirmarSenha.innerHTML = "Confirmar Senha"
    confirmarSenha.setAttribute("style", "border-color: green")
    validarConfirmarSenha = true
  }
})

function cadastrar() {
  if(validarNome && validarUsuario && validarSenha && validarConfirmarSenha) {
    let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios") || "[]")
    listaUsuarios.push({
      nomeCadastrado: nome.value,
      usuarioCadastrado: usuario.value,
      senhaCadastrada: senha.value
    })
    
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios))
    
    sucesso.setAttribute("style", "display: block")
    sucesso.innerHTML = "Usuário cadastrado"
    erro.setAttribute("style", "display: none")
    erro.innerHTML = ""
    window.location.href = "login.html"
  } else {
    erro.setAttribute("style", "display: block")
    erro.innerHTML = "Preencha todos os campos"
    sucesso.setAttribute("style", "display: none")
    sucesso.innerHTML = ""
  }
}

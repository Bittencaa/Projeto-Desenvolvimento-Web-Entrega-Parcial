function entrar() {
  let usuario = document.querySelector("#usuario")
  let labelUsuario = document.querySelector("#labelUsuario")
  
  let senha = document.querySelector("#senha")
  let labelSenha = document.querySelector("#labelSenha")
  
  let erro = document.querySelector("#erro")
  let listaUsuarios = []
  
  let validarUsuario = {
    nome:"",
    usuario:"",
    senha:""
  }
  
  listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"))  
  listaUsuarios.forEach((item) =>{
    if(usuario.value == item.usuarioCadastrado && senha.value == item.senhaCadastrada){
     
      validarUsuario = {
        nome: item.nomeCadastrado,
        usuario: item.usuarioCadastrado,
        senha: item.senhaCadastrada
      }
    }
  })
  
  if(usuario.value == validarUsuario.usuario && senha.value == validarUsuario.senha) {
    window.location.href = "compra.html"
  } else {
    labelUsuario.setAttribute("style", "color: red")
    labelUsuario.setAttribute("style", "border-color: red")
    labelSenha.setAttribute("style", "color: red")
    labelSenha.setAttribute("style", "border-color: red")
    erro.setAttribute("style", "display: block")
    erro.innerHTML = "Usuário ou senha incorretos!"
  }
  
}

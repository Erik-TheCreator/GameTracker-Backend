const userService = require("../src/domain/users/services/userService");
const usuarioRepository = require("../src/domain/users/repository/userRepository");
const bcrypt = require("bcrypt");

describe("userService testes", () => {
  beforeEach(() => {
    usuarioRepository.getUserByEmail = async (email) => null;  
    usuarioRepository.getUserByNome = async (nome) => null;    
    usuarioRepository.criarUsuario = async (nome, email, senhaHash) => 1; 

    bcrypt.hash = async (senha, salt) => "hash_senha";
  });

  test("deve cadastrar usuário novo", async () => {
    const nome = "ryan";
    const email = "ryangosling@gmail.com";
    const senha = "1234";

    const resultado = await userService.cadastrar(nome, email, senha);

    expect(resultado).toBe(1);
  });
  test("deve logar usuário corretamente", async () => {
    const usuarioFake = { id: 1, nome: "ryan", email: "ryangosling@gmail.com", senha: "hash_senha" };
  
    usuarioRepository.getUserByEmail = async (email) => usuarioFake;
    bcrypt.compare = async (senha, hash) => true; 
  
    const resultado = await userService.login("ryangosling@gmail.com", "1234");
  
    expect(resultado).toEqual(usuarioFake);
  });
  test("não deve logar com email inexistente", async () => {
    usuarioRepository.getUserByEmail = async () => null;
  
    await expect(userService.login("email@inexistente.com", "1234"))
      .rejects
      .toEqual({ status: 401, mensagem: "Usuário não autorizado!" });
  });

  test("não deve logar com senha incorreta", async () => {
    const usuarioFake = { id: 1, nome: "ryan", email: "ryangosling@gmail.com", senha: "hash_senha" };
    usuarioRepository.getUserByEmail = async () => usuarioFake;
    bcrypt.compare = async () => false; 
  
    await expect(userService.login("ryangosling@gmail.com", "senhaErrada"))
      .rejects
      .toEqual({ status: 401, mensagem: "Usuário não autorizado!" });
  });
});

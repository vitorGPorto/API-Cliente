const ClienteService = require('../services/ClienteService')
// para inserir dados rever aula -> https://www.youtube.com/watch?v=qIJ3lzq0plY&list=PL1hl9qLyFtfDXY9NO8F3TnjxezKJ_1HlI&index=6
module.exports ={
// para buscar todos clientes
    buscarTodos: async (req, res) =>{
        let json = {error: '', result:[]}

         let clientes = await ClienteService.buscarTodos();

            for(let i in clientes){
                json.result.push({
                    codigo: clientes[i].codigo,
                    nome: clientes[i].nome,
                    cpf: clientes[i].cpf,
                    dataNascimento: clientes[i].dataNascimento,
                    endereco: clientes[i].endereco,
                    estado: clientes[i].estado,
                    cidade: clientes[i].cidade,
                })
            }
        res.json(json)
    },
    
// para buscar um cliente
   buscarUm: async (req, res) =>{
    let json = {error: '', result:{}}

        let codigo = req.params.codigo;
        let cliente = await ClienteService.buscarUm(codigo)

            if(cliente){
                json.result = cliente
            }

    res.json(json)
    },
    
//para inserir os dados 
   inserir: async (req, res) =>{
        let json = {error: '', result:{}}
    
           
            let nome = req.body.nome
            let cpf = req.body.cpf
           // let dataNascimento = req.body.dataNascimento
            let endereco = req.body.endereco
            let estado = req.body.estado
            let cidade = req.body.cidade

                if(nome && cpf && endereco && estado && cidade){
                    let ClienteCodigo = await ClienteService.inserir(nome, cpf,  endereco, estado, cidade)
                    json.result = {
                        codigo: ClienteCodigo,
                        nome,
                        cpf,
                        
                        endereco,
                        estado,
                        cidade
                    }
                }else{
                    json.error = 'Campos não envidados'
                }
    
        res.json(json)
        },
//para alterar os dados 
      alterar: async (req, res) =>{
            let json = {error: '', result:{}}
        
                let codigo = req.params.codigo
                let nome = req.body.nome
                let cpf = req.body.cpf
               // let dataNascimento = req.body.dataNascimento
                let endereco = req.body.endereco
                let estado = req.body.estado
                let cidade = req.body.cidade
    
                    if(codigo && nome && cpf  && endereco && estado && cidade){
                         await ClienteService.alterar(codigo, nome, cpf,  endereco, estado, cidade)
                        json.result = {
                            codigo,
                            nome,
                            cpf,
                            
                            endereco,
                            estado,
                            cidade
                        }
                    }else{
                        json.error = 'Campos não alterados'
                    }
        
            res.json(json)
            },
//apaga dados dos clientes
        excluir : async(req, res) =>{
            let json = {error:'', result: {}}
            await ClienteService.excluir(req.params.codigo)

            res.json(json)

        }
}
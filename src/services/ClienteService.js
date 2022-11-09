
const { promise } = require('../db')
const db = require('../db')

module.exports = {
//para buscar todos cliente
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM clientes', (error, results)=>{
                if(error){
                    rejeitado(error) 
                    return
                }
                aceito(results)
            })
        })
    },
//para buscar um cliente
    buscarUm: (codigo)=>{
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT * FROM clientes WHERE codigo = ?', [codigo], (error, results)=>{
                    if(error){
                        rejeitado(error) 
                        return
                    }
                    if(results.length > 0 ){
                        aceito(results[0])
                    }else {
                        aceito(false)
                    }
                    
                })
            })
        },
        inserir: ( nome, cpf)=> {
            return new Promise((aceito, rejeitado)=> {
    
                db.query('INSERT INTO clientes ( nome, cpf) VALUES (?, ?)',
                    [ nome, cpf],
                    (error, results)=>{
                        if(error){ rejeitado(error); return; }
                        aceito(results.insertCodigo); //insertId
                    }
                );
            });
        },
     
//para inserir os dados 
inserir: (nome, cpf,  endereco, estado, cidade)=>{
            return new Promise((aceito, rejeitado)=>{
                db.query('INSERT INTO clientes(nome, cpf,  endereco, estado, cidade) VALUES ( ?, ?, ?, ?, ?)',
                 [nome, cpf,  endereco, estado, cidade], 
                    (error, results)=>{
                        if(error){
                            rejeitado(error) 
                            return
                        }
                      aceito(results.insertCodigo)
                })
            })
        },
//para alterar os dados 
        alterar: (codigo, nome, cpf,  endereco, estado, cidade)=>{
            return new Promise((aceito, rejeitado)=>{
                db.query('UPDATE INTO clientes SET nome = ? , cpf = ?, endereco = ?, estado = ?, cidade = ? WHERE codigo = ?',
                 [codigo,nome, cpf,  endereco, estado, cidade], 
                    (error, results)=>{
                        if(error){
                            rejeitado(error) 
                            return
                        }
                      aceito(results)
                })
            })
        },
//apaga dados dos clientes
        excluir: (codigo) =>{
            return new Promise((aceito, rejeitado)=>{
                db.query('DELETE FROM clientes WHERE codigo = ?', [codigo],
                (error, results)=>{
                    if(error){
                        rejeitado(error) 
                        return
                    }
                    aceito(results)
                })
            })
        }
}
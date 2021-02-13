const cors = require("cors");
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json())
//models
require('./src/models/Contato')
const Contato = mongoose.model('contatos')
//Conexão db
require('./src/db/connect')

app.get('/contatos', async (req, res) => {
    const contatosResponse = await Contato.find()
    const contatosJson = await contatosResponse
    return res.json(contatosJson)
})

app.post('/contatos', async (req, res) => {
    const novoContato = new Contato({
        nome: req.body.nome,
        mensagem: req.body.mensagem
    })
    novoContato.save()
    res.json({message: "Contato concluido com sucesso", contato:novoContato})
})

app.put('/contatos/:id', async (req, res) => {
    const {id} = req.params
    //pesquisando por um unico contato
    const contato = await Contato.findOne({_id: id})
    //alterando os dados existentes
    contato.nome = req.body.nome
    contato.mensagem = req.body.mensagem
    //salvando as alterações
    contato.save()
    res.json({message: "Contato alterado", contato: contato})
})

app.delete('/contatos/:id', async (req, res) => {
    const {id} = req.params
    //pesquisando por um unico contato
    const contato = await Contato.findOneAndDelete({_id: id})
    res.json({message: "Contato deletado com sucesso", contato: contato})
})

app.listen(3210);

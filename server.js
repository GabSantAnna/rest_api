const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db');


const addTarefa = `INSERT INTO TAREFAS 
(titulo, descricao, status ) VALUES 
("Dar banho na Leona", "sexta-feira as 14h", 
"TODO")` 
//Insira aqui o código da tarefa proposta!
//Apesar de não ser a melhor forma de manter um projeto, utilize apenas esse arquivo. Estamos testando!
const express = require("express")
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send("hello world!");
});

app.get('/tarefas', (req, res) => {

    db.all("SELECT * FROM TAREFAS", (err, rows) => {
        console.log(rows)
        res.send(JSON.stringify({results:rows}));
    });
});

app.post('/tarefas', (req, res) => {

    db.run(addTarefa, (err, rows) => {
        if (err) {throw err}
        res.send(rows)

    });

});


app.delete("/tarefas/:id", (req, resp) => {

    db.run(`DELETE FROM TAREFAS WHERE id =${req.params.id}`, (err) => {
        resp.send("deletado!")
    });
});

app.put("/tarefas/:id", (req, resp) => {

    db.run('UPDATE FROM TAREFAS SET descricao = ? WHERE id = ?',
    [req.body.descricao, req.params.id]);
    console.log(req.body.descricao)
    resp.send()
});


app.listen(port, () => { console.log("Iniciado") }) 



process.on('SIGINT', ()=> {
    db.close((err) => {
        console.log("Banco encerrado com sucesso!");
        process.exit(0);
    })
})



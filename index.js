require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql2')
const multer = require('multer')
const path = require('path')

// nome do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        // Data + Nome Original 
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

app.use(express.static('public'))

// --- CONEXÃO COM O BANCO DE DADOS ---
const connection = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack)
        return
    }
    console.log('Conectado no MySQL com sucesso!')
})

// Rota da Home (COM SISTEMA DE BUSCA/FILTRO)
app.get('/', (req, res) => {
    const pesquisa = req.query.busca
    
    let sql = ''
    let valores = []

    if (pesquisa) {
        sql = `SELECT * FROM produtos WHERE nome LIKE ? OR categoria LIKE ?`
        valores = [`%${pesquisa}%`, `%${pesquisa}%`]
    } else {
        sql = 'SELECT * FROM produtos'
    }

    connection.query(sql, valores, (err, results) => {
        if (err) {
            console.log(err)
            return res.send('Erro ao buscar produtos!')
        }
        
        res.render('home', { 
            listaProdutos: results,
            termoBusca: pesquisa 
        })
    })
})

app.get('/admin/cadastrar', (req, res) => {
    res.render('form-produto')
})

// Rota para Cadastrar 
app.post('/produtos/novo', upload.single('imagem'), (req, res) => {
    const { nome, categoria, peso, preco, descricao_curta, ficha_tecnica } = req.body
    
    const imagem = req.file ? req.file.filename : 'placeholder.jpg'

    const sql = `INSERT INTO produtos (nome, categoria, peso, preco, descricao_curta, ficha_tecnica, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)`
    
    const valores = [nome, categoria, peso, preco, descricao_curta, ficha_tecnica, imagem]

    connection.query(sql, valores, (err) => {
        if (err) {
            console.log(err)
            return res.send('Erro ao cadastrar produto!')
        }
        console.log('Produto salvo no Banco com imagem: ' + imagem)
        res.redirect('/')
    })
})

// BUSCANDO NO BANCO PELO ID
app.get('/produto/:id', (req, res) => {
    const id = req.params.id

    const sql = 'SELECT * FROM produtos WHERE id = ?'
    
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.send('Erro no banco de dados!')
        }
        
        // O banco sempre devolve uma lista. Pegamos o item 0 (o primeiro e único)
        const produtoEncontrado = results[0]

        if (!produtoEncontrado) {
            return res.send('Produto não encontrado!')
        }

        res.render('detalhes', { produto: produtoEncontrado })
    })
})

// Catálogo para Impressão com filtro
app.get('/catalogo-digital', (req, res) => {
    const pesquisa = req.query.busca
    
    let sql = ''
    let valores = []

    if (pesquisa) {
        sql = `SELECT * FROM produtos WHERE nome LIKE ? OR categoria LIKE ?`
        valores = [`%${pesquisa}%`, `%${pesquisa}%`]
    } else {
        sql = 'SELECT * FROM produtos'
    }

    connection.query(sql, valores, (err, results) => {
        if (err) {
            return res.send('Erro ao gerar catálogo')
        }
        
        res.render('catalogo-print', { 
            layout: false,
            produtos: results
        })
    })
})

// Rota para DELETAR um produto
app.get('/produtos/deletar/:id', (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM produtos WHERE id = ?'

    connection.query(sql, [id], (err) => {
        if (err) {
            console.log(err)
            return res.send('Erro ao excluir produto!')
        }
        
        console.log('Produto deletado com sucesso!')
        res.redirect('/') // Volta para a home atualizada
    })
})


// formulário de edição 
app.get('/admin/editar/:id', (req, res) => {
    const id = req.params.id
    
    // Busca o produto no banco para preencher os campos
    const sql = 'SELECT * FROM produtos WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.send("Erro ao buscar produto")
        
        const produto = results[0] // Pega o primeiro (e único) item
        
        // Renderiza a página 'editar.handlebars' enviando os dados do produto
        res.render('editar', { produto: produto })
    })
})

// UPDATE
app.post('/produtos/atualizar', upload.single('imagem'), (req, res) => {
    const { id, nome, categoria, peso, preco, descricao_curta, ficha_tecnica } = req.body
    
    // foto nova
    if (req.file) {
        const novaImagem = req.file.filename
        
        const sql = `UPDATE produtos SET 
                     nome = ?, categoria = ?, peso = ?, preco = ?, 
                     descricao_curta = ?, ficha_tecnica = ?, imagem = ? 
                     WHERE id = ?`
        
        const valores = [nome, categoria, peso, preco, descricao_curta, ficha_tecnica, novaImagem, id]

        connection.query(sql, valores, (err) => {
            if (err) {
                console.log(err)
                return res.send("Erro ao atualizar com foto!")
            }
            res.redirect('/')
        })

    } else {
        // antiga
        // Note que removemos 'imagem = ?' do SQL
        const sql = `UPDATE produtos SET 
                     nome = ?, categoria = ?, peso = ?, preco = ?, 
                     descricao_curta = ?, ficha_tecnica = ? 
                     WHERE id = ?`
        
        const valores = [nome, categoria, peso, preco, descricao_curta, ficha_tecnica, id]

        connection.query(sql, valores, (err) => {
            if (err) {
                console.log(err)
                return res.send("Erro ao atualizar sem foto!")
            }
            res.redirect('/')
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor Alimentuus rodando!')
})
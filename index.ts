import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';

const app = express();

interface Produto {
    id?: number;
    nome: string;
    categoria: string;
    quantidade: string;
    preco: number;
    descricao_curta: string;
    ficha_tecnica?: string;
    imagem: string;
    imagem_garantia?: string | null;
}

interface ProdutoInput {
    nome: string;
    categoria: string;
    quantidade: string;
    preco: number;
    descricao_curta: string;
    ficha_tecnica?: string;
}

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

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

app.use(express.static('public'))

// --- CONEXÃO COM O BANCO DE DADOS ---
const connection = mysql.createPool({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, conn) => {
    if (err) console.error('Erro no Pool de Conexão: ' + err.stack);
    if (conn) {
        console.log('Conectado no MySQL com sucesso via Pool!');
        conn.release();
    }
});

app.get('/', (req, res) => {
    const pesquisa = req.query.busca as string; 
    
    let sql = `SELECT * FROM produtos`;
    let valores: string[] = []; 

    if (pesquisa) {
        sql += ` WHERE nome LIKE ? OR categoria LIKE ?`;
        valores = [`%${pesquisa}%`, `%${pesquisa}%`];
    }

    connection.query(sql, valores, (err, data: Produto[]) => {
        if (err) {
            console.log(err);
            return res.send('Erro ao buscar produtos!');
        }
        
        const produtos = data;

        res.render('home', {
            produtos,
            termoBusca: pesquisa || ''
        });
    });
});

app.get('/admin/cadastrar', (req, res) => {
    res.render('form-produto')
})

// Rota para Cadastrar 
app.post('/produtos/novo', upload.fields([{ name: 'imagem', maxCount: 1 }, { name: 'imagem_garantia', maxCount: 1 }]), (req, res) => {
    
    const body = req.body as ProdutoInput;
    const { nome, categoria, quantidade, preco, descricao_curta, ficha_tecnica } = body; 
    
    if (!nome || !categoria || !quantidade || !preco || !descricao_curta) {
        return res.send('⚠️ Erro: Nome, Categoria, Quantidade, Preço e Descrição Curta são obrigatórios!');
    }

    if (!req.files || !req.files['imagem']) {
        return res.send('⚠️ Erro: A foto principal do produto é obrigatória!');
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[];};
    const imagem = files.imagem[0].filename;
    const imagem_garantia = files.imagem_garantia ? files.imagem_garantia[0].filename : null;

    const sql = `INSERT INTO produtos (nome, categoria, quantidade, preco, descricao_curta, ficha_tecnica, imagem, imagem_garantia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const valores = [nome, categoria, quantidade, preco, descricao_curta, ficha_tecnica, imagem, imagem_garantia || null];

    connection.query(sql, valores, (err) => {
        if (err) {
            console.log(err);
            return res.send('❌ Erro técnico ao cadastrar no banco de dados!');
        }
        res.redirect('/');
    });
});

// BUSCANDO NO BANCO PELO ID
app.get('/produto/:id', (req, res) => {
    const id = req.params.id

    const sql = 'SELECT * FROM produtos WHERE id = ?'
    
    connection.query(sql, [id], (err, results: Produto[]) => {
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

    connection.query(sql, valores, (err, results: Produto[]) => {
        if (err) {
            return res.send('Erro ao gerar catálogo')
        }
        
        res.render('catalogo-print', { 
            layout: false,
            produtos: results
        })
    })
})

// Catálogo para Impressão DETALHADA com filtro
app.get('/catalogo-detalhes', (req, res) => {
    const pesquisa = req.query.busca;
    let sql = '';
    let valores = [];

    if (pesquisa) {
        sql = `SELECT * FROM produtos WHERE nome LIKE ? OR categoria LIKE ?`;
        valores = [`%${pesquisa}%`, `%${pesquisa}%`];
    } else {
        sql = 'SELECT * FROM produtos';
    }

    connection.query(sql, valores, (err, results: Produto[]) => {
        if (err) return res.send('Erro ao gerar catálogo detalhado');
        
        res.render('catalogo-print-detalhes', { 
            layout: false,
            produtos: results
        });
    });
});

// Rota para DELETAR um produto
app.post('/produtos/deletar/:id', (req, res) => {
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

    connection.query(sql, [id], (err, results: Produto []) => {
        if (err) return res.send("Erro ao buscar produto")
        
        const produto = results[0] // Pega o primeiro (e único) item
        
        // Renderiza a página 'editar.handlebars' enviando os dados do produto
        res.render('editar', { produto: produto })
    })
})

// UPDATE
app.post('/produtos/atualizar', upload.fields([{ name: 'imagem', maxCount: 1 }, { name: 'imagem_garantia', maxCount: 1 }]), (req, res) => {
    // 1. Pegamos os dados
    const { id, nome, categoria, quantidade, preco, descricao_curta, ficha_tecnica } = req.body;
    
    // 2. BLINDAGEM DE SEGURANÇA NA EDIÇÃO: Impede que ele limpe campos obrigatórios
    if (!id || !nome || !categoria || !quantidade || !preco || !descricao_curta) {
        return res.send('⚠️ Erro: Você não pode salvar o produto com Nome, Categoria, Peso, Preço ou Descrição Curta vazios!');
    }

    // 3. Montagem da Query Dinâmica (Isso já estava bom, só mantemos)
    let sql = `UPDATE produtos SET nome = ?, categoria = ?, quantidade = ?, preco = ?, descricao_curta = ?, ficha_tecnica = ?`;
    let valores = [nome, categoria, quantidade, preco, descricao_curta, ficha_tecnica];

    if (req.files && req.files['imagem']) {
        sql += `, imagem = ?`;
        valores.push(req.files['imagem'][0].filename);
    }

    if (req.files && req.files['imagem_garantia']) {
        sql += `, imagem_garantia = ?`;
        valores.push(req.files['imagem_garantia'][0].filename);
    }

    sql += ` WHERE id = ?`;
    valores.push(id);

    // 4. Executamos
    connection.query(sql, valores, (err) => {
        if (err) {
            console.log(err);
            return res.send("❌ Erro técnico ao atualizar o produto!");
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Servidor Alimentuus rodando!')
})

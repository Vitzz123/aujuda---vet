const express = require("express");
const cors = require("cors");
const app = express();

// Permite que o frontend React se comunique com o backend
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

// Rota simulando o Login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Usuário de teste atualizado para admin
    if (email === "admin@email.com" && senha === "123456") {
        res.json({ 
            message: "Login bem-sucedido", 
            token: "token-autenticacao-123" 
        });
    } else {
        res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001 - Backend sem banco");
});
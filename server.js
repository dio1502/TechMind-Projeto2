// condo-server/server.js

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Resolver __dirname em ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// 1) Configuração de CORS (permitir chamadas do front em localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// 2) Configuração do Multer para salvar anexos em disco (pasta “uploads”)
const uploadFolder = path.join(__dirname, "uploads");

// diskStorage indica onde e como gravar o arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Prefixamos com timestamp e um número aleatório para evitar colisões de nome
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, base + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// 3) “Banco de dados” em memória: array que guardará todos os relatórios
//    => Em produção, você trocaria por chamadas a um DB real.
const reports = [];

/**
 * Cada relatório (report) terá o formato:
 * {
 *   id: Number,
 *   status: String,        // ex: "pendente"
 *   subject: String,
 *   category: String,
 *   description: String,
 *   author: String,
 *   unit: String,
 *   date: "YYYY-MM-DD",    // data que o front enviar (ou aqui podemos setar se ausente)
 *   attachmentFilename: String | null, // nome do arquivo salvo em /uploads
 *   attachmentUrl: String | null       // "/uploads/<nome-do-arquivo>"
 * }
 */

// 4) Rota GET /reports — retorna todos os relatórios em memória
app.get("/reports", (req, res) => {
  return res.json(reports);
});

// 5) Rota POST /reports — recebe multipart/form-data e cria novo relatório
//    O middleware “upload.single('attachment')” indica que esperamos um campo “attachment” com um único arquivo.
app.post("/reports", upload.single("attachment"), (req, res) => {
  // 5.1) Extrai campos de texto do FormData (eles ficarão em req.body)
  const {
    id,
    status,
    subject,
    category,
    description,
    author,
    unit,
    date,
  } = req.body;

  // 5.2) Validação mínima: id, subject, author e unit são obrigatórios
  if (!id || !subject || !author || !unit) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios ausentes (id, subject, author, unit)." });
  }

  // Converter id para número (ele virá como string no FormData)
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return res.status(400).json({ message: "O campo id precisa ser um número válido." });
  }

  // 5.3) Verificar duplicidade de ID em memória
  const exists = reports.find((r) => r.id === numericId);
  if (exists) {
    return res
      .status(400)
      .json({ message: `Já existe relatório com id = ${numericId}` });
  }

  // 5.4) Montar o objeto do novo relatório
  const newReport = {
    id: numericId,
    status: status || "pendente",
    subject: subject,
    category: category || "",
    description: description || "",
    author: author,
    unit: unit,
    date: date || new Date().toISOString().split("T")[0], // “YYYY-MM-DD”
    attachmentFilename: req.file ? req.file.filename : null,
    attachmentUrl: req.file ? `/uploads/${req.file.filename}` : null,
  };

  // 5.5) Armazena em memória
  reports.push(newReport);

  // 5.6) Retorna o relatório criado (status 201)
  return res.status(201).json(newReport);
});

// 6) Servir arquivos estáticos (anexos) em /uploads
app.use("/uploads", express.static(uploadFolder));

// 7) Qualquer outra rota pode ser adicionada aqui…

// 8) Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});

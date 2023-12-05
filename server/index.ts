import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Pool } from 'pg';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL database connection configuration
const pool = new Pool({
  user: 'iuser',
  host: 'database',
  database: 'imagedb',
  password: 'image9999',
  port: 5432,
});

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Define routes for image upload and retrieval
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file.buffer;

    // Store image and caption in the database
    const query = 'INSERT INTO images (caption, image) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [caption, image]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/images', async (req, res) => {
  try {
    // Retrieve images from the database
    const { rows } = await pool.query('SELECT * FROM images ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

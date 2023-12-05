-- Create a table for images
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  caption TEXT,
  image BYTEA
);

-- Add any other initialization queries as needed

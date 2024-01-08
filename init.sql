CREATE TABLE IF NOT EXISTS post (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT uc_title UNIQUE (title)
);

CREATE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language plpgsql;

CREATE TRIGGER update_post_updated_at
  BEFORE UPDATE ON post
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

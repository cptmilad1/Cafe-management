CREATE TABLE IF NOT EXISTS payments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  method VARCHAR(20) NOT NULL
    CHECK (method IN ('cash', 'card', 'online', 'other')),
  status VARCHAR(20) NOT NULL DEFAULT 'paid'
    CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  reference VARCHAR(255),
  received_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
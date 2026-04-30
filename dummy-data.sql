-- Insert test librarian (manually created, use the UUID you have)
INSERT INTO librarians (id, first_name, last_name)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'John', 'Smith')
ON CONFLICT (id) DO NOTHING;

-- Insert test students
INSERT INTO students (id, first_name, last_name, email, status, approved_by, approved_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Alice', 'Johnson', 'alice@example.com', 'Approved', '550e8400-e29b-41d4-a716-446655440000', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Bob', 'Williams', 'bob@example.com', 'Approved', '550e8400-e29b-41d4-a716-446655440000', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Carol', 'Brown', 'carol@example.com', 'Pending', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440004', 'David', 'Davis', 'david@example.com', 'Approved', '550e8400-e29b-41d4-a716-446655440000', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert test books
INSERT INTO books (title, author, genre, isbn, total_copies, available_copies)
VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '978-0743273565', 5, 3),
  ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '978-0060935467', 4, 2),
  ('1984', 'George Orwell', 'Dystopian', '978-0451524935', 6, 4),
  ('Pride and Prejudice', 'Jane Austen', 'Romance', '978-0141439518', 3, 1),
  ('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', '978-0316769174', 2, 2),
  ('Brave New World', 'Aldous Huxley', 'Dystopian', '978-0060085260', 4, 3),
  ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '978-0547928227', 5, 2),
  ('Dune', 'Frank Herbert', 'Science Fiction', '978-0441172719', 3, 1)
ON CONFLICT DO NOTHING;

-- Insert test loans
INSERT INTO loans (student_id, book_id, issued_by, loan_date, due_date, status)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 1, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '7 days', NOW() + INTERVAL '7 days', 'Active'),
  ('550e8400-e29b-41d4-a716-446655440001', 2, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '14 days', NOW() - INTERVAL '5 days', 'Returned'),
  ('550e8400-e29b-41d4-a716-446655440002', 3, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '3 days', NOW() + INTERVAL '11 days', 'Active'),
  ('550e8400-e29b-41d4-a716-446655440004', 4, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '20 days', NOW() - INTERVAL '2 days', 'Overdue')
ON CONFLICT DO NOTHING;

-- Insert test returns
INSERT INTO returns (loan_id, processed_by, return_date, is_late, reviewed_by, reviewed_at, status, notes)
VALUES
  (2, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '5 days', false, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '4 days', 'Approved', 'Book in good condition')
ON CONFLICT DO NOTHING;

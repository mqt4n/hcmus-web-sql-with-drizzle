# Run server
```bash
npm run dev
```
# Demo SQL Drizzle ORM
This is a simple demo project showcasing the use of Drizzle ORM with SQLite in a Node.js environment. The project includes basic CRUD operations for managing teachers in a database.
## Project Structure
- `src/db/drizzle.js`: Sets up the Drizzle ORM with SQLite.
- `src/db/schema.js`: Defines the database schema for the `giaoVien` (teacher) table.
- `src/services/teacher.service.js`: Contains service functions for CRUD operations on the `giaoVien` table.
## Prerequisites
- Node.js installed on your machine.
- SQLite installed (optional, as the database file will be created automatically).
## Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd demo-sql-drizzle
```
3. Install the dependencies:
```bash
npm install
```
## Usage
1. Start the server:
```bash
npm run dev
```
2. The server will execute the CRUD operations defined in `src/index.js` and log the results to the console.
## License
This project is licensed under the MIT License.
# frontend 
## React + TypeScript
## HTML CSS

# Backend

### Backend options + Node.js and Express

| **Feature**          | **.NET Core Web API**                                     | **Python FastAPI**                           |
| -------------------- | --------------------------------------------------------- | -------------------------------------------- |
| **Language**         | C#                                                        | Python                                       |
| Performance          | High (compiled, multi-threaded)                           | Very high (async + Starlette + Uvicorn)      |
| **Ease of Learning** | Moderate (strong typing, more boilerplate)                | Very easy (minimal code, Pythonic)           |
| **Use Case Fit**     | Enterprise apps, APIs with complex logic, Microsoft stack | Lightweight APIs, startups, prototyping      |
| Async Support        | Full with `async/await`                                   | Excellent out of the box                     |
| Routing              | Attribute-based (`[HttpGet]`, `[HttpPost]`, etc.)         | Path operation decorators (`@app.get`, etc.) |
| Database Tools       | Entity Framework Core (ORM)                               | SQLAlchemy, Tortoise ORM                     |
| Type Checking        | Compile-time with C#                                      | Runtime + static with `pydantic`             |
| Authentication       | ASP.NET Identity, JWT, OAuth                              | JWT, OAuth, third-party integrations         |
| **Deployment**       | Docker, Azure, IIS, AWS                                   | Docker, Heroku, AWS, any Linux server        |
### Backend option breakdown 
| Feature/Aspect             | **.NET Core (C#)**                            | **Node.js (Express, TypeScript)**         | **FastAPI (Python)**                       |
| -------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------ |
| **Language**               | C# (strongly typed, compiled)                 | TypeScript or JavaScript                  | Python (lightweight, async)                |
| **Learning Curve**         | Medium–High (OOP-heavy, strict structure)     | Easy–Medium (if you already know JS/TS)   | Easy (Pythonic, minimal setup)             |
| **Development Speed**      | Slow–Moderate (verbose, boilerplate)          | Fast (minimal code, rapid dev)            | Very Fast (auto docs, clean syntax)        |
| **Ideal for Beginners?**   | ❌ Not ideal (heavier setup, OOP required)     | ✅ Yes (especially with JS/TS experience)  | ✅✅ Yes (simple, clean, readable)           |
| **Database Support**       | Entity Framework (SQL Server, PostgreSQL)     | Prisma, Sequelize, Mongoose               | SQLAlchemy, Tortoise ORM                   |
| Auth Options               | ASP.NET Identity, JWT, OAuth                  | Passport.js, JWT                          | OAuth2, JWT                                |
| Ecosystem Maturity         | Enterprise-grade, long-term support           | Huge open-source ecosystem                | Fast-growing, strong docs                  |
| **Deployment Simplicity**  | More complex (especially on Linux)            | Very easy (Vercel, Render, Docker, AWS)   | Very easy (Heroku, Docker, AWS)            |
| **Best Career Fit for**    | Enterprise, finance, .NET shops               | Full-stack dev, startups, agencies        | Data apps, quick APIs, research, scripting |
| **Overkill for This App?** | ✅ Yes — unless your **goal is to learn .NET** | ❌ No — practical, simple, and scales well | ❌ No — fast, efficient for student apps    |

- Entity framework in .`Net` is basically the bridge between my back end logic and SQL database, coded in C#

## Database
| Feature                  | JSON File                         | SQL Database                                | NoSQL Database                           |     |
| ------------------------ | --------------------------------- | ------------------------------------------- | ---------------------------------------- | --- |
| Aspect                   | JSON File                         | SQL Database                                | NoSQL Database                           |     |
| Structure                | Flat file (no schema)             | Tables with strict schema                   | Flexible (JSON-like docs)                |     |
| **Querying**             | Manual in code                    | Rich (SQL queries)                          | Varies (limited to rich)                 |     |
| Multi-user Support       | No (risk of overwrite)            | Yes (concurrent safe)                       | Yes                                      |     |
| Scalability              | Poor                              | High                                        | Very high                                |     |
| Best Use Case            | Simple prototypes                 | Complex, structured apps                    | Evolving, unstructured apps              |     |
| Hosting Cost             | Free (local or CDN)               | Free or low (local/cloud)                   | Free tiers available                     |     |
| **Real-World Relevance** | Low — not used in production apps | Very High — standard in enterprise/dev jobs | High — used in modern, cloud-native apps |     |
| **Data Modeling Skills** | None (just JSON objects)          | Strong — must normalize & design schemas    | Some — design collections & documents    |     |
| **Good for Portfolio?**  | Okay — only if it's MVP-level     | Excellent — shows backend & DB knowledge    | Good — shows cloud-first or modern stack |     |

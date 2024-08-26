export function page404() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 | Atlyginimai</title>
        </head>
        <body>
            <header>
                <img src="#" alt="Logo">
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>
            </header>

            <main>
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>Go to <a href="/">main page</a></p>
            </main>

            <footer>
                Cipyright &copy; 2024
            </footer>
        </body>
        </html>`;
}
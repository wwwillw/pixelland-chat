<img src="https://storage.googleapis.com/pixelland-public/pixelland-chat-readme/logo.png" alt="drawing" width="100" />

# PixelLand Chat

#### A Discord-style embedded chat for your website.

PixelLand is an online community where people create and share pixel-art. The chat is an integral part that allows people to collaborate on art or just hang out.

<p float="left" >
<img src="https://storage.googleapis.com/pixelland-public/pixelland-chat-readme/chat_view.png" alt="drawing" width="300" />
<img src="https://storage.googleapis.com/pixelland-public/pixelland-chat-readme/chat_general_view.png" alt="drawing" width="300" />
</p>

[Pixel.Land](https://pixel.land) &mdash;
[PixelLand Discord](https://discord.gg/qgJPrdDXYg) &mdash;
Docs (coming soon)

## How to run things locally

### Getting Started

Install [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (I'm using Node v18)
Install [Go](https://go.dev/doc/install) (minimum version = 1.19)
Install [pgAdmin 4](https://www.pgadmin.org/download/)
Open pgAdmin and create a new database. The owner and database name can be whatever you want.
![create database](https://storage.googleapis.com/pixelland-public/pixelland-chat-readme/create_db.png)

### Set Environment Variables

Pixelland-chat will read the following environment variables to figure out how to connect to the database. If you're using the default value then you don't need to set the environment variable.

    export CHAT_SQL_DB_NAME=<your db name, default=pixellandchat>
    export CHAT_SQL_PORT=<your db port, default=5432>
    export CHAT_SQL_USER=<your db user, default=postgres>
    export CHAT_SQL_PASSWORD=<your db password, default=123>
    export CHAT_SQL_HOST=<where the db is hosted, default=localhost>

If you're setting up the database for the first time, then set seed_db = true

    export CHAT_SEED_DB=true

### Run it🤞

Clone this repo: `git clone https://github.com/wwwillw/pixelland-chat.git`

    cd pixelland-chat
    go run .

## UI

Once the backed is running, open a new shell and run:

    cd ui
    npm install
    npm run dev

🏃It should now be running at http://localhost:3000/

NOTE I've probably forgotten a step! If something's not working then create a Github issue or send me a message on the PixelLand Discord (@will).


# yt-cast-receiver-http

An HTTP-based player backend for [`yt-cast-receiver`](https://github.com/patrickkfkan/yt-cast-receiver), designed to work with **[UnholyCast](https://github.com/lucas1188/unholycast)**.
This module implements the abstract player interface using a simple HTTP transport layer, making it easy to run in standalone mode or inside Docker.


## 📖 Overview

`yt-cast-receiver-http` provides a lightweight HTTP implementation of the player abstraction defined in `yt-cast-receiver`.
It serves as the bridge between YouTube Cast clients and local playback services by calling defined target rest endpoints (e.g. `unholycast` or custom stream servers).

### Key Features

* Implementation of the abstract `Player` class via HTTP calls
* JSON-based communication for playback state, metadata, and control
* Lightweight — minimal dependencies
* Includes a **Dockerfile** for easy deployment

## ⚙️ Usage

### 1. Install

```bash
git clone https://github.com/lucas1188/yt-cast-receiver-http.git
cd yt-cast-receiver-http
npm install
```

### 2. Run locally

```bash
npm run build
npm run http-player
```

### 3. Using Docker

```bash
docker build -t yt-cast-receiver-http .
docker run -p 6969:6969 yt-cast-receiver-http --name "Unholycast Device" --port 6969
```

The service will **poll** a HTTP listener (default: port `6969`) exposing endpoints for player position, transport control, and player status.

---

## 🔗 Integration

This project is part of [**UnholyCast**](https://github.com/lucas1188/unholycast), where it provides the “HTTP player” backend.
You can integrate it with your own backend by implementing a compatible REST API that exposes:

| Endpoint    | Method | Description                             |
| ----------- | ------ | --------------------------------------- |
| `/play`     | `GET` | Start playback of a media URI           |
| `/pause`    | `GET` | Pause current playback                  |
| `/stop`     | `GET` | Stop playback                           |
| `/position` | `GET`  | Get current playback position and state |
| `/duration` | `GET`  | Get media duration |
| `/status`   | `GET`  | Retrieve full transport status          |
| `/seek`   | `GET`  | Seek to time of media          |
| `/volume` | `GET`  | Get volume |
| `/volume` | `POST`  | Set volume |
---

## 🙏 Attribution

This project is a fork of the excellent work by **[patrickkfan](https://github.com/patrickkfkan)** in the original [yt-cast-receiver](https://github.com/patrickkfkan/yt-cast-receiver) repository.

This fork adds:

* An **HTTP-based player implementation** (`httpPlayer.ts`)
* A **Dockerfile** for containerized deployments

All credit for the original design, protocol handling, and abstraction model goes to the upstream project.


## 📜 License

This project retains the license of the upstream repository [(MIT)](https://github.com/patrickkfkan/yt-cast-receiver?tab=readme-ov-file#license)



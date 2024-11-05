# Integrity Eyes

Procurement Transparency Dashboard

## Getting Started

### Prerequisites:

- `python3`
- `python3-pip`
- `python3-venv`
- `node`

### Install Python Packages

1. From project root folder, change directory to flask-server: `cd flask-server`
2. Create Python virtual environment: `python3 -m venv .venv`
3. Activate virtual environment: `source .venv/bin/activate`
4. Install packages: `pip install -r requirements.txt`

### Install Node Packages

1. From project root folder, change directory to client: `cd client`
2. Install packages: `npm install`

## Running Local Deployment

1. In client directory, create a build for the client: `npm run build`
2. In flask-server directory, run server: `flask --app server.py run`

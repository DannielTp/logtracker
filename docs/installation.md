# 🚀 Despliegue local de LogTracker con Docker Compose

Este documento explica cómo **levantar LogTracker en local** usando **Docker Compose**, detallando servicios, variables de entorno y comprobaciones básicas.

El despliegue local está pensado para:

- desarrollo
- pruebas
- aprendizaje
- auto-hosting sencillo

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- Docker
- Docker Compose (v2)

Comprueba la instalación:

```bash
docker --version
docker compose version
```

## ⚙️ Variables de entorno

LogTracker se configura exclusivamente mediante variables de entorno.
No hay configuración hardcodeada en el código.

## 🗄️ Base de datos (PostgreSQL)

Usadas por ingest-api y worker:

```bash
DB_HOST=postgres
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## 🔄 Redis (BullMQ)

```bash
REDIS_HOST=redis
REDIS_PORT=6379
```

## 🌐 Ingest API

```bash
PORT=4001

REDIS_HOST=localhost
REDIS_PORT=6379

DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## 🔐 Admin API

```bash
PORT=4003
ADMIN_USER=admin
ADMIN_PASSWORD=admin
```

#### ⚠️ Nota:

Estas credenciales son solo para entorno local.

## 🐳 docker-compose.yml

Ejemplo completo y funcional para desarrollo local:

```yaml
services:
    postgres:
        image: postgres:16
        container_name: logtracker-postgres
        environment:
            POSTGRES_USER: logtracker
            POSTGRES_PASSWORD: password
            POSTGRES_DB: logtracker
        ports:
            - '5432:5432'
        volumes:
            - postgres_data:/var/lib/postgresql/data

    redis:
        image: redis:7
        container_name: logtracker-redis
        ports:
            - '6379:6379'

    ingest-api:
        image: logtracker/ingest-api:latest
        container_name: logtracker-ingest-api
        depends_on:
            - redis
            - postgres
        restart: on-failure
        environment:
            DB_HOST: postgres
            DB_PORT: 5432
            DB_USER: logtracker
            DB_PASSWORD: password
            DB_NAME: logtracker
            REDIS_HOST: redis
            REDIS_PORT: 6379
        ports:
            - '4001:4001'

    worker:
        image: logtracker/worker:latest
        container_name: logtracker-worker
        depends_on:
            - redis
            - postgres
        restart: on-failure
        healthcheck:
            test: ['CMD-SHELL', 'pg_isready -U logtracker']
            interval: 5s
            timeout: 5s
            retries: 5
        environment:
            DB_HOST: postgres
            DB_PORT: 5432
            DB_USER: logtracker
            DB_PASSWORD: password
            DB_NAME: logtracker
            REDIS_HOST: redis
            REDIS_PORT: 6379

    admin-api:
        image: logtracker/admin-api:latest
        container_name: logtracker-admin-api
        depends_on:
            - redis
            - postgres
        restart: on-failure
        environment:
            REDIS_HOST: redis
            REDIS_PORT: 6379
            ADMIN_USER: admin
            ADMIN_PASS: admin
        ports:
            - '4003:4003'

volumes:
    postgres_data:
```

## ▶️ Arranque del sistema

Desde la raíz del proyecto, ejecuta:

```bash
docker compose up -d
```

## ✅ Comprobaciones básicas

### 🔹 Ingest API

```bash
curl http://localhost:4001/health
```

Debe responder correctamente si el servicio está activo.

### 🔹 Admin API

Accede desde el navegador:

```
http://localhost:4003/admin/queues
```

## Credenciales por defecto:

```
usuario: admin
contraseña: admin
```

### Desde aquí podrás ver:

- colas BullMQ
- jobs en espera, completados o fallidos

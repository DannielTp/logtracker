# LogTracker

**LogTracker** es un proyecto **open source** de captura y procesamiento distribuido de errores, creado con un objetivo claro:

> Aprender y demostrar arquitectura real con **microservicios, colas y procesamiento asíncrono**, sin perder el foco en un caso de uso auténtico.

---

## 🚀 ¿Qué es LogTracker?

LogTracker permite:

- Capturar errores desde aplicaciones **Node.js y Browser**
- Enviarlos de forma asíncrona mediante un **SDK npm**
- Procesarlos usando **colas (BullMQ + Redis)**
- Agrupar errores por fingerprint
- Almacenarlos de forma persistente

Todo el sistema es:

- **Self-hosted**
- **Dockerizado**
- Diseñado como **SaaS-ready**, aunque sea open source

---

## 🧱 Arquitectura

```
SDK (Node / Browser)
        ↓ HTTP
Ingest API (Fastify)
        ↓ BullMQ (Redis)
Worker / Processor
        ↓
PostgreSQL
```

- La **Ingest API** valida y encola eventos
- El **Worker** procesa, agrupa y persiste
- Redis actúa como **buffer y desacoplador**
- PostgreSQL almacena el estado final

---

## 📦 Estructura del repositorio

```
logtracker/
├─ packages/
│  ├─ core/ # Contrato público (tipos + schemas)
│  ├─ sdk/            # SDK npm público
│  ├─ shared/         # Tipos y schemas compartidos
│  ├─ ingest-api/     # API HTTP de ingesta
│  └─ worker/         # Worker de procesamiento
│  └─ admin-api/ # Panel y utilidades administrativas
├─ docker-compose.yml
├─ commit-convention.md
└─ README.md
```

### Publicables

- `@logtracker/core`
- `@logtracker/sdk`

### Internos

- `shared`
- `ingest-api`
- `worker`
- `admin-api`

---

## 🧩 SDK npm (`@logtracker/sdk`)

### Instalación

```bash
pnpm add @logtracker/sdk
```

### Inicialización (una sola vez)

```ts
import { initLogTracker } from '@logtracker/sdk'

initLogTracker({
    dsn: 'http://localhost:3000',
    projectId: 'my-app',
    environment: 'production',
    service: 'api',
})
```

### Captura manual

```ts
import { captureError } from '@logtracker/sdk'

try {
    throw new Error('Boom')
} catch (err) {
    captureError(err)
}
```

### Integraciones

- Express / Fastify middleware
- NestJS `ExceptionFilter`
- Browser global handlers (`onerror`, `unhandledrejection`)

---

## 🐳 Ejecutar LogTracker en local

Requisitos:

- Docker
- Docker Compose

```bash
docker-compose up
```

Esto levanta:

- Ingest API
- Worker
- Redis
- PostgreSQL

---

## 🎯 Objetivos del proyecto

- Aprender arquitectura de microservicios real
- Practicar colas, workers y backpressure
- Diseñar SDKs con buena DX
- Construir pipelines asíncronos y resilientes
- Servir como base para un SaaS self-hosted

Es un proyecto educativo y demostrativo, pero construido con criterios reales de producción.

---

## 🛣️ Roadmap

- [x] Arquitectura definida
- [x] Monorepo y Docker
- [x] Contrato público (core)
- [x] SDK npm
- [x] Ingest API
- [x] Worker
- [x] Persistencia
- [ ] Reintentos y DLQ desde admin
- [ ] Autenticación y control de acceso
- [ ] Métricas y alertas
- [ ] Ejemplos públicos de uso

---

## 📄 Convención de commits

Este proyecto sigue una convención de commits documentada en:

➡️ `commit-convention.md`

---

## 🤝 Contribuir

Las contribuciones son bienvenidas.

Antes de empezar:

- Lee la arquitectura
- Sigue la convención de commits
- Mantén los cambios pequeños y claros

---

## 📜 Licencia

MIT

## 🏁 Nota final

LogTracker no pretende competir con herramientas comerciales.

Su objetivo es mostrar cómo se construye un sistema real,
con decisiones técnicas conscientes y trade-offs explícitos.

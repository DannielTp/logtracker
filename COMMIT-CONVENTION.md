# Convención de commits — LogTracker

Esta convención define cómo deben escribirse los mensajes de commit en el proyecto **LogTracker**.

El objetivo es:

- mantener un historial claro y legible
- facilitar el mantenimiento
- preparar el proyecto para automatizaciones futuras (changelog, releases, etc.)

---

## Formato general

```
<type>(<scope>): <mensaje>
```

### Ejemplo

```
feat(sdk): add initLogTracker function
```

---

## Types permitidos

| Type       | Uso                                          |
| ---------- | -------------------------------------------- |
| `feat`     | Nueva funcionalidad                          |
| `fix`      | Corrección de bug                            |
| `chore`    | Tareas de mantenimiento (deps, config, repo) |
| `docs`     | Documentación                                |
| `refactor` | Refactor sin cambiar funcionalidad           |
| `test`     | Tests                                        |
| `perf`     | Mejoras de rendimiento                       |

---

## Scope

El `scope` indica **qué parte del proyecto** se ve afectada.

Scopes recomendados:

- `repo`
- `shared`
- `sdk`
- `ingest-api`
- `worker`
- `docker`

### Ejemplos

```
chore(repo): setup pnpm workspaces
feat(shared): add ErrorEvent schema
fix(sdk): prevent crash when config is missing
```

---

## Mensaje

- Siempre en **inglés**
- En **imperativo** (add, fix, remove, update)
- Frase corta y clara

### Correcto

```
feat(worker): group errors by fingerprint
```

### Incorrecto

```
added new feature
fixed stuff
```

---

## Commits pequeños

- Un commit = un cambio lógico
- Evitar commits gigantes
- Preferir varios commits claros

---

## Ejemplos comunes

```
chore(repo): initial project setup
feat(sdk): capture unhandled promise rejections
fix(ingest-api): validate payload schema
refactor(worker): extract fingerprint logic
```

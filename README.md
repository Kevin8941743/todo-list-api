# Todo List API — Full DevOps CI/CD Project

This project is a full-stack **Todo List API** built with Node.js and deployed using a complete **DevOps pipeline** including CI/CD, Docker, Kubernetes, Terraform, and Ansible.

The goal of this project is to demonstrate end-to-end infrastructure automation and production-grade deployment practices.

---

## Tech Stack

### Backend
- Node.js (Express)
- PostgreSQL (via `pg`)
- Redis (caching / session support)

### DevOps / Infrastructure
- Docker & Docker Compose
- Kubernetes (manifests in `/k8s`)
- Terraform (AWS EC2 provisioning)
- Ansible (server configuration & deployment)
- GitHub Actions (CI pipeline)

### Linting & Quality Tools
- ESLint (JavaScript)
- kube-linter (Kubernetes manifests)
- Hadolint (Dockerfile)
- TFLint (Terraform)
- ansible-lint (Ansible playbooks)
  
---

## CI/CD Pipeline (GitHub Actions)

On every push or pull request to `main`, the pipeline runs:

### 1. JavaScript Linting
- ESLint checks code quality and syntax

### 2. Kubernetes Validation
- kube-linter checks security and best practices

### 3. Dockerfile Linting
- Hadolint ensures efficient and secure Docker builds

### 4. Terraform Validation
- TFLint checks infrastructure code correctness

### 5. Ansible Linting
- ansible-lint ensures playbook best practices

---

## Docker

Build and run manually:

```bash
cd app
docker build -t todo-api .
docker run -p 3001:3001 todo-api
```

Or using Docker Compose:

```bash
docker compose up --build
```

## Kubernetes Deployment

Apply manifests:

```bash
kubectl apply -f k8s/backend
kubectl apply -f k8s/redis
```

## Terraform (AWS EC2 setup)

```bash
cd terraform
terraform init
terraform apply
```

## Ansible Deployment

Configure and deploy applications:

```bash
cd ansible
ansible-playbook -i inventory.ini playbook.yaml
```

## Run Locally 

Clone repo 

```bash
git clone https://github.com/your-repo/todo-list-api.git
cd todo-list-api/app
```

Install dependencies

```bash
npm install
```

Start server 

```bash
npm run start
```

--- 

### Architecture 

Client -> Node.js API -> PostgreSQL / Redis  
CI/CD -> GitHub Actions (Lint + Validation)  
Infrastructure -> Terraform (AWS EC2)  
Deployment -> Ansible -> Docker Compose  


---


## License

This project is open source and available under the MIT License.

roadmap.sh Node.js Todo List API project URL: https://roadmap.sh/projects/todo-list-api







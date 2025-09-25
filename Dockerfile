# 1. Imagen base
FROM ubuntu:22.04

# 2. Evitar preguntas al instalar paquetes
ENV DEBIAN_FRONTEND=noninteractive

# 3. Instalar dependencias básicas y Python + pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv \
    python3-pip \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 4. Crear carpeta de la app
WORKDIR /app

# 5. Copiar requirements.txt e instalar dependencias
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# 6. Copiar todo el proyecto
COPY . .

# 7. Exponer puerto de Flask
EXPOSE 5000

# 8. Ejecutar la app con Gunicorn
CMD ["python3", "src/app.py"]

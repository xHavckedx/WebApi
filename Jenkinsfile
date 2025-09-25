pipeline {
    agent any

    environment {
        IMAGE_NAME = "WebApi"
        CONTAINER_NAME = "WebApi"
    }

    stages {

        stage('Build Docker Image') {
            when {
                branch 'pro'  // Solo ejecuta esta etapa si es la rama 'main'
            }
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                    sh "docker build -t ${IMAGE_NAME}:${env.GIT_COMMIT} ."
                }
            }
        }

        stage('Stop Existing Container') {
            when {
                branch 'pro'  // Solo ejecuta esta etapa si es la rama 'main'
            }
            steps {
                script {
                    sh """
                    if [ \$(docker ps -a --filter name=${CONTAINER_NAME} -q) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm -f ${CONTAINER_NAME}
                    fi
                    """
                }
            }
        }

        stage('Run New Container') {
            when {
                branch 'pro'
            }
            steps {
                node ('Host SSH'){
                    script {
                        sh """
                            docker-compose -f /home/leodevops/Docker/docker-compose.yaml up -d --force-recreate ${CONTAINER_NAME}
                        """
                    }
                }
            }
        }
    }

}
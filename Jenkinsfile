pipeline {
    agent any
    environment {
        FRONTEND_DIR = "Client/frontend"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh "cd ${env.FRONTEND_DIR} && npm install"
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh "cd ${env.FRONTEND_DIR} && npm test"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh "cd ${env.FRONTEND_DIR} && npm run build"
                    }
                }
            }
        }
        stage('Docker Build and Push') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh '''
                    docker build -t my-app:latest -f Client/Dockerfile .
                    docker tag my-app:latest my-dockerhub-username/my-app:latest
                    docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                    docker push my-dockerhub-username/my-app:latest
                    '''
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

pipeline {
    agent {
        docker {
            image 'node:18' // Node.js Docker image
            args '-u root:root' // Run as root to avoid permission issues
        }
    }
    environment {
        FRONTEND_DIR = "Client/frontend" // Path to your frontend directory
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm test' // Adjust based on your test script in package.json
                }
            }
        }
        stage('Build') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm run build' // Adjust based on your build script in package.json
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

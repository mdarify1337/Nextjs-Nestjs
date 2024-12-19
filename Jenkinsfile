pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Docker') {
            steps {
                script {
                    sh '''
                    # Check if Docker is installed
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        apt-get update -y
                        apt-get install -y docker.io
                        systemctl start docker
                        systemctl enable docker
                        echo "Docker installed successfully."
                    else
                        echo "Docker is already installed."
                    fi
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh '''
                        cd Client/frontend
                        npm install
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Test Frontend') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh '''
                        cd Client/frontend
                        npm test
                        '''
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh '''
                        cd Server/backend
                        npm install
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh '''
                        cd Server/backend
                        npm test
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished running.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

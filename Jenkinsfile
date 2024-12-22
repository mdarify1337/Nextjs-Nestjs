pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker compose'
        NODE_IMAGE = 'node:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Setup') {
            steps {
                script {
                    // Ensure Docker is available
                    sh 'docker --version'
                    // Create necessary directories
                    sh '''
                        mkdir -p ./Client/frontend/node_modules/
                        mkdir -p ./Server/backend/node_modules/
                        mkdir -p ./Database
                    '''
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    // Build using docker-compose
                    sh '${DOCKER_COMPOSE} -f docker-compose.yml build'
                }
            }
        }

        stage('Frontend Tests') {
            agent {
                docker {
                    image 'node:latest'
                    reuseNode true
                }
            }
            steps {
                dir('Client/frontend') {
                    sh '''
                        npm ci
                        npm run test -- --watchAll=false
                        npm run lint
                    '''
                }
            }
        }

        stage('Backend Tests') {
            agent {
                docker {
                    image 'node:latest'
                    reuseNode true
                }
            }
            steps {
                dir('Server/backend') {
                    sh '''
                        npm ci
                        npm run test
                        npm run lint
                    '''
                }
            }
        }

        stage('Integration Tests') {
            steps {
                script {
                    // Start the entire stack
                    sh '${DOCKER_COMPOSE} -f docker-compose.yml up -d'
                    
                    // Wait for services to be ready
                    sh 'sleep 30'
                    
                    // Run integration tests here
                    // Add your integration test commands
                    
                    // Clean up
                    sh '${DOCKER_COMPOSE} -f docker-compose.yml down -v'
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up Docker resources
                sh '''
                    ${DOCKER_COMPOSE} -f docker-compose.yml down -v
                    docker system prune -f
                '''
            }
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}

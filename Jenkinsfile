pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('Client/frontend') {
                    sh '''
                        npm ci
                        npm run test -- --watchAll=false --ci
                    '''
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('Server/backend') {
                    sh '''
                        npm ci
                        npm run test
                    '''
                }
            }
        }
    }

    post {
        always {
            junit '**/junit.xml'
            cleanWs()
        }
    }
}

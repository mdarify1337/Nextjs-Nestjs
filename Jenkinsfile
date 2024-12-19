pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

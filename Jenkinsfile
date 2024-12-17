pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh "cd /home/ael/Desktop/newp/Client/frontend && npm install"
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Install Dependencies stage finished!'
        }
        success {
            echo 'Install Dependencies succeeded!'
        }
        failure {
            echo 'Install Dependencies failed!'
        }
    }
}

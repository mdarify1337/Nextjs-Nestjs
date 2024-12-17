pipeline {
    agent {
        docker {
            // image 'docker:24.0.6' // Official Docker image
            // args '-v /var/run/docker.sock:/var/run/docker.sock'
            // Allow access to Docker socket
            echo 'succes access'
        }
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
                    sh '''
                    cd Client/frontend
                    npm install
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

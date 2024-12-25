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
                echo 'install docker tools'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'build front end'
            }
        }

        stage('Test Frontend') {
            steps {
                sh '''
                    echo 'Testing frontend...'
                    pwd
                    ls
                    apt-get update 
                    apt-get install -y npm
                    # Ensure we are in the correct directory
                    cd Client/frontend
                    # Install dependencies
                    npm install
                '''
            }
        }

        stage('Build Backend') {
            steps {
                echo 'build back end'
            }
        }

        stage('Test Backend') {
            steps {
                sh '''
                    echo 'Testing backend...'
                    pwd
                    ls
                    
                    apt-get update 
                    apt-get install -y npm
                    # Ensure we are in the correct directory
                    cd Server/backend
                    # Install dependencies
                    npm install
                '''
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

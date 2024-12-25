pipeline {
    agent {
        docker { image 'node:latest' }
    }

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
                    
                    # Ensure we are in the correct directory
                    cd Client/frontend

                    # Check if npm is installed
                    if ! command -v npm &> /dev/null; then
                        echo "npm is not installed. Installing npm..."
                        apt-get update && apt-get install -y npm
                    else
                        echo "npm is already installed."
                    fi
                    
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
                    
                    # Ensure we are in the correct directory
                    cd Server/backend

                    # Check if npm is installed
                    if ! command -v npm &> /dev/null; then
                        echo "npm is not installed. Installing npm..."
                        apt-get update && apt-get install -y npm
                    else
                        echo "npm is already installed."
                    fi
                    
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

pipeline {
    agent any  // This runs the pipeline on any available Jenkins agent

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Checkout the GitHub repository
            }
        }

        stage('Install Docker') {
            steps {
                script {
                    // Install Docker if not already installed (e.g., for Ubuntu)
                    sh '''
                    if ! command -v docker &> /dev/null
                    then
                        echo "Docker not found, installing..."
                        sudo apt-get update
                        sudo apt-get install -y docker.io
                        sudo systemctl enable docker
                        sudo systemctl start docker
                    else
                        echo "Docker is already installed"
                    fi
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Once Docker is installed, run npm install in the node container
                    docker.image('node:18').inside {
                        sh 'cd Client/frontend && npm install'  // Run npm install in the frontend directory
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

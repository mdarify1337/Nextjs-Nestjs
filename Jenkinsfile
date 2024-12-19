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
                    // Install Docker if not already installed
                    sh '''
                    # Check if Docker is installed
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        
                        # Ensure apt-get works without permission issues
                        if [ ! -w /var/lib/apt/lists ]; then
                            echo "Fixing permissions for /var/lib/apt/lists..."
                            chmod -R 755 /var/lib/apt/lists || exit 1
                        fi
                        
                        # Update package list and install Docker
                        apt-get update -y
                        apt-get install -y docker.io

                        # Enable and start Docker service
                        systemctl enable docker
                        systemctl start docker
                        
                        echo "Docker installation completed successfully."
                    else
                        echo "Docker is already installed."
                    fi
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Use Docker to run npm install in the specified directory
                    docker.image('node:18').inside {
                        sh '''
                        cd Client/frontend
                        npm install
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

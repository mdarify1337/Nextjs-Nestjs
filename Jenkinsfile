pipeline {
    agent any  // Runs on any available Jenkins agent

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Check out the source code from the SCM
            }
        }

        stage('Debug Permissions') {
            steps {
                script {
                    // Debug step to check permissions and the current user
                    sh '''
                    echo "Running as user: $(whoami)"
                    echo "Checking permissions for /var/lib/apt/lists..."
                    ls -ld /var/lib/apt/lists || echo "Directory not accessible"
                    '''
                }
            }
        }

        stage('Install Docker') {
            steps {
                script {
                    // Install Docker if it's not installed
                    sh '''
                    # Check if Docker is installed
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        
                        # Ensure the script can install packages
                        if [ -w /var/lib/apt/lists ]; then
                            echo "Permissions are fine for /var/lib/apt/lists"
                        else
                            echo "Fixing permissions for /var/lib/apt/lists..."
                            chmod -R 755 /var/lib/apt/lists || echo "Could not fix permissions"
                        fi

                        # Update package list and install Docker
                        apt-get update -y || exit 1
                        apt-get install -y docker.io || exit 1

                        # Enable and start Docker
                        systemctl enable docker || echo "Could not enable Docker"
                        systemctl start docker || echo "Could not start Docker"

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
                    // Run npm install inside a Node.js container
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

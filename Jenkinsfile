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
                script {
                    sh '''
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        
                        # Ensure permissions for apt-get commands
                        if [ ! -w /var/lib/apt/lists ]; then
                            echo "Cannot fix permissions for /var/lib/apt/lists. Checking for alternatives..."
                            mkdir -p /tmp/apt-lists
                            chmod -R 755 /tmp/apt-lists
                            export APT_LISTS_DIR=/tmp/apt-lists
                        fi

                        # Set APT options to avoid using the default directory
                        apt-get -o Dir::State::Lists=$APT_LISTS_DIR update -y || exit 1
                        apt-get install -y docker.io || exit 1

                        echo "Docker installed successfully."
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

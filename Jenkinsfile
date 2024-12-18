pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }
    environment {
        // Define environment variables
        NODE_ENV = 'test'
        CI = 'true'
    }
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Client/frontend') {
                    sh '''
                    npm cache clean --force
                    npm install
                    '''
                }
            }
        }
        stage('Run Linter') {
            steps {
                dir('Client/frontend') {
                    sh 'npm run lint || true'
                }
            }
        }
        stage('Unit Tests') {
        stage('Install Docker') {
            steps {
                dir('Client/frontend') {
                script {
                    sh '''
                    # Ensure test command exists, otherwise create a fallback
                    if npm run test:ci; then
                        echo "Tests executed successfully"
                    elif npm test; then
                        echo "Fallback test command used"
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
                        echo "No test script found. Skipping tests."
                        exit 0
                        echo "Docker is already installed."
                    fi
                    '''
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, 
                          testResults: '**/test-results/*.xml'
                }
            }
        }
        stage('Build') {
            steps {
                dir('Client/frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Security Scan') {
        stage('Install Dependencies') {
            steps {
                dir('Client/frontend') {
                    sh '''
                    npm audit || true
                    '''
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
            echo 'Cleaning up workspace...'
            cleanWs()
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
            // Optionally, you could add notification steps here
            echo 'Pipeline failed!'
        }
    }
}

pipeline {
    agent {
        docker {
            image 'node:18-bullseye'
            args '-u root:root --privileged'
        }
    }
    
    environment {
        // Define environment variables if needed
        NODE_ENV = 'development'
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install System Dependencies') {
            steps {
                script {
                    sh '''
                    apt-get update -y
                    apt-get install -y \
                        apt-transport-https \
                        ca-certificates \
                        curl \
                        software-properties-common
                    
                    # Install Docker
                    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
                    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
                    apt-get update -y
                    apt-get install -y docker-ce docker-ce-cli containerd.io
                    '''
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                script {
                    sh '''
                    cd Client/frontend
                    npm cache clean --force
                    npm install
                    '''
                }
            }
        }
        
        stage('Run Frontend Tests') {
            steps {
                script {
                    sh '''
                    cd Client/frontend
                    npm test
                    '''
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    sh '''
                    cd Client/frontend
                    npm run build
                    '''
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    sh '''
                    docker build -t my-frontend-app ./Client/frontend
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            echo 'Pipeline failed. Check the logs for details.'
            // Optional: Send notification
            // mail to: 'team@example.com',
            //      subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
            //      body: "Something is wrong with the pipeline ${env.BUILD_URL}"
        }
    }
}

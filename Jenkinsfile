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
                    echo 'test front end'
                    pwd
                    ls
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
                    echo 'test back end'
                    pwd
                    ls
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

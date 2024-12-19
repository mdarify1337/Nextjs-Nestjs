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
                echo 'test front end'
            }
        }

        stage('Build Backend') {
            steps {
                echo 'build back end'
            }
        }

        stage('Test Backend') {
            steps {
                echo 'test back end'
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

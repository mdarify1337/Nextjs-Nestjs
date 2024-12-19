pipeline {
    agent any {
        stage {
            steps("start testing") {
                echo  "new test"
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

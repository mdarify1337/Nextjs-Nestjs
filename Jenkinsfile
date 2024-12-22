pipeline {
  agent {
    docker { image 'node:16-alpine' }
  }
  stages {
    stage('Test') {
      steps {
        sh 'node --version'  // Executes and outputs Node.js version
        echo 'node --version' // Displays the correct command text
      }
    }
  }
}

pipeline {
  agent {
    docker {
      image 'node:20-alpine3.16'
      args '-p 3333:3333'
    }
  }
  stages {
    stage('Build') {
      environment {
        DATA_BASE_HOST = '172.30.20.10'
        DATA_BASE_USER = 'root'
        DATA_BASE_SCHEMA = 'db_lista_compras'
        DATA_BASE_PASSWORD = 'SenhaDoRoot'
        DATA_BASE_PORT = '3306'
      }
      steps {
        sh 'npm install'
        sh 'npm run dev'
      }
    }
  }
}
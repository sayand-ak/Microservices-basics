pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Sayand2002/Microservices-basics.git'
            }
        }
        
        stage('Build') {
            steps {
                
            }
        }
        
        stage('Test') {
            steps {
                
            }
        }
        
        stage('Deploy') {
            environment {
                
            }
            steps {
                
            }
        }
    }
    
    post {
        success {
            echo 'Build and deployment successful! Sending notification...'
        }
        failure {
            echo 'Build or deployment failed! Sending notification...'
        }
    }
}

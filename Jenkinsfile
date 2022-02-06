pipeline {
    agent any

    stages {
        stage('download_fromGithub') {
            steps {
                echo 'Downloading from github'
            }
        }
        stage('execute _tests') {
            steps {
                echo 'Tests execution'
            }
        }
        stage('package') {
            steps {
                echo 'packaging'
            }
        }
        stage('deploy') {
            steps {
                echo 'deploy build'
            }
        }
        stage('executeansible') {
            steps {
                echo 'execution of ansible'
            }
        }
    }
}

pipeline {
    // Définir l’agent Jenkins sur lequel s'exécute le pipeline
        // agent any

       agent {
        // adapter pour Windows pour executer le jop
            label 'agent_jenkins'
        }

          tools {
                maven 'Maven-3.9.12' // Nom de l'installation Maven configurée dans Jenkins
            }


        environment {
            // Définir des variables d’environnement pour l’image Docker
             DOCKERHUB_USER = "magdjipro"
            //  BACKEND_IMAGE  = "${DOCKERHUB_USER}/backend-courrier"
            //  BACKEND_TAG    = "1.${BUILD_NUMBER}"

             // frontend
             FRONTEND_IMAGE = "${DOCKERHUB_USER}/frontend-ci"
             FRONTEND_TAG = "1.${BUILD_NUMBER}"
             // Frontend  private repository

            //  FRONTEND_REPO_URL     = 'https://github.com/devopsencvr/frontend-gestion-courrier-physique.git'
            //  FRONTEND_REPO_BRANCH  = 'master'
            //  FRONTEND_CREDENTIALS  = 'credential-id-github'


        }

    // les etapes du pipeline
        stages {

           // checkout frontend code
            stage('Checkout front Code') {

                steps {
                  dir('frontend') {
                    // Récupérer le code source depuis le dépôt Git (SCM) ssddd
                    checkout scm
                  }
                }
            }


             //  Checkout Frontend
            //  stage('Checkout Frontend') {
            //      steps {
            //          dir('frontend') {
            //              git branch: env.FRONTEND_REPO_BRANCH,
            //                  url: env.FRONTEND_REPO_URL,
            //                  credentialsId: env.FRONTEND_CREDENTIALS
            //          }
            //      }
            //  }



                  // 🔹 Analyse SonarQube Backend
                        //   stage('Analyse SonarQube Backend') {
                        //       steps {
                        //           dir('backend') {
                        //               script {
                        //                   withSonarQubeEnv('SonarQube') {
                        //                       bat """
                        //                           mvn clean verify -DskipTests sonar:sonar ^
                        //                               -Dsonar.projectKey=analyse-code-backend ^
                        //                               -Dsonar.projectName="analyse-code-backend" ^
                        //                               -Dsonar.host.url=http://localhost:9000 ^
                        //                               -Dsonar.token=%SONAR_AUTH_TOKEN%
                        //                       """
                        //                   }
                        //               }
                        //           }
                        //       }
                        //   }


                          // 🔹 Quality Gate Backend
                         /*  stage('Quality Gate Backend') {
                              steps {
                                  timeout(time: 30, unit: 'MINUTES') {
                                      waitForQualityGate abortPipeline: true
                                  }
                              }
                          } */


                          // 🔹 Analyse SonarQube Frontend
                          stage('Analyse SonarQube Frontend') {
                              steps {
                                  dir('frontend') {
                                      script {
                                          withSonarQubeEnv('SonarQube') {
                                              withCredentials([string(credentialsId: 'sonarqube-credential', variable: 'SONAR_AUTH_TOKEN')]) {

                                                  // 🔹 Récupère le chemin du scanner déclaré dans Jenkins Tools
                                                  def scannerHome = tool name: 'SonarQubeScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'

                                                  bat """
                                                      "${scannerHome}\\bin\\sonar-scanner.bat" ^
                                                          -Dsonar.projectKey=sonarqube-credential ^
                                                          -Dsonar.projectName="sonarqube-credential" ^
                                                          -Dsonar.sources=src ^
                                                          -Dsonar.host.url=http://localhost:9000 ^
                                                          -Dsonar.token=%SONAR_AUTH_TOKEN%
                                                  """
                                              }
                                          }
                                      }
                                  }
                              }
                          }



            //  Build Frontend  Docker Image
            stage('Build frontend Docker Image') {
                 steps {
                   dir('frontend'){
                     script {
                        bat "docker build -t %FRONTEND_IMAGE%:%FRONTEND_TAG% ."
                      }
                    }

                 }
            }


            //  Build Frontend Docker Image
                        // stage('Build Frontend Docker Image') {
                        //      steps {
                        //        dir('frontend'){
                        //          script {
                        //        bat "docker build -t %FRONTEND_IMAGE%:%FRONTEND_TAG% ."
                        //           }
                        //         }

                        //      }
                        // }


            // 🔹 Push images to DockerHub plateforme
                    stage('Push images to DockerHub') {
                        steps {
                            withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                                bat """
                                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                                    docker push %FRONTEND_IMAGE%:%FRONTEND_TAG%
                                    docker logout
                                """
                            }
                        }
                    }



            // stage('Deploy with Docker Compose') {
            //     steps {
            //         // Déployer les services avec Docker Compose en mode détaché
            //         // bat "docker-compose down || true"
            //         bat "docker-compose up -d --build"

            //     }
            // }
        }

        post {
            success {
                // Afficher un message si le pipeline réussit
                echo " Déploiement réussi"
            }
            failure {
                // Afficher un message si le pipeline échoue
                echo " Le pipeline a échoué, vérifie les logs Jenkins."
            }



        }
}
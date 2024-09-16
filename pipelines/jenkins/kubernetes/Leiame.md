## Para uso no kubernetes:

1. 
   O script Jenkinsfile executa o mesmo Dockerfile da raiz do projeto, portanto, se 
   funcionar localmente no PC também deverá funcionar o build nos servidores Jenkins.

   O arquivo deploy-desenv.yaml contém a configuração de exemplo para deploy no namespace teste-apm.
   
   O fluxo da requisiçao Web fica assim:
                                              ,_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
            ->  [ NgInx/Procergs ]           !              -Kubernetes-                   |
           /            \                    !                                             !
          /               ´- - - - - - -->   [ Ingresses ]  --> [ Services ] --> [ PODs ]  !
      [ Clinte ]                             !                                             !
                                             !_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _; 

   A infra para HTTPS/TLS está fora do kubernetes. Por esse motivo abrimos uma REQ  solicitando cadastro 
   da url https://apm-angular.des.intra.rs.gov.br na infra NgInx da Procergs ( Proxy reverso ). 
   Quando a requisição Web chega no NgInx/Procergs os dados do protocolo Https/TLS são abertos e avaliados pelos softwares de segurança.
    




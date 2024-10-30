package fit.basicos;


public class ControleFluxo {
    public static void executar(){
        String texto ="";
        int numero = 2;
        boolean ehPar = numero % 2 == 0;
        if(ehPar){
            switch (numero) {
                case (2):
                    System.err.println("dois");
                    texto = "dois";
                    break;
                case (3):   
                    System.err.println("tres");
                    texto = "tres";
                    break;
                case (8):
                    System.err.println("oito");
                    texto = "oito";
                    break;
                default:
                    System.err.println("numero nao encontrado");
                    texto = "numero nao encontrado";
                    break;

            }
        }
    }
    
}

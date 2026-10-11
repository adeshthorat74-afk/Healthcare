public class pre{
    public static void main(String args[]){
        int mark[] ={85,34,34};
        int lar =mark[0];
        for(int i = 0 ; i< mark.length ;i++){
            if(mark[i]>lar){
                lar = mark[i];
            }
        
        }
        System.out.println("The largest mark is: " + lar);
    }
}